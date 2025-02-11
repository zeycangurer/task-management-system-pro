import React from 'react';
import { FaCheck, FaTrash, FaHistory, FaEdit } from 'react-icons/fa';
import { MdAddTask } from 'react-icons/md';
import ActionButton from '../../molecules/ActionButton';

import './styles.css';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function ProjectHeader({
  project,
  onBack,
  onEditProject,
  onDeleteProject,
  onToggleComplete,
  onCreateTask,
  showHistoryModal,
  size
}) {
  const userRole = useSelector(state => state.profiles.user?.role)
  const { t } = useTranslation();

  return (
    <div className="project-header">
      <div className="title-section">
        <h2 className="project-title">{project.title}</h2>
      </div>
      <div className="buttons-container-projectheader">
        <ActionButton
          tooltipTitle={t('History')}
          icon={FaHistory}
          onClick={showHistoryModal}
          className="action-button history-button"
          size={size}
          type="primary"
        />
        {userRole === 'admin' || userRole === 'manager' || userRole === 'customer' ?
          <>
            <ActionButton
              tooltipTitle={t('Edit')}
              icon={FaEdit}
              onClick={onEditProject}
              className="action-button edit-button"
              size={size}
              type="primary"
            />
            <ActionButton
              tooltipTitle={t('Delete')}
              icon={FaTrash}
              onClick={onDeleteProject}
              className="action-button delete-button"
              size={size}
              type="danger"
            />
            <ActionButton
              tooltipTitle={t('Create Task')}
              icon={MdAddTask}
              onClick={onCreateTask}
              className="action-button create-button"
              size={size}
              type="primary"
            />
          </> : null}

        <ActionButton
          tooltipTitle={project.status === 'close' ? t('Reopen Project') : t('Complete Project')}
          icon={FaCheck}
          onClick={onToggleComplete}
          className="action-button save-button"
          size={size}
          type="primary"
        />

      </div>
    </div>
  );
}

export default ProjectHeader;

