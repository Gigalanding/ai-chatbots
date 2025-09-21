# EduWorkflow Labs - Setup Guide

## Overview
Your landing page now uses a simplified email-based system instead of Supabase:
- Contact form submissions → Email notifications to `contact@eduworkflow.com`
- Bookings handled entirely through Cal.com
- No database setup required

## 🚀 Quick Setup

### 1. Email Configuration (Required)
Create `.env.local` and configure email settings:

```bash
# Copy the template
cp env.example .env.local
```

**Option A: Gmail SMTP (Recommended for simplicity)**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password  # NOT your regular password
```

**Gmail App Password Setup:**
1. Enable 2FA on your Gmail account
2. Go to Google Account settings → Security → App passwords
3. Generate an app password for "Mail"
4. Use this app password in `SMTP_PASS`

### 2. Cal.com Configuration
```env
CALCOM_USERNAME=eduworkflow
NEXT_PUBLIC_CALCOM_USERNAME=eduworkflow
NEXT_PUBLIC_CALCOM_EVENT_TYPE=intro
```

### 3. Site Configuration
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
```

## 🔄 How It Works Now

### Contact Form Submissions
```
User fills form → API validates → Email sent to contact@eduworkflow.com
```

**Email includes:**
- Contact details (name, email, role, organization)
- Workflow challenge description
- Marketing attribution (UTM codes)
- Technical details (IP, timestamp)

### Booking Flow
```
User clicks "Book call" → Cal.com widget → Meeting scheduled → Webhook → Email notification
```

**Cal.com Webhook Setup:**
1. Go to Cal.com → Settings → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/booking`
3. Select events: `booking.created`, `booking.cancelled`

## 📧 Email Notifications You'll Receive

### Contact Form Submissions
```
Subject: New Lead: John Doe (Teacher)

Contact Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: John Doe
Email: john.doe@school.edu
Role: High School Teacher
Organization: Lincoln High School

Workflow Challenge:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Struggling with grading efficiency and parent communication...

Next Steps:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Reply within 1 business day
2. Provide tailored workflow recommendations
3. Offer discovery call if appropriate
```

### Booking Confirmations
```
Subject: NEW Booking: Sarah Chen (Professor)

Contact Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: Sarah Chen
Email: s.chen@university.edu
Role: Assistant Professor
Organization: State University

Meeting Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Start: Monday, October 28, 2024 at 2:00 PM EST
End: Monday, October 28, 2024 at 2:15 PM EST
Event ID: cal_abc123xyz
Status: Confirmed
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","role":"Teacher","painPoint":"Testing the form"}'
```

## 🔒 Security Features

- **Rate limiting**: 5 contact form submissions per 15 minutes per IP
- **Bot protection**: Hidden honeypot field
- **Email validation**: Zod schema validation
- **SMTP security**: Uses app passwords, not regular passwords

## 📊 Analytics

All button clicks are tracked via Plausible:
- CTA clicks with location and variant info
- Form submissions
- A/B testing support

## ⚡ Benefits of This Approach

✅ **No database management**
✅ **Simple email-based notifications**
✅ **Cal.com handles all booking complexity**
✅ **Lower hosting costs**
✅ **Easier deployment**
✅ **Direct email replies to leads**

## 🆘 Troubleshooting

### Email not sending?
1. Check SMTP credentials in `.env.local`
2. Verify Gmail app password (not regular password)
3. Check server logs: `npm run dev` and submit form
4. Test with a different email provider

### Cal.com webhook not working?
1. Verify webhook URL in Cal.com settings
2. Check `/api/booking` endpoint logs
3. Ensure site is publicly accessible for webhooks

### Contact form validation errors?
1. Check browser network tab for API responses
2. Verify required fields are filled
3. Check email format validity

## 🎯 Next Steps

1. Set up your email configuration
2. Configure Cal.com booking widget
3. Test the contact form
4. Deploy to production
5. Set up domain and SSL
6. Configure Cal.com webhook to production URL

Your landing page is now ready with a much simpler, email-based lead capture system!
