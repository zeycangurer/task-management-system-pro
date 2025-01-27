import React from 'react';
import { Table } from 'antd';
import AdminActionButtons from '../AdminActionButtons';
import { useSelector } from 'react-redux';

function AdminTaskTable({ tasks, onEdit, onDelete }) {
  const users = useSelector(state => state.users.users);

  const getUserNames = (assignedTo) => {
    if (!assignedTo || !Array.isArray(assignedTo)) return 'Atanan Yok';

    const assignedNames = assignedTo.map(userId => {
      const user = users.find(user => user.id === userId);
      return user ? user.name : 'Bilinmiyor';
    });

    return assignedNames.join(', ');
  };

  const columns = [
    { title: 'Görev Adı', dataIndex: 'title', key: 'title' },
    {
      title: 'Atanan Kişi', dataIndex: 'assignedTo', key: 'assignedTo', render: (assignedTo) => getUserNames(assignedTo),
    },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_, record) => (
        <AdminActionButtons onEdit={() => onEdit(record)} onDelete={() => onDelete(record.id)} />
      ),
    },
  ];

  return <Table columns={columns} dataSource={tasks} rowKey="id" pagination={{ pageSize: 6 }} scroll={{ x: true }} />;
}

export default AdminTaskTable;
