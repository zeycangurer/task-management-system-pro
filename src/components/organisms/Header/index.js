import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Menu, Avatar } from 'antd';
import { logout } from '../../../store/actions/authActions';
import { FaBars, FaTimes } from 'react-icons/fa';
import './styles.css';
import { useTranslation } from 'react-i18next';
import trFlag from '../../../assets/tr.png';
import enFlag from '../../../assets/eng.png';
import { useNavigate } from 'react-router-dom';

function Header({ toggleSidebar, isSidebarOpen }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profiles.user);
  // console.log(localStorage.getItem('selectedLanguage'));


  const handleLogout = () => {
    dispatch(logout());
  };

  const getCurrentLangFlag = () => {
    if (i18n.language === 'tr') return trFlag;
    return enFlag;
  };

  const languageMenu = (
    <Menu className="language-dropdown-menu">
      <Menu.Item key="tr" onClick={() => i18n.changeLanguage('tr')} className={i18n.language === 'tr' ? 'menu-item-selected' : ''}>
        <img
          src={trFlag}
          alt="TR"
          className='lang-menu-item'
        />
        Türkçe
      </Menu.Item>
      <Menu.Item key="en" onClick={() => i18n.changeLanguage('en')} className={i18n.language === 'en' ? 'menu-item-selected' : ''}>
        <img
          src={enFlag}
          alt="EN"
          className='lang-menu-item'
        />
        English
      </Menu.Item>
    </Menu>
  );

  const profileNavigate = () => navigate('/profile')

  const userMenu = (
    <Menu className="user-dropdown-menu">
      <Menu.Item key="username" onClick={profileNavigate} >
        <strong>{user?.name || user?.email || 'Unknown'}</strong>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout}>
        {t('Logout')}
      </Menu.Item>
    </Menu>
  );

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
        <h2 className="header-title" onClick={() => navigate('/dashboard')}>
          <span className="full-title">{t('Task Management System Pro')}</span>
          <span className="short-title">{t('TMS Pro')}</span>
        </h2>
      </div>

      <div className="header-right">
        <Dropdown overlay={languageMenu} trigger={['click']} placement="bottomRight">
          <div className="lang-avatar" title={t('Change Language')}>
            <div className="lang-avatar-icon">
              <img
                src={getCurrentLangFlag()}
                alt={i18n.language}
                style={{ width: '2rem', height: '1.75rem', borderRadius:'20%'}}
              />
            </div>
          </div>
        </Dropdown>
        <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
          <div className="user-avatar" title={user?.name || user?.email}>
            <Avatar size={36} className="user-avatar-icon">
              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : (user?.email || 'U').charAt(0).toUpperCase()}
            </Avatar>
          </div>
        </Dropdown>
      </div>
    </header>
  );
}

export default Header;
