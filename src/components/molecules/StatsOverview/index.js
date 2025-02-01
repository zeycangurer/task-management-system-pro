import React from 'react';
import StatisticCard from '../../molecules/StatisticCard';
import './styles.css';
import { useSelector } from 'react-redux';

function StatsOverview({ tasks, users, projects, customers }) {
  const totalRegisteredUsers = users.length + customers.length
  const userRole = useSelector(state => state.profiles.user?.role)

  return (
    <div className="stats-overview">
      <StatisticCard title="Toplam Görev" value={tasks.length || 0} description="Görev Sayısı" />
      <StatisticCard title="Tamamlanan Görevler" value={tasks.filter(task => task.status === 'close').length || 0} description="Tamamlandı" />
      <StatisticCard title="Projeler" value={projects.length || 0} description="Toplam Projeler" />
      {userRole === 'admin' || userRole === 'user' || userRole === 'manager' ? (
        <StatisticCard title="Kullanıcılar" value={totalRegisteredUsers || 0} description="Kayıtlı Kullanıcılar" />
      ) : null}
    </div>
  );
}

export default StatsOverview;
