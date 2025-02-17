import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import FormItemMolecule from "../../molecules/FormItem";
import InputAtom from "../../atoms/Input";
import TextAreaAtom from "../../atoms/TextArea";
import ButtonAtom from "../../atoms/Button";
import { useDispatch, useSelector } from "react-redux";
import SelectAtom from "../../atoms/Select";
import DatePickerAtom from "../../atoms/DatePicker";
import * as userAction from "../../../store/actions/userActions";
import * as taskAction from "../../../store/actions/taskActions";
import * as customerAction from "../../../store/actions/customerActions";
import dayjs from "dayjs";
import { projectCategories, projectPriorities } from "../../../utils/arrays";
import "./styles.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TooltipAtom from "../../atoms/Tooltip";

function ProjectCreationFormOrganism({
  onFinish,
  initialValues,
  isEditMode = false,
}) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const root = useSelector((state) => state);
  const { users, loading: usersLoading } = root.users;
  const { tasks, loading: tasksLoading } = root.tasks;
  const { customers, loading: customersLoading } = root.customers;
  const currentUser = useSelector((state) => state.profiles.user);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    if (!users.length) dispatch(userAction.fetchUsers());
    if (!tasks.length) dispatch(taskAction.fetchTasks());
    if (!customers.length) dispatch(customerAction.fetchCustomers());
  }, [dispatch, users.length, tasks.length, customers.length]);

  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues && initialValues.customerId) {
      handleCustomerChange(initialValues.customerId);
    }
  }, [initialValues, tasks]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        startDate: initialValues.startDate
          ? dayjs(initialValues.startDate.toDate())
          : null,
        endDate: initialValues.endDate
          ? dayjs(initialValues.endDate.toDate())
          : null,
        customerId:
          currentUser.role === "customer"
            ? currentUser.id
            : initialValues.customerId,
      });

      if (initialValues.customerId) {
        updateTaskList(
          initialValues.customerId,
          initialValues.assignedTasks || []
        );
      }
    }
  }, [initialValues, form, tasks]);

  useEffect(() => {
    if (currentUser && currentUser.role === "customer") {
      const customerTasks = tasks
        .filter((task) => task.customer === currentUser.id)
        .map((task) => ({ label: task.title, value: task.id }));
      setFilteredTasks(customerTasks);
      setSelectedTasks(form.getFieldValue("assignedTasks") || []);
    }
  }, [currentUser, tasks, form]);

  useEffect(() => {
    if (currentUser && currentUser.role === "customer") {
      form.setFieldsValue({
        customerId: currentUser.id,
      });
    }
  }, [currentUser, form]);

  const updateTaskList = (customerId, assignedTasks = []) => {
    if (!customerId) return;

    const customerTasks = tasks
      .filter((task) => task.customer === customerId)
      .map((task) => ({ label: task.title, value: task.id }));

    setSelectedTasks(assignedTasks);
    setFilteredTasks(customerTasks);

    message.info(t("Task list updated!"));
  };

  const handleCustomerChange = (customerId) => {
    updateTaskList(customerId);
    setSelectedTasks([]);
    form.setFieldsValue({ assignedTasks: [] });
  };
  const handleFinish = (values) => {
    // console.log(values)
    onFinish(values);
  };

  const handleBack = () => navigate(-1);

  return (
    <Form
      layout="vertical"
      onFinish={handleFinish}
      form={form}
      initialValues={initialValues}
    >
      <ButtonAtom type="link" onClick={handleBack} className="back-button">
        <FaArrowLeft /> {t("Back")}
      </ButtonAtom>
      <FormItemMolecule
        label={t("Project Title")}
        name="title"
        rules={[
          { required: true, message: t("Please enter a project title.") },
        ]}
      >
        <InputAtom placeholder={t("Project Title")} />
      </FormItemMolecule>
      <FormItemMolecule
        label={t("Project Description")}
        name="description"
        rules={[
          { required: true, message: t("Please enter a project description.") },
        ]}
      >
        <TextAreaAtom rows={4} placeholder={t("Project Description")} />
      </FormItemMolecule>
      <FormItemMolecule
        label={t("Start Date")}
        name="startDate"
        rules={[{ required: true, message: t("Please select start date") }]}
      >
        <DatePickerAtom
          placeholder={t("Start Date")}
          style={{ width: "100%" }}
        />
      </FormItemMolecule>
      <FormItemMolecule
        label={t("End Date")}
        name="endDate"
        rules={[{ required: true, message: t("Please select end date") }]}
      >
        <DatePickerAtom placeholder={t("End Date")} style={{ width: "100%" }} />
      </FormItemMolecule>
      <FormItemMolecule
        label={t("Priority Level")}
        name="priority"
        rules={[
          { required: true, message: t("Please select a priority level.") },
        ]}
      >
        <SelectAtom
          placeholder={t("Priority Level")}
          notFoundContent={t("There is no data to display.")}
        >
          {projectPriorities.map((priority) => (
            <SelectAtom.Option key={priority.value} value={priority.value}>
              {t(priority.label)}
            </SelectAtom.Option>
          ))}
        </SelectAtom>
      </FormItemMolecule>
      <FormItemMolecule
        label={t("Category Level")}
        name="category"
        rules={[{ required: true, message: t("Please select a category.") }]}
      >
        <SelectAtom
          placeholder={t("Category Level")}
          notFoundContent={t("There is no data to display.")}
        >
          {projectCategories.map((category) => (
            <SelectAtom.Option key={category.value} value={category.value}>
              {t(category.label)}
            </SelectAtom.Option>
          ))}
        </SelectAtom>
      </FormItemMolecule>
      <FormItemMolecule
        label={t("Customer")}
        name="customerId"
        rules={[{ required: true, message: t("Please select a customer.") }]}
      >

        <SelectAtom
          placeholder={t("Customer")}
          loading={customersLoading}
          disabled={currentUser.role === "customer"}
          style={{ background: "white", borderRadius: "6px" }}
          onChange={handleCustomerChange}
          notFoundContent={t("There is no data to display.")}
        >
          {customers.map((customer) => (
            <SelectAtom.Option key={customer.id} value={customer.id}>
              {customer.name}
            </SelectAtom.Option>
          ))}
        </SelectAtom>
      </FormItemMolecule>
      <FormItemMolecule
        label={t("Users (Assignees)")}
        name="assignedUsers"
        rules={[
          { required: true, message: t("Please select at least one user.") },
        ]}
      >
        <SelectAtom
          mode="multiple"
          placeholder={t("Users (Assignees)")}
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
      <FormItemMolecule label={t("Tasks")} name="assignedTasks">
        <TooltipAtom title={filteredTasks.length === 0 ? t('Select a customer first.') : ''}>
          <SelectAtom
            mode="multiple"
            placeholder={t("Tasks")}
            loading={tasksLoading}
            allowClear
            disabled={filteredTasks.length === 0}
            style={{ background: "white", borderRadius: "6px" }}
            notFoundContent={t("There is no data to display.")}
          >
            {filteredTasks.map((task) => (
              <SelectAtom.Option key={task.value} value={task.value}>
                {task.label}
              </SelectAtom.Option>
            ))}
          </SelectAtom>
        </TooltipAtom>
      </FormItemMolecule>
      <Form.Item>
        <ButtonAtom type="primary" htmlType="submit">
          {isEditMode ? t("Edit") : t("Create")}
        </ButtonAtom>
      </Form.Item>
    </Form>
  );
}

export default ProjectCreationFormOrganism;
