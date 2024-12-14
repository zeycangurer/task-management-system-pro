import React from 'react';

function TitleAtom({ level = 1, children, ...rest }) {
  const Tag = `h${level}`;
  return <Tag {...rest}>{children}</Tag>;
}

export default TitleAtom;
