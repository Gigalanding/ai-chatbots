import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button, Section, Container, Logo } from '@/app/components/ui';
import { marketing } from '@/app/config/marketing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Terms of Service - ${marketing.brandName}`,
  description: `Terms of service for ${marketing.brandName}. Learn about our service terms, user responsibilities, and legal agreements.`,
  robots: 'index, follow',
};

/**
 * Terms of Service page
 * Covers service terms, user responsibilities, and legal agreements
 */
export default function TermsOfServicePage() {
  const lastUpdated = "January 15, 2024"; // Update this date when terms change

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
              Terms of Service
            </h1>
            
            <p className="text-gray-600 mb-8">
              Last updated: {lastUpdated}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  1. Acceptance of Terms
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    By accessing and using the {marketing.brandName} website and services, 
                    you accept and agree to be bound by the terms and provision of this agreement.
                  </p>
                  <p>
                    If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. Description of Service
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    {marketing.brandName} provides workflow consultation and recommendations 
                    for educators and educational organizations. Our services include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Discovery calls to understand workflow challenges</li>
                    <li>Tailored recommendations for process improvement</li>
                    <li>Educational content and resources</li>
                    <li>Optional follow-up consultations</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. User Responsibilities
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>By using our services, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>Use our services for lawful purposes only</li>
                    <li>Respect our intellectual property rights</li>
                    <li>Not interfere with the proper functioning of our website</li>
                    <li>Maintain the confidentiality of any login credentials</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. Discovery Calls and Consultations
                </h2>
                <div className="space-y-4 text-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Scheduling and Attendance
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Discovery calls are typically 15-30 minutes in duration</li>
                    <li>You may reschedule or cancel with at least 24 hours notice</li>
                    <li>No-shows may forfeit the opportunity for a rescheduled call</li>
                  </ul>

                  <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">
                    Consultation Nature
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Discovery calls are informational and educational in nature</li>
                    <li>We provide general recommendations, not personalized advice</li>
                    <li>Implementation of suggestions is at your own discretion</li>
                    <li>We do not guarantee specific outcomes or results</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. Intellectual Property
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    All content on this website, including text, graphics, logos, images, 
                    and software, is the property of {marketing.legal.companyName} and 
                    protected by copyright and other intellectual property laws.
                  </p>
                  <p>
                    You may not reproduce, distribute, or create derivative works from 
                    our content without written permission.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Privacy and Data Protection
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Your privacy is important to us. Please review our{' '}
                    <a 
                      href="/privacy"
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      Privacy Policy
                    </a>
                    {' '}to understand how we collect, use, and protect your information.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. Disclaimers and Limitations
                </h2>
                <div className="space-y-4 text-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Service Availability
                  </h3>
                  <p>
                    We strive to maintain consistent service availability but do not 
                    guarantee uninterrupted access to our website or services.
                  </p>

                  <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">
                    Professional Advice
                  </h3>
                  <p>
                    Our recommendations are educational in nature and should not be 
                    considered as professional, legal, or financial advice.
                  </p>

                  <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">
                    Limitation of Liability
                  </h3>
                  <p>
                    To the fullest extent permitted by law, {marketing.legal.companyName} 
                    shall not be liable for any indirect, incidental, special, or 
                    consequential damages arising from your use of our services.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  8. Communication and Marketing
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    By providing your contact information, you consent to receive 
                    communications from us related to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Your specific inquiry or consultation</li>
                    <li>Follow-up recommendations and resources</li>
                    <li>Occasional updates about our services (with opt-out option)</li>
                  </ul>
                  <p>
                    You may unsubscribe from marketing communications at any time.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  9. Termination
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We reserve the right to terminate or suspend access to our services 
                    immediately, without prior notice, for conduct that we believe 
                    violates these Terms of Service or is harmful to other users.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  10. Changes to Terms
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We reserve the right to modify these terms at any time. Changes 
                    will be effective immediately upon posting to this page.
                  </p>
                  <p>
                    Your continued use of our services after changes constitutes 
                    acceptance of the new terms.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  11. Governing Law
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    These terms shall be governed by and construed in accordance with 
                    the laws of the jurisdiction where {marketing.legal.companyName} 
                    is incorporated, without regard to conflict of law principles.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  12. Contact Information
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    If you have any questions about these Terms of Service, please contact us:
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
