import React from 'react';
import TaskItem from '../../atoms/TaskItem';
import './styles.css';

function UpcomingTasks({ tasks }) {
  const upcomingTasks = tasks
    ?.filter(task => task.dueDate && task.status !== 'close')
    .sort((a, b) => a.dueDate.seconds - b.dueDate.seconds)
    .slice(0, 5);

  return (
    <div className="upcoming-tasks">
      <h2 className="section-title">Yaklaşan Görevler</h2>
      <div className="task-list">
        {upcomingTasks.length > 0 ? (
          upcomingTasks.map(task => (
            <TaskItem 
              id={task.id} 
              key={task.id} 
              title={task.title} 
              dueDate={new Date(task.dueDate.seconds * 1000)} 
            />
          ))
        ) : (
          <p className="no-tasks">Henüz yaklaşan görev bulunmamaktadır.</p>
        )}
      </div>
    </div>
  );
}

export default UpcomingTasks;
