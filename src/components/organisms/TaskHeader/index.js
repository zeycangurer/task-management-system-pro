import React from 'react';
import { Row, Col } from 'antd';
import TitleEditMolecule from '../../molecules/TitleEditMolecule';
import ActionButton from '../../molecules/ActionButton';
import { FaEdit, FaCheck, FaTrash, FaHistory, FaRegTimesCircle } from 'react-icons/fa';
import './styles.css';
import { useSelector } from 'react-redux';

function TaskHeader({
  onEditTask,
  setIsEditing,
  showHistoryModal,
  handleDeleteTask,
  handleToggleComplete,
  size,
  task,
}) {
  const userRole = useSelector(state => state.profiles.user?.role)

  return (
    <div className="task-header">
      <div className="title-section">
        <div className="title-container">
          <h2 className="task-title">{task.title}</h2>
        </div>
      </div>
      <div className="buttons-container">
        <ActionButton
          tooltipTitle="Tarihçe"
          icon={FaHistory}
          onClick={showHistoryModal}
          className="action-button history-button"
          size={size}
        />
        {userRole === 'admin' || userRole === 'manager' ?
          <>
            <ActionButton
              tooltipTitle="Düzenle"
              icon={FaEdit}
              onClick={onEditTask}
              className="action-button edit-button"
              size={size}
              type="default"
            />
            <ActionButton
              tooltipTitle="Sil"
              icon={FaTrash}
              onClick={handleDeleteTask}
              className="action-button delete-button"
              size={size}
              type="danger"
            />
          </> : null}

        <ActionButton
          tooltipTitle={task.status === 'close' ? 'Görevi Geri Al' : 'Görevi Tamamla'}
          icon={FaCheck}
          onClick={handleToggleComplete}
          className="action-button save-button"
          size={size}
          type="primary"
        />
      </div>
    </div>
  );
}

export default TaskHeader;
