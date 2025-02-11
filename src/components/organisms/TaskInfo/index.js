import React from 'react';
import { Col, Select, List, Avatar, Tag } from 'antd';
import ActionButton from '../../molecules/ActionButton';
import { FaCheck } from 'react-icons/fa'
import TooltipAtom from '../../atoms/Tooltip';
import { taskCategories, taskPriorities } from '../../../utils/arrays';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './styles.css'
import { useTranslation } from 'react-i18next';

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
  taskCustomer,
  project
}) {
  const { t } = useTranslation();

  const navigate = useNavigate()
  const statusColor = task.status === 'close' ? 'green' : 'blue';
  const statusLabel = task.status === 'close' ? t('Complete Task') : t('Reopen Task');;
  const priorityColor = task.priority === 'urgent' ? 'red' : task.priority === 'soon' ? 'orange' : 'blue';
  const priorityLabel = taskPriorities.filter(item => item.value === task.priority)[0].label || t('Not specified');
  const categoryLabel = taskCategories.filter(item => item.value === task.category)[0].label || t('Not specified');

  const startDateStr = task.createdAt ? task.createdAt.toDate().toLocaleDateString() : t('Not specified');
  const endDateStr = task.dueDate ? task.dueDate.toDate().toLocaleDateString() : t('Not specified');

  // const projects = useSelector((state) => state.projects.projects);
  // const project = task.projectId ? projects.find(p => p.id === task.projectId) : null;

  const handleProjectClick = () => {
    if (task.projectId) {
      navigate(`/projects/${task.projectId}`);
    }
  };
  // console.log(project)

  return (
    <div className="task-info">
      <p><strong>{t('Description')}: </strong>{task.description}</p>
      <p><strong>{t('Created By')}: </strong>{createdUserName}</p>
      <p><strong>{t('Category')}: </strong>{categoryLabel}</p>
      <p><strong>{t('Customer')}: </strong>{taskCustomer[0].name || t('Unknown')}</p>
      <p><strong>{t('Status')}: </strong><Tag color={statusColor}>{statusLabel}</Tag></p>
      <p><strong>{t('Priority')}: </strong><Tag color={priorityColor}>{priorityLabel}</Tag></p>
      <p><strong>{t('Start Date')}: </strong>{startDateStr}</p>
      <p><strong>{t('End Date')}: </strong>{endDateStr}</p>
      <p><strong>{t('Associated Project')}: </strong>{task.projectId ? (
        <span className="project-link" onClick={handleProjectClick}>
          {project.title || t('Loading...')}
        </span>
      ) : (
        t('No project for this task')
      )}</p>


      {task.attachments && task.attachments.length > 0 && (
        <div>
          <p><strong>{t('Attachments')}:</strong></p>
          <List
            dataSource={task.attachments}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <a href={item} target="_blank" rel="noopener noreferrer">
                  {t('File')} {index + 1}
                </a>
              </List.Item>
            )}
          />
        </div>
      )}

      <p><strong>{t('Assigned Users')}</strong></p>


      {assignedUserNames && assignedUserNames.length > 0 ? (
        <div className="assigned-users-container">
          {assignedUserNames.map(user => (
            <div key={user.id} className="assigned-user-item">
              <Avatar>{(user.name || user.email)[0].toUpperCase()}</Avatar>
              <span className="assigned-user-title">{user.name || user.email}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>{t('No assignment')}</p>
      )}

      <Col xs={24} sm={16} md={12}>
        <div className='assignment-dropdown-taskinfo-container'>
          <Select
            mode="multiple"
            allowClear
            placeholder={t('Users to be assigned')}
            value={assignment.includes('all') ? ['all'] : assignment}
            onChange={handleAssignChange}
            style={{ flex: 1, marginRight: '8px' }}
            optionLabelProp="label"
            className="assignment-dropdown"
          >
            <Option key="all" value="all" label={t('All Users')}>
              {t('All Users')}
            </Option>
            {sortedUsers.map((user) => (
              <Option key={user.id} value={user.id} label={user.name}>
                {user.name}
              </Option>
            ))}
          </Select>
          <TooltipAtom title={t('Assignment Tooltip')}>
            <ActionButton
              tooltipTitle={t('Assignment')}
              icon={FaCheck}
              onClick={handleAssignSubmit}
              className="action-button assign-button assign-button-taskinfo"
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
