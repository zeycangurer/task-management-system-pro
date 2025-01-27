import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonAtom from '../../components/atoms/Button';
import './styles.css';

function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <h1>Yetkisiz Giriş</h1>
      <p>Bu sayfaya erişim izniniz bulunmamaktadır.</p>
      <ButtonAtom type="primary" onClick={() => navigate('/')}>
        Ana Sayfaya Dön
      </ButtonAtom>
    </div>
  );
}

export default UnauthorizedPage;
