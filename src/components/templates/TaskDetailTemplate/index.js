import React from 'react';
import Sidebar from '../../organisms/Sidebar';
import Header from '../../organisms/Header';

function TaskDetailTemplate({ isSidebarOpen, toggleSidebar, children }) {
  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`dashboard-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        {children}
      </div>
    </div>
  );
}

export default TaskDetailTemplate;
