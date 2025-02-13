import React from 'react';
import { Col, Select, List, Tag, Avatar } from 'antd';
import TooltipAtom from '../../atoms/Tooltip';
import ActionButton from '../../molecules/ActionButton';
import { FaCheck } from 'react-icons/fa';
import { projectCategories, projectPriorities } from '../../../utils/arrays';
import './styles.css'
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const statusColor = project.status === 'close' ? 'green' : 'blue';
  const statusLabel = project.status === 'close' ? t('Complete') : t('Incomplete');
  const priorityColor = project.priority === 'high' ? 'red' : project.priority === 'medium' ? 'orange' : 'blue';
  const priorityLabel = projectPriorities.filter(item => item.value === project.priority)[0].label || t('Not specified');
  const categoryLabel = projectCategories.filter(item => item.value === project.category)[0].label || t('Not specified');

  const startDateStr = project.startDate ? project.startDate.toDate().toLocaleDateString() : t('Not specified');
  const endDateStr = project.endDate ? project.endDate.toDate().toLocaleDateString() : t('Not specified');

  return (
    <div className='project-info'>
      <p><strong>{t('Description')}: </strong>{project.description}</p>
      <p><strong>{t('Created By')}: </strong>{createdUserName}</p>
      <p><strong>{t('Category')}: </strong>{categoryLabel}</p>
      <p>
        <strong>{t('Customer')}: </strong>
        {(projectCustomer && projectCustomer[0] && projectCustomer[0].name) 
          ? projectCustomer[0].name 
          : t('No customer info.')}
      </p>
      <p><strong>{t('Status')}: </strong><Tag color={statusColor}>{statusLabel}</Tag></p>
      <p><strong>{t('Priority')}: </strong><Tag color={priorityColor}>{priorityLabel}</Tag></p>
      <p><strong>{t('Start Date')}: </strong>{startDateStr}</p>
      <p><strong>{t('End Date')}: </strong>{endDateStr}</p>

      <p><strong>{t('Assigned Users')}</strong></p>
      {assignedUsers && assignedUsers.length > 0 ? (
        <div className="assigned-users-container">
          {assignedUsers.map(user => (
            <div key={user.id} className="assigned-user-item">
              <Avatar>{(user.name || user.email)[0].toUpperCase()}</Avatar>
              <span className="assigned-user-title">{user.name || user.email}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>{t('No assignment')}</p>
      )}



      <h3>{t('User Assignment')}</h3>
      <Col xs={24} sm={16} md={12}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <Select
            mode="multiple"
            allowClear
            placeholder={t('Users to be assigned')}
            value={assignment.includes('all') ? ['all'] : assignment}
            onChange={handleAssignChange}
            style={{ flex: 1, marginRight: '8px' }}
            optionLabelProp="label"
          >
            <Option key="all" value="all" label={t('All Users')}>
            {t('All Users')}
            </Option>
            {sortedUsers.map((user) => (
              <Option key={user.id} value={user.id} label={user.name || user.email}>
                {user.name || user.email}
              </Option>
            ))}
          </Select>
          <TooltipAtom title={t('Assignment Tooltip')}>
            <ActionButton
              tooltipTitle={t('Assignment')}
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
