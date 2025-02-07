import React from 'react';
import { useTranslation } from 'react-i18next';  
import StatisticCard from '../../molecules/StatisticCard';
import './styles.css';
import { useSelector } from 'react-redux';

function StatsOverview({ tasks, users, projects, customers }) {
  const { t } = useTranslation(); 
  const totalRegisteredUsers = users.length + customers.length
  const userRole = useSelector(state => state.profiles.user?.role)

  return (
    <div className="stats-overview">
      <StatisticCard title={t("Total Tasks")} value={tasks.length || 0} description={t("Task Count")} />
      <StatisticCard title={t("Completed Tasks")} value={tasks.filter(task => task.status === 'close').length || 0} description={t("Completed")} />
      <StatisticCard title={t("Projects")} value={projects.length || 0} description={t("Total Projects")} />
      {userRole === 'admin' || userRole === 'user' || userRole === 'manager' ? (
        <StatisticCard title={t("Users")} value={totalRegisteredUsers || 0} description={t("Registered Users")} />
      ) : null}
    </div>
  );
}

export default StatsOverview;
