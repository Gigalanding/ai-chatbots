'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, X } from 'lucide-react';
import { Button } from '@/app/components/ui';
import { marketing, experimentVariants } from '@/app/config/marketing';
import { cn } from '@/lib/utils';

/**
 * Sticky CTA component that appears on mobile bottom and desktop top-right
 * Tracks analytics and supports A/B testing variants
 */
export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [variant, setVariant] = useState<'A' | 'B'>('A');

  // Show/hide based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldShow = scrollY > 300; // Show after scrolling 300px
      
      if (shouldShow && !isDismissed) {
        setIsVisible(true);
      } else if (!shouldShow) {
        setIsVisible(false);
      }
    };

    // Get A/B test variant
    const getVariant = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const urlVariant = urlParams.get('v');
      if (urlVariant === 'a' || urlVariant === 'b') {
        return urlVariant.toUpperCase() as 'A' | 'B';
      }
      
      const stored = localStorage.getItem('experiment-variant');
      if (stored === 'A' || stored === 'B') {
        return stored;
      }
      
      return 'A';
    };

    setVariant(getVariant());

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  // Analytics tracking
  const trackCTAClick = (location: string) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('cta_click', {
        props: {
          location,
          label: 'sticky',
          variant
        }
      });
    }
  };

  const trackDismiss = () => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('sticky_cta_dismissed', {
        props: { variant }
      });
    }
  };

  const handleBookingClick = () => {
    trackCTAClick('sticky');
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    trackDismiss();
  };

  const ctaConfig = experimentVariants.cta[variant];

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <>
      {/* Mobile sticky CTA (bottom) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-white border-t border-gray-200 shadow-lg p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="md"
              rightIcon={<Calendar className="w-4 h-4" />}
              onClick={handleBookingClick}
              className={cn(
                'flex-1',
                ctaConfig.style === 'squared' ? 'rounded-md' : ''
              )}
            >
              {ctaConfig.text}
            </Button>
            
            <button
              onClick={handleDismiss}
              className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sticky CTA (top-right) */}
      <div className="fixed top-4 right-4 z-50 hidden md:block">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">
                Ready to streamline?
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                15-min discovery call
              </p>
            </div>
            
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <Button
            variant="primary"
            size="sm"
            rightIcon={<Calendar className="w-4 h-4" />}
            onClick={handleBookingClick}
            fullWidth
            className={ctaConfig.style === 'squared' ? 'rounded-md' : ''}
          >
            Book now
          </Button>
        </div>
      </div>
    </>
  );
}
