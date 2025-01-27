import React from 'react';
import { Table } from 'antd';
import AdminActionButtons from '../AdminActionButtons';

function AdminProjectTable({ projects, onEdit, onDelete }) {
  const columns = [
    { title: 'Proje Adı', dataIndex: 'title', key: 'title' },
    { title: 'Müşteri', dataIndex: 'customerName', key: 'customerName' },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_, record) => (
        <AdminActionButtons onEdit={() => onEdit(record)} onDelete={() => onDelete(record.id)} />
      ),
    },
  ];

  return <Table columns={columns} dataSource={projects} rowKey="id" />;
}

export default AdminProjectTable;
