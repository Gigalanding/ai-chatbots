import React from 'react';
import { marketing } from '@/app/config/marketing';

/**
 * Social proof component displaying trusted partner logos
 * Features smooth left-to-right scrolling animation for better visual appeal
 * Positioned prominently near CTAs for maximum conversion impact
 */
export function SocialProof() {
  // Duplicate logos for seamless infinite scroll
  const logos = [...marketing.socialProofLogos, ...marketing.socialProofLogos];

  return (
    <div className="text-center">
      <div className="text-sm text-gray-500 mb-6 font-medium">
        Trusted by educators at leading institutions
      </div>
      
      {/* Scrolling container with gradient masks */}
      <div className="relative overflow-hidden">
        {/* Left gradient mask */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        
        {/* Right gradient mask */}
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling logos container */}
        <div className="flex items-center gap-8 sm:gap-12 animate-scroll">
          {logos.map((logo, index) => (
            <div 
              key={`${logo.alt}-${index}`}
              className="flex items-center justify-center h-8 sm:h-10 flex-shrink-0 group"
            >
              {/* Enhanced logo styling with hover effects */}
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-50 hover:to-emerald-50 rounded-lg px-4 py-2 text-gray-600 hover:text-gray-700 text-xs sm:text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200/50 hover:border-blue-200/50">
                {logo.alt}
              </div>
              
              {/* Uncomment when you have actual logo files
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                className="max-h-8 sm:max-h-10 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-90"
              />
              */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
