import React from 'react';
import './styles.css';

function StatisticCard({ title, value, description }) {
  return (
    <div className="statistic-card">
      <h3>{title}</h3>
      <p className="value">{value}</p>
      <p className="description">{description}</p>
    </div>
  );
}

export default StatisticCard;
