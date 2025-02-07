import React from 'react';
import StatisticCard from '../../molecules/StatisticCard';
import './styles.css';
import { useTranslation } from 'react-i18next';

function StatsCards({ projects, tasks, users, customers }) {
  const { t } = useTranslation();

  const completedTasks = tasks.filter((task) => task.status === 'close').length;
  const ongoingTasks = tasks.filter((task) => task.status === 'open').length;
  const completedProjects = projects.filter((project) => project.status === 'close').length;
  const ongoingProjects = projects.filter((project) => project.status === 'open').length;

  const totalRegisteredUsers = users.length + customers.length

  return (
    <div className="stats-cards">
      <StatisticCard
        title={t('Projects')}
        value={projects.length}
        description={t('Start and end dates')}
      />
      <StatisticCard
        title={t('Completed Projects')}
        value={completedProjects}
        description={t('Completed Projects')}
      />
      <StatisticCard
        title={t('Ongoing Projects')}
        value={ongoingProjects}
        description={t('Ongoing Projects')}
      />
      <StatisticCard
        title={t('Total Tasks')}
        value={tasks.length}
        description={t('Task Count')}
      />
      <StatisticCard
        title={t('Completed Tasks')}
        value={completedTasks}
        description={t('Completed Tasks')}
      />
      <StatisticCard
        title={t('Ongoing Tasks')}
        value={ongoingTasks}
        description={t('Ongoing Tasks')}
      />
      <StatisticCard
        title={t('Users')}
        value={totalRegisteredUsers}
        description={t('Registered Users')}
      />

    </div>
  );
}

export default StatsCards;
