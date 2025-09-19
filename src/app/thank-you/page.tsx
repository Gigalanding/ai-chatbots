'use client';

import React from 'react';
import { CheckCircle, Calendar, ArrowLeft, Mail } from 'lucide-react';
import { Button, Section, Container, Logo } from '@/app/components/ui';
import { marketing } from '@/app/config/marketing';

/**
 * Thank you page shown after successful form submission
 * Includes confetti effect and clear next steps
 */
export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      {/* Header */}
      <header className="py-6">
        <Container>
          <Logo href="/" size="md" />
        </Container>
      </header>

      {/* Main content */}
      <Section spacing="xl" withContainer={false}>
        <Container size="md">
          <div className="text-center">
            {/* Success icon with animation */}
            <div className="relative mb-8">
              <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto animate-pulse" />
              {/* Confetti effect placeholder - could be enhanced with actual confetti library */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-emerald-100/50 animate-ping" />
              </div>
            </div>

            {/* Main message */}
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Thank you! 
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            We&apos;ve received your workflow challenge and will get back to you within 
            <strong className="text-emerald-600"> 1 business day</strong> with 
            tailored recommendations.
            </p>

            {/* What happens next */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8 text-left max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                What happens next?
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">We analyze your challenge</h3>
                    <p className="text-gray-600 text-sm">Our team reviews your specific workflow pain points and context.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">You get tailored suggestions</h3>
                    <p className="text-gray-600 text-sm">Receive practical recommendations you can implement immediately.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Optional follow-up call</h3>
                    <p className="text-gray-600 text-sm">If there&apos;s a good fit, we&apos;ll discuss next steps together.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA to book call */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Want to fast-track the conversation?
              </h3>
              <p className="text-gray-600 mb-6">
                Book a 15-minute discovery call and we can discuss your challenges in real-time.
              </p>
              
              <Button
                size="lg"
                variant="primary"
                rightIcon={<Calendar className="w-5 h-5" />}
                onClick={() => {
                  window.location.href = '/#book';
                }}
              >
                Book your call now
              </Button>
            </div>

            {/* Contact info */}
            <div className="text-center border-t border-gray-200 pt-8">
              <p className="text-gray-600 mb-4">
                Have questions? We&apos;re here to help.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={`mailto:${marketing.legal.email}`}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Mail className="w-4 h-4" />
                  {marketing.legal.email}
                </a>
                
                <span className="hidden sm:block text-gray-400">•</span>
                
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                  onClick={() => {
                    window.location.href = '/';
                  }}
                >
                  Back to homepage
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
