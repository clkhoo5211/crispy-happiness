import React from 'react';
import PropTypes from 'prop-types';

/**
 * StatCard - Reusable statistics display card
 * 
 * @param {Object} props
 * @param {string} props.label - The label/title of the stat
 * @param {string|number} props.value - The main value to display
 * @param {string} [props.lastUpdate] - Optional last update timestamp
 * @param {string} [props.variant] - Color variant: 'default' | 'primary' | 'success' | 'warning'
 * @param {string} [props.className] - Additional CSS classes
 */
export default function StatCard({ label, value, lastUpdate, variant = 'default', className = '' }) {
  const variantClasses = {
    default: 'text-primary',
    primary: 'text-primary',
    success: 'text-green-600',
    warning: 'text-yellow-600',
  };

  return (
    <div className={`bg-card p-6 rounded-xl border shadow-sm ${className}`}>
      <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
      <h3 className={`text-2xl font-bold ${variantClasses[variant]}`}>{value}</h3>
      {lastUpdate && (
        <p className="text-xs text-muted-foreground mt-1">Last Update: {lastUpdate}</p>
      )}
    </div>
  );
}

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  lastUpdate: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning']),
  className: PropTypes.string,
};
