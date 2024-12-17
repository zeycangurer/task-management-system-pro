import React from 'react';
import { Col, Select, List, Tag, Avatar } from 'antd';
import TooltipAtom from '../../atoms/Tooltip';
import ActionButton from '../../molecules/ActionButton';
import { FaCheck } from 'react-icons/fa';
import { projectPriorities } from '../../../utils/arrays';

const { Option } = Select;

function ProjectInfo({
  project,
  assignedUsers,
  sortedUsers,
  assignment,
  handleAssignChange,
  handleAssignSubmit,
  tasks,
  onTaskClick,
  size
}) {
  const statusColor = project.status === 'completed' ? 'green' : 'blue';
  const statusLabel = project.status === 'completed' ? 'Tamamlandı' : 'Tamamlanmadı';
  const priorityColor = project.priority === 'high' ? 'red' : project.priority === 'medium' ? 'orange' : 'blue';
  const priorityLabel = projectPriorities.find(item => item.value === project.priority)?.label || 'Belirsiz';

  const startDateStr = project.startDate ? project.startDate.toDate().toLocaleDateString() : 'Belirtilmemiş';
  const endDateStr = project.endDate ? project.endDate.toDate().toLocaleDateString() : 'Belirtilmemiş';

  return (
    <div>
      <p><strong>Durum: </strong><Tag color={statusColor}>{statusLabel}</Tag></p>
      <p><strong>Öncelik: </strong><Tag color={priorityColor}>{priorityLabel}</Tag></p>
      <p><strong>Başlangıç Tarihi: </strong>{startDateStr}</p>
      <p><strong>Bitiş Tarihi: </strong>{endDateStr}</p>

      <h3>Atanan Kullanıcılar</h3>
      <List
        itemLayout="horizontal"
        dataSource={assignedUsers}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{(user.name || user.email)[0].toUpperCase()}</Avatar>}
              title={user.name || user.email}
            />
          </List.Item>
        )}
      />

      <h3>Kullanıcı Atama</h3>
      <Col xs={24} sm={16} md={12}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <Select
            mode="multiple"
            allowClear
            placeholder="Atanacak kişiler"
            value={assignment.includes('all') ? ['all'] : assignment}
            onChange={handleAssignChange}
            style={{ flex: 1, marginRight: '8px' }}
          >
            <Option key="all" value="all">
              Tüm Kullanıcılar
            </Option>
            {sortedUsers.map((user) => (
              <Option key={user.uid} value={user.uid}>
                {user.displayName || user.email}
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

      <h3>Görevler</h3>
      <List
        itemLayout="horizontal"
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item onClick={() => onTaskClick(task.id)}>
            <List.Item.Meta title={task.title} description={task.description} />
          </List.Item>
        )}
      />
    </div>
  );
}

export default ProjectInfo;
