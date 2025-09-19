import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
}

/**
 * Container component for consistent content width and spacing
 * Provides responsive max-widths and horizontal centering
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(({
  size = 'lg',
  className,
  children,
  ...props
}, ref) => {
  // Size-specific max-width classes
  const sizeClasses = {
    sm: 'max-w-2xl',     // ~672px
    md: 'max-w-4xl',     // ~896px  
    lg: 'max-w-6xl',     // ~1152px
    xl: 'max-w-7xl',     // ~1280px
    full: 'max-w-none'   // No max-width constraint
  };

  const containerClasses = cn(
    // Base container styles
    'mx-auto px-4 sm:px-6 lg:px-8',
    // Size-specific max-width
    sizeClasses[size],
    className
  );

  return (
    <div ref={ref} className={containerClasses} {...props}>
      {children}
    </div>
  );
});

Container.displayName = 'Container';
