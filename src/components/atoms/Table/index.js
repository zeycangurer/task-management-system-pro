import React, { useRef, useState } from "react";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./styles.css";
import { useTranslation } from "react-i18next";

function TableAtom({ data, onDataClick, dataType }) {
  const { t } = useTranslation();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [activeRowId, setActiveRowId] = useState(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const parseDate = (dateField) => {
    if (!dateField) return new Date(0);
    if (dateField.seconds) {
      return new Date(dateField.seconds * 1000);
    }
    const parts = dateField.split(".");
    if (parts.length !== 3) return new Date(0);
    const [day, month, year] = parts;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={t("Search")}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            {t("Search")}
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            {t("Reset")}
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      const recordValue = record[dataIndex]
        ? record[dataIndex].toString().toLowerCase()
        : "";
      return recordValue.includes(value.toLowerCase());
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: t("Title"),
      dataIndex: "title",
      key: "title",
      width: 150,
      sorter: (a, b) => (a.title || "").localeCompare(b.title || ""),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("title"),
    },
  ];

  if (dataType === "analytics") {
    columns.push(
      {
        title: t("Assignee"),
        dataIndex: "assignedToName",
        key: "assignedToName",
        width: 150,
      },
      {
        title: t("Status"),
        dataIndex: "status",
        key: "status",
        width: 120,
        render: (status) => (
          <span
            className={`status ${status === "close" ? "completed" : "pending"}`}
          >
            {status === "close" ? t("Completed") : t("Pending")}
          </span>
        ),
      },
      {
        title: t("End Date"),
        dataIndex: "dueDate",
        key: "dueDate",
        sortDirections: ["ascend", "descend"],
        // defaultSortOrder: "ascend",
        width: 130,
        sorter: (a, b) => {
          const dateA = parseDate(a.dueDate);
          const dateB = parseDate(b.dueDate);
          return dateA - dateB;
        },
      }
    );
  } else {
    columns.push(
      {
        title: t("Description"),
        dataIndex: "description",
        key: "description",
        width: 140,
      },
      {
        title: t("Assignee"),
        dataIndex: "assignedToName",
        key: "assignedToName",
        width: 150,
      },
      {
        title: t("Creator"),
        dataIndex: "createdUserName",
        key: "createdUserName",
        width: 120,
      },
      {
        title: t("Creation Date"),
        dataIndex: "createdAt",
        key: "createdAt",
        sortDirections: ["ascend", "descend"],
        sorter: (a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt.seconds * 1000) : 0;
          const dateB = b.createdAt ? new Date(b.createdAt.seconds * 1000) : 0;
          return dateA - dateB;
        },
        width: 140,
        render: (createdAt) =>
          createdAt
            ? new Date(createdAt.seconds * 1000).toLocaleDateString()
            : "N/A",
      },
      {
        title: t("Status"),
        dataIndex: "status",
        key: "status",
        width: 120,
        render: (status) => (
          <span
            className={`status ${status === "close" ? "completed" : "pending"}`}
          >
            {status === "close" ? t("Completed") : t("Pending")}
          </span>
        ),
      }
    );
  }
  // console.log(data)
  return (
    <div className="data-list-container">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 6 }}
        onRow={(record) => ({
          onClick: () => {
            setActiveRowId(record.id);
            onDataClick(record.id);
          },
        })}
        tableLayout="fixed"
        className="custom-table"
        scroll={{ x: 900, y: 400 }}
        locale={{
          emptyText: t("No data found matching your search criteria."),
        }}
        rowClassName={(record) =>
          record.id === activeRowId ? "active-row" : ""
        }
        
      />
    </div>
  );
}

export default TableAtom;
