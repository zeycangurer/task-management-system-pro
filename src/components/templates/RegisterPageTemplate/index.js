import React from 'react';
import RegisterFormOrganism from '../../organisms/RegisterForm';

function RegisterPageTemplate() {
  return (
    <div className="register-page">
    <h1>Kullanıcı Kayıt</h1>
      <RegisterFormOrganism />
    </div>
  );
}

export default RegisterPageTemplate;
