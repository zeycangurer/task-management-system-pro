import React, { useState } from 'react';
import TaskItem from '../../atoms/TaskItem';
import { Pagination } from 'antd';
import './styles.css';

function UpcomingTasks({ tasks }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const upcomingTasks = tasks
    ?.filter(task => task.dueDate && task.status !== 'close')
    .sort((a, b) => a.dueDate.seconds - b.dueDate.seconds);

  const paginatedTasks = upcomingTasks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="upcoming-tasks">
      <h2>Yaklaşan Görevler</h2>
      <div className="task-list">
        {paginatedTasks.length > 0 ? (
          paginatedTasks.map(task => (
            <TaskItem key={task.id} id={task.id} title={task.title} dueDate={new Date(task.dueDate.seconds * 1000)} />
          ))
        ) : (
          <p>Yaklaşan görev bulunmamaktadır.</p>
        )}
      </div>
      
      {upcomingTasks.length > pageSize && (
        <Pagination
          className="custom-pagination"
          current={currentPage}
          pageSize={pageSize}
          total={upcomingTasks.length}
          onChange={page => setCurrentPage(page)}
        />
      )}
    </div>
  );
}

export default UpcomingTasks;
