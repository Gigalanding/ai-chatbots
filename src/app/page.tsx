import React from 'react';
import { Metadata } from 'next';

// Import all landing page sections
import { Navigation, Footer, StickyCTA } from '@/app/components/layout';
import { 
  Hero, 
  PainPoints, 
  HowItWorks, 
  Testimonials, 
  FAQ 
} from '@/app/components/sections';
import { BookingEmbed } from '@/app/components/booking';
import { ContactForm } from '@/app/components/forms';
import { marketing } from '@/app/config/marketing';

// SEO metadata
export const metadata: Metadata = {
  title: `${marketing.brandName} - ${marketing.brandTagline}`,
  description: `${marketing.brandTagline} We help ${marketing.targetAudience} streamline their workflows with practical, no-nonsense solutions. Book a 15-minute discovery call today.`,
  keywords: 'education workflow, teacher productivity, automation, edtech, teaching efficiency',
  authors: [{ name: marketing.legal.companyName }],
  creator: marketing.legal.companyName,
  publisher: marketing.legal.companyName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${marketing.brandName} - ${marketing.brandTagline}`,
    description: `Streamline teaching workflows with practical solutions. Book a free 15-minute discovery call.`,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: marketing.brandName,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // Add this image to public folder
        width: 1200,
        height: 630,
        alt: `${marketing.brandName} - Streamline teaching workflows`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${marketing.brandName} - ${marketing.brandTagline}`,
    description: `Streamline teaching workflows with practical solutions. Book a free 15-minute discovery call.`,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these when you have them
    // google: 'your-google-site-verification',
    // yandex: 'your-yandex-verification',
  },
};

/**
 * Landing page component
 * High-conversion layout with clear value proposition and multiple CTAs
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        {/* Hero section - most important for conversion */}
        <Hero />

        {/* Pain points - emotional connection */}
        <PainPoints />

        {/* How it works - reducing friction */}
        <HowItWorks />

        {/* Social proof - testimonials */}
        <Testimonials />

        {/* Booking section - primary conversion point */}
        <BookingEmbed />

        {/* Contact form - secondary conversion */}
        <ContactForm />

        {/* FAQ - objection handling */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky CTA for mobile/desktop */}
      <StickyCTA />
    </div>
  );
}
