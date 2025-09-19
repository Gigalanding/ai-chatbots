import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseServer } from '@/lib/supabase/server';

// Ensure Node.js runtime for server-side operations
export const runtime = 'nodejs';

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').max(255),
  role: z.string().min(2, 'Role is required').max(100),
  organization: z.string().max(100).optional().nullable(),
  painPoint: z.string().min(10, 'Please provide more details').max(500),
  consent: z.boolean().refine(val => val === true, 'Consent required'),
  // Honeypot field
  company: z.string().max(0, 'Bot detected').optional(),
  // UTM tracking
  utm_source: z.string().max(100).optional().nullable(),
  utm_medium: z.string().max(100).optional().nullable(),
  utm_campaign: z.string().max(100).optional().nullable()
});

// Rate limiting storage (in production, use Redis or external service)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Simple rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // 5 requests per 15 minutes

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

// Get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return request.ip || 'unknown';
}

/**
 * POST /api/contact
 * Handles contact form submissions with validation, rate limiting, and Supabase storage
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
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

    // Parse and validate request body
    const body = await request.json();
    
    // Validate with Zod schema
    const validatedData = contactSchema.parse(body);
    
    // Check honeypot field
    if (validatedData.company && validatedData.company.length > 0) {
      console.log('Bot detected:', { ip: clientIP, company: validatedData.company });
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid submission detected.' 
        },
        { status: 400 }
      );
    }

    // Prepare data for database insertion
    const contactData = {
      name: validatedData.name.trim(),
      email: validatedData.email.toLowerCase().trim(),
      role: validatedData.role.trim(),
      organization: validatedData.organization?.trim() || null,
      pain_point: validatedData.painPoint.trim(),
      source: 'landing',
      consent: validatedData.consent,
      utm_source: validatedData.utm_source || null,
      utm_medium: validatedData.utm_medium || null,
      utm_campaign: validatedData.utm_campaign || null,
      ip: clientIP
    };

    // Insert into Supabase
    const { data, error } = await supabaseServer
      .from('contacts')
      .insert([contactData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to save contact information. Please try again.' 
        },
        { status: 500 }
      );
    }

    // Log successful submission (remove in production or use proper logging)
    console.log('Contact submission successful:', {
      id: data.id,
      email: data.email,
      role: data.role,
      ip: clientIP
    });

    // TODO: Send notification email (optional)
    // await sendNotificationEmail(contactData);

    return NextResponse.json({
      success: true,
      message: 'Thank you! We\'ll be in touch within 1 business day.',
      id: data.id
    });

  } catch (error) {
    console.error('Contact API error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please check your form data and try again.',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again.'
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}
