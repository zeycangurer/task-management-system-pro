
import React from 'react';
import { FaTasks, FaProjectDiagram, FaUsers, FaCheckCircle } from 'react-icons/fa';
import './styles.css';

function StatsCard({ title, count, icon, color }) {
  return (
    <div className="stats-card">
      <div className="stats-card-icon">
        {icon}
      </div>
      <div className="stats-card-info">
        <h3>{count}</h3>
        <p>{title}</p>
      </div>
    </div>
  );
}

export default StatsCard;
