import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Section, Container } from '@/app/components/ui';
import { marketing } from '@/app/config/marketing';

/**
 * Testimonials section providing credible social proof
 * Features customer quotes, ratings, and professional titles
 */
export function Testimonials() {
  return (
    <Section spacing="xl" background="white" id="testimonials">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What educators are saying
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real feedback from busy teachers, professors, and administrators who've 
            streamlined their workflows with our practical approach.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {marketing.testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-8 h-8 text-gray-400" />
              </div>

              {/* Star rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, starIndex) => (
                  <Star 
                    key={starIndex}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed relative z-10">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="border-t border-gray-100 pt-4">
                <cite className="not-italic">
                  <div className="font-semibold text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {testimonial.title}
                  </div>
                </cite>
              </div>
            </div>
          ))}
        </div>

        {/* Trust metrics */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center bg-emerald-50 rounded-full px-6 py-3 border border-emerald-100">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full block" />
                <span className="text-gray-700">
                  <strong className="text-emerald-700">500+</strong> educators consulted
                </span>
              </div>
              
              <div className="w-px h-4 bg-gray-300" />
              
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full block" />
                <span className="text-gray-700">
                  <strong className="text-emerald-700">4.9/5</strong> satisfaction rating
                </span>
              </div>
              
              <div className="w-px h-4 bg-gray-300" />
              
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full block" />
                <span className="text-gray-700">
                  <strong className="text-emerald-700">85%</strong> implement our suggestions
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
