import React, { useRef, useState } from 'react';
import { Table, Input, Space, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import AdminActionButtons from '../AdminActionButtons';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function AdminTaskTable({ tasks, onEdit, onDelete }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={t('Search')}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            {t('Search')}
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            {t('Reset')}
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      const recordValue =
        record[dataIndex] ? record[dataIndex].toString().toLowerCase() : '';
      return recordValue.includes(value.toLowerCase());
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const getUserNames = (assignedTo) => {
    if (!assignedTo || !Array.isArray(assignedTo)) return t('No one assigned');

    const assignedNames = assignedTo.map((userId) => {
      const user = users.find((user) => user.id === userId);
      return user ? user.name : t('Unknown');
    });

    return assignedNames.join(', ');
  };

  const columns = [
    {
      title: t('Task Title'),
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => (a.title || '').localeCompare(b.title || ''),
      sortDirections: ['ascend', 'descend'],
      ...getColumnSearchProps('title'),
    },
    {
      title: t('Assigned Users'),
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      render: (assignedTo) => getUserNames(assignedTo),
      sorter: (a, b) => {
        const aNames = getUserNames(a.assignedTo);
        const bNames = getUserNames(b.assignedTo);
        return aNames.localeCompare(bNames);
      },
      sortDirections: ['ascend', 'descend'],
      ...getColumnSearchProps('assignedTo'),
    },
    {
      title: t('Operations'),
      key: 'actions',
      render: (_, record) => (
        <AdminActionButtons
          onEdit={() => onEdit(record)}
          onDelete={() => onDelete(record.id)}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tasks}
      rowKey="id"
      pagination={{ pageSize: 6 }}
      scroll={{ x: 600, y: 400 }}
        locale={{
          emptyText: t('No data found matching your search criteria.'),
        }}    />
  );
}

export default AdminTaskTable;
