import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskCreationTemplate from '../../../components/templates/TaskCreationTemplate';
import * as taskAction from '../../../store/actions/taskActions';
import * as customerAction from '../../../store/actions/customerActions';
import * as projectAction from '../../../store/actions/projectActions';
import { message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/organisms/Sidebar';
import Header from '../../../components/organisms/Header';
import './styles.css'
import { taskPriorities, taskCategories } from '../../../utils/arrays';

function TaskCreationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const customers = useSelector((state) => state.customers.customers);
  const currentUser = useSelector((state) => state.auth.user);
  const { projects } = useSelector((state) => state.projects);

  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get('projectId');

  useEffect(() => {
    if (!projects.length) {
      dispatch(projectAction.fetchProjects());
    }
  }, [dispatch, projects.length]);

  useEffect(() => {
    dispatch(customerAction.fetchCustomers());
  }, [dispatch]);

  
 

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
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`task-creation-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main>
          <TaskCreationTemplate
            onSubmit={handleSubmit}
            customers={customers}
            priorities={taskPriorities}
            categories={taskCategories}
            projectId={projectId}
            projects={projects}
          />
        </main>
      </div>
    </div>
  );
}

export default TaskCreationPage;