import React from 'react';
import TaskCreationFormOrganism from '../../organisms/TaskCreationForm';
import './styles.css'

function TaskCreationTemplate({ onSubmit, isEditMode, initialValues }) {
  return (
    <div className="task-creation-template">
      <h1>{isEditMode === true ? 'Görevi Düzenle' : 'Yeni Görev Oluştur'}</h1>
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
