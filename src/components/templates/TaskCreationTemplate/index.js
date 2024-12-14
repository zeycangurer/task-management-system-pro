import React from 'react';
import TaskCreationFormOrganism from '../../organisms/TaskCreationForm';
import './styles.css'

function TaskCreationTemplate({ onSubmit, customers, priorities, categories, projectId, projects }) {
  return (
    <div className="task-creation-template">
      <h1>Yeni Görev Oluştur</h1>
      <div className="task-creation-form">
        <TaskCreationFormOrganism
          onSubmit={onSubmit}
          customers={customers}
          priorities={priorities}
          categories={categories}
          initialValues={{ projectId }}
          projects={projects}
        />
      </div>
    </div>
  );
}

export default TaskCreationTemplate;
