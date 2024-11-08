import React from 'react';
import LoginFormOrganism from '../../components/organisms/LoginForm';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/actions/authActions';
import './styles.css';
import backgroundImage from '../../assets/login.jpg';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    dispatch(loginUser(email, password))
      .then(() => {
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Giriş hatası:', error);
      });
  };

  return (
    <div className="login-page">
      <div
        className="login-container"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="login-wrapper">
          <div className="login-box">
            <h1 className="app-title">Görev Takip Sistemi Pro</h1>
            <LoginFormOrganism onSubmit={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
