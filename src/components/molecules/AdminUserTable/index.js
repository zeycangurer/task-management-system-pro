import React from 'react';
import { Table } from 'antd';
import AdminActionButtons from '../AdminActionButtons';
import { useNavigate } from 'react-router-dom';

function AdminUserTable({ users, onDelete }) {
  const navigate = useNavigate()

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'manager':
        return 'Yönetici';
      case 'user':
        return 'Çalışan';
      case 'customer':
        return 'Müşteri';
      default:
        return 'Bilinmiyor';
    }
  };

  const handleEdit = (user) => {
    navigate(`/admin/${user.id}/edit`, { state: { userData: user } });
  };

  const columns = [
    { title: 'Ad', dataIndex: 'name', key: 'name' },
    { title: 'E-posta', dataIndex: 'email', key: 'email' },
    { title: 'Rol', dataIndex: 'role', key: 'role', render: (role) => getRoleLabel(role) },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_, record) => (
        <AdminActionButtons onEdit={() => handleEdit(record)} onDelete={() => onDelete(record.id)} />
      ),
    },
  ];

  // console.log(users)


  return <Table columns={columns} dataSource={users} rowKey="id" pagination={{ pageSize: 6 }} scroll={{ x: true }} />;
}

export default AdminUserTable;
