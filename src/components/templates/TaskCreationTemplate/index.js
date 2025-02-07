import React from 'react';
import TaskCreationFormOrganism from '../../organisms/TaskCreationForm';
import './styles.css'
import { useTranslation } from 'react-i18next';

function TaskCreationTemplate({ onSubmit, isEditMode, initialValues }) {
  const { t } = useTranslation();
  return (
    <div className="task-creation-template">
      <h1>{isEditMode === true ? t('Edit Task') : t('New Task')}</h1>
      <div className="task-creation-form">
        <TaskCreationFormOrganism
          onSubmit={onSubmit}
          initialValues={initialValues}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
}

export default TaskCreationTemplate;
