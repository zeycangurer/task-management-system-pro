import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/actions/authActions';
import { FaUserCircle, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import './styles.css';

function Header({ toggleSidebar, isSidebarOpen }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleThemeMode = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className="header">
      <div
        className="hamburger"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? 'Sidebar Kapat' : 'Sidebar Aç'}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter') toggleSidebar();
        }}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className="header-title-container">
        <h2 className="header-title">
          <span className="full-title">Görev Takip Sistemi Pro</span>
          <span className="short-title">GTS Pro</span>
        </h2>
      </div>

      <div className="header-right">
        <button onClick={toggleThemeMode} className="theme-button" aria-label="Temayı Değiştir">
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
        <div className="user-info">
          <FaUserCircle className="user-icon" />
          <span className="user-email">{user.email}</span>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Çıkış Yap
        </button>
      </div>
    </header>
  );
}

export default Header;
