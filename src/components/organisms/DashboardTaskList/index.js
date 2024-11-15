import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { FaCheckCircle, FaCircle, FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import ButtonAtom from '../../atoms/Button'; 

function DashboardTaskList({ tasks }) {
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.user);

  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleCreateTask = () => {
    navigate('/createTask');
  };

  return (
    <div className="task-list">
      <h3>Görevler</h3>
      <ButtonAtom type="primary" onClick={handleCreateTask} className="create-task-button">
        <FaPlus /> Görev Oluştur
      </ButtonAtom>
      <ul>
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} onClick={() => handleTaskClick(task.id)}>
              <span className="task-title">{task.title}</span>
              <span className="task-status">
                {task.completed ? (
                  <FaCheckCircle className="task-icon completed-icon" />
                ) : (
                  <FaCircle className="task-icon" />
                )}
              </span>
            </li>
          ))
        ) : (
          <li>Görev bulunamadı.</li>
        )}
      </ul>
    </div>
  );
}

export default DashboardTaskList;
