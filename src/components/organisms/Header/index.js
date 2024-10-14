
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../store/actions/authActions';
import { FaUserCircle, FaSun, FaMoon } from 'react-icons/fa';
import './styles.css';

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className="header">
      <div className="header-left">
        <h2>Görev Takip Sistemi Pro</h2>
      </div>
      <div className="header-right">
        <button onClick={toggleTheme} className="theme-button">
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
        <div className="user-info">
          <FaUserCircle className="user-icon" />
          <span>{user.email}</span>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Çıkış Yap
        </button>
      </div>
    </header>
  );
}

export default Header;
