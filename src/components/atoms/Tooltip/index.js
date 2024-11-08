import React from 'react';
import { Tooltip } from 'antd';

function TooltipAtom({ children, ...props }) {
  return <Tooltip {...props}>{children}</Tooltip>;
}

export default TooltipAtom;
