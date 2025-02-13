import React from 'react';
import { Row, Col, Modal } from 'antd';
import TitleEditMolecule from '../../molecules/TitleEditMolecule';
import ActionButton from '../../molecules/ActionButton';
import { FaEdit, FaCheck, FaTrash, FaHistory, FaRegTimesCircle } from 'react-icons/fa';
import './styles.css';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const { confirm } = Modal;

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
  const { t } = useTranslation();

  const handleDelete = () => {
    confirm({
      title: t('confirm.deleteTaskTitle'),
      content: t('confirm.deleteContent'),
      okText: t('confirm.yes'),
      cancelText: t('confirm.no'),
      onOk() {
        handleDeleteTask();
      },
      onCancel() {
      }
    });
  };
  return (
    <div className="task-header">
      <div className="title-section">
        <div className="title-container">
          <h2 className="task-title">{task.title}</h2>
        </div>
      </div>
      <div className="buttons-container">
        <ActionButton
          tooltipTitle={t('History')}
          icon={FaHistory}
          onClick={showHistoryModal}
          className="action-button history-button"
          size={size}
        />
        {userRole === 'admin' || userRole === 'manager' || userRole === 'customer' ?
          <>
            <ActionButton
              tooltipTitle={t('Edit')}
              icon={FaEdit}
              onClick={onEditTask}
              className="action-button edit-button"
              size={size}
              type="default"
            />
            <ActionButton
              tooltipTitle={t('Delete')}
              icon={FaTrash}
              onClick={handleDelete}
              className="action-button delete-button"
              size={size}
              type="danger"
            />
          </> : null}

        <ActionButton
          tooltipTitle={
            task.status === 'close'
              ? t('Reopen Task')
              : t('Complete Task')
          } icon={FaCheck}
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
