import React, { useState } from 'react';
import InputAtom from '../../atoms/Input';
import ButtonAtom from '../../atoms/Button';
import ErrorContainerMolecule from '../../molecules/ErrorContainerMolecule';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

function LoginFormOrganism({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authError = useSelector((state) => state.auth.authError);
  const navigate = useNavigate();
  const [visiblePasswords, setVisiblePasswords] = useState()


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
        type={visiblePasswords ? 'text' : 'password'}
        placeholder="Şifre"
        onChange={(e) => setPassword(e.target.value)}
        suffix={
          visiblePasswords ? (
            <EyeTwoTone onClick={() => setVisiblePasswords(false)} style={{ cursor: 'pointer' }} />
          ) : (
            <EyeInvisibleOutlined onClick={() => setVisiblePasswords(true)} style={{ cursor: 'pointer' }} />
          )
        }
      />

      <ErrorContainerMolecule error={authError} type='login' />
      <div className='login-buttons-container'>
        <ButtonAtom type="primary" htmlType="submit" className="login-button">
          Giriş Yap
        </ButtonAtom>
      </div>
    </form>
  );
}

export default LoginFormOrganism;
