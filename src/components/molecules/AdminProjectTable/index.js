import React from 'react';
import { Table } from 'antd';
import AdminActionButtons from '../AdminActionButtons';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function AdminProjectTable({ projects, onEdit, onDelete }) {
  const { t } = useTranslation();

  const customers = useSelector(state => state.customers.customers);

  const getCustomerName = (customerId) => {
    const customer = customers.find(customer => customer.id === customerId);
    return customer ? customer.name :t('Unknown');
  };


  const columns = [
    { title: t('Project Title'), dataIndex: 'title', key: 'title' },
    {
      title: t('Customer'), dataIndex: 'customerId', key: 'customerId', render: (customerId) => getCustomerName(customerId),
    },
    {
      title: t('Operations'),
      key: 'actions',
      render: (_, record) => (
        <AdminActionButtons onEdit={() => onEdit(record)} onDelete={() => onDelete(record.id)} />
      ),
    },
  ];

  return <Table columns={columns} dataSource={projects} rowKey="id" pagination={{ pageSize: 6 }} scroll={{ x: true }} />;
}

export default AdminProjectTable;
