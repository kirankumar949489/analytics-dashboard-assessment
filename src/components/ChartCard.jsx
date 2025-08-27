import React from 'react';

const ChartCard = ({ title, subtitle, children, className = "" }) => {
  return (
    <div className={`chart-card slide-up ${className}`}>
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
        {subtitle && <p className="chart-subtitle">{subtitle}</p>}
      </div>
      <div className="chart-container">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
