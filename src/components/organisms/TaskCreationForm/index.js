import React, { useEffect, useState, useMemo } from 'react';
import { Form, message } from 'antd';
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
import { useTranslation } from 'react-i18next';
import TooltipAtom from '../../atoms/Tooltip';

function TaskCreationFormOrganism({ onSubmit, initialValues, isEditMode }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlProjectId = queryParams.get('projectId');

  const root = useSelector((state) => state);
  const { users, loading: usersLoading } = root.users;
  const currentUser = useSelector((state) => state.profiles.user);
  const { projects } = useSelector((state) => state.projects);
  const customers = useSelector((state) => state.customers.customers);

  const [form] = Form.useForm();

  const [projectsLoaded, setProjectsLoaded] = useState(false);

  useEffect(() => {
    if (projects.length > 0 && !projectsLoaded) {
      message.info(t('Project list updated!'));
      setProjectsLoaded(true);
    }
  }, [projects, projectsLoaded]);


  useEffect(() => {
    if (!projects.length) {
      dispatch(projectAction.fetchProjects());
    }
    dispatch(customerAction.fetchCustomers());
  }, [dispatch, projects.length]);

  const projectId = useMemo(() => {
    if (isEditMode) {
      return initialValues?.projectId ?? null;
    }
    return urlProjectId || null;
  }, [isEditMode, initialValues, urlProjectId]);

  const [selectedCustomer, setSelectedCustomer] = useState(
    currentUser?.role === 'customer'
      ? currentUser.id
      : initialValues?.customer || null
  );

  const filteredProjects = useMemo(() => {
    if (!selectedCustomer) return [];
    return projects.filter((p) => p.customerId === selectedCustomer);
  }, [projects, selectedCustomer]);

  const isProjectFieldDisabled = useMemo(() => {
    if (isEditMode) return false;
    if (!isEditMode && urlProjectId) return true;
    if (!selectedCustomer) return true;
    return false;
  }, [isEditMode, urlProjectId, selectedCustomer]);

  useEffect(() => {
    if (initialValues && isEditMode) {
      form.setFieldsValue({
        ...initialValues,
        startDate: initialValues.startDate
          ? dayjs(initialValues.startDate.toDate())
          : null,
        dueDate: initialValues.dueDate
          ? dayjs(initialValues.dueDate.toDate())
          : null,
        customer:
          initialValues.customer ||
          (currentUser.role === 'customer' ? currentUser.id : undefined),
      });
      setSelectedCustomer(
        initialValues.customer ||
        (currentUser.role === 'customer' ? currentUser.id : null)
      );
    }
  }, [initialValues, isEditMode, form, currentUser.role]);

  useEffect(() => {
    if (!isEditMode && urlProjectId && projects.length) {
      const foundProject = projects.find(
        (p) => String(p.id) === String(urlProjectId)
      );
      if (foundProject) {
        form.setFieldsValue({
          projectId: foundProject.id,
          customer: foundProject.customerId,
        });
        setSelectedCustomer(foundProject.customerId);
      }
    }
  }, [isEditMode, urlProjectId, projects, form]);


  useEffect(() => {
    if (currentUser && currentUser.role === 'customer') {
      form.setFieldsValue({ customer: currentUser.id });
      setSelectedCustomer(currentUser.id);
    }
  }, [currentUser, form]);

  const handleFinish = (values) => {
    onSubmit(values);
  };

  const handleCustomerChange = (value) => {
    setSelectedCustomer(value);
    form.setFieldsValue({ projectId: undefined });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const isCustomerFieldDisabled = useMemo(() => {
    if (currentUser.role === 'customer') return true;

    if (!isEditMode && urlProjectId) return true;

    return false;
  }, [currentUser.role, isEditMode, urlProjectId]);

  const projectTooltipMessage = useMemo(() => {
    if (!isEditMode && urlProjectId) {
      return t('This field cannot be changed.');
    }

    if (!isEditMode && !projectId && !urlProjectId && !selectedCustomer) {

      return t('Select a customer first.');
    }
    return '';
  }, [isEditMode, projectId, urlProjectId, selectedCustomer]);

  console.log(isEditMode)
  console.log(projectId)
  console.log(urlProjectId)


  return (
    <Form
      form={form}
      onFinish={handleFinish}
      layout="vertical"
      initialValues={initialValues}
    >
      <ButtonAtom type="link" onClick={handleBack} className="back-button">
        <FaArrowLeft /> {t('Back')}
      </ButtonAtom>

      <FormItemMolecule
        label={t('Task Title')}
        name="title"
        rules={[{ required: true, message: t('Please enter a task title.') }]}
      >
        <InputAtom placeholder={t('Task Title')} />
      </FormItemMolecule>

      <FormItemMolecule
        label={t('Description')}
        name="description"
        rules={[{ required: true, message: t('Please enter a task description.') }]}
      >
        <TextAreaAtom placeholder={t('Description')} rows={4} />
      </FormItemMolecule>

      <FormItemMolecule
        label={t('Customer')}
        name="customer"
        rules={[{ required: true, message: t('Please select a customer.') }]}
      >
        <SelectAtom
          placeholder={t('Customer')}
          loading={!customers || customers.length === 0}
          disabled={isCustomerFieldDisabled}
          onChange={handleCustomerChange}
          style={{ background: 'white', borderRadius: '6px' }}
          notFoundContent={t("There is no data to display.")}

        >
          {customers.map((customer) => (
            <SelectAtom.Option key={customer.id} value={customer.id}>
              {customer.name}
            </SelectAtom.Option>
          ))}
        </SelectAtom>
      </FormItemMolecule>

      <FormItemMolecule label={t('File Upload')} name="attachments">
        <UploadAtom className="upload-class" multiple beforeUpload={() => false}>
          <ButtonAtom>{t('Select file')}</ButtonAtom>
        </UploadAtom>
      </FormItemMolecule>
      <div className="upload-description">
        {t('You can upload multiple files.')}
      </div>

      <FormItemMolecule
        label={t('Priority Level')}
        name="priority"
        rules={[{ required: true, message: t('Please select a priority level.') }]}
      >
        <SelectAtom
          placeholder={t('Priority Level')}
          loading={!taskPriorities || taskPriorities.length === 0}
          notFoundContent={t("There is no data to display.")}

        >
          {taskPriorities.map((priority) => (
            <SelectAtom.Option key={priority.value} value={priority.value}>
              {t(priority.label)}
            </SelectAtom.Option>
          ))}
        </SelectAtom>
      </FormItemMolecule>

      <FormItemMolecule
        label={t('Category')}
        name="category"
        rules={[{ required: true, message: t('Please select a category.') }]}
      >
        <SelectAtom
          placeholder={t('Category')}
          loading={!taskCategories || taskCategories.length === 0}
          notFoundContent={t("There is no data to display.")}

        >
          {taskCategories.map((category) => (
            <SelectAtom.Option key={category.value} value={category.value}>
              {t(category.label)}
            </SelectAtom.Option>
          ))}
        </SelectAtom>
      </FormItemMolecule>


      <FormItemMolecule label={t('Project')} name="projectId">
        {/* <TooltipAtom title={projectTooltipMessage} plaement='top'>
        <div style={{ display: 'inline-block', width: '100%', pointerEvents: 'auto' }}> */}
        <SelectAtom
          placeholder={t('Project')}
          allowClear
          disabled={isProjectFieldDisabled}
          style={{ background: 'white', borderRadius: '6px' }}
          notFoundContent={t("There is no data to display.")}

        >
          {filteredProjects.map((project) => (
            <SelectAtom.Option key={project.id} value={project.id}>
              {project.title}
            </SelectAtom.Option>
          ))}
        </SelectAtom>

        {/* </div>
        </TooltipAtom> */}
      </FormItemMolecule>
      <p className="project-alert-message">{projectTooltipMessage}</p>


      <FormItemMolecule
        label={t('Users (Assignees)')}
        name="assignedTo"
        rules={[{ required: true, message: t('Please select at least one user.') }]}
      >
        <SelectAtom
          mode="multiple"
          placeholder={t('Users (Assignees)')}
          loading={usersLoading}
          notFoundContent={t("There is no data to display.")}

        >
          {users.map((user) => (
            <SelectAtom.Option key={user.id} value={user.id}>
              {user.name || user.email}
            </SelectAtom.Option>
          ))}
        </SelectAtom>
      </FormItemMolecule>

      <FormItemMolecule>
        <ButtonAtom type="primary" htmlType="submit">
          {isEditMode ? t('Update') : t('Create')}
        </ButtonAtom>
      </FormItemMolecule>
    </Form>
  );
}

export default TaskCreationFormOrganism;
