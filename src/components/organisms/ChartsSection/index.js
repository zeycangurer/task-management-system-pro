import React from 'react';
import Chart from '../../molecules/Chart';
import './styles.css';

function ChartsSection({ tasks, users, projects, viewType }) {
  const taskStatusData = {
    labels: ['Tamamlandı', 'Tamamlanmadı'],
    values: [
      tasks.filter((task) => task.status === 'close').length,
      tasks.filter((task) => task.status === 'open').length,
    ],
  };

  const projectStatusData = {
    labels: ['Tamamlandı', 'Tamamlanmadı'],
    values: [
      projects.filter((project) => project.status === 'close').length,
      projects.filter((project) => project.status === 'open').length,
    ],
  };

  const userPerformanceByTaskData = {
    labels: users.map((user) => user.name),
    values: users.map((user) =>
      tasks.filter((task) => task.assignedTo.includes(user.id) && task.status === 'close')
        .length
    ),
  };

  const userPerformanceByProjectData = {
    labels: users.map((user) => user.name),
    values: users.map((user) =>
      projects.filter((project) => project.assignedUsers.includes(user.id) && project.status === 'close')
        .length
    ),
  };

  // console.log('userPerformanceByTaskData', userPerformanceByTaskData)


  return (
    <div className="charts-container">
      <div className="chart-card">
        <Chart type="pie" title="Görev Durumu Dağılımı" data={taskStatusData} chartKey="taskPie" />
      </div>
      <div className="chart-card">
        <Chart type="pie" title="Proje Durumu Dağılımı" data={projectStatusData} chartKey="projectPie" />
      </div>
      {viewType === 'analytics' && (
        <>
          <div className="chart-card full-width">
            <Chart type="bar" title="Görevlere Göre Kullanıcı Performansı" data={userPerformanceByTaskData} chartKey="taskBar" />
          </div>
          <div className="chart-card full-width">
            <Chart type="bar" title="Projelere Göre Kullanıcı Performansı" data={userPerformanceByProjectData} chartKey="projectBar" />
          </div>
        </>
      )}
    </div>
  );
}

export default ChartsSection;
