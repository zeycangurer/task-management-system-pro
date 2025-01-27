import React, { useState } from 'react';
import InputAtom from '../../atoms/Input';
import ButtonAtom from '../../atoms/Button';
import ErrorContainerMolecule from '../../molecules/ErrorContainerMolecule';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LoginFormOrganism({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authError = useSelector((state) => state.auth.authError);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-form-title">Giriş Yap</h2>
      <InputAtom
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        className="login-input"
      />
      <InputAtom
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        className="login-input"
      />
      <ErrorContainerMolecule error={authError} />
      <div className='login-buttons-container'>
        <ButtonAtom type="primary" htmlType="submit" className="login-button">
          Giriş Yap
        </ButtonAtom>
      </div>
    </form>
  );
}

export default LoginFormOrganism;
