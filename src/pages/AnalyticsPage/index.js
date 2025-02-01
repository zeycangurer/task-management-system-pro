import React, { useState, useEffect } from 'react';
import AnalyticsTemplate from '../../components/templates/AnalyticsTemplate';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/actions/userActions';
import { fetchTasks } from '../../store/actions/taskActions';
import { fetchProjects } from '../../store/actions/projectActions';
import HeaderSideBarTemplate from '../../components/templates/HeaderSideBarTemplate';
import { fetchCustomers } from '../../store/actions/customerActions';

function AnalyticsPage() {
  const root = useSelector(state => state);
  const dispatch = useDispatch();
  const users = root.users.users || [];
  const tasks = root.tasks.tasks || [];
  const projects = root.projects.projects || [];
  const customers = root.customers.customers || [];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTasks());
    dispatch(fetchProjects());
    dispatch(fetchCustomers())
  }, [dispatch]);

  if (root.users.loading || root.tasks.loading || root.projects.loading) {
    return <p>Yükleniyor...</p>;
  }

  if (root.users.error || root.tasks.error || root.projects.error) {
    return (
      <p>Hata: {root.users.error || root.tasks.error || root.projects.error}</p>
    );
  }

  return (
    <div className="dashboard-container">
      <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <AnalyticsTemplate
          users={users}
          tasks={tasks}
          projects={projects}
          customers={customers}
          viewType='analytics'
        />
      </HeaderSideBarTemplate>
    </div>
  );
}

export default AnalyticsPage;
