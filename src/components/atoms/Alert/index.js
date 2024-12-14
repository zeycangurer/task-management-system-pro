import React from 'react';
import { Alert } from 'antd';

function AlertAtom({ message, description, type, showIcon }) {
  return (
    <Alert
      message={message}
      description={description}
      type={type}
      showIcon={showIcon}
    />
  );
}

export default AlertAtom;
