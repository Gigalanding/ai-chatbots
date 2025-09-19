'use client';

import React from 'react';
import { MessageSquare, Phone, FileCheck, ArrowRight } from 'lucide-react';
import { Button, Section, Container } from '@/app/components/ui';
import { marketing } from '@/app/config/marketing';

// Icon mapping for dynamic icon selection
const iconMap = {
  MessageSquare,
  Phone,
  FileCheck
} as const;

/**
 * How It Works section explaining the simple 3-step process
 * Reduces friction by showing how easy and low-commitment it is
 */
export function HowItWorks() {
  // Analytics tracking for CTA clicks
  const trackCTAClick = (location: string, label: string) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('cta_click', {
        props: {
          location,
          label
        }
      });
    }
  };

  return (
    <Section spacing="xl" id="how-it-works">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A simple, no-pressure process designed to respect your time and deliver immediate value.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {marketing.howItWorks.map((step, index) => {
            const IconComponent = iconMap[step.icon as keyof typeof iconMap];
            const isLastStep = index === marketing.howItWorks.length - 1;
            
            return (
              <div key={index} className="relative">
                {/* Step number and icon */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg mr-4">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                </div>

                {/* Connecting arrow for desktop */}
                {!isLastStep && (
                  <div className="hidden md:block absolute top-6 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-gray-300 mx-auto" />
                  </div>
                )}

                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline/Process visualization for mobile */}
        <div className="md:hidden flex justify-center mb-12">
          <div className="flex items-center space-x-2">
            {marketing.howItWorks.map((_, index) => (
              <React.Fragment key={index}>
                <div className="w-3 h-3 bg-blue-600 rounded-full" />
                {index < marketing.howItWorks.length - 1 && (
                  <div className="w-8 h-0.5 bg-gray-300" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* CTA after process explanation */}
        <div className="text-center bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join hundreds of educators who&apos;ve streamlined their workflows. 
            The first step takes less than 30 seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="primary"
              rightIcon={<Phone className="w-5 h-5" />}
              onClick={() => {
                trackCTAClick('how-it-works', 'primary');
                document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {marketing.primaryCTA}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              rightIcon={<MessageSquare className="w-5 h-5" />}
              onClick={() => {
                trackCTAClick('how-it-works', 'secondary');
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {marketing.secondaryCTA}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
