import React from 'react';
import TitleAtom from '../../atoms/Title';
import './styles.css';

function DashboardHeader({ title, subtitle }) {
  return (
    <div className="dashboard-header">
      <TitleAtom level={1} className="title">{title}</TitleAtom>
      <p>{subtitle}</p>
    </div>
  );
}

export default DashboardHeader;
