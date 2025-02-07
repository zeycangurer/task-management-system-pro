import React, { useState } from 'react';
import RegisterPageTemplate from '../../components/templates/RegisterPageTemplate';
import './styles.css'
import HeaderSideBarTemplate from '../../components/templates/HeaderSideBarTemplate';

function RegisterPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-container">
      <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
          <RegisterPageTemplate />
      </HeaderSideBarTemplate>
    </div>
  );
}

export default RegisterPage;
