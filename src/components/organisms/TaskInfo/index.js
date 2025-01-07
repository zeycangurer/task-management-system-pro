import React from 'react';
import { Col, Select, List, Avatar, Tag } from 'antd';
import ActionButton from '../../molecules/ActionButton';
import { FaCheck } from 'react-icons/fa'
import TooltipAtom from '../../atoms/Tooltip';
import { taskCategories, taskPriorities } from '../../../utils/arrays';

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
  taskCustomer
}) {
  const statusColor = task.status === 'completed' ? 'green' : 'blue';
  const statusLabel = task.status === 'completed' ? 'Tamamlandı' : 'Tamamlanmadı';
  const priorityColor = task.priority === 'urgent' ? 'red' : task.priority === 'soon' ? 'orange' : 'blue';
  const priorityLabel = taskPriorities.filter(item => item.value === task.priority)[0].label || 'Belirsiz';
  const categoryLabel = taskCategories.filter(item => item.value === task.category)[0].label || 'Belirsiz';
  
  return (
    <div className="task-info">
    <p><strong>Açıklama: </strong>{task.description}</p>
      <p><strong>Oluşturan Kişi: </strong>{createdUserName}</p>
      <p><strong>Kategori: </strong>{categoryLabel}</p>
      <p><strong>Müşteri: </strong>{taskCustomer[0].name || 'Belirsiz'}</p>
      <p><strong>Durum: </strong><Tag color={statusColor}>{statusLabel}</Tag></p>
      <p><strong>Öncelik: </strong><Tag color={priorityColor}>{priorityLabel}</Tag></p>
    
      {task.attachments && task.attachments.length > 0 && (
        <div>
          <p><strong>Ekler:</strong></p>
          <List
            dataSource={task.attachments}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <a href={item} target="_blank" rel="noopener noreferrer">
                  Dosya {index + 1}
                </a>
              </List.Item>
            )}
          />
        </div>
      )}

      <p><strong>Atanan Kullanıcılar</strong></p>

      {assignedUserNames && assignedUserNames.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={assignedUserNames}
          grid={{
            column: assignedUserNames.length || 1,
          }}
          renderItem={(user) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar>{(user.name || user.email)[0].toUpperCase()}</Avatar>}
                title={user.name || user.email}
              />
            </List.Item>
          )}
        />
      ) : (
        <p>Atama yok.</p>
      )}

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
          <TooltipAtom title="Atama">
            <ActionButton
              tooltipTitle="Atama"
              icon={FaCheck}
              onClick={handleAssignSubmit}
              className="action-button assign-button"
              size={size}
              type="primary"
            />
          </TooltipAtom>
        </div>
      </Col>
    </div>
  );
}

export default TaskInfo;
