import React from 'react';
import { Table } from 'antd';
import AdminActionButtons from '../AdminActionButtons';

function AdminTaskTable({ tasks, onEdit, onDelete }) {
  const columns = [
    { title: 'Görev Adı', dataIndex: 'title', key: 'title' },
    { title: 'Atanan Kişi', dataIndex: 'assignedToName', key: 'assignedToName' },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_, record) => (
        <AdminActionButtons onEdit={() => onEdit(record)} onDelete={() => onDelete(record.id)} />
      ),
    },
  ];

  return <Table columns={columns} dataSource={tasks} rowKey="id" />;
}

export default AdminTaskTable;
