import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'header' | 'footer' | 'main';
  spacing?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  background?: 'white' | 'gray' | 'blue' | 'transparent';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  withContainer?: boolean;
  children: React.ReactNode;
}

/**
 * Section component for consistent page layout and spacing
 * Optionally includes Container component for content width
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(({
  as = 'section',
  spacing = 'lg',
  background = 'transparent',
  containerSize = 'lg',
  withContainer = true,
  className,
  children,
  ...props
}, ref) => {
  const Component = as;

  // Spacing classes for vertical padding
  const spacingClasses = {
    none: '',
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16',
    lg: 'py-16 sm:py-20',
    xl: 'py-20 sm:py-24'
  };

  // Background color classes
  const backgroundClasses = {
    transparent: '',
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50'
  };

  const sectionClasses = cn(
    // Base section styles
    'relative',
    // Spacing
    spacingClasses[spacing],
    // Background
    backgroundClasses[background],
    className
  );

  const content = withContainer ? (
    <Container size={containerSize}>
      {children}
    </Container>
  ) : (
    children
  );

  return (
    <Component ref={ref} className={sectionClasses} {...props}>
      {content}
    </Component>
  );
});

Section.displayName = 'Section';
