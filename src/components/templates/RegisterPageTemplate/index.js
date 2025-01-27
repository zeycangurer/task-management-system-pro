import React from 'react';
import RegisterFormOrganism from '../../organisms/RegisterForm';

function RegisterPageTemplate({ isEditMode, initialValues }) {
  return (
    <div className="register-page">
      <h1>{isEditMode ? 'Kullanıcıyı Düzenle' : 'Yeni Kullanıcı Kaydı'}</h1>
      <RegisterFormOrganism isEditMode={isEditMode} initialValues={initialValues} />
    </div>
  );
}

export default RegisterPageTemplate;
