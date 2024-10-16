
import React from 'react';
import './styles.css';

function TaskList({ tasks, onTaskClick }) {
  console.log("TaskList received tasks:", tasks); 

  if (!Array.isArray(tasks)) {
    console.error("Görevler dizisi değil:", tasks);
    return <p>Görevler yükleniyor...</p>;
  }

  if (tasks.length === 0) {
    console.log("Hiç görev bulunmuyor.");
  }

  return (
    <div className="task-list-container">
      {tasks.length === 0 ? (
        <p>Görev bulunmamaktadır.</p>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>Başlık</th>
              <th>Tanım</th>
              <th>Atanan Kişi</th>
              <th>Oluşturan Kişi</th>
              <th>Durum</th>
              <th>Tarih</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} onClick={() => onTaskClick(task.id)} className="clickable-row">
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.assignedToName}</td>
                <td>{task.createdUserName}</td>
                <td>
                  <span className={`status ${task.completed ? 'completed' : 'pending'}`}>
                    {task.completed ? 'Tamamlandı' : 'Bekliyor'}
                  </span>
                </td>
                <td>{task.date || (task.dueDate ? new Date(task.dueDate.seconds * 1000 + task.dueDate.nanoseconds / 1000000).toLocaleDateString() : 'N/A')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskList;
