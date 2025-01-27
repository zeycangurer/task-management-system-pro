import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskCreationTemplate from '../../../components/templates/TaskCreationTemplate';
import * as taskAction from '../../../store/actions/taskActions';
import { message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css'
import HeaderSideBarTemplate from '../../../components/templates/HeaderSideBarTemplate';

function TaskCreationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);


  const handleSubmit = (values) => {
    const taskData = {
      ...values,
      projectId: values.projectId || projectId,
    };
    dispatch(taskAction.addTask(taskData, currentUser.uid))
      .then(() => {
        message.success('Görev başarıyla oluşturuldu.');
        navigate('/tasks');
      })
      .catch((error) => {
        message.error('Görev oluşturulurken bir hata oluştu.');
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
