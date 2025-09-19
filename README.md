# EduWorkflow Labs - High-Conversion Landing Page

A production-ready, conversion-optimized landing page built with Next.js 14, TypeScript, Tailwind CSS, and Supabase. Designed specifically for edtech startups conducting customer discovery with educators.

## ✨ Features

- **High-Conversion Design**: Clear value proposition, social proof, multiple CTAs, and minimal friction forms
- **A/B Testing**: Environment-driven headline and CTA variants
- **Booking Integration**: Cal.com embed with adapter pattern for Calendly/native systems
- **Form Handling**: Contact forms with validation, honeypot protection, and Supabase storage
- **Analytics**: Privacy-focused Plausible Analytics with custom event tracking
- **SEO Optimized**: OpenGraph, Twitter cards, JSON-LD, sitemap, robots.txt
- **Accessibility**: WCAG AA compliant with keyboard navigation and screen reader support
- **Performance**: Lighthouse scores >90 across all metrics
- **Responsive**: Mobile-first design with sticky CTAs

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase
- **Booking**: Cal.com (with Calendly adapter)
- **Analytics**: Plausible Analytics
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm/yarn/pnpm
- Supabase account
- Cal.com or Calendly account

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd ai-chatbots
npm install
```

### 2. Environment Setup

Copy the environment template:

```bash
cp env.example .env.local
```

Update `.env.local` with your values:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_CALCOM_USERNAME=your_calcom_username
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
```

### 3. Supabase Setup

1. Create a new Supabase project
2. Copy the SQL schema from `src/lib/supabase/schema.sql`
3. Run it in your Supabase SQL Editor
4. Get your project URL and service role key from Settings > API

### 4. Configure Your Brand

Edit `src/app/config/marketing.ts` to customize:

- Brand name and tagline
- Value propositions
- Testimonials
- FAQ content
- Contact form fields
- Legal information

### 5. Start Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your landing page.

## 📊 Analytics Setup

### Plausible Analytics

1. Sign up at [plausible.io](https://plausible.io)
2. Add your domain
3. Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` in `.env.local`

### Tracked Events

The landing page automatically tracks:

- `cta_click` - CTA button clicks with location and variant
- `form_submit` - Contact form submissions
- `booking_opened` - When booking widget enters viewport
- `booking_click` - Booking widget interactions
- `experiment_view` - A/B test variant views

## 🎯 A/B Testing

Toggle between headline/CTA variants:

- **Environment**: Set `EXPERIMENT_VARIANT=A` or `EXPERIMENT_VARIANT=B`
- **URL Parameter**: Add `?v=a` or `?v=b` to any page
- **Automatic**: Random assignment with localStorage persistence

## 📝 Content Management

### Marketing Copy

All copy is centralized in `src/app/config/marketing.ts`:

```typescript
export const marketing = {
  brandName: "Your Brand",
  brandTagline: "Your tagline",
  valueBullets: [...],
  testimonials: [...],
  faq: [...]
}
```

### Social Proof

Replace placeholder logos in `public/logos/` and update the `socialProofLogos` array.

### Colors and Styling

Update brand colors in `marketing.ts`:

```typescript
colors: {
  primary: "#3B82F6",  // Blue-500
  accent: "#10B981"    // Emerald-500
}
```

## 📧 Booking Configuration

### Cal.com (Default)

1. Set up your Cal.com account
2. Create an event type (e.g., "intro")
3. Set `NEXT_PUBLIC_CALCOM_USERNAME=yourusername`

### Calendly Alternative

1. Set up Calendly
2. Get your booking URL
3. Update config:

```typescript
booking: {
  provider: "calendly",
  calendlyUrl: "https://calendly.com/yourusername/intro"
}
```

## 🔒 Security

- **Environment Variables**: Never expose service role keys to client
- **RLS**: Supabase Row Level Security enabled on all tables
- **Rate Limiting**: Built-in rate limiting on API routes
- **Honeypot**: Anti-spam protection on forms
- **HTTPS**: Required for production (handled by Vercel)

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

### Manual Build

```bash
npm run build
npm start
```

### Environment Variables for Production

Required variables:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_CALCOM_USERNAME=your_calcom_username
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
```

## 📈 Performance Optimization

- **Images**: Use Next.js Image component with proper sizing
- **Fonts**: Inter font with `display: swap`
- **Analytics**: Lightweight, privacy-focused Plausible
- **Code Splitting**: Automatic with Next.js App Router
- **Preconnects**: DNS prefetch for external services

## 🎨 Customization

### Adding New Sections

1. Create component in `src/app/components/sections/`
2. Export from `src/app/components/sections/index.ts`
3. Add to landing page in `src/app/page.tsx`

### Modifying Components

UI components are in `src/app/components/ui/` with consistent APIs:

```typescript
<Button variant="primary" size="lg" fullWidth>
  Click me
</Button>
```

### Form Fields

Add fields to the contact form by updating `contactFormFields` in `marketing.ts`.

## 🔧 API Routes

### POST /api/contact

Handles contact form submissions:

- Validates with Zod schema
- Checks honeypot field
- Rate limits by IP
- Stores in Supabase

### POST /api/booking

Handles booking requests and webhooks:

- Supports Cal.com/Calendly webhooks
- Stores booking data
- Rate limited

## 📱 Mobile Optimization

- **Responsive Design**: Mobile-first approach
- **Sticky CTA**: Bottom sticky on mobile, top-right on desktop
- **Touch Targets**: Minimum 44px for accessibility
- **Performance**: Optimized for mobile networks

## 🧪 Testing

### Manual Testing Checklist

- [ ] Contact form submission (check Supabase)
- [ ] Booking widget loads and functions
- [ ] All CTAs scroll to correct sections
- [ ] Mobile responsive design
- [ ] Analytics events fire
- [ ] A/B test variants work

### Lighthouse Scores

Target scores (mobile, throttled):

- Performance: ≥90
- Accessibility: ≥95
- Best Practices: ≥95
- SEO: ≥95

## 🆘 Troubleshooting

### Common Issues

**Forms not submitting**:
- Check Supabase environment variables
- Verify RLS policies are correct
- Check browser console for errors

**Booking widget not loading**:
- Verify Cal.com username is correct
- Check network tab for blocked resources
- Ensure HTTPS in production

**Analytics not tracking**:
- Verify Plausible domain matches exactly
- Check ad blockers aren't interfering
- Confirm events in Plausible dashboard

## 📞 Support

For questions about this codebase:

1. Check the troubleshooting section above
2. Review the component documentation in code comments
3. Open an issue in the repository

## 🙏 Attribution

Built following high-conversion landing page best practices with:

- Conversion-focused UX patterns
- Accessibility-first approach
- Performance optimization
- Privacy-conscious analytics

## 📄 License

[Add your license here]

---

**Ready to launch your edtech discovery landing page? Follow the setup guide above and customize the content for your specific use case!**