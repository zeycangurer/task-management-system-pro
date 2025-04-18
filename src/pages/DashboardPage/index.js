import React, { useEffect, useState } from 'react';
import ChartsSection from '../../components/organisms/ChartsSection';
import './styles.css';
import HeaderSideBarTemplate from '../../components/templates/HeaderSideBarTemplate';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/actions/userActions';
import { fetchTasks } from '../../store/actions/taskActions';
import { fetchProjects } from '../../store/actions/projectActions';
import StatsOverview from '../../components/molecules/StatsOverview';
import QuickActions from '../../components/molecules/QuickActions';
import UpcomingTasks from '../../components/molecules/UpcomingTasks';
import LatestItemsSection from '../../components/organisms/LatestItemsSection';
import { fetchCustomers } from '../../store/actions/customerActions';

function Dashboard() {
  const root = useSelector(state => state);
  const dispatch = useDispatch();
  const users = root.users.users || [];
  const tasks = root.tasks.tasks || [];
  const projects = root.projects.projects || [];
  const customers = root.customers.customers || [];
  const currentUser = useSelector(state => state.profiles.user)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredTasks = currentUser?.role === 'customer'
    ? tasks.filter(task => task.customer === currentUser.id)
    : tasks;

  const filteredProjects = currentUser?.role === 'customer'
    ? projects.filter(project => project.customerId === currentUser.id)
    : projects;
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTasks());
    dispatch(fetchProjects());
    dispatch(fetchCustomers())
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <div className="dashboard-content">
          <StatsOverview
            tasks={filteredTasks}
            users={users}
            projects={filteredProjects}
            customers={customers}
          />
          <QuickActions />
          <ChartsSection
            tasks={filteredTasks}
            users={users}
            projects={filteredProjects}
            viewType="dashboard"
          />
          <UpcomingTasks tasks={tasks} />
          <LatestItemsSection
            latestTasks={filteredTasks}
            latestProjects={filteredProjects}
          />
        </div>
      </HeaderSideBarTemplate>
    </div>
  );
}

export default Dashboard;