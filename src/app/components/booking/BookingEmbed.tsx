'use client';

import React, { useEffect, useRef, useState } from 'react';
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
            Choose a time that works for you. We&apos;ll send you a calendar invite with 
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

}

// Helper function to get booking URL
function getBookingUrl() {
  const username = process.env.NEXT_PUBLIC_CALCOM_USERNAME || marketing.booking.calcomUsername;
  const eventType = process.env.NEXT_PUBLIC_CALCOM_EVENT_TYPE || ''; // Optional specific event type
  const eventPath = eventType ? `/${eventType}` : '';
  
  switch (marketing.booking.provider) {
    case 'calcom':
      return `https://cal.com/${username}${eventPath}`;
    case 'calendly':
      return marketing.booking.calendlyUrl || '';
    default:
      return `https://cal.com/${username}${eventPath}`;
  }
}

/**
 * Cal.com embed component
 */
function CalComEmbed() {
  const calRef = useRef<HTMLDivElement>(null);
  const [embedLoaded, setEmbedLoaded] = useState(false);

  useEffect(() => {
    let script: HTMLScriptElement | null = null;
    
    // Check if Cal embed script is already loaded
    const existingScript = document.querySelector('script[src="https://app.cal.com/embed/embed.js"]');
    
    if (!existingScript) {
      // Load Cal.com embed script
      script = document.createElement('script');
      script.src = 'https://app.cal.com/embed/embed.js';
      script.async = true;
      script.onload = () => {
        setEmbedLoaded(true);
        // Initialize Cal embed after script loads
        if (typeof window !== 'undefined' && (window as unknown as { Cal?: (...args: unknown[]) => void }).Cal) {
          const calLink = `${process.env.NEXT_PUBLIC_CALCOM_USERNAME || marketing.booking.calcomUsername}`;
          const Cal = (window as unknown as { Cal: (...args: unknown[]) => void }).Cal;
          
          Cal('init', {
            origin: 'https://app.cal.com'
          });
          
          // Initialize inline embed
          if (calRef.current) {
            Cal('inline', {
              elementOrSelector: calRef.current,
              calLink: calLink,
              layout: 'month_view',
              theme: 'light'
            });
          }
        }
      };
      document.head.appendChild(script);
    } else {
      // Script already exists, try to initialize
      setEmbedLoaded(true);
      setTimeout(() => {
        if (typeof window !== 'undefined' && (window as unknown as { Cal?: (...args: unknown[]) => void }).Cal && calRef.current) {
          const calLink = `${process.env.NEXT_PUBLIC_CALCOM_USERNAME || marketing.booking.calcomUsername}`;
          const Cal = (window as unknown as { Cal: (...args: unknown[]) => void }).Cal;
          try {
            Cal('inline', {
              elementOrSelector: calRef.current,
              calLink: calLink,
              layout: 'month_view',
              theme: 'light'
            });
          } catch (error) {
            console.warn('Cal.com embed initialization failed:', error);
          }
        }
      }, 1000);
    }

    return () => {
      // Cleanup: remove script only if we added it
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full">
      {/* Cal.com embed container */}
      <div 
        ref={calRef}
        className="cal-embed"
        style={{ width: '100%', minHeight: '600px' }}
      >
        {/* Fallback content while loading */}
        {!embedLoaded && (
          <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300" style={{ minHeight: '600px' }}>
            <div className="text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Loading calendar...</p>
              <p className="text-sm text-gray-500">
                <a 
                  href={getBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Open calendar in new tab
                </a>
              </p>
            </div>
          </div>
        )}
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
        We&apos;re building a custom booking experience. For now, please use the email option below.
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
