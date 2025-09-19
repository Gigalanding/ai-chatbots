import React from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

/**
 * Accessible Textarea component with label, error states, and auto-resize
 * Follows WCAG guidelines for form accessibility
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  helperText,
  fullWidth = false,
  resize = 'vertical',
  className,
  id,
  required,
  rows = 3,
  ...props
}, ref) => {
  // Generate unique IDs for accessibility
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${textareaId}-error` : undefined;
  const helperId = helperText ? `${textareaId}-helper` : undefined;

  // Textarea classes
  const textareaClasses = cn(
    // Base styles
    'block w-full rounded-lg border bg-white px-3 py-2.5',
    'text-sm text-gray-900 placeholder-gray-500',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-1',
    
    // Resize behavior
    resize === 'none' && 'resize-none',
    resize === 'vertical' && 'resize-y',
    resize === 'horizontal' && 'resize-x',
    resize === 'both' && 'resize',
    
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

  return (
    <div className={fullWidth ? 'w-full' : undefined}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
        </label>
      )}

      {/* Textarea field */}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={textareaClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={cn(
          errorId && errorId,
          helperId && helperId
        ).trim() || undefined}
        required={required}
        {...props}
      />

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

Textarea.displayName = 'Textarea';
