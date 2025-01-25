import React, { useState } from 'react';
import './styles.css';
import HeaderSideBarTemplate from '../../components/templates/HeaderSideBarTemplate';
import ProfileTemplate from '../../components/templates/ProfileTemplate';
import { useSelector } from 'react-redux';

function ProfilePage() {
  const user = useSelector(state => state.profiles.user);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="dashboard-container">
      <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <ProfileTemplate user={user}/>
      </HeaderSideBarTemplate>
    </div>
  );
}

export default ProfilePage;
