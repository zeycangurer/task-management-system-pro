import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { FaCheckCircle, FaCircle, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../../store/actions/taskActions'; 

function DashboardTaskList({ tasks }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const currentUser = useSelector((state) => state.auth.user);

  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim() === '') return;

    const task = {
      title: newTaskTitle,
      completed: false,
      assignedTo: [],
      history: [],
      createdAt: new Date(), 
      updatedAt: new Date(),
      status: 'open',
      customer: '', 
      description: '', 
      createdUser: currentUser ? currentUser.uid : '', 
      dueDate: new Date(), 
    };

    dispatch(addTask(task, currentUser ? currentUser.uid : ''))
      .then(() => {
        console.log("eklendi")
      })
      .catch((error) => {
        console.error('Görev eklenirken hata oluştu:', error);
      });

    setNewTaskTitle('');
  };

  return (
    <div className="task-list">
      <h3>Görevler</h3>
      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          placeholder="Yeni görev ekle..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          required
        />
        <button type="submit" className="add-task-button">
          <FaPlus />
        </button>
      </form>
      <ul>
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} onClick={() => handleTaskClick(task.id)}>
              <span className="task-title">{task.title}</span>
              <span className="task-status">
                {task.completed ? <FaCheckCircle className="task-icon completed-icon" /> : <FaCircle className="task-icon" />}
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
