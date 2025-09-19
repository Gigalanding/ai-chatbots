import React from 'react';
import { marketing } from '@/app/config/marketing';

/**
 * Social proof component displaying trusted partner logos
 * Positioned prominently near CTAs for maximum conversion impact
 */
export function SocialProof() {
  return (
    <div className="text-center">
      <div className="text-sm text-gray-500 mb-6 font-medium">
        Trusted by educators at leading institutions
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60 hover:opacity-80 transition-opacity">
        {marketing.socialProofLogos.map((logo, index) => (
          <div 
            key={index}
            className="flex items-center justify-center h-8 sm:h-10"
          >
            {/* Placeholder logo - replace with actual SVG logos */}
            <div className="bg-gray-200 rounded px-4 py-2 text-gray-600 text-xs sm:text-sm font-medium">
              {logo.alt}
            </div>
            
            {/* Uncomment when you have actual logo files
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={40}
              className="max-h-8 sm:max-h-10 w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
            />
            */}
          </div>
        ))}
      </div>
    </div>
  );
}
