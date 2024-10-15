import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaTasks, 
  FaProjectDiagram, 
  FaUser, 
  FaChartPie 
} from 'react-icons/fa';
import './styles.css';

function Sidebar({ isOpen, toggleSidebar }) {

  const handleLinkClick = () => {
    if (isOpen) toggleSidebar();
  };

  const handleOverlayClick = () => {
    if (isOpen) toggleSidebar();
  };

  return (
    <>
      {isOpen && <div className="overlay" onClick={handleOverlayClick}></div>}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <h2>GTS Pro</h2>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => isActive ? 'active' : ''} 
                onClick={handleLinkClick}
              >
                <FaTachometerAlt className="sidebar-icon" /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/tasks" 
                className={({ isActive }) => isActive ? 'active' : ''} 
                onClick={handleLinkClick}
              >
                <FaTasks className="sidebar-icon" /> Görevler
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/projects" 
                className={({ isActive }) => isActive ? 'active' : ''} 
                onClick={handleLinkClick}
              >
                <FaProjectDiagram className="sidebar-icon" /> Projeler
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/analytics" 
                className={({ isActive }) => isActive ? 'active' : ''} 
                onClick={handleLinkClick}
              >
                <FaChartPie className="sidebar-icon" /> Analitik
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/profile" 
                className={({ isActive }) => isActive ? 'active' : ''} 
                onClick={handleLinkClick}
              >
                <FaUser className="sidebar-icon" /> Profil
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
