import React from 'react';
import ButtonAtom from '../../atoms/Button';
import './styles.css';
import { useTranslation } from 'react-i18next';

function AdminActionButtons({ onEdit, onDelete }) {
  const { t } = useTranslation();

  return (
    <div className="admin-action-buttons">
      <ButtonAtom type="primary" className="action-button edit-button action-button-admin-tables" onClick={onEdit}>{t('Edit')}</ButtonAtom>
      <ButtonAtom type="primary" className="action-button delete-button action-button-admin-tables" onClick={onDelete}>{t('Delete')}</ButtonAtom>
    </div>
  );
}

export default AdminActionButtons;
