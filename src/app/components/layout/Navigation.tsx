'use client';

import React, { useState } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { Button, Container, Logo } from '@/app/components/ui';
import { marketing } from '@/app/config/marketing';
import { cn } from '@/lib/utils';

/**
 * Navigation component with mobile menu and sticky positioning
 */
export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items
  const navItems = [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Success stories', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' }
  ];

  // Analytics tracking
  const trackNavClick = (label: string) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('nav_click', {
        props: { label }
      });
    }
  };

  const trackCTAClick = () => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('cta_click', {
        props: {
          location: 'nav',
          label: 'header'
        }
      });
    }
  };

  const handleBookingClick = () => {
    trackCTAClick();
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (href: string, label: string) => {
    trackNavClick(label);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Logo href="#" size="md" />

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href, item.label)}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-2 py-1 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            
            <Button
              variant="primary"
              size="md"
              rightIcon={<Calendar className="w-4 h-4" />}
              onClick={handleBookingClick}
            >
              {marketing.primaryCTA}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        <div className={cn(
          'md:hidden overflow-hidden transition-all duration-300',
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}>
          <div className="py-4 border-t border-gray-100">
            <div className="space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href, item.label)}
                  className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors font-medium py-2 px-4 rounded hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="px-4 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<Calendar className="w-4 h-4" />}
                  onClick={handleBookingClick}
                  fullWidth
                >
                  {marketing.primaryCTA}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
