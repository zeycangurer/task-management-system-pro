import React from 'react';
import RegisterFormOrganism from '../../organisms/RegisterForm';
import { useTranslation } from 'react-i18next';

function RegisterPageTemplate({ isEditMode, initialValues }) {
  const { t } = useTranslation();
  return (
    <div className="register-page">
      <h1>{isEditMode ? t('Edit User') : t('New User Registration')}</h1>
      <RegisterFormOrganism isEditMode={isEditMode} initialValues={initialValues} />
    </div>
  );
}

export default RegisterPageTemplate;
