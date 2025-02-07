import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import RegisterPageTemplate from '../../components/templates/RegisterPageTemplate';
import HeaderSideBarTemplate from '../../components/templates/HeaderSideBarTemplate';

function EditUserPage() {
  const location = useLocation();
  const userData = location.state?.userData || {};
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-container">
      <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <RegisterPageTemplate isEditMode={true} initialValues={userData} />
      </HeaderSideBarTemplate>
    </div>
  )
}

export default EditUserPage;
