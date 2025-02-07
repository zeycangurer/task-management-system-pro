import React from 'react';
import { Table } from 'antd';
import AdminActionButtons from '../AdminActionButtons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function AdminUserTable({ users, onDelete }) {
  const { t } = useTranslation();

  const navigate = useNavigate()

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin':
        return t('Admin');
      case 'manager':
        return t('Manager');
      case 'user':
        return t('Employees');
      case 'customer':
        return t('Customers');
      default:
        return t('Unknown');
    }
  };


  const handleEdit = (user) => {
    navigate(`/admin/${user.id}/edit`, { state: { userData: user } });
  };

  const columns = [
    { title: t('Name'), dataIndex: 'name', key: 'name' },
    { title: t('Email'), dataIndex: 'email', key: 'email' },
    { title: t('Role'), dataIndex: 'role', key: 'role', render: (role) => getRoleLabel(role) },
    {
      title: t('Operations'),
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
