import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskCreationTemplate from '../../components/templates/TaskCreationTemplate';
import * as taskAction from '../../store/actions/taskActions';
import * as customerAction from '../../store/actions/customerActions';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

function TaskCreationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customers = useSelector((state) => state.customers.customers);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(customerAction.fetchCustomers());
  }, [dispatch]);

  const priorities = [
    { label: 'Acil', value: 'urgent' },
    { label: 'Yakın Zamanda', value: 'soon' },
    { label: 'Bekleyebilir', value: 'can-wait' },
  ];

  const categories = [
    { label: 'İstek', value: 'demand' },
    { label: 'Hata', value: 'error' },
    { label: 'Görüşme', value: 'meeting' },
  ];

  const handleSubmit = (values) => {
    dispatch(taskAction.addTask(values, currentUser.uid))
      .then(() => {
        message.success('Görev başarıyla oluşturuldu.');
        navigate('/tasks');
      })
      .catch((error) => {
        message.error('Görev oluşturulurken bir hata oluştu.');
        console.error(error);
      });
  };

  return (
    <TaskCreationTemplate
      onSubmit={handleSubmit}
      customers={customers}
      priorities={priorities}
      categories={categories}
    />
  );
}

export default TaskCreationPage;
