import { NextRequest, NextResponse } from 'next/server';
import { z, ZodError } from 'zod';
import { supabaseServer } from '@/lib/supabase/server';
import type { NewBooking } from '@/lib/supabase/types';

// Helper to temporarily bypass Supabase strict typing until database is set up
const supabaseClient = supabaseServer as unknown as { 
  from: (table: string) => {
    insert: (data: unknown[]) => { select: () => { single: () => Promise<{ data: unknown; error: unknown }> } };
    upsert: (data: unknown[], options: unknown) => { select: () => { single: () => Promise<{ data: unknown; error: unknown }> } };
  }
};

// Ensure Node.js runtime for server-side operations
export const runtime = 'nodejs';

// Booking request validation schema
const bookingSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Invalid email address').max(255),
  role: z.string().max(100).optional().nullable(),
  organization: z.string().max(100).optional().nullable(),
  timezone: z.string().max(50).optional().nullable(),
  slot_start: z.string().datetime().optional().nullable(),
  slot_end: z.string().datetime().optional().nullable(),
  external_event_id: z.string().max(255).optional().nullable(), // Cal.com/Calendly event ID
  notes: z.string().max(1000).optional().nullable(),
  // UTM tracking
  utm_source: z.string().max(100).optional().nullable(),
  utm_medium: z.string().max(100).optional().nullable(),
  utm_campaign: z.string().max(100).optional().nullable()
});

// Webhook validation for Cal.com/Calendly
const webhookSchema = z.object({
  event_type: z.string(),
  payload: z.object({
    event: z.object({
      id: z.string(),
      title: z.string(),
      start_time: z.string(),
      end_time: z.string(),
      invitee: z.object({
        name: z.string(),
        email: z.string(),
        timezone: z.string().optional()
      }),
      answers: z.array(z.object({
        question: z.string(),
        answer: z.string()
      })).optional()
    })
  })
});

// Rate limiting (same implementation as contact route)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 10; // 10 requests per 15 minutes (higher for booking)

  const current = rateLimitMap.get(ip);
  
  if (!current || now > current.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (current.count >= maxRequests) {
    return false;
  }
  
  current.count++;
  return true;
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return 'unknown';
}

/**
 * POST /api/booking
 * Handles booking requests and webhook data from Cal.com/Calendly
 */
export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    
    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many requests. Please try again later.' 
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const userAgent = request.headers.get('user-agent');
    
    // Determine if this is a webhook or direct booking request
    const isWebhook = userAgent?.includes('cal.com') || 
                     userAgent?.includes('calendly') ||
                     body.event_type;

    if (isWebhook) {
      return handleWebhook(body, clientIP);
    } else {
      return handleBookingRequest(body, clientIP);
    }

  } catch (error) {
    console.error('Booking API error:', error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid booking data provided.',
          errors: error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred while processing the booking.'
      },
      { status: 500 }
    );
  }
}

/**
 * Handle direct booking requests (optional feature)
 */
async function handleBookingRequest(body: unknown, clientIP: string) {
  const validatedData = bookingSchema.parse(body);

  const bookingData: NewBooking = {
    name: validatedData.name.trim(),
    email: validatedData.email.toLowerCase().trim(),
    role: validatedData.role?.trim() || null,
    organization: validatedData.organization?.trim() || null,
    timezone: validatedData.timezone || null,
    slot_start: validatedData.slot_start || null,
    slot_end: validatedData.slot_end || null,
    external_event_id: validatedData.external_event_id || null,
    status: 'requested',
    notes: validatedData.notes?.trim() || null,
    source: 'landing',
    utm_source: validatedData.utm_source || null,
    utm_medium: validatedData.utm_medium || null,
    utm_campaign: validatedData.utm_campaign || null,
    ip: clientIP
  };

  const { data, error } = await supabaseClient
    .from('bookings')
    .insert([bookingData])
    .select()
    .single();

  if (error) {
    console.error('Supabase booking error:', error);
    throw new Error('Failed to save booking request');
  }

  console.log('Booking request successful');

  return NextResponse.json({
    success: true,
    message: 'Booking request submitted successfully.',
    id: (data as { id?: string })?.id || 'unknown'
  });
}

/**
 * Handle webhooks from Cal.com/Calendly
 */
async function handleWebhook(body: unknown, clientIP: string) {
  const validatedWebhook = webhookSchema.parse(body);
  const { event } = validatedWebhook.payload;

  // Extract role and organization from custom questions if available
  const answers = event.answers || [];
  const roleAnswer = answers.find(a => a.question.toLowerCase().includes('role'));
  const orgAnswer = answers.find(a => a.question.toLowerCase().includes('organization') || a.question.toLowerCase().includes('school'));

  const bookingData: NewBooking = {
    name: event.invitee.name,
    email: event.invitee.email,
    role: roleAnswer?.answer || null,
    organization: orgAnswer?.answer || null,
    timezone: event.invitee.timezone || null,
    slot_start: event.start_time,
    slot_end: event.end_time,
    external_event_id: event.id,
    status: validatedWebhook.event_type === 'booking.cancelled' ? 'cancelled' : 'confirmed',
    notes: answers.map(a => `${a.question}: ${a.answer}`).join('\n') || null,
    source: 'webhook',
    ip: clientIP
  };

  // Upsert booking (update if exists, insert if new)
  const { error } = await supabaseClient
    .from('bookings')
    .upsert([bookingData], { 
      onConflict: 'external_event_id',
      ignoreDuplicates: false 
    })
    .select()
    .single();

  if (error) {
    console.error('Supabase webhook error:', error);
    throw new Error('Failed to process webhook');
  }

  console.log('Webhook processed:', {
    event_type: validatedWebhook.event_type,
    event_id: event.id,
    email: event.invitee.email
  });

  return NextResponse.json({
    success: true,
    message: 'Webhook processed successfully.'
  });
}

// Handle GET requests (return 405 Method Not Allowed)
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}
