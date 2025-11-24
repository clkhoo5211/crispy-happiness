import React from 'react';
import PropTypes from 'prop-types';

/**
 * EmptyState - Reusable empty state component
 * 
 * @param {Object} props
 * @param {string} props.message - Empty state message
 * @param {React.ReactNode} [props.icon] - Icon to display
 * @param {React.ReactNode} [props.action] - Action button/component
 */
export default function EmptyState({ message, icon, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
      <p className="text-muted-foreground mb-4">{message}</p>
      {action && <div>{action}</div>}
    </div>
  );
}

EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
  icon: PropTypes.node,
  action: PropTypes.node,
};
