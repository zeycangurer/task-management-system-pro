import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../../../store/actions/projectActions';
import ProjectsTemplate from '../../../components/templates/ProjectsTemplate';
import SpinAtom from '../../../components/atoms/Spin';
import AlertAtom from '../../../components/atoms/Alert';
import HeaderSideBarTemplate from '../../../components/templates/HeaderSideBarTemplate';
import { fetchUsers } from '../../../store/actions/userActions';
import { fetchCustomers } from '../../../store/actions/customerActions';
import { format, startOfYear } from 'date-fns';

function ProjectsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projects, loading, error } = useSelector((state) => state.projects);
  const { users, loading: usersLoading, error: usersError } = useSelector((state) => state.users);
  const { customers, loading: customersLoading, error: customersError } = useSelector((state) => state.customers);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [dateRange, setDateRange] = useState({
    startDate: format(startOfYear(new Date()), 'yyyy-MM-dd'),
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

  const getProjectDate = (project) => {

    if (project.createdAt && project.createdAt.seconds) {
      return new Date(project.createdAt.seconds * 1000 + project.createdAt.nanoseconds / 1000000);
    } else if (typeof project.createdAt === 'string') {
      return new Date(project.createdAt);
    }
    return null;
  };

  const filterProjects = () => {
    let filtered = projects;


    if (dateRange.startDate && dateRange.endDate) {
      const start = new Date(dateRange.startDate);
      const end = new Date(dateRange.endDate);
      end.setHours(23, 59, 59, 999);

      filtered = filtered.filter((project) => {
        const projectDate = getProjectDate(project);
        if (!projectDate) return false;
        return projectDate >= start && projectDate <= end;
      });
    }

    if (selectedUser) {
      filtered = filtered.filter((project) => {
        const assignedUsers = Array.isArray(project.assignedUsers) ? project.assignedUsers : [];
        return assignedUsers.includes(selectedUser);
      });
    }

    setFilteredProjects(filtered);
  };

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchUsers());
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !usersLoading && !customersLoading && !error && !usersError && !customersError) {
      if (Array.isArray(projects) && Array.isArray(users) && Array.isArray(customers)) {
        filterProjects();
      }
    }
  }, [loading, usersLoading, customersLoading, error, usersError, customersError, projects, users, customers, dateRange, selectedUser]);

  if (loading || usersLoading || customersLoading) {
    return <SpinAtom tip="Yükleniyor..." />;
  }

  if (error || usersError || customersError) {
    return (
      <AlertAtom
        message="Hata"
        description={error || usersError || customersError}
        type="error"
        showIcon
      />
    );
  }

  console.log(projects)

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
