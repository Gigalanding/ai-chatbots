import React from 'react';
import { GraduationCap } from 'lucide-react';
import { marketing } from '@/app/config/marketing';

/**
 * Institutions strip shown under the hero.
 * Names only: we do not use institutional logos.
 */
export function SocialProof() {
  return (
    <div className="text-center">
      <div className="text-sm text-gray-500 mb-5 font-medium">
        Built in Darmstadt with educators and students from
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {marketing.institutions.map((name) => (
          <div
            key={name}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 text-gray-700 text-sm font-semibold shadow-sm border border-gray-200/70"
          >
            <GraduationCap className="w-4 h-4 text-blue-600" aria-hidden="true" />
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
