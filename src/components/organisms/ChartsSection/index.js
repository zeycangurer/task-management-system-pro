import React, { useState } from 'react';
import { DatePicker } from 'antd';
import Chart from '../../molecules/Chart';
import './styles.css';

const { RangePicker } = DatePicker;

function ChartsSection({ tasks, users, projects, viewType }) {
  const [selectedDateRange, setSelectedDateRange] = useState([]);

  const handleDateFilter = (dates) => {
    setSelectedDateRange(dates || []);
  };

  const filteredTasks = selectedDateRange.length === 2 ?
    tasks.filter(task => {
      const taskDate = task.dueDate?.toDate();
      return taskDate && taskDate >= selectedDateRange[0].toDate() && taskDate <= selectedDateRange[1].toDate();
    }) : tasks;

  const filteredProjects = selectedDateRange.length === 2 ?
    projects.filter(project => {
      const projectDate = project.endDate?.toDate();
      return projectDate && projectDate >= selectedDateRange[0].toDate() && projectDate <= selectedDateRange[1].toDate();
    }) : projects;

  const taskStatusData = {
    labels: ['Tamamlandı', 'Tamamlanmadı'],
    values: [
      filteredTasks.filter((task) => task.status === 'close').length,
      filteredTasks.filter((task) => task.status === 'open').length,
    ],
  };

  const projectStatusData = {
    labels: ['Tamamlandı', 'Tamamlanmadı'],
    values: [
      filteredProjects.filter((project) => project.status === 'close').length,
      filteredProjects.filter((project) => project.status === 'open').length,
    ],
  };

  const userPerformanceByTaskData = {
    labels: users.map((user) => user.name),
    values: users.map((user) =>
      filteredTasks.filter((task) => task.assignedTo.includes(user.id) && task.status === 'close')
        .length
    ),
  };

  const userPerformanceByProjectData = {
    labels: users.map((user) => user.name),
    values: users.map((user) =>
      filteredProjects.filter((project) => project.assignedUsers.includes(user.id) && project.status === 'close')
        .length
    ),
  };

  return (
    <div className="charts-content">
      <div className="filter-container-charts">
        <RangePicker
          onChange={handleDateFilter}
          placeholder={['Başlangıç Tarihi', 'Bitiş Tarihi']}
          value={selectedDateRange.length > 0 ? selectedDateRange : null}
        />
      </div>
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
    </div>

  );
}

export default ChartsSection;
