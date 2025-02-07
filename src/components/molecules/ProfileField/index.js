import React from 'react';
import { Avatar } from 'antd';
import { FaUserCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

function ProfileFieldMolecule({ user }) {
  const { t } = useTranslation();

  const getRoleLabel = (role) => {
    if (role === 'admin') return t('Admin');
    if (role === 'manager') return t('Manager');
    if (role === 'customer') return t('Customer');
    return t('Personnel');
  };


  return (
    <div className="profile-info">
      <div className="user-avatar">
        {user?.photoURL ? (
          <Avatar size={64} src={user.photoURL} />
        ) : (
          <Avatar size={64} icon={<FaUserCircle />} />
        )}
      </div>
      <p>{user?.name || t('Unknown')}</p>
      <p>{user?.email || t('Unknown')}</p>
      <p><strong>{t('Role')}: </strong>{getRoleLabel(user?.role)}</p>
    </div>
  );
}

export default ProfileFieldMolecule;
