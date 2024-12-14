import React from 'react';
import Sidebar from '../../organisms/Sidebar';
import Header from '../../organisms/Header';

function HeaderSideBarTemplate({ isSidebarOpen, toggleSidebar, children }) {
  return (
    <div className="container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        {children}
      </div>
    </div>
  );
}

export default HeaderSideBarTemplate;
