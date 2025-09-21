import { NextRequest, NextResponse } from 'next/server';
import { z, ZodError } from 'zod';
import nodemailer from 'nodemailer';

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
 * Send booking notification email
 */
async function sendBookingNotificationEmail(bookingData: {
  name: string;
  email: string;
  role: string;
  organization: string;
  timezone?: string | null;
  slotStart?: string;
  slotEnd?: string;
  eventId?: string;
  status?: string;
  notes?: string | null;
  source: string;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  ip: string;
  timestamp: string;
}) {
  // Create SMTP transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Format date/time if available
  const formatDateTime = (dateString: string | undefined) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const emailContent = `
${bookingData.status === 'cancelled' ? 'CANCELLED BOOKING' : 'NEW BOOKING'} - EduWorkflow Labs

Contact Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${bookingData.name}
Email: ${bookingData.email}
Role: ${bookingData.role}
Organization: ${bookingData.organization}
${bookingData.timezone ? `Timezone: ${bookingData.timezone}` : ''}

Meeting Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${bookingData.slotStart ? `Start: ${formatDateTime(bookingData.slotStart)}` : 'Time: Not specified'}
${bookingData.slotEnd ? `End: ${formatDateTime(bookingData.slotEnd)}` : ''}
${bookingData.eventId ? `Event ID: ${bookingData.eventId}` : ''}
Status: ${bookingData.status || 'Requested'}

${bookingData.notes ? `Additional Notes:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${bookingData.notes}\n` : ''}

Marketing Attribution:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UTM Source: ${bookingData.utmSource || 'Direct'}
UTM Medium: ${bookingData.utmMedium || 'N/A'}
UTM Campaign: ${bookingData.utmCampaign || 'N/A'}

Technical Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Source: ${bookingData.source}
IP Address: ${bookingData.ip}
Timestamp: ${new Date(bookingData.timestamp).toLocaleString()}

${bookingData.status !== 'cancelled' ? `Next Steps:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Add to calendar if not synced automatically
2. Prepare discovery questions based on their role
3. Send calendar invite with meeting details
4. Prepare tailored workflow recommendations` : ''}
  `;

  // Send email
  await transporter.sendMail({
    from: `"EduWorkflow Labs" <${process.env.SMTP_USER}>`,
    to: 'contact@eduworkflow.com',
    subject: `${bookingData.status === 'cancelled' ? 'CANCELLED' : 'NEW'} Booking: ${bookingData.name} (${bookingData.role})`,
    text: emailContent,
    replyTo: bookingData.email,
  });

  console.log(`Booking notification email sent to contact@eduworkflow.com (${bookingData.status || 'new'})`);
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
 * Handle direct booking requests (redirects to Cal.com)
 */
async function handleBookingRequest(body: unknown, clientIP: string) {
  const validatedData = bookingSchema.parse(body);

  // Send notification email about booking interest
  await sendBookingNotificationEmail({
    name: validatedData.name.trim(),
    email: validatedData.email.toLowerCase().trim(),
    role: validatedData.role?.trim() || 'Not specified',
    organization: validatedData.organization?.trim() || 'Not specified',
    notes: validatedData.notes?.trim() || null,
    source: 'direct_request',
    utmSource: validatedData.utm_source || null,
    utmMedium: validatedData.utm_medium || null,
    utmCampaign: validatedData.utm_campaign || null,
    ip: clientIP,
    timestamp: new Date().toISOString()
  });

  console.log('Booking request notification sent');

  return NextResponse.json({
    success: true,
    message: 'Thank you! Please use the Cal.com booking widget to schedule your call.',
    calcom_url: `https://cal.com/${process.env.CALCOM_USERNAME || 'eduworkflow'}/intro`
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

  // Send booking notification email
  await sendBookingNotificationEmail({
    name: event.invitee.name,
    email: event.invitee.email,
    role: roleAnswer?.answer || 'Not specified',
    organization: orgAnswer?.answer || 'Not specified',
    timezone: event.invitee.timezone || null,
    slotStart: event.start_time,
    slotEnd: event.end_time,
    eventId: event.id,
    status: validatedWebhook.event_type === 'booking.cancelled' ? 'cancelled' : 'confirmed',
    notes: answers.map(a => `${a.question}: ${a.answer}`).join('\n') || null,
    source: 'cal.com_webhook',
    ip: clientIP,
    timestamp: new Date().toISOString()
  });

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
