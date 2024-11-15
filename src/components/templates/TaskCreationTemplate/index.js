import React from 'react';
import TaskCreationFormOrganism from '../../organisms/TaskCreationForm';

function TaskCreationTemplate({ onSubmit, customers, priorities, categories }) {
  return (
    <div className="task-creation-template">
      <h1>Yeni Görev Oluştur</h1>
      <TaskCreationFormOrganism
        onSubmit={onSubmit}
        customers={customers}
        priorities={priorities}
        categories={categories}
      />
    </div>
  );
}

export default TaskCreationTemplate;
