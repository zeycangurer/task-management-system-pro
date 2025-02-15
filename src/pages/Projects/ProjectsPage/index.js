import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../../../store/actions/projectActions';
import ProjectsTemplate from '../../../components/templates/ProjectsTemplate';
import SpinAtom from '../../../components/atoms/Spin';
import AlertAtom from '../../../components/atoms/Alert';
import HeaderSideBarTemplate from '../../../components/templates/HeaderSideBarTemplate';
import { fetchUsers } from '../../../store/actions/userActions';
import { fetchCustomers } from '../../../store/actions/customerActions';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

function ProjectsPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projects, loading, error } = useSelector((state) => state.projects);
  const { users, loading: usersLoading, error: usersError } = useSelector((state) => state.users);
  const { customers, loading: customersLoading, error: customersError } = useSelector((state) => state.customers);
  const currentUser = useSelector((state) => state.profiles.user);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [dateRange, setDateRange] = useState({
    startDate: '2020-01-01',
    endDate: format(new Date(), 'yyyy-MM-dd'),
  });
  const [selectedUser, setSelectedUser] = useState('');

  const [filteredProjects, setFilteredProjects] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCreateProject = () => {
    navigate('/projects/new');
  };

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchUsers());
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (
      !loading &&
      !usersLoading &&
      !customersLoading &&
      !error &&
      !usersError &&
      !customersError &&
      Array.isArray(projects) &&
      Array.isArray(users) &&
      Array.isArray(customers)
    ) {
      if (currentUser?.role === 'customer') {
        const customerProjects = projects.filter(p => p.customerId === currentUser.id);
        setFilteredProjects(customerProjects);
      } else {
        setFilteredProjects(projects);
      }
    }
  }, [
    loading,
    usersLoading,
    customersLoading,
    error,
    usersError,
    customersError,
    projects,
    users,
    customers,
    currentUser
  ]);

  const getProjectDate = (project) => {
    if (project.createdAt && project.createdAt.seconds) {
      return new Date(
        project.createdAt.seconds * 1000 +
        project.createdAt.nanoseconds / 1000000
      );
    } else if (typeof project.createdAt === 'string') {
      return new Date(project.createdAt);
    }
    return null;
  };

  const filterProjects = () => {
    let baseProjects;
    if (currentUser?.role === 'customer') {
      baseProjects = projects.filter(p => p.customerId === currentUser.id);
    } else {
      baseProjects = projects;
    }

    if (dateRange.startDate && dateRange.endDate) {
      const start = new Date(dateRange.startDate);
      const end = new Date(dateRange.endDate);
      end.setHours(23, 59, 59, 999);

      baseProjects = baseProjects.filter((project) => {
        const projectDate = getProjectDate(project);
        if (!projectDate) return false;
        return projectDate >= start && projectDate <= end;
      });
    }

    if (selectedUser) {
      baseProjects = baseProjects.filter((project) => {
        const assignedUsers = Array.isArray(project.assignedUsers) ? project.assignedUsers : [];
        return assignedUsers.includes(selectedUser);
      });
    }

    setFilteredProjects(baseProjects);
  };

  if (error || usersError || customersError) {
    return (
      <AlertAtom
        message={t('Error')}
        description={error || usersError || customersError}
        type="error"
        showIcon
      />
    );
  }

  // console.log(filteredProjects)
  return (
    <div className="dashboard-container">
      <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <ProjectsTemplate
          projects={filteredProjects}
          onProjectClick={handleProjectClick}
          onCreateProject={handleCreateProject}
          dateRange={dateRange}
          setDateRange={setDateRange}
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          onFilter={filterProjects} 
        />
      </HeaderSideBarTemplate>
    </div>
  );
}

export default ProjectsPage;
