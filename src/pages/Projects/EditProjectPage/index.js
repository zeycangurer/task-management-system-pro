import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as projectActions from '../../../store/actions/projectActions';
import { message } from 'antd';
import SpinAtom from '../../../components/atoms/Spin';
import HeaderSideBarTemplate from '../../../components/templates/HeaderSideBarTemplate';
import './styles.css'
import ProjectCreationTemplate from '../../../components/templates/ProjectCreationTemplate';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '../../../components/molecules/LoadingSpinner';

function EditProjectPage() {
  const { t } = useTranslation();

  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.profiles.user);

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

    const projectData = {
      ...otherValues,
      startDate: startDate ? dayjs(startDate).toDate() : null, 
      endDate: endDate ? dayjs(endDate).toDate() : null,
      changedBy: currentUser?.id,
    };

    dispatch(projectActions.updateProject(projectId, projectData))
      .then(() => {
        message.success(t('Project successfully updated'));
        navigate(`/projects/${projectId}`);
      })
      .catch((error) => {
        message.error(t('Project could not be updated') + ': ' + error.message);
      });
  };

  if (loading || !project) {
    return (
      <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <LoadingSpinner tip={t('Loading...')} />
      </HeaderSideBarTemplate>
    );
  }

  const initialValues = {
    ...project,
    startDate: project.startDate ? dayjs(project.startDate.toDate()) : null,
    endDate: project.endDate ? dayjs(project.endDate.toDate()) : null,
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
