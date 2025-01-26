import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function LatestItemsSection({ latestTasks, latestProjects }) {
  const navigate = useNavigate();

  return (
    <div className="latest-items-section">
      <div className="latest-items">
        <h3>Son Eklenen Görevler</h3>
        <ul>
          {latestTasks.length > 0 ? (
            latestTasks.map((task) => (
              <li key={task.id} onClick={() => navigate(`/tasks/${task.id}`)}>
                {task.title}
              </li>
            ))
          ) : (
            <p>Henüz eklenen bir görev yok.</p>
          )}
        </ul>
      </div>
      
      <div className="latest-items">
        <h3>Son Eklenen Projeler</h3>
        <ul>
          {latestProjects.length > 0 ? (
            latestProjects.map((project) => (
              <li key={project.id} onClick={() => navigate(`/projects/${project.id}`)}>
                {project.title}
              </li>
            ))
          ) : (
            <p>Henüz eklenen bir proje yok.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default LatestItemsSection;

