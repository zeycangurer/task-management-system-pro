import React from 'react';
import { Table } from 'antd';
import AdminActionButtons from '../AdminActionButtons';
import { useSelector } from 'react-redux';

function AdminProjectTable({ projects, onEdit, onDelete }) {
  const customers = useSelector(state => state.customers.customers);

  const getCustomerName = (customerId) => {
    const customer = customers.find(customer => customer.id === customerId);
    return customer ? customer.name : 'Bilinmiyor';
  };


  const columns = [
    { title: 'Proje Adı', dataIndex: 'title', key: 'title' },
    {
      title: 'Müşteri', dataIndex: 'customerId', key: 'customerId', render: (customerId) => getCustomerName(customerId),
    },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_, record) => (
        <AdminActionButtons onEdit={() => onEdit(record)} onDelete={() => onDelete(record.id)} />
      ),
    },
  ];

  return <Table columns={columns} dataSource={projects} rowKey="id" pagination={{ pageSize: 6 }} scroll={{ x: true }} />;
}

export default AdminProjectTable;
