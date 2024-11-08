import React from 'react';
import { Button } from 'antd';

function ButtonAtom({ children, ...props }) {
  return <Button {...props}>{children}</Button>;
}

export default ButtonAtom;
