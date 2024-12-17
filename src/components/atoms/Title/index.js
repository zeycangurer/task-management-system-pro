import React from 'react';

function TitleAtom({ level = 1, children, className = '', ...rest }) {
  const Tag = `h${level}`;
  return <Tag className={className} {...rest}>{children}</Tag>;
}

export default TitleAtom;
