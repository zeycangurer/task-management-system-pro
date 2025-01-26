import React from 'react';
import StatisticCard from '../../molecules/StatisticCard';
import './styles.css';

function StatsOverview({ tasks, users, projects, customers }) {
  const totalRegisteredUsers = users.length + customers.length
  return (
    <div className="stats-overview">
      <StatisticCard title="Toplam Görev" value={tasks.length || 0} description="Görev Sayısı" />
      <StatisticCard title="Tamamlanan Görevler" value={tasks.filter(task => task.status === 'close').length || 0} description="Tamamlandı" />
      <StatisticCard title="Kullanıcılar" value={totalRegisteredUsers || 0} description="Kayıtlı Kullanıcılar" />
      <StatisticCard title="Projeler" value={projects.length || 0} description="Toplam Projeler" />
    </div>
  );
}

export default StatsOverview;
