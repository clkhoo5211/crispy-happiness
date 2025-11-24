import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button - Reusable button component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} [props.onClick] - Click handler
 * @param {string} [props.variant] - Style variant: 'primary' | 'secondary' | 'danger' | 'ghost'
 * @param {string} [props.size] - Size: 'sm' | 'md' | 'lg'
 * @param {React.ReactNode} [props.icon] - Icon component
 * @param {boolean} [props.disabled] - Disabled state
 * @param {string} [props.className] - Additional CSS classes
 */
export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  className = '',
  ...rest
}) {
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'border hover:bg-accent',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'hover:bg-accent',
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center gap-2 rounded-lg font-medium transition-colors
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
