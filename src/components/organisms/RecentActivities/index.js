
import React from 'react';
import './styles.css';
import { FaUserPlus, FaTasks, FaProjectDiagram } from 'react-icons/fa';

function RecentActivities({ activities }) {
  return (
    <div className="recent-activities">
      <h3>Son Aktiviteler</h3>
      <ul>
        {activities && activities.length > 0 ? (
          activities.map((activity) => (
            <li key={activity.id}>
              <div className="activity-icon">
                {activity.type === 'task' && <FaTasks />}
                {activity.type === 'project' && <FaProjectDiagram />}
                {activity.type === 'user' && <FaUserPlus />}
              </div>
              <div className="activity-info">
                <p>{activity.description}</p>
                <span>{activity.time}</span>
              </div>
            </li>
          ))
        ) : (
          <li>Aktivite bulunamadı.</li>
        )}
      </ul>
    </div>
  );
}

export default RecentActivities;
