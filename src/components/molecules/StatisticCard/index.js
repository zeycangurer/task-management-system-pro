import React from 'react';
import { useTranslation } from 'react-i18next';  
import './styles.css';

function StatisticCard({ title, value, description }) {
  const { t } = useTranslation(); 

  return (
    <div className="statistic-card">
      <h3>{t(title)}</h3> 
      <p className="value">{value}</p>
      <p className="description">{t(description)}</p> 
    </div>
  );
}

export default StatisticCard;
