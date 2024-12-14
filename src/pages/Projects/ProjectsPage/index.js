import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../../../store/actions/projectActions';
import ProjectsTemplate from '../../../components/templates/ProjectsTemplate';
import SpinAtom from '../../../components/atoms/Spin';
import AlertAtom from '../../../components/atoms/Alert';
import HeaderSideBarTemplate from '../../../components/templates/HeaderSideBarTemplate';

function ProjectsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projects, loading, error } = useSelector((state) => state.projects);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleCreateProject = () => {
    navigate('/projects/new');
  };

  if (loading) {
    return <SpinAtom tip="Yükleniyor..." />;
  }

  if (error) {
    return (
      <AlertAtom
        message="Hata"
        description={error}
        type="error"
        showIcon
      />
    );
  }

  return (
    <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
    <ProjectsTemplate
      projects={projects}
      onProjectClick={handleProjectClick}
      onCreateProject={handleCreateProject}
    />
    </HeaderSideBarTemplate>
  );
}

export default ProjectsPage;
