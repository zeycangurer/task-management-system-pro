import React from 'react';
import { Table } from 'antd';
import './styles.css';

function TableAtom({ data, onDataClick, dataType }) {
  const columns = [
    { title: 'Başlık', dataIndex: 'title', key: 'title' },
  ];

  if (dataType === 'analytics') {
    columns.push(
      { title: 'Atanan Kullanıcılar', dataIndex: 'assignedToName', key: 'assignedToName' },
      {
        title: 'Durum',
        dataIndex: 'status',
        key: 'status',
        render: (status) => (
          <span className={`status ${status === 'close' ? 'completed' : 'pending'}`}>
            {status === 'close' ? 'Tamamlandı' : 'Bekliyor'}
          </span>
        ),
      },
      { title: 'Bitiş Tarihi', dataIndex: 'dueDate', key: 'dueDate', defaultSortOrder: 'ascend' }
    );
  } else {
    columns.push(
      { title: 'Tanım', dataIndex: 'description', key: 'description' },
      { title: 'Atanan Kişi', dataIndex: 'assignedToName', key: 'assignedToName' },
      { title: 'Oluşturan Kişi', dataIndex: 'createdUserName', key: 'createdUserName' },
      {
        title: 'Oluşturulma Tarihi',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt) =>
          createdAt ? new Date(createdAt.seconds * 1000).toLocaleDateString() : 'N/A',
      },
      {
        title: 'Durum',
        dataIndex: 'status',
        key: 'status',
        render: (status) => (
          <span className={`status ${status === 'close' ? 'completed' : 'pending'}`}>
            {status === 'close' ? 'Tamamlandı' : 'Bekliyor'}
          </span>
        ),
      }
    );
  }

  return (
    <div className="data-list-container">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 6 }} 
        onRow={(record) => ({
          onClick: () => onDataClick(record.id),
        })}
        className="custom-table"
        scroll={{ x: true }}
      />
    </div>
  );
}

export default TableAtom;
