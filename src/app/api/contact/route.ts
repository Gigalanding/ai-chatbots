import { NextRequest, NextResponse } from 'next/server';
import { z, ZodError } from 'zod';
import nodemailer from 'nodemailer';

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
 * Send notification email with contact form data
 */
async function sendNotificationEmail(contactData: {
  name: string;
  email: string;
  role: string;
  organization: string;
  painPoint: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  ip: string;
  timestamp: string;
}) {
  // Create SMTP transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Email content
  const emailContent = `
New Contact Form Submission - EduWorkflow Labs

Contact Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${contactData.name}
Email: ${contactData.email}
Role: ${contactData.role}
Organization: ${contactData.organization}

Workflow Challenge:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${contactData.painPoint}

Marketing Attribution:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UTM Source: ${contactData.utmSource || 'Direct'}
UTM Medium: ${contactData.utmMedium || 'N/A'}
UTM Campaign: ${contactData.utmCampaign || 'N/A'}

Technical Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IP Address: ${contactData.ip}
Timestamp: ${new Date(contactData.timestamp).toLocaleString()}
Source: Landing Page

Next Steps:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Reply within 1 business day
2. Provide tailored workflow recommendations
3. Offer discovery call if appropriate
  `;

  // Send email
  await transporter.sendMail({
    from: `"EduWorkflow Labs" <${process.env.SMTP_USER}>`,
    to: 'contact@eduworkflow.com',
    subject: `New Lead: ${contactData.name} (${contactData.role})`,
    text: emailContent,
    replyTo: contactData.email,
  });

  console.log('Notification email sent to contact@eduworkflow.com');
}

/**
 * POST /api/contact
 * Handles contact form submissions with validation, rate limiting, and email notifications
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

    // Prepare contact data for email
    const contactData = {
      name: validatedData.name.trim(),
      email: validatedData.email.toLowerCase().trim(),
      role: validatedData.role.trim(),
      organization: validatedData.organization?.trim() || 'Not provided',
      painPoint: validatedData.painPoint.trim(),
      utmSource: validatedData.utm_source || null,
      utmMedium: validatedData.utm_medium || null,
      utmCampaign: validatedData.utm_campaign || null,
      ip: clientIP,
      timestamp: new Date().toISOString()
    };

    // Send notification email
    await sendNotificationEmail(contactData);

    // Log successful submission
    console.log('Contact submission successful:', contactData.email);

    return NextResponse.json({
      success: true,
      message: 'Thank you! We\'ll be in touch within 1 business day.'
    });

  } catch (error) {
    console.error('Contact API error:', error);

    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please check your form data and try again.',
          errors: error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
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
