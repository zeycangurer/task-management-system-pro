import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskCreationTemplate from '../../../components/templates/TaskCreationTemplate';
import * as taskAction from '../../../store/actions/taskActions';
import { message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css'
import HeaderSideBarTemplate from '../../../components/templates/HeaderSideBarTemplate';
import { useTranslation } from 'react-i18next';

function TaskCreationPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentUser = useSelector(state => state.profiles.user);
  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get('projectId');

  const handleSubmit = (values) => {
    const taskData = {
      ...values,
      projectId: values.projectId || projectId,
    };
    dispatch(taskAction.addTask(taskData, currentUser.id))
      .then(() => {
        message.success(t('Task successfully created'));
        navigate(-1);
      })
      .catch((error) => {
        message.error(t('An error occurred while creating the task.'));
        console.error(error);
      });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="task-creation-container">
      <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <main>
          <TaskCreationTemplate
            onSubmit={handleSubmit}
          />
        </main>
      </HeaderSideBarTemplate>
    </div>
  );
}

export default TaskCreationPage;
