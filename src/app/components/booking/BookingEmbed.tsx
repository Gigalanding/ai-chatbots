'use client';

import React, { useEffect, useRef } from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import { Button, Section, Container } from '@/app/components/ui';
import { marketing } from '@/app/config/marketing';

/**
 * Booking embed component with adapter pattern for different providers
 * Supports Cal.com, Calendly, and future native booking system
 */
export function BookingEmbed() {
  const calRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  // Track when booking widget enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          if (typeof window !== 'undefined' && window.plausible) {
            window.plausible('booking_opened', {
              props: {
                provider: marketing.booking.provider
              }
            });
          }
        }
      },
      { threshold: 0.1 }
    );

    if (calRef.current) {
      observer.observe(calRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Analytics tracking for booking interactions
  const trackBookingClick = (action: string) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('booking_click', {
        props: {
          action,
          provider: marketing.booking.provider
        }
      });
    }
  };

  return (
    <Section spacing="xl" background="white" id="book">
      <Container size="md">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Book your discovery call
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Choose a time that works for you. We'll send you a calendar invite with 
            a secure video link and a quick prep form.
          </p>
          
          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full block" />
              <span>15-minute commitment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full block" />
              <span>No prep required</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full block" />
              <span>Instant confirmation</span>
            </div>
          </div>
        </div>

        {/* Booking embed container */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {renderBookingProvider()}
        </div>

        {/* Fallback/alternative options */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Having trouble with the calendar? No problem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="md"
              leftIcon={<Calendar className="w-4 h-4" />}
              onClick={() => {
                trackBookingClick('email_fallback');
                window.location.href = `mailto:${marketing.legal.email}?subject=Discovery Call Request&body=Hi! I'd like to schedule a discovery call. My availability is...`;
              }}
            >
              Email us instead
            </Button>
            <Button
              variant="ghost"
              size="md"
              rightIcon={<ExternalLink className="w-4 h-4" />}
              onClick={() => {
                trackBookingClick('external_link');
                window.open(getBookingUrl(), '_blank');
              }}
            >
              Open in new tab
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );

  // Render different booking providers based on configuration
  function renderBookingProvider() {
    switch (marketing.booking.provider) {
      case 'calcom':
        return <CalComEmbed />;
      case 'calendly':
        return <CalendlyEmbed />;
      case 'native':
        return <NativeBooking />;
      default:
        return <CalComEmbed />; // Default fallback
    }
  }

  function getBookingUrl() {
    switch (marketing.booking.provider) {
      case 'calcom':
        return `https://cal.com/${marketing.booking.calcomUsername}/intro`;
      case 'calendly':
        return marketing.booking.calendlyUrl || '';
      default:
        return `https://cal.com/${marketing.booking.calcomUsername}/intro`;
    }
  }
}

/**
 * Cal.com embed component
 */
function CalComEmbed() {
  const calRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement('script');
    script.src = 'https://app.cal.com/embed/embed.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://app.cal.com/embed/embed.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const calLink = `${marketing.booking.calcomUsername}/intro`;

  return (
    <div 
      ref={calRef}
      className="cal-embed"
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view","theme":"light"}'
      style={{ width: '100%', height: '600px', overflow: 'scroll' }}
    >
      {/* Fallback content while loading */}
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Loading calendar...</p>
          <p className="text-sm text-gray-500 mt-2">
            <a 
              href={`https://cal.com/${calLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              Open calendar in new tab
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Calendly embed component
 */
function CalendlyEmbed() {
  useEffect(() => {
    // Load Calendly embed script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div 
      className="calendly-inline-widget"
      data-url={marketing.booking.calendlyUrl}
      style={{ minWidth: '320px', height: '600px' }}
    >
      {/* Fallback content */}
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Loading calendar...</p>
          <p className="text-sm text-gray-500 mt-2">
            <a 
              href={marketing.booking.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              Open calendar in new tab
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Native booking component (placeholder for future implementation)
 */
function NativeBooking() {
  return (
    <div className="p-8 text-center bg-gray-50">
      <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Native booking coming soon
      </h3>
      <p className="text-gray-600 mb-6">
        We're building a custom booking experience. For now, please use the email option below.
      </p>
      <Button
        variant="primary"
        onClick={() => {
          window.location.href = `mailto:${marketing.legal.email}?subject=Discovery Call Request`;
        }}
      >
        Email to schedule
      </Button>
    </div>
  );
}
