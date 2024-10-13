import React, { useState } from 'react';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import './styles.css';
import { useSelector } from 'react-redux';

function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authError = useSelector((state) => state.auth.authError);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
      />
      <Input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
      />
      <div className="error-container">
        {authError && <p className="error-message">{authError}</p>}
      </div>
      <Button type="submit">Giriş Yap</Button>
    </form>
  );
}

export default LoginForm;
