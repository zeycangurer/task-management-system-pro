import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';
import './styles.css';
import { useTranslation } from 'react-i18next';

function LatestItemsSection({ latestTasks, latestProjects }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [taskPage, setTaskPage] = useState(1);
  const [projectPage, setProjectPage] = useState(1);
  const pageSize = 5; 

  const paginatedTasks = latestTasks.slice((taskPage - 1) * pageSize, taskPage * pageSize);
  const paginatedProjects = latestProjects.slice((projectPage - 1) * pageSize, projectPage * pageSize);

  return (
    <div className="latest-items-section">
      <div className="latest-items">
        <h3>{t("Latest Added Tasks")}</h3>
        <ul>
          {paginatedTasks.length > 0 ? (
            paginatedTasks.map((task) => (
              <li key={task.id} onClick={() => navigate(`/tasks/${task.id}`)}>
                {task.title}
              </li>
            ))
          ) : (
            <p>{t("No tasks added yet.")}</p>
          )}
        </ul>

        {latestTasks.length > pageSize && (
          <Pagination
            className="last-custom-pagination"
            current={taskPage}
            pageSize={pageSize}
            total={latestTasks.length}
            onChange={(page) => setTaskPage(page)}
          />
        )}
      </div>

      <div className="latest-items">
        <h3>{t("Latest Added Projects")}</h3>
        <ul>
          {paginatedProjects.length > 0 ? (
            paginatedProjects.map((project) => (
              <li key={project.id} onClick={() => navigate(`/projects/${project.id}`)}>
                {project.title}
              </li>
            ))
          ) : (
            <p>{t("No projects added yet.")}</p>
          )}
        </ul>

        {latestProjects.length > pageSize && (
          <Pagination
            className="custom-pagination"
            current={projectPage}
            pageSize={pageSize}
            total={latestProjects.length}
            onChange={(page) => setProjectPage(page)}
          />
        )}
      </div>
    </div>
  );
}

export default LatestItemsSection;
