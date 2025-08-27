import React from 'react';

const StatCard = ({ title, value, icon, change }) => {
  return (
    <div className="stat-card fade-in">
      <div className="stat-header">
        <div>
          <div className="stat-value">{value}</div>
          <div className="stat-label">{title}</div>
          {change && (
            <div className={`stat-change ${change > 0 ? 'positive' : 'negative'}`}>
              {change > 0 ? '↗' : '↘'} {Math.abs(change)}%
            </div>
          )}
        </div>
        {icon && (
          <div className="stat-icon">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
