import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { Container, Logo } from '@/app/components/ui';
import { marketing } from '@/app/config/marketing';

/**
 * Footer component with company information, legal links, and contact details
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <Container>
        <div className="py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company info */}
            <div className="md:col-span-2">
              <Logo size="md" className="text-white mb-4" />
              <p className="text-gray-300 mb-4 leading-relaxed max-w-md">
                {marketing.brandTagline} We help busy educators streamline their workflows 
                with practical, no-nonsense solutions.
              </p>
              
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>{marketing.legal.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <a 
                    href={`mailto:${marketing.legal.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {marketing.legal.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a 
                    href="#pain-points" 
                    className="hover:text-white transition-colors"
                  >
                    Challenges We Solve
                  </a>
                </li>
                <li>
                  <a 
                    href="#how-it-works" 
                    className="hover:text-white transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a 
                    href="#testimonials" 
                    className="hover:text-white transition-colors"
                  >
                    Success Stories
                  </a>
                </li>
                <li>
                  <a 
                    href="#faq" 
                    className="hover:text-white transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal and support */}
            <div>
              <h4 className="font-semibold mb-4">Legal & Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a 
                    href="/privacy" 
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a 
                    href="/terms" 
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a 
                    href={`mailto:${marketing.legal.email}`} 
                    className="hover:text-white transition-colors"
                  >
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div>
              <p>
                © {currentYear} {marketing.legal.companyName}. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <span>Made for educators, by educators</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
