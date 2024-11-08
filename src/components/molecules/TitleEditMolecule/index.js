import React from 'react';
import InputAtom from '../../atoms/Input';
import ActionButton from '../ActionButton';
import { FaCheck } from 'react-icons/fa';
import './styles.css'

function TitleEditMolecule({ value, onChange, onSave, size }) {
  return (
    <div className="title-edit-container">
      <InputAtom
        value={value}
        onChange={onChange}
        className="edit-title-input"
        placeholder="Görev Başlığını Düzenleyin"
      />
      <ActionButton
        tooltipTitle="Kaydet"
        icon={FaCheck}
        onClick={onSave}
        className="action-button save-button"
        size={size}
        type="primary"
      />
    </div>
  );
}

export default TitleEditMolecule;
