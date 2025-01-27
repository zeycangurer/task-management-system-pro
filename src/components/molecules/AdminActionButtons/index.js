import React from 'react';
import ButtonAtom from '../../atoms/Button';
import './styles.css';

function AdminActionButtons({ onEdit, onDelete }) {
  return (
    <div className="admin-action-buttons">
      <ButtonAtom type="primary" onClick={onEdit}>Düzenle</ButtonAtom>
      <ButtonAtom type="danger" onClick={onDelete}>Sil</ButtonAtom>
    </div>
  );
}

export default AdminActionButtons;
