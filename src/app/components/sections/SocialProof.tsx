/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { marketing } from '@/app/config/marketing';

/**
 * Institutions strip shown under the hero.
 */
export function SocialProof() {
  return (
    <div className="text-center">
      <div className="text-sm text-gray-500 mb-5 font-medium">
        Working with educators, students and researchers from
      </div>

      <ul className="flex flex-wrap items-center justify-center gap-3 lg:-mx-20">
        {marketing.institutions.map((inst) => (
          <li
            key={inst.name}
            className="flex items-center justify-center h-[68px] px-4 bg-white rounded-xl border border-gray-200/80 shadow-sm"
          >
            <img
              src={inst.src}
              alt={inst.name}
              title={inst.name}
              style={{ height: inst.height }}
              className="w-auto max-w-[220px] object-contain"
              loading="eager"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
