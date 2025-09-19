'use client';

import React from 'react';
import { Clock, Puzzle, Users, FileText, ArrowRight } from 'lucide-react';
import { Button, Section, Container } from '@/app/components/ui';
import { marketing } from '@/app/config/marketing';

// Icon mapping for dynamic icon selection
const iconMap = {
  Clock,
  Puzzle,
  Users,
  FileText
} as const;

/**
 * Pain Points section that resonates with target audience challenges
 * Builds emotional connection before presenting the solution
 */
export function PainPoints() {
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
    <Section spacing="xl" background="gray" id="pain-points">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Sound familiar?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            You became an educator to teach and inspire — not to wrestle with endless admin tasks 
            and disconnected tools that eat up your valuable time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {marketing.painPoints.map((pain, index) => {
            const IconComponent = iconMap[pain.icon as keyof typeof iconMap];
            
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-red-600" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {pain.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {pain.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA after pain points */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to simplify your workflow?
          </h3>
          <p className="text-gray-600 mb-6">
            Let&apos;s talk about practical solutions that actually work for busy educators.
          </p>
          
          <Button
            size="lg"
            variant="primary"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            onClick={() => {
              trackCTAClick('pain-points', 'mid-page');
              document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {marketing.primaryCTA}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
