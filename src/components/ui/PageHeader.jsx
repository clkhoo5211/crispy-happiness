import React from 'react';
import PropTypes from 'prop-types';

/**
 * PageHeader - Reusable page header with title, description, and optional action
 * 
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} [props.description] - Page description/subtitle
 * @param {React.ReactNode} [props.action] - Optional action button/component
 */
export default function PageHeader({ title, description, action }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  action: PropTypes.node,
};
