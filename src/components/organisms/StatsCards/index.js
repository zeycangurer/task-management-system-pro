import React from 'react';
import StatisticCard from '../../molecules/StatisticCard';
import './styles.css';

function StatsCards({ projects, tasks, users }) {
  const completedTasks = tasks.filter((task) => task.status === 'close').length;
  const ongoingTasks = tasks.filter((task) => task.status === 'open').length;
  const completedProjects = projects.filter((project) => project.status === 'close').length;
  const ongoingProjects = projects.filter((project) => project.status === 'open').length;

  return (
    <div className="stats-cards">
      <StatisticCard
        title="Projeler"
        value={projects.length}
        description="Başlangıç ve bitiş tarihleri"
      />
      <StatisticCard title="Tamamlanan Proje" value={completedProjects} description="Tamamlanan Proje" />
      <StatisticCard title="Devam Eden Proje" value={ongoingProjects} description="Devam Eden Proje" />
      <StatisticCard title="Toplam Görev" value={tasks.length} description="Görev sayısı" />
      <StatisticCard title="Tamamlanan Görev" value={completedTasks} description="Tamamlananlar" />
      <StatisticCard title="Devam Eden Görev" value={ongoingTasks} description="Devam edenler" />
      <StatisticCard title="Kullanıcılar" value={users.length} description="Kayıtlı kullanıcılar" />

    </div>
  );
}

export default StatsCards;
