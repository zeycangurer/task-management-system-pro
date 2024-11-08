import React from 'react';
import './styles.css';

function ErrorMessageAtom({ message }) {
  if (!message) return null;
  return <p className="error-message">{message}</p>;
}

export default ErrorMessageAtom;