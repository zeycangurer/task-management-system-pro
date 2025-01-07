import React from 'react';
import { Col, Select, List, Tag, Avatar } from 'antd';
import TooltipAtom from '../../atoms/Tooltip';
import ActionButton from '../../molecules/ActionButton';
import { FaCheck } from 'react-icons/fa';
import { projectCategories, projectPriorities } from '../../../utils/arrays';
import './styles.css'
const { Option } = Select;

function ProjectInfo({
  project,
  assignedUsers,
  sortedUsers,
  assignment,
  handleAssignChange,
  handleAssignSubmit,
  size,
  createdUserName,
  projectCustomer
}) {
  const statusColor = project.status === 'close' ? 'green' : 'blue';
  const statusLabel = project.status === 'close' ? 'Tamamlandı' : 'Tamamlanmadı';
  const priorityColor = project.priority === 'high' ? 'red' : project.priority === 'medium' ? 'orange' : 'blue';
  const priorityLabel = projectPriorities.filter(item => item.value === project.priority)[0].label || 'Belirsiz';
  const categoryLabel = projectCategories.filter(item => item.value === project.category)[0].label || 'Belirsiz';

  const startDateStr = project.startDate ? project.startDate.toDate().toLocaleDateString() : 'Belirtilmemiş';
  const endDateStr = project.endDate ? project.endDate.toDate().toLocaleDateString() : 'Belirtilmemiş';

  return (
    <div className='project-info'>
      <p><strong>Açıklama: </strong>{project.description}</p>
      <p><strong>Oluşturan Kişi: </strong>{createdUserName}</p>
      <p><strong>Kategori: </strong>{categoryLabel}</p>
      <p><strong>Müşteri: </strong>{projectCustomer[0].name || 'Belirsiz'}</p>
      <p><strong>Durum: </strong><Tag color={statusColor}>{statusLabel}</Tag></p>
      <p><strong>Öncelik: </strong><Tag color={priorityColor}>{priorityLabel}</Tag></p>
      <p><strong>Başlangıç Tarihi: </strong>{startDateStr}</p>
      <p><strong>Bitiş Tarihi: </strong>{endDateStr}</p>

      <p><strong>Atanan Kullanıcılar</strong></p>
      <List
        itemLayout="horizontal"
        dataSource={assignedUsers}
        grid={{
          column: assignedUsers.length || 1,
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
            optionLabelProp="label"
          >
            <Option key="all" value="all" label="Tüm Kullanıcılar">
              Tüm Kullanıcılar
            </Option>
            {sortedUsers.map((user) => (
              <Option key={user.id} value={user.id} label={user.name || user.email}>
                {user.name || user.email}
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

export default ProjectInfo;
