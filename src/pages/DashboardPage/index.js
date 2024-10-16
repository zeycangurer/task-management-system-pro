import React, { useEffect, useState } from 'react';
import Header from '../../components/organisms/Header';
import Sidebar from '../../components/organisms/Sidebar';
import StatsCard from '../../components/organisms/StatsCard';
import DashboardTaskList from '../../components/organisms/DashboardTaskList';
import RecentActivities from '../../components/organisms/RecentActivities';
import { FaTasks, FaCheckCircle, FaProjectDiagram, FaUserPlus } from 'react-icons/fa';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../store/actions/taskActions';

function DashboardPage() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const stats = [
    {
      title: 'Toplam Görev',
      count: tasks.length,
      icon: <FaTasks />,
      color: '#3498db',
    },
    {
      title: 'Tamamlanan Görev',
      count: tasks.filter(task => task.completed).length,
      icon: <FaCheckCircle />,
      color: '#2ecc71',
    },
    {
      title: 'Aktif Projeler',
      count: 5,
      icon: <FaProjectDiagram />,
      color: '#9b59b6',
    },
    {
      title: 'Yeni Kullanıcılar',
      count: 10,
      icon: <FaUserPlus />,
      color: '#e67e22',
    },
  ];

  const activities = [
    { id: 1, type: 'task', description: 'Görev 1 tamamlandı.', time: '2 saat önce' },
    { id: 2, type: 'project', description: 'Yeni proje oluşturuldu.', time: '1 gün önce' },
    { id: 3, type: 'user', description: 'Yeni kullanıcı kaydı.', time: '3 gün önce' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`dashboard-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main>
          <div className="stats-section">
            {stats.map((stat) => (
              <StatsCard
                key={stat.title}
                title={stat.title}
                count={stat.count}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </div>
          <div className="main-section">
            <DashboardTaskList tasks={tasks} />
            <RecentActivities activities={activities} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;