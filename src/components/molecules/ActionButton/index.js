import React from 'react';
import ButtonAtom from '../../atoms/Button';
import IconAtom from '../../atoms/Icon';
import TooltipAtom from '../../atoms/Tooltip';

function ActionButton({ tooltipTitle, icon, onClick, className, size, type }) {
  return (
    <TooltipAtom title={tooltipTitle}>
      <ButtonAtom onClick={onClick} className={className} size={size} type={type}>
        <IconAtom icon={icon} />
      </ButtonAtom>
    </TooltipAtom>
  );
}

export default ActionButton;
