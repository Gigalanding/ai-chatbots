import React from 'react';
import { cn } from '@/lib/utils';
import { marketing } from '@/app/config/marketing';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  href?: string;
}

/**
 * Logo component that can be used as a link or standalone element
 * Displays brand name with optional icon
 */
export const Logo = React.forwardRef<HTMLDivElement, LogoProps>(({
  size = 'md',
  showText = true,
  href,
  className,
  ...props
}, ref) => {
  // Size-specific classes
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const logoClasses = cn(
    'inline-flex items-center gap-2 font-bold text-gray-900',
    sizeClasses[size],
    className
  );

  // Logo icon (simple geometric shape for now - replace with actual logo)
  const LogoIcon = () => (
    <div className={cn(
      'rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold',
      size === 'sm' && 'w-6 h-6 text-xs',
      size === 'md' && 'w-8 h-8 text-sm', 
      size === 'lg' && 'w-10 h-10 text-base'
    )}>
      EW
    </div>
  );

  const content = (
    <div ref={ref} className={logoClasses} {...props}>
      <LogoIcon />
      {showText && (
        <span className="select-none">
          {marketing.brandName}
        </span>
      )}
    </div>
  );

  // Wrap in link if href provided
  if (href) {
    return (
      <a 
        href={href}
        className="no-underline hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
      >
        {content}
      </a>
    );
  }

  return content;
});

Logo.displayName = 'Logo';
