import React from 'react';
import { FaCheck, FaTrash, FaHistory, FaEdit } from 'react-icons/fa';
import { MdCreateNewFolder } from "react-icons/md";
import ActionButton from '../../molecules/ActionButton';

import './styles.css';
import { useSelector } from 'react-redux';

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

  return (
    <div className="project-header">
      <div className="title-section">
        <h2 className="project-title">{project.title}</h2>
      </div>
      <div className="buttons-container">
        <ActionButton
          tooltipTitle="Tarihçe"
          icon={FaHistory}
          onClick={showHistoryModal}
          className="action-button history-button"
          size={size}
          type="primary"
        />
        {userRole === 'admin' || userRole  === 'manager' ?
          <>
            <ActionButton
              tooltipTitle="Düzenle"
              icon={FaEdit}
              onClick={onEditProject}
              className="action-button edit-button"
              size={size}
              type="primary"
            />
            <ActionButton
              tooltipTitle="Sil"
              icon={FaTrash}
              onClick={onDeleteProject}
              className="action-button delete-button"
              size={size}
              type="danger"
            />
          </> : null}

        <ActionButton
          tooltipTitle={project.status === 'close' ? 'Görevi Geri Al' : 'Görevi Tamamla'}
          icon={FaCheck}
          onClick={onToggleComplete}
          className="action-button save-button"
          size={size}
          type="primary"
        />
        <ActionButton
          tooltipTitle="Görev Oluştur"
          icon={MdCreateNewFolder}
          onClick={onCreateTask}
          className="action-button create-button"
          size={size}
          type="primary"
        />
      </div>
    </div>
  );
}

export default ProjectHeader;

