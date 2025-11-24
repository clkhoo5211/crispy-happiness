import React from 'react';
import PropTypes from 'prop-types';

/**
 * FormField - Reusable form input field with label
 * 
 * @param {Object} props
 * @param {string} props.label - Field label
 * @param {string} [props.type] - Input type (text, email, password, etc.)
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.value] - Input value
 * @param {Function} [props.onChange] - Change handler
 * @param {boolean} [props.required] - Whether field is required
 * @param {string} [props.error] - Error message
 * @param {React.ReactNode} [props.children] - For custom input (select, textarea)
 */
export default function FormField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  error,
  children,
  ...rest
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children || (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={`w-full px-3 py-2 rounded-lg border bg-background ${error ? 'border-red-500' : ''
            }`}
          {...rest}
        />
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  error: PropTypes.string,
  children: PropTypes.node,
};
