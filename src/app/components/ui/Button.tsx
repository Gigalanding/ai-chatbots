import React from 'react';
import { cn } from '@/lib/utils';

// Button component variants and sizes
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

/**
 * Accessible Button component with multiple variants and states
 * Supports loading states, icons, and keyboard navigation
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className,
  children,
  ...props
}, ref) => {
  // Base styles that apply to all buttons
  const baseStyles = [
    'inline-flex items-center justify-center',
    'font-medium transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'relative'
  ];

  // Variant-specific styles
  const variantStyles = {
    primary: [
      'bg-blue-600 text-white shadow-sm',
      'hover:bg-blue-700 focus-visible:ring-blue-500',
      'disabled:hover:bg-blue-600'
    ],
    secondary: [
      'bg-emerald-600 text-white shadow-sm',
      'hover:bg-emerald-700 focus-visible:ring-emerald-500',
      'disabled:hover:bg-emerald-600'
    ],
    outline: [
      'border-2 border-gray-300 bg-white text-gray-700',
      'hover:bg-gray-50 hover:border-gray-400 focus-visible:ring-gray-500',
      'disabled:hover:bg-white disabled:hover:border-gray-300'
    ],
    ghost: [
      'text-gray-700 bg-transparent',
      'hover:bg-gray-100 focus-visible:ring-gray-500',
      'disabled:hover:bg-transparent'
    ]
  };

  // Size-specific styles
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm rounded-md gap-1.5',
    md: 'px-4 py-2.5 text-sm rounded-lg gap-2',
    lg: 'px-6 py-3 text-base rounded-lg gap-2.5'
  };

  // Combine all styles
  const buttonClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    className
  );

  return (
    <button
      ref={ref}
      className={buttonClasses}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      {...props}
    >
      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        </div>
      )}
      
      {/* Content container - hidden when loading */}
      <div className={cn('flex items-center', isLoading && 'opacity-0')}>
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </div>
    </button>
  );
});

Button.displayName = 'Button';
