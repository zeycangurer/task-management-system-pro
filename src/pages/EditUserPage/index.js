import React from 'react';
import { useLocation } from 'react-router-dom';
import RegisterPageTemplate from '../../components/templates/RegisterPageTemplate';

function EditUserPage() {
  const location = useLocation();
  const userData = location.state?.userData || {};

  return <RegisterPageTemplate isEditMode={true} initialValues={userData} />;
}

export default EditUserPage;
