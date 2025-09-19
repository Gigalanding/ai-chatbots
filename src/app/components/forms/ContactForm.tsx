'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button, Input, Textarea, Section, Container } from '@/app/components/ui';
import { marketing } from '@/app/config/marketing';
import { z } from 'zod';

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().email('Please enter a valid email address'),
  role: z.string().min(2, 'Please enter your role').max(100, 'Role too long'),
  organization: z.string().max(100, 'Organization name too long').optional(),
  painPoint: z.string().min(10, 'Please describe your challenge in more detail').max(500, 'Description too long'),
  consent: z.boolean().refine(val => val === true, 'You must agree to be contacted'),
  // Honeypot field - should remain empty
  company: z.string().max(0, 'Bot detected').optional()
});

type ContactFormData = z.infer<typeof contactSchema>;

interface FormState {
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
}

/**
 * Contact form with validation, honeypot protection, and analytics
 * Collects lead information and stores in Supabase via API route
 */
export function ContactForm() {
  const [formData, setFormData] = useState<Partial<ContactFormData>>({
    consent: false,
    company: '' // Honeypot field
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [state, setState] = useState<FormState>({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  // Handle input changes
  const handleChange = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    try {
      contactSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setState(prev => ({ ...prev, isSubmitting: true, error: null }));

    try {
      // Add UTM parameters if available
      const urlParams = new URLSearchParams(window.location.search);
      const submitData = {
        ...formData,
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign')
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit form');
      }

      // Track successful submission
      if (typeof window !== 'undefined' && window.plausible) {
        window.plausible('form_submit', {
          props: {
            location: 'contact-form',
            role: formData.role || 'unknown'
          }
        });
      }

      setState(prev => ({ ...prev, isSubmitted: true }));

      // Redirect to thank you page after brief delay
      setTimeout(() => {
        window.location.href = '/thank-you';
      }, 2000);

    } catch (error) {
      console.error('Form submission error:', error);
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      }));
    } finally {
      setState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  // Success state
  if (state.isSubmitted) {
    return (
      <Section spacing="xl" background="gray" id="contact">
        <Container size="md">
          <div className="text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Thank you! We'll be in touch soon.
            </h2>
            <p className="text-gray-600 mb-6">
              We've received your information and will reply within 1 business day 
              with some initial thoughts and next steps.
            </p>
            <Button
              variant="primary"
              onClick={() => {
                document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Book your call now
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section spacing="xl" background="gray" id="contact">
      <Container size="md">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Share your workflow challenge
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tell us about your situation and we'll get back to you with 
            tailored suggestions within 1 business day.
          </p>
          
          {/* Trust microcopy */}
          <div className="mt-6 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full block" />
              Takes ~30 seconds
            </span>
            <span className="mx-3">•</span>
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full block" />
              No spam, ever
            </span>
            <span className="mx-3">•</span>
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full block" />
              1 business day reply
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          {/* Error alert */}
          {state.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-800">Submission failed</h4>
                <p className="text-red-700 text-sm mt-1">{state.error}</p>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Name field */}
            <Input
              label="Full name"
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              error={errors.name}
              required
              placeholder="Your full name"
              fullWidth
            />

            {/* Email field */}
            <Input
              label="Work email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              error={errors.email}
              required
              placeholder="your.email@school.edu"
              fullWidth
            />

            {/* Role field */}
            <Input
              label="Role"
              type="text"
              value={formData.role || ''}
              onChange={(e) => handleChange('role', e.target.value)}
              error={errors.role}
              required
              placeholder="e.g., Teacher, Professor, Principal"
              fullWidth
            />

            {/* Organization field */}
            <Input
              label="School/Organization"
              type="text"
              value={formData.organization || ''}
              onChange={(e) => handleChange('organization', e.target.value)}
              error={errors.organization}
              placeholder="Optional"
              fullWidth
            />
          </div>

          {/* Pain point field */}
          <div className="mt-6">
            <Textarea
              label="Biggest workflow challenge"
              value={formData.painPoint || ''}
              onChange={(e) => handleChange('painPoint', e.target.value)}
              error={errors.painPoint}
              required
              placeholder="Describe your main workflow frustration in 1-2 sentences. What takes up too much of your time?"
              rows={4}
              fullWidth
            />
          </div>

          {/* Honeypot field (hidden) */}
          <input
            type="text"
            name="company"
            value={formData.company || ''}
            onChange={(e) => handleChange('company', e.target.value)}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Consent checkbox */}
          <div className="mt-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consent || false}
                onChange={(e) => handleChange('consent', e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 leading-relaxed">
                I agree to be contacted about my workflow challenges and consent to the 
                storage of my information for this purpose. You can view our{' '}
                <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                  Privacy Policy
                </a>{' '}
                for details.
              </span>
            </label>
            {errors.consent && (
              <p className="mt-1 text-xs text-red-600">{errors.consent}</p>
            )}
          </div>

          {/* Submit button */}
          <div className="mt-8">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={state.isSubmitting}
              disabled={state.isSubmitting}
              rightIcon={!state.isSubmitting ? <Send className="w-5 h-5" /> : undefined}
              fullWidth
            >
              {state.isSubmitting ? 'Sending...' : 'Send my challenge'}
            </Button>
          </div>

          {/* Additional trust signals */}
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>
              We respect your privacy and will never share your information with third parties.
            </p>
          </div>
        </form>
      </Container>
    </Section>
  );
}
