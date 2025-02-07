import React, { useRef, useState } from 'react';
import { Table, Input, Space, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import AdminActionButtons from '../AdminActionButtons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function AdminUserTable({ users, onDelete }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : false,
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

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
    {
      title: t('Name'),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => (a.name || '').localeCompare(b.name || ''),
      sortDirections: ['ascend', 'descend'],
      ...getColumnSearchProps('name'),
    },
    {
      title: t('Email'),
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => (a.email || '').localeCompare(b.email || ''),
      sortDirections: ['ascend', 'descend'],
      ...getColumnSearchProps('email'),
    },
    {
      title: t('Role'),
      dataIndex: 'role',
      key: 'role',
      render: (role) => getRoleLabel(role),
      sorter: (a, b) => (a.role || '').localeCompare(b.role || ''),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: t('Operations'),
      key: 'actions',
      render: (_, record) => (
        <AdminActionButtons
          onEdit={() => handleEdit(record)}
          onDelete={() => onDelete(record.id)}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey="id"
      pagination={{ pageSize: 6 }}
      scroll={{ x: 600, y: 400 }}
        locale={{
          emptyText: t('No data found matching your search criteria.'),
        }}
    />
  );
}

export default AdminUserTable;
