import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { addProject } from '../../../store/actions/projectActions';
import ProjectCreationFormOrganism from '../../../components/organisms/ProjectCreation';
import { Timestamp } from 'firebase/firestore';

function NewProjectPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);

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
    <div>
      <ProjectCreationFormOrganism onFinish={onFinish} />
    </div>
  );
}

export default NewProjectPage;
