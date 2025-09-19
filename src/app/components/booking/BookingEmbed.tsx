'use client';

import React from 'react';
import Cal from '@calcom/embed-react';
import { Calendar, ExternalLink } from 'lucide-react';
import { Button, Section, Container } from '@/app/components/ui';
import { marketing } from '@/app/config/marketing';

/**
 * Get the booking URL for fallback links
 */
function getBookingUrl(): string {
  const { provider } = marketing.booking;
  
  switch (provider) {
    case 'calcom':
      const username = process.env.NEXT_PUBLIC_CALCOM_USERNAME || marketing.booking.calcomUsername;
      const eventType = process.env.NEXT_PUBLIC_CALCOM_EVENT_TYPE || '';
      const calLink = eventType ? `${username}/${eventType}` : username;
      return `https://cal.com/${calLink}`;
    case 'calendly':
      return marketing.booking.calendlyUrl;
    case 'native':
      return '/contact'; // Fallback to contact form
    default:
      return '/contact';
  }
}

/**
 * Cal.com embed component using the official React package
 */
function CalComEmbed() {
  const username = process.env.NEXT_PUBLIC_CALCOM_USERNAME || marketing.booking.calcomUsername;
  const eventType = process.env.NEXT_PUBLIC_CALCOM_EVENT_TYPE || '';
  const calLink = eventType ? `${username}/${eventType}` : username;

  return (
    <div className="w-full">
      <Cal
        calLink={calLink}
        config={{
          layout: 'month_view',
          theme: 'light'
        }}
        style={{
          width: '100%',
          minHeight: '600px'
        }}
      />
      
      {/* Fallback link */}
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">
          Having trouble with the calendar?
        </p>
        <a 
          href={getBookingUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm underline"
        >
          <ExternalLink className="w-4 h-4" />
          Open calendar in new tab
        </a>
      </div>
    </div>
  );
}

/**
 * Calendly embed component (iframe-based)
 */
function CalendlyEmbed() {
  return (
    <div className="w-full">
      <iframe
        src={marketing.booking.calendlyUrl}
        width="100%"
        height="600"
        frameBorder="0"
        title="Schedule a meeting"
        className="rounded-lg"
      />
      
      {/* Fallback link */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 mb-2">
          Having trouble with the calendar?
        </p>
        <a 
          href={getBookingUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm underline"
        >
          <ExternalLink className="w-4 h-4" />
          Open calendar in new tab
        </a>
      </div>
    </div>
  );
}

/**
 * Native booking placeholder (for future custom implementation)
 */
function NativeBooking() {
  return (
    <div className="p-8 text-center bg-gray-50">
      <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Native booking coming soon
      </h3>
      <p className="text-gray-600 mb-6">
        We&apos;re building a custom booking experience. For now, please use the email option below.
      </p>
      <Button
        variant="primary"
        onClick={() => {
          window.location.href = `mailto:${marketing.legal.email}?subject=Discovery Call Request`;
        }}
      >
        Email us to schedule
      </Button>
    </div>
  );
}

/**
 * Main booking embed component with provider switching
 */
export function BookingEmbed() {
  const { provider } = marketing.booking;

  // Analytics tracking
  const trackBookingInteraction = React.useCallback((action: string) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('Booking Interaction', {
        props: { action, provider }
      });
    }
  }, [provider]);

  React.useEffect(() => {
    trackBookingInteraction('embed_loaded');
  }, [trackBookingInteraction]);

  return (
    <Section id="book" spacing="xl" background="white">
      <Container size="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {marketing.primaryCTA}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose a time that works for you. Our {marketing.booking.meetingLength}-minute discovery call 
            will help us understand your workflow challenges and share relevant solutions.
          </p>
          
          {/* Trust indicators */}
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full block" />
              {marketing.booking.meetingLength} minutes
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full block" />
              No sales pressure
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full block" />
              Tailored recommendations
            </span>
          </div>
        </div>

        {/* Booking embed based on provider */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {(() => {
              switch (provider) {
                case 'calcom':
                  return <CalComEmbed />;
                case 'calendly':
                  return <CalendlyEmbed />;
                case 'native':
                  return <NativeBooking />;
                default:
                  return <CalComEmbed />;
              }
            })()}
          </div>
          
          {/* Alternative contact option */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Prefer to reach out directly?
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                trackBookingInteraction('email_contact');
                window.location.href = `mailto:${marketing.legal.email}?subject=Discovery Call Request&body=Hi! I'd like to schedule a discovery call to discuss my workflow challenges.`;
              }}
            >
              Send us an email instead
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}