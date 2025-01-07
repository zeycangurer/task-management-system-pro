import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as projectActions from '../../../store/actions/projectActions';
import { message } from 'antd';
import SpinAtom from '../../../components/atoms/Spin';
import HeaderSideBarTemplate from '../../../components/templates/HeaderSideBarTemplate';
import './styles.css'
import ProjectCreationTemplate from '../../../components/templates/ProjectCreationTemplate';
function EditProjectPage() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projects, loading } = useSelector((state) => state.projects);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!projects.length) {
      dispatch(projectActions.fetchProjects());
    }
  }, [dispatch, projects.length]);

  const project = projects.find((p) => p.id === projectId);

  const onFinish = (values) => {
    const { startDate, endDate, ...otherValues } = values;
    const startDateAsDate = startDate ? startDate.toDate() : null;
    const endDateAsDate = endDate ? endDate.toDate() : null;

    const projectData = {
      ...otherValues,
      startDate: startDateAsDate,
      endDate: endDateAsDate,
    };

    dispatch(projectActions.updateProject(projectId, projectData))
      .then(() => {
        message.success('Proje başarıyla güncellendi');
        navigate(`/projects/${projectId}`);
      })
      .catch((error) => {
        message.error('Proje güncellenemedi: ' + error.message);
      });
  };

  if (loading || !project) {
    return <SpinAtom tip="Yükleniyor..." />;
  }

  const initialValues = {
    ...project,
    startDate: project.startDate ? project.startDate : null,
    endDate: project.endDate ? project.endDate : null,
  };

  return (
    <div className="dashboard-container">
      <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <ProjectCreationTemplate
          onFinish={onFinish}
          initialValues={initialValues}
          isEditMode={true}
        />

      </HeaderSideBarTemplate>
    </div>
  );
}

export default EditProjectPage;
