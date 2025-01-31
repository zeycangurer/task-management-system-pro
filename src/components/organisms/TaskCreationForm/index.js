import React, { useEffect } from 'react';
import { Form } from 'antd';
import InputAtom from '../../atoms/Input';
import TextAreaAtom from '../../atoms/TextArea';
import SelectAtom from '../../atoms/Select';
import UploadAtom from '../../atoms/Upload';
import ButtonAtom from '../../atoms/Button';
import FormItemMolecule from '../../molecules/FormItem';
import { FaArrowLeft } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { taskPriorities, taskCategories } from '../../../utils/arrays';
import * as projectAction from '../../../store/actions/projectActions';
import * as customerAction from '../../../store/actions/customerActions';
import dayjs from 'dayjs';

function TaskCreationFormOrganism({ onSubmit, initialValues, isEditMode }) {
  const root = useSelector((state) => state);
  const dispatch = useDispatch()
  const location = useLocation();

  const { users, loading: usersLoading } = root.users;
  const currentUser = useSelector(state => state.profiles.user);
  const { projects } = useSelector((state) => state.projects);
  const customers = useSelector((state) => state.customers.customers);

  const queryParams = new URLSearchParams(location.search);
  const urlProjectId = queryParams.get('projectId');

  const projectId = isEditMode ? initialValues.projectId : urlProjectId || null;

  const selectedProject = projects.find(project => project.id === projectId);
  const projectCustomerId = selectedProject?.customerId || null;


  useEffect(() => {
    if (!projects.length) {
      dispatch(projectAction.fetchProjects());
    }
  }, [dispatch, projects.length]);

  useEffect(() => {
    dispatch(customerAction.fetchCustomers());
  }, [dispatch]);


  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    // console.log(values)
    onSubmit(values);
  };

  useEffect(() => {
    if (isEditMode && initialValues) {
      form.setFieldsValue({
        ...initialValues,
        startDate: initialValues.startDate ? dayjs(initialValues.startDate.toDate()) : null,
        dueDate: initialValues.dueDate ? dayjs(initialValues.dueDate.toDate()) : null,
        customer: initialValues.customer || (currentUser.role === 'customer' ? currentUser.id : undefined),
      });
    } else if (!isEditMode && urlProjectId && projectCustomerId) {
      form.setFieldsValue({ projectId: urlProjectId, customer: projectCustomerId });
    }
  }, [initialValues, form, currentUser, isEditMode, urlProjectId, projectCustomerId]);


  useEffect(() => {
    if (currentUser && currentUser.role === 'customer') {
      form.setFieldsValue({
        customer: currentUser.id
      });
    }
  }, [currentUser, form]);



  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical" initialValues={initialValues}>
      <ButtonAtom type="link" onClick={handleBack} className="back-button">
        <FaArrowLeft /> Geri
      </ButtonAtom>
      <FormItemMolecule
        label="Görev Başlığı"
        name="title"
        rules={[{ required: true, message: 'Lütfen görev başlığını girin.' }]}
      >
        <InputAtom placeholder="Görev başlığı girin" />
      </FormItemMolecule>

      <FormItemMolecule
        label="Açıklama"
        name="description"
        rules={[{ required: true, message: 'Lütfen görev açıklamasını girin.' }]}
      >
        <TextAreaAtom placeholder="Görev açıklamasını girin" rows={4} />
      </FormItemMolecule>

      <FormItemMolecule
        label="Müşteri"
        name="customer"
        rules={[{ required: true, message: 'Lütfen bir müşteri seçin.' }]}
      >
        <SelectAtom placeholder="Müşteri seçin" loading={!customers || customers.length === 0}
          disabled={currentUser.role === 'customer' || projectId !== null}
          style={{ background: 'white', borderRadius: '6px' }}>
          {customers.map((customer) => (
            <SelectAtom.Option key={customer.id} value={customer.id}>
              {customer.name}
            </SelectAtom.Option>
          ))}
        </SelectAtom>
      </FormItemMolecule>

      <FormItemMolecule label="Dosya Yükleme" name="attachments">
        <UploadAtom multiple beforeUpload={() => false}>
          <ButtonAtom>Dosya Seç</ButtonAtom>
        </UploadAtom>
      </FormItemMolecule>

      <FormItemMolecule
        label="Öncelik Seviyesi"
        name="priority"
        rules={[{ required: true, message: 'Lütfen öncelik seviyesini seçin.' }]}

      >
        <SelectAtom placeholder="Öncelik seviyesi seçin" loading={!taskPriorities || taskPriorities.length === 0}
          disabled={!taskPriorities || taskPriorities.length === 0}>
          {taskPriorities.map((priority) => (
            <SelectAtom.Option key={priority.value} value={priority.value}>
              {priority.label}
            </SelectAtom.Option>
          ))}
        </SelectAtom>
      </FormItemMolecule>

      <FormItemMolecule
        label="Kategori"
        name="category"
        rules={[{ required: true, message: 'Lütfen bir kategori seçin.' }]}
      >
        <SelectAtom placeholder="Kategori seçin" loading={!taskCategories || taskCategories.length === 0}
          disabled={!taskCategories || taskCategories.length === 0}>
          {taskCategories.map((category) => (
            <SelectAtom.Option key={category.value} value={category.value}>
              {category.label}
            </SelectAtom.Option>
          ))}
        </SelectAtom>
      </FormItemMolecule>
      <FormItemMolecule
        label="Proje"
        name="projectId"
      >
        <SelectAtom placeholder="Bir proje seçin" disabled={!!projectId} style={{ background: 'white', borderRadius: '6px' }}>
          {projects.map((project) => (
            <SelectAtom.Option key={project.id} value={project.id}>
              {project.title}
            </SelectAtom.Option>
          ))}
        </SelectAtom>
      </FormItemMolecule>
      <FormItemMolecule label="Kullanıcılar" name="assignedTo" rules={[{ required: true, message: 'Lütfen en az bir kullanıcı seçin' }]}>
        <SelectAtom mode="multiple" placeholder="Kullanıcıları seçin" loading={usersLoading}>
          {users.map((user) => (
            <SelectAtom.Option key={user.id} value={user.id}>
              {user.name || user.email}
            </SelectAtom.Option>
          ))}
        </SelectAtom>
      </FormItemMolecule>
      <FormItemMolecule>
        <ButtonAtom type="primary" htmlType="submit">
          {isEditMode ? 'Güncelle' : 'Oluştur'}
        </ButtonAtom>
      </FormItemMolecule>
    </Form>
  );
}

export default TaskCreationFormOrganism;
