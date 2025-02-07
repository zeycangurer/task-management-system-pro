import React, { useState } from 'react';
import TableAtom from '../../atoms/Table';
import { DatePicker, Select } from 'antd';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { RangePicker } = DatePicker;
const { Option } = Select;

function DetailsTable({ tasks, users }) {
  const { t } = useTranslation();

  const navigate = useNavigate()
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState([]);

  const handleUserFilter = (selectedUserIds) => {
    setSelectedUsers(selectedUserIds);
    filterData(selectedUserIds, selectedStatus, selectedDateRange);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    filterData(selectedUsers, status, selectedDateRange);
  };

  const handleDateFilter = (dates) => {
    const validDates = dates || [];
    setSelectedDateRange(validDates);
    filterData(selectedUsers, selectedStatus, validDates);
  };

  const filterData = (userIds, status, dateRange) => {
    let filtered = tasks;

    if (userIds.length > 0) {
      filtered = filtered.filter((task) =>
        task.assignedTo.some((userId) => userIds.includes(userId))
      );
    }

    if (status) {
      filtered = filtered.filter((task) => task.status === status);
    }

    if (dateRange.length === 2) {
      const [start, end] = dateRange;
      filtered = filtered.filter(
        (task) =>
          task.dueDate &&
          task.dueDate.toDate() >= start.toDate() &&
          task.dueDate.toDate() <= end.toDate()
      );
    }

    setFilteredTasks(filtered);
  };

  const data = filteredTasks.map((task) => ({
    key: task.id,
    title: task.title,
    status: task.status,
    assignedToName: task.assignedTo
      .map((userId) => users.find((user) => user.id === userId)?.name || t('Unknown'))
      .join(', '),
    dueDate: task.dueDate ? task.dueDate.toDate().toLocaleDateString() : t('Not specified'),
  }));

  const handleRowClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };
  return (
    <div className="table-container">
      <div className="filters-container">
        <Select
          mode="multiple"
          placeholder={t('Select User(s)')}
          style={{ width: 200, marginRight: 10 }}
          onChange={handleUserFilter}
          value={selectedUsers}
        >
          {users.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.name}
            </Option>
          ))}
        </Select>

        <Select
          placeholder={t('Select Status')}
          style={{ width: 150, marginRight: 10 }}
          onChange={handleStatusFilter}
          value={selectedStatus}
          allowClear
        >
          <Option value="open">{t('Incomplete')}</Option>
          <Option value="close">{t('Completed')}</Option>
        </Select>

        <RangePicker
          onChange={handleDateFilter}
          placeholder={[t('Start Date'), t('End Date')]}
          value={selectedDateRange.length > 0 ? selectedDateRange : null}
        />
      </div>

      {data.length === 0 ? (
        <p style={{ paddingBlock: 20, paddingInline: 5 }}> {t('No tasks found based on your criteria.')}</p>
      ) : (
        <TableAtom data={data} dataType="analytics" onDataClick={(record) => handleRowClick(record.key)} />
      )}

    </div>
  );
}

export default DetailsTable;
