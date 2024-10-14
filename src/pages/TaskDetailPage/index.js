
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask, assignTask, deleteTask, addComment } from '../../store/actions/taskActions';
import { FaEdit, FaCheck, FaUserPlus, FaTrash } from 'react-icons/fa';
import { formatTimestamp } from '../../utils/formatTimestamp';

function TaskDetailPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [task, setTask] = useState(null);
  const [assignment, setAssignment] = useState('');
  const [comment, setComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === taskId);
    setTask(foundTask);
    if (foundTask) {
      setEditTitle(foundTask.title);
    }
  }, [tasks, taskId]);

  const handleToggleComplete = () => {
    dispatch(updateTask({ ...task, completed: !task.completed }));
  };

  const handleAssign = () => {
    if (assignment.trim() === '') return;
    dispatch(assignTask(task.id, assignment));
    setAssignment('');
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === '') return;
    dispatch(addComment(task.id, comment));
    setComment('');
  };

  const handleEditTitle = () => {
    if (editTitle.trim() === '') return;
    dispatch(updateTask({ ...task, title: editTitle }));
    setIsEditing(false);
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
    navigate('/dashboard');
  };

  if (!task) {
    return <div className="task-detail">Görev bulunamadı.</div>;
  }

  const formattedCreatedAt = formatTimestamp(task.createdAt);
  const formattedHistory = task.history
    ? task.history.map((entry) => ({
        ...entry,
        timestamp: formatTimestamp(entry.timestamp),
      }))
    : [];

  return (
    <div className="task-detail">
      <div className="task-header">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="edit-title-input"
          />
        ) : (
          <h2>{task.title}</h2>
        )}
        <div className="task-actions">
          {isEditing ? (
            <button onClick={handleEditTitle} className="action-button save-button">
              <FaCheck /> Kaydet
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="action-button edit-button">
              <FaEdit /> Düzenle
            </button>
          )}
          <button onClick={handleDeleteTask} className="action-button delete-button">
            <FaTrash /> Sil
          </button>
        </div>
      </div>
      <div className="task-info">
        <p><strong>Durum:</strong> {task.completed ? 'Tamamlandı' : 'Tamamlanmadı'}</p>
        <p><strong>Atanan Kişi:</strong> {task.assignedTo || 'Atanmamış'}</p>
        <p><strong>Oluşturulma Tarihi:</strong> {formattedCreatedAt}</p>
      </div>
      <div className="task-actions-section">
        <button onClick={handleToggleComplete} className="action-button complete-button">
          {task.completed ? <FaCheck /> : <FaEdit />} {task.completed ? 'Geri Al' : 'Tamamla'}
        </button>
        <div className="assign-section">
          <input
            type="text"
            placeholder="Atanacak kişi"
            value={assignment}
            onChange={(e) => setAssignment(e.target.value)}
          />
          <button onClick={handleAssign} className="action-button assign-button">
            <FaUserPlus /> Ata
          </button>
        </div>
      </div>
      <div className="task-history">
        <h3>Tarihçe</h3>
        <ul>
          {formattedHistory && formattedHistory.length > 0 ? (
            formattedHistory.map((entry, index) => (
              <li key={index}>
                <p>{entry.description}</p>
                <span>{entry.timestamp}</span>
              </li>
            ))
          ) : (
            <li>Tarihçe bulunamadı.</li>
          )}
        </ul>
      </div>
      <div className="task-comments">
        <h3>Göreve Yanıt Ver</h3>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Yanıtınızı buraya yazın..."
            required
          ></textarea>
          <button type="submit" className="action-button submit-button">
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskDetailPage;
