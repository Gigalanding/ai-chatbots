import React from 'react';
import Image from 'next/image';
import { Upload, BookOpen, Sparkles, BarChart3, ArrowRight } from 'lucide-react';
import { Section, Container } from '@/app/components/ui';
import { marketing } from '@/app/config/marketing';

const iconMap = { Upload, BookOpen, Sparkles, BarChart3 } as const;

/**
 * Product section: the learning pipeline from course material to quizzes,
 * followed by real screenshots of the platform.
 */
export function Product() {
  const steps = marketing.productPipeline;

  return (
    <Section spacing="xl" id="product" className="bg-gradient-to-b from-white to-blue-50/60">
      <Container>
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-4">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            The product
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            From course material to tested knowledge
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            An AI learning platform that turns the books and scripts you already teach with
            into notes, quizzes and feedback, in four steps.
          </p>
        </div>

        {/* Pipeline */}
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap];
            const isLast = index === steps.length - 1;
            return (
              <li
                key={step.step}
                className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white flex items-center justify-center shadow-sm">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-semibold text-gray-400">
                    Step {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  {step.description}
                </p>

                {!isLast && (
                  <div className="hidden lg:flex absolute top-1/2 -right-[19px] -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-gray-200 items-center justify-center shadow-sm">
                    <ArrowRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {/* Screens */}
        <div className="grid gap-10 lg:grid-cols-2">
          {marketing.productScreens.map((screen) => (
            <figure key={screen.src} className="group">
              <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-lg group-hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-50 border-b border-gray-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
                  <span className="ml-3 text-xs text-gray-500 font-medium">{screen.title}</span>
                </div>
                <Image
                  src={screen.src}
                  alt={`${screen.title}: ${screen.caption}`}
                  width={screen.width}
                  height={screen.height}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="w-full h-auto"
                />
              </div>
              <figcaption className="mt-4 text-gray-600">
                <span className="font-semibold text-gray-900">{screen.title}.</span>{' '}
                {screen.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
