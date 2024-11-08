import React from 'react';
import { Col, Select, Tooltip } from 'antd';
import ActionButton from '../../molecules/ActionButton';
import { FaCheck } from 'react-icons/fa'

const { Option } = Select;

function TaskInfo({
  task,
  assignedUserNames,
  formattedCreatedAt,
  createdUserName,
  assignment,
  handleAssignChange,
  handleAssignSubmit,
  sortedUsers,
  size,
}) {
  return (
    <div className="task-info">
      <p>
        <strong>Durum:</strong> {task.completed ? 'Tamamlandı' : 'Tamamlanmadı'}
      </p>
      <p>
        <strong>Atanan Kişi:</strong> {assignedUserNames}
      </p>
      <p>
        <strong>Oluşturulma Tarihi:</strong> {formattedCreatedAt}
      </p>
      <p>
        <strong>Görev İçeriği:</strong> {task.description || 'Açıklama yok.'}
      </p>
      <p>
        <strong>Oluşturan Kişi:</strong> {createdUserName}
      </p>
      <Col xs={24} sm={16} md={12}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Select
            mode="multiple"
            allowClear
            placeholder="Atanacak kişiler"
            value={assignment.includes('all') ? ['all'] : assignment}
            onChange={handleAssignChange}
            style={{ flex: 1, marginRight: '8px' }}
            optionLabelProp="label"
          >
            <Option key="all" value="all" label="Tüm Kullanıcılar">
              Tüm Kullanıcılar
            </Option>
            {sortedUsers.map((user) => (
              <Option key={user.id} value={user.id} label={user.name}>
                {user.name}
              </Option>
            ))}
          </Select>
          <Tooltip title="Atama">
            <ActionButton
              tooltipTitle="Atama"
              icon={FaCheck}
              onClick={handleAssignSubmit}
              className="action-button assign-button"
              size={size}
              type="primary"
            />
          </Tooltip>
        </div>
      </Col>
    </div>
  );
}

export default TaskInfo;
