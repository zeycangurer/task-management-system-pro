import React from 'react';
import { Table } from 'antd';
import AdminActionButtons from '../AdminActionButtons';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function AdminTaskTable({ tasks, onEdit, onDelete }) {
  const { t } = useTranslation();

  const users = useSelector(state => state.users.users);

  const getUserNames = (assignedTo) => {
    if (!assignedTo || !Array.isArray(assignedTo)) return t('No one assigned');

    const assignedNames = assignedTo.map(userId => {
      const user = users.find(user => user.id === userId);
      return user ? user.name : t('Unknown');
    });

    return assignedNames.join(', ');
  };

  const columns = [
    { title: t('Task Title'), dataIndex: 'title', key: 'title' },
    {
      title: t('Assigned Users'), dataIndex: 'assignedTo', key: 'assignedTo', render: (assignedTo) => getUserNames(assignedTo),
    },
    {
      title: t('Operations'),
      key: 'actions',
      render: (_, record) => (
        <AdminActionButtons onEdit={() => onEdit(record)} onDelete={() => onDelete(record.id)} />
      ),
    },
  ];

  return <Table columns={columns} dataSource={tasks} rowKey="id" pagination={{ pageSize: 6 }} scroll={{ x: true }} />;
}

export default AdminTaskTable;
