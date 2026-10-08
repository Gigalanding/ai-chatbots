/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { marketing } from '@/app/config/marketing';

/**
 * Institutions strip shown under the hero.
 */
export function SocialProof() {
  return (
    <div className="institution-strip">
      <p>
        Working with educators, students and researchers from
      </p>

      <ul>
        {marketing.institutions.map((inst) => (
          <li
            key={inst.name}
          >
            <img
              src={inst.src}
              alt={inst.name}
              title={inst.name}
              style={{ height: inst.height }}
              className="object-contain"
              loading="eager"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
