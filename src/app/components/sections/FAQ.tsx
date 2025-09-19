'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Section, Container } from '@/app/components/ui';
import { marketing } from '@/app/config/marketing';
import { cn } from '@/lib/utils';

/**
 * FAQ section addressing common objections and concerns
 * Expandable/collapsible format for better user experience
 */
export function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0])); // First item open by default

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <Section spacing="xl" background="gray" id="faq">
      <Container size="md">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We understand you&apos;re busy. Here are quick answers to the most common 
            questions about our discovery process.
          </p>
        </div>

        <div className="space-y-4">
          {marketing.faq.map((item, index) => {
            const isOpen = openItems.has(index);
            
            return (
              <div 
                key={index}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset transition-colors"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {item.q}
                  </span>
                  <span className="flex-shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </span>
                </button>
                
                <div 
                  id={`faq-answer-${index}`}
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="text-center mt-12 bg-white rounded-xl p-8 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-4">
            We&apos;re happy to chat about your specific situation and workflow challenges.
          </p>
          <p className="text-sm text-gray-500">
            Email us at{' '}
            <a 
              href={`mailto:${marketing.legal.email}`}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {marketing.legal.email}
            </a>
            {' '}or book a quick call below.
          </p>
        </div>
      </Container>
    </Section>
  );
}
