import React from 'react';


function IconAtom({ icon: IconComponent, ...props }) {
  if (!IconComponent || typeof IconComponent !== 'function') {
    console.error('IconAtom: Geçersiz ikon bileşeni sağlandı.');
    return null;
  }
  return <IconComponent {...props} />;
}

export default IconAtom;
