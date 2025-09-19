'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button, Section, Container, Logo } from '@/app/components/ui';
import { marketing } from '@/app/config/marketing';

/**
 * Privacy Policy page
 * Covers data collection, usage, and user rights
 */
export default function PrivacyPolicyPage() {
  const lastUpdated = "January 15, 2024"; // Update this date when policy changes

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 py-6">
        <Container>
          <div className="flex items-center justify-between">
            <Logo href="/" size="md" />
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => window.history.back()}
            >
              Back
            </Button>
          </div>
        </Container>
      </header>

      {/* Main content */}
      <Section spacing="xl">
        <Container size="md">
          <div className="prose prose-gray max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            
            <p className="text-gray-600 mb-8">
              Last updated: {lastUpdated}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  1. Information We Collect
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We collect information you provide directly to us, such as when you:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Fill out our contact form</li>
                    <li>Book a discovery call</li>
                    <li>Send us an email</li>
                    <li>Use our website</li>
                  </ul>
                  
                  <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">
                    Personal Information
                  </h3>
                  <p>This may include:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Name and contact information (email, phone)</li>
                    <li>Professional information (role, organization)</li>
                    <li>Workflow challenges and pain points you share</li>
                    <li>Meeting preferences and availability</li>
                  </ul>

                  <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">
                    Usage Information
                  </h3>
                  <p>We automatically collect certain information about your use of our website:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>IP address and general location</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent</li>
                    <li>Referral source (how you found us)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. How We Use Your Information
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Respond to your inquiries and provide recommendations</li>
                    <li>Schedule and conduct discovery calls</li>
                    <li>Send follow-up communications about our services</li>
                    <li>Improve our website and services</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                  
                  <p className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <strong>We will never:</strong> Sell your information to third parties, 
                    send you unsolicited marketing emails, or share your data without your consent.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. Information Sharing
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>We only share your personal information in these limited circumstances:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>With your consent:</strong> When you explicitly agree to share information</li>
                    <li><strong>Service providers:</strong> Trusted third parties who help us operate our services (hosting, analytics, scheduling tools)</li>
                    <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
                  </ul>
                  
                  <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">
                    Third-Party Services
                  </h3>
                  <p>We use these trusted services to operate our website:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Supabase (database hosting)</li>
                    <li>Cal.com or Calendly (scheduling)</li>
                    <li>Plausible Analytics (privacy-focused analytics)</li>
                    <li>Vercel (website hosting)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. Data Security
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We implement appropriate technical and organizational measures to protect 
                    your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Encrypted data transmission (HTTPS)</li>
                    <li>Secure database storage</li>
                    <li>Limited access controls</li>
                    <li>Regular security updates</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. Your Rights
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                    <li><strong>Correct:</strong> Ask us to correct inaccurate information</li>
                    <li><strong>Delete:</strong> Request deletion of your personal information</li>
                    <li><strong>Opt-out:</strong> Unsubscribe from our communications at any time</li>
                  </ul>
                  
                  <p>
                    To exercise these rights, please contact us at{' '}
                    <a 
                      href={`mailto:${marketing.legal.email}`}
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      {marketing.legal.email}
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Analytics and Cookies
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We use Plausible Analytics, a privacy-focused analytics service that doesn&apos;t 
                    use cookies or track personal information across websites.
                  </p>
                  <p>
                    We may use essential cookies for website functionality, but we don&apos;t use 
                    tracking cookies for advertising purposes.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. Changes to This Policy
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We may update this privacy policy from time to time. We will notify you of 
                    any changes by posting the new policy on this page and updating the &quot;last updated&quot; date.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  8. Contact Us
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    If you have any questions about this privacy policy or our practices, please contact us:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p><strong>{marketing.legal.companyName}</strong></p>
                    <p>{marketing.legal.address}</p>
                    <p>
                      Email:{' '}
                      <a 
                        href={`mailto:${marketing.legal.email}`}
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        {marketing.legal.email}
                      </a>
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
