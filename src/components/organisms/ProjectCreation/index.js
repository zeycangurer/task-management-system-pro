import React, { useEffect } from 'react';
import { Form } from 'antd';
import FormItemMolecule from '../../molecules/FormItem';
import InputAtom from '../../atoms/Input';
import TextAreaAtom from '../../atoms/TextArea';
import ButtonAtom from '../../atoms/Button';
import { useDispatch, useSelector } from 'react-redux';
import SelectAtom from '../../atoms/Select';
import DatePickerAtom from '../../atoms/DatePicker';
import * as userAction from '../../../store/actions/userActions';
import * as taskAction from '../../../store/actions/taskActions';
import * as customerAction from '../../../store/actions/customerActions';
import dayjs from 'dayjs';
import { projectCategories, projectPriorities } from '../../../utils/arrays';
import './styles.css'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ProjectCreationFormOrganism({ onFinish, initialValues, isEditMode = false }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const root = useSelector((state) => state);
    const { users, loading: usersLoading } = root.users;
    const { tasks, loading: tasksLoading } = root.tasks;
    const { customers, loading: customersLoading } = root.customers;
    const currentUser = useSelector(state => state.profiles.user);

    useEffect(() => {
      if (!users.length) dispatch(userAction.fetchUsers());
      if (!tasks.length) dispatch(taskAction.fetchTasks());
      if (!customers.length) dispatch(customerAction.fetchCustomers());
    }, [dispatch, users.length, tasks.length, customers.length]);
  
    const [form] = Form.useForm();
  
    useEffect(() => {
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
          startDate: initialValues.startDate ? dayjs(initialValues.startDate.toDate()) : null,
          endDate: initialValues.endDate ? dayjs(initialValues.endDate.toDate()) : null,
          customerId: currentUser.role === 'customer' ? currentUser.id : initialValues.customerId

        });
      }
    }, [initialValues, form]);

    useEffect(() => {
      if (currentUser && currentUser.role === 'customer') {
          form.setFieldsValue({
              customerId: currentUser.id 
          });
      }
  }, [currentUser, form]);



    const handleFinish = (values) => {
      console.log(values)
      onFinish(values);
    };
  
    const handleBack = () => navigate(-1);
  
    return (
      <Form layout="vertical" onFinish={handleFinish} form={form} initialValues={initialValues}>
        <ButtonAtom type="link" onClick={handleBack} className="back-button">
          <FaArrowLeft /> Geri
        </ButtonAtom>
        <FormItemMolecule label="Proje Başlığı" name="title" rules={[{ required: true, message: 'Lütfen proje başlığını girin' }]}>
          <InputAtom placeholder="Proje başlığı" />
        </FormItemMolecule>
        <FormItemMolecule label="Proje Açıklaması" name="description">
          <TextAreaAtom rows={4} placeholder="Proje açıklaması" />
        </FormItemMolecule>
        <FormItemMolecule label="Başlangıç Tarihi" name="startDate" rules={[{ required: true, message: 'Lütfen başlangıç tarihini girin' }]}>
          <DatePickerAtom placeholder="Başlangıç tarihi seçin" style={{ width: '100%' }} />
        </FormItemMolecule>
        <FormItemMolecule label="Bitiş Tarihi" name="endDate" rules={[{ required: true, message: 'Lütfen bitiş tarihini girin' }]}>
          <DatePickerAtom placeholder="Bitiş tarihi seçin" style={{ width: '100%' }} />
        </FormItemMolecule>
        <FormItemMolecule label="Öncelik" name="priority" rules={[{ required: true, message: 'Lütfen öncelik seçin' }]}>
          <SelectAtom placeholder="Öncelik seçin">
            {projectPriorities.map((priority) => (
              <SelectAtom.Option key={priority.value} value={priority.value}>
                {priority.label}
              </SelectAtom.Option>
            ))}
          </SelectAtom>
        </FormItemMolecule>
        <FormItemMolecule label="Kategori" name="category" rules={[{ required: true, message: 'Lütfen bir kategori seçin' }]}>
          <SelectAtom placeholder="Kategori seçin">
            {projectCategories.map((category) => (
              <SelectAtom.Option key={category.value} value={category.value}>
                {category.label}
              </SelectAtom.Option>
            ))}
          </SelectAtom>
        </FormItemMolecule>
        <FormItemMolecule label="Müşteri" name="customerId" rules={[{ required: true, message: 'Lütfen bir müşteri seçin' }]}>
          <SelectAtom placeholder="Müşteri seçin" loading={customersLoading} disabled={currentUser.role === 'customer'}>
            {customers.map((customer) => (
              <SelectAtom.Option key={customer.id} value={customer.id}>
                {customer.name}
              </SelectAtom.Option>
            ))}
          </SelectAtom>
        </FormItemMolecule>
        <FormItemMolecule label="Kullanıcılar" name="assignedUsers" rules={[{ required: true, message: 'Lütfen en az bir kullanıcı seçin' }]}>
          <SelectAtom mode="multiple" placeholder="Kullanıcıları seçin" loading={usersLoading}>
            {users.map((user) => (
              <SelectAtom.Option key={user.id} value={user.id}>
                {user.name || user.email}
              </SelectAtom.Option>
            ))}
          </SelectAtom>
        </FormItemMolecule>
        <FormItemMolecule label="Görevler" name="assignedTasks">
          <SelectAtom mode="multiple" placeholder="Görevleri seçin" loading={tasksLoading}>
            {tasks.map((task) => (
              <SelectAtom.Option key={task.id} value={task.id}>
                {task.title}
              </SelectAtom.Option>
            ))}
          </SelectAtom>
        </FormItemMolecule>
        <Form.Item>
          <ButtonAtom type="primary" htmlType="submit" >
            {isEditMode ? 'Güncelle' : 'Oluştur'}
          </ButtonAtom>
        </Form.Item>
      </Form>
    );
  }
  

export default ProjectCreationFormOrganism;
