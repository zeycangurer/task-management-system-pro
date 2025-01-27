import React from 'react';
import { Table } from 'antd';
import AdminActionButtons from '../AdminActionButtons';

function AdminUserTable({ users, onEdit, onDelete }) {
  const columns = [
    { title: 'Ad', dataIndex: 'name', key: 'name' },
    { title: 'E-posta', dataIndex: 'email', key: 'email' },
    { title: 'Rol', dataIndex: 'role', key: 'role' },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_, record) => (
        <AdminActionButtons onEdit={() => onEdit(record)} onDelete={() => onDelete(record.id)} />
      ),
    },
  ];

  return <Table columns={columns} dataSource={users} rowKey="id" />;
}

export default AdminUserTable;
