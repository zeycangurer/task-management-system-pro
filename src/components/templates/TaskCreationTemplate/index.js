import React from 'react';
import TaskCreationFormOrganism from '../../organisms/TaskCreationForm';
import './styles.css'

function TaskCreationTemplate({ onSubmit, customers, priorities, categories }) {
  return (
    <div className="task-creation-template">
      <h1>Yeni Görev Oluştur</h1>
      <div className="task-creation-form">
        <TaskCreationFormOrganism
          onSubmit={onSubmit}
          customers={customers}
          priorities={priorities}
          categories={categories}
        />
      </div>
    </div>
  );
}

export default TaskCreationTemplate;
