import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Accessible Input component with label, error states, and icons
 * Follows WCAG guidelines for form accessibility
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  id,
  required,
  ...props
}, ref) => {
  // Generate unique IDs for accessibility
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;

  // Input wrapper classes
  const wrapperClasses = cn(
    'relative',
    fullWidth && 'w-full'
  );

  // Input field classes
  const inputClasses = cn(
    // Base styles
    'block w-full rounded-lg border bg-white px-3 py-2.5',
    'text-sm text-gray-900 placeholder-gray-500',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-1',
    
    // Icon padding adjustments
    leftIcon && 'pl-10',
    rightIcon && 'pr-10',
    
    // State-dependent styles
    error ? [
      'border-red-300 focus:border-red-500 focus:ring-red-500'
    ] : [
      'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
      'hover:border-gray-400'
    ],
    
    // Disabled state
    'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
    
    className
  );

  // Icon positioning classes
  const iconClasses = 'absolute top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none';
  const leftIconClasses = cn(iconClasses, 'left-3');
  const rightIconClasses = cn(iconClasses, 'right-3');

  return (
    <div className={fullWidth ? 'w-full' : undefined}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
        </label>
      )}

      {/* Input wrapper */}
      <div className={wrapperClasses}>
        {/* Left icon */}
        {leftIcon && (
          <div className={leftIconClasses}>
            {leftIcon}
          </div>
        )}

        {/* Input field */}
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={cn(
            errorId && errorId,
            helperId && helperId
          ).trim() || undefined}
          required={required}
          {...props}
        />

        {/* Right icon */}
        {rightIcon && (
          <div className={rightIconClasses}>
            {rightIcon}
          </div>
        )}
      </div>

      {/* Helper text */}
      {helperText && !error && (
        <p id={helperId} className="mt-1 text-xs text-gray-600">
          {helperText}
        </p>
      )}

      {/* Error message */}
      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
