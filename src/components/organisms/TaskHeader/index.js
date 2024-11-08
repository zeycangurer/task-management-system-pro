import React from 'react';
import { Row, Col } from 'antd';
import TitleEditMolecule from '../../molecules/TitleEditMolecule';
import ActionButton from '../../molecules/ActionButton';
import { FaEdit, FaCheck, FaTrash, FaHistory, FaRegTimesCircle } from 'react-icons/fa';
import './styles.css';

function TaskHeader({
  isEditing,
  editTitle,
  setEditTitle,
  handleEditTitle,
  setIsEditing,
  showHistoryModal,
  handleDeleteTask,
  handleToggleComplete,
  size,
  task,
}) {
  return (
    <div className="task-header">
      <div className="title-section">
        {isEditing ? (
          <TitleEditMolecule
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onSave={handleEditTitle}
            size={size}
          />
        ) : (
          <div className="title-container">
            <h2 className="task-title">{task.title}</h2>
          </div>
        )}
      </div>
      <div className="buttons-container">
        <ActionButton
          tooltipTitle="Tarihçe"
          icon={FaHistory}
          onClick={showHistoryModal}
          className="action-button history-button"
          size={size}
        />
        {isEditing ? (
          <ActionButton
            tooltipTitle="İptal"
            icon={FaRegTimesCircle}
            onClick={() => setIsEditing(false)}
            className="action-button cancel-button"
            size={size}
            type="primary"
          />
        ) : (
          <ActionButton
            tooltipTitle="Düzenle"
            icon={FaEdit}
            onClick={() => setIsEditing(true)}
            className="action-button edit-button"
            size={size}
            type="default"
          />
        )}
        <ActionButton
          tooltipTitle="Sil"
          icon={FaTrash}
          onClick={handleDeleteTask}
          className="action-button delete-button"
          size={size}
          type="danger"
        />
        <ActionButton
          tooltipTitle={task.completed ? 'Görevi Geri Al' : 'Görevi Tamamla'}
          icon={FaCheck}
          onClick={handleToggleComplete}
          className="action-button complete-button"
          size={size}
          type="primary"
        />
      </div>
    </div>
  );
}

export default TaskHeader;
