import React from 'react';
import { Avatar } from 'antd';
import { FaUserCircle } from 'react-icons/fa';

function ProfileFieldMolecule({ user }) {
  return (
    <div className="profile-info">
      <div className="user-avatar">
        {user?.photoURL ? (
          <Avatar size={64} src={user.photoURL} />
        ) : (
          <Avatar size={64} icon={<FaUserCircle />} />
        )}
      </div>
      <p>{user?.name || 'Bilinmiyor'}</p>
      <p>{user?.email || 'Bilinmiyor'}</p>
      <p>
        {user?.role === 'admin'
          ? 'Admin'
          : user?.role === 'customer'
          ? 'Müşteri'
          : 'Personel'}
      </p>
    </div>
  );
}

export default ProfileFieldMolecule;
