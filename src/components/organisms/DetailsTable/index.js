import React, { useState } from 'react';
import TableAtom from '../../atoms/Table';
import { DatePicker, Select } from 'antd';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { Option } = Select;

function DetailsTable({ tasks, users }) {
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
      .map((userId) => users.find((user) => user.id === userId)?.name || 'Bilinmiyor')
      .join(', '),
    dueDate: task.dueDate ? task.dueDate.toDate().toLocaleDateString() : 'Belirtilmemiş',
  }));

  const handleRowClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };
  return (
    <div className="table-container">
      <div className="filters-container">
        <Select
          mode="multiple"
          placeholder="Kullanıcı seçin"
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
          placeholder="Durum seçin"
          style={{ width: 150, marginRight: 10 }}
          onChange={handleStatusFilter}
          value={selectedStatus}
          allowClear
        >
          <Option value="open">Tamamlanmadı</Option>
          <Option value="close">Tamamlandı</Option>
        </Select>

        <RangePicker 
        onChange={handleDateFilter} 
        placeholder={['Başlangıç Tarihi', 'Bitiş Tarihi']}
        value={selectedDateRange.length > 0 ? selectedDateRange : null}
 />
      </div>

      {data.length === 0 ? (
        <p style={{ paddingBlock: 20, paddingInline: 5 }}>Seçtiğiniz kriterlerde görev bulunamamaktadır.</p>
      ) : (
        <TableAtom data={data} dataType="analytics" onDataClick={(record) => handleRowClick(record.key)} />
      )}

    </div>
  );
}

export default DetailsTable;
