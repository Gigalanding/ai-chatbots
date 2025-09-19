'use client';

import React from 'react';
import { ArrowRight, Calendar, Users } from 'lucide-react';
import { Button, Section, Container } from '@/app/components/ui';
import { marketing, experimentVariants } from '@/app/config/marketing';
import { SocialProof } from './SocialProof';

/**
 * Hero section - the most critical conversion element
 * Features A/B testing, clear value proposition, and dual CTAs
 */
export function Hero() {
  // A/B testing logic (environment or URL parameter driven)
  const getVariant = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlVariant = urlParams.get('v');
      if (urlVariant === 'a' || urlVariant === 'b') {
        return urlVariant.toUpperCase() as 'A' | 'B';
      }
      
      // Check localStorage for persisted variant
      const stored = localStorage.getItem('experiment-variant');
      if (stored === 'A' || stored === 'B') {
        return stored;
      }
      
      // Randomly assign variant and persist
      const variant = Math.random() < 0.5 ? 'A' : 'B';
      localStorage.setItem('experiment-variant', variant);
      return variant;
    }
    return 'A'; // Default for SSR
  };

  const [variant] = React.useState(getVariant);

  // Track experiment view
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('experiment_view', { 
        props: { 
          variant,
          location: 'hero'
        }
      });
    }
  }, [variant]);

  const headline = experimentVariants.headline[variant];
  const ctaConfig = experimentVariants.cta[variant];

  // Analytics tracking for CTA clicks
  const trackCTAClick = (location: string, label: string) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('cta_click', {
        props: {
          location,
          label,
          variant
        }
      });
    }
  };

  return (
    <Section spacing="xl" className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-emerald-50" />
      
      <Container className="relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge/Trust signal */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm text-gray-600 border border-gray-200 mb-6">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Trusted by 500+ educators</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {headline}
          </h1>

          {/* Supporting tagline */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {marketing.brandTagline}
          </p>

          {/* Value bullets */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10 text-gray-700">
            {marketing.valueBullets.map((bullet, index) => (
              <div key={index} className="flex items-center justify-center sm:justify-start gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0 block" />
                <span className="text-sm sm:text-base">{bullet}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <Button
              size="lg"
              variant="primary"
              rightIcon={<Calendar className="w-5 h-5" />}
              className={ctaConfig.style === 'squared' ? 'rounded-md' : undefined}
              onClick={() => {
                trackCTAClick('hero', 'primary');
                document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {ctaConfig.text}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={() => {
                trackCTAClick('hero', 'secondary');
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {marketing.secondaryCTA}
            </Button>
          </div>

          {/* Trust microcopy */}
          <div className="text-sm text-gray-500 mb-12">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full block" />
              No sales pitch
            </span>
            <span className="mx-3">•</span>
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full block" />
              15–30 minutes
            </span>
            <span className="mx-3">•</span>
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full block" />
              Privacy-first
            </span>
          </div>

          {/* Social proof logos - immediately visible */}
          <SocialProof />
        </div>
      </Container>
    </Section>
  );
}

// Extend Window interface for Plausible
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
  }
}
