import React, { useState } from 'react';
import { Form } from 'antd';
import InputAtom from '../../atoms/Input';
import ButtonAtom from '../../atoms/Button';

function PasswordChangeMolecule({ onChangePassword }) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = () => {
    onChangePassword(password, newPassword);
    setPassword('');
    setNewPassword('');
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Mevcut Şifre">
        <InputAtom type="password" placeholder="Mevcut Şifre" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Item>
      <Form.Item label="Yeni Şifre">
        <InputAtom type="password" placeholder="Yeni Şifre" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </Form.Item>
      <ButtonAtom type="primary" onClick={handlePasswordChange}>Şifreyi Güncelle</ButtonAtom>
    </Form>
  );
}

export default PasswordChangeMolecule;
