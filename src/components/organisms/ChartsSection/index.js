import React, { useState } from 'react';
import { DatePicker } from 'antd';
import Chart from '../../molecules/Chart';
import './styles.css';
import { useTranslation } from 'react-i18next';

const { RangePicker } = DatePicker;

function ChartsSection({ tasks, users, projects, viewType }) {
  const { t } = useTranslation();
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
    labels: [t("Completed"), t("Incomplete")],
    values: [
      filteredTasks.filter((task) => task.status === 'close').length,
      filteredTasks.filter((task) => task.status === 'open').length,
    ],
  };

  const projectStatusData = {
    labels: [t("Completed"), t("Incomplete")],
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
          placeholder={[t('Start Date'), t('End Date')]}
          value={selectedDateRange.length > 0 ? selectedDateRange : null}
        />
      </div>
      <div className="charts-container">
        <div className="chart-card">
          <Chart type="pie" title={t("Task Status Distribution")} data={taskStatusData} chartKey="taskPie" />
        </div>
        <div className="chart-card">
          <Chart type="pie" title={t("Project Status Distribution")} data={projectStatusData} chartKey="projectPie" />
      </div>

        {viewType === 'analytics' && (
          <>
            <div className="chart-card full-width">
              <Chart type="bar" title={t("User Performance by Tasks")} data={userPerformanceByTaskData} chartKey="taskBar" />
            </div>
            <div className="chart-card full-width">
              <Chart type="bar" title={t("User Performance by Projects")} data={userPerformanceByProjectData} chartKey="projectBar" />
            </div>
          </>
        )}
    </div>
    </div>

  );
}

export default ChartsSection;
