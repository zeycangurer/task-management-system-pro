import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaTasks,
  FaProjectDiagram,
  FaUser,
  FaChartPie
} from 'react-icons/fa';
import { RiAdminFill } from "react-icons/ri";
import { FaSun, FaMoon } from 'react-icons/fa';


import './styles.css';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function Sidebar({ isOpen, toggleSidebar }) {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleThemeMode = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const userRole = useSelector(state => state.profiles.user?.role)

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
                <FaTachometerAlt className="sidebar-icon" /> {t('Home')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tasks"
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={handleLinkClick}
              >
                <FaTasks className="sidebar-icon" /> {t('Tasks')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={handleLinkClick}
              >
                <FaProjectDiagram className="sidebar-icon" /> {t('Projects')}
              </NavLink>
            </li>
            {userRole === 'admin' || userRole === 'user' || userRole === 'manager' ?
              <li>
                <NavLink
                  to="/analytics"
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={handleLinkClick}
                >
                  <FaChartPie className="sidebar-icon" /> {t('Analysis')}
                </NavLink>
              </li> : null}
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={handleLinkClick}
              >
                <FaUser className="sidebar-icon" /> {t('Profile')}
              </NavLink>
            </li>
            {userRole === 'admin' ?
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={handleLinkClick}
                >
                  <RiAdminFill className="sidebar-icon" /> {t('Admin Panel')}
                </NavLink>
              </li> : null}
            <li>
              <button onClick={toggleThemeMode} className="theme-button" aria-label="Temayı Değiştir">
                {theme === 'light' ? <FaMoon /> : <FaSun />}
              </button>
            </li>

          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
