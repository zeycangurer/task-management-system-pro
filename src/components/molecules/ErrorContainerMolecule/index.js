import React from 'react';
import ErrorMessageAtom from '../../atoms/ErrorMessage';
import './styles.css'; 

function ErrorContainerMolecule({ error, type = 'default' }) {
  if (!error) return null;

  return (
    <div className={`${type === 'login' ? 'error-container-login' : 'error-container'}`}>
      <ErrorMessageAtom message={error} />
    </div>
  );
}

export default ErrorContainerMolecule;
