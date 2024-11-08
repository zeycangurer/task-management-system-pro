import React from 'react';
import ErrorMessageAtom from '../../atoms/ErrorMessage';
import './styles.css'; 

function ErrorContainerMolecule({ error }) {
  return (
    <div className="error-container">
      <ErrorMessageAtom message={error} />
    </div>
  );
}

export default ErrorContainerMolecule;
