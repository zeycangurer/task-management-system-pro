import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { addProject } from '../../../store/actions/projectActions';
import { Timestamp } from 'firebase/firestore';
import HeaderSideBarTemplate from '../../../components/templates/HeaderSideBarTemplate';
import './styles.css';
import ProjectCreationTemplate from '../../../components/templates/ProjectCreationTemplate';

function NewProjectPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onFinish = (values) => {
    const projectData = {
      ...values,
      createdAt: Timestamp.fromDate(new Date()),
      status: 'aktif',
      createdBy: currentUser.uid,
    };

    dispatch(addProject(projectData))
      .then(() => {
        message.success('Proje başarıyla oluşturuldu');
        navigate('/projects');
      })
      .catch((error) => {
        message.error('Proje oluşturulamadı: ' + error.message);
      });
  };

  return (
    <div className="dashboard-container">
      <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <ProjectCreationTemplate onFinish={onFinish} />
      </HeaderSideBarTemplate>
    </div>
  );
}

export default NewProjectPage;
