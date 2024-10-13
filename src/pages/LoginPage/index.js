import React from 'react';
import LoginForm from '../../components/molecules/LoginForm/index';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/actions/authActions';
import './styles.css'
import backgroundImage from '../../assets/login.jpg'; 

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    dispatch(loginUser(email, password))
      .then(() => {
        navigate('/dashboard'); // Sadece başarılı girişlerde yönlendirme
      })
      .catch((error) => {
        console.error('Giriş hatası:', error);
        // alert('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');

      });
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
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
