import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegCalendarAlt } from 'react-icons/fa';
import './styles.css';

function TaskItem({ id, title, dueDate }) {
  const navigate = useNavigate();

  return (
    <div className="task-item" onClick={() => navigate(`/tasks/${id}`)}>
      <div className="task-info">
        <h4 className="task-title">{title}</h4>
        <p className="task-due-date">
          <FaRegCalendarAlt className="calendar-icon" /> {dueDate.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default TaskItem;
