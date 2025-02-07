import React from 'react';
import ButtonAtom from '../../atoms/Button';
import './styles.css';
import { useTranslation } from 'react-i18next';

function AdminActionButtons({ onEdit, onDelete }) {
  const { t } = useTranslation();

  return (
    <div className="admin-action-buttons">
      <ButtonAtom type="primary" onClick={onEdit}>{t('Edit')}</ButtonAtom>
      <ButtonAtom type="danger" onClick={onDelete}>{t('Delete')}</ButtonAtom>
    </div>
  );
}

export default AdminActionButtons;
