import React from 'react';
import LoginForm from '../../components/molecules/LoginForm/index';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/actions/authActions';
import './styles.css'
import backgroundImage from '../../assets/login.jpg'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <div
      className="login-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <ToastContainer />
      <div className="login-wrapper">
        <div className="login-box">
          <h2 className="title">Görev Takip Sistemi Pro</h2>
          <LoginForm onSubmit={handleLogin} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
