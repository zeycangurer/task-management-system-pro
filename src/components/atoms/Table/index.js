import React from 'react';
import { Table } from 'antd';
import './styles.css';
import { useTranslation } from 'react-i18next';

function TableAtom({ data, onDataClick, dataType }) {
  const { t } = useTranslation();

  const columns = [
    { title: t('Title'), dataIndex: 'title', key: 'title' },
  ];

  if (dataType === 'analytics') {
    columns.push(
      { title: t('Assignee'), dataIndex: 'assignedToName', key: 'assignedToName' },
      {
        title: t('Status'),
        dataIndex: 'status',
        key: 'status',
        render: (status) => (
          <span className={`status ${status === 'close' ? 'completed' : 'pending'}`}>
            {status === 'close' ? t('Completed') : t('Pending')}
          </span>
        ),
      },
      { title: t('End Date'), dataIndex: 'dueDate', key: 'dueDate', defaultSortOrder: 'ascend' }
    );
  } else {
    columns.push(
      { title: t('Description'), dataIndex: 'description', key: 'description' },
      { title: t('Assignee'), dataIndex: 'assignedToName', key: 'assignedToName' },
      { title: t('Creator'), dataIndex: 'createdUserName', key: 'createdUserName' },
      {
        title: 'Oluşturulma Tarihi',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt) =>
          createdAt ? new Date(createdAt.seconds * 1000).toLocaleDateString() : 'N/A',
      },
      {
        title: t('Creation Date'),
        dataIndex: 'status',
        key: 'status',
        render: (status) => (
          <span className={`status ${status === 'close' ? 'completed' : 'pending'}`}>
            {status === 'close' ? t('Completed') : t('Pending')}
          </span>
        ),
      }
    );
  }
console.log(data)
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
