import React from 'react';
import ButtonAtom from '../../atoms/Button';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function QuickActions() {
  const navigate = useNavigate();
  const userRole = useSelector(state => state.profiles.user?.role)
  
  return (
    <div className="quick-actions">
      <ButtonAtom className="action-button primary" onClick={() => navigate('/createTask')}>
        Görev Oluştur
      </ButtonAtom>
      <ButtonAtom className="action-button default" onClick={() => navigate('/projects/new')}>
        Proje Oluştur
      </ButtonAtom>
      {userRole === 'admin' || userRole === 'user' || userRole === 'manager' ? (
        <ButtonAtom className="action-button dashed" onClick={() => navigate('/analytics')}>
          Analizleri Görüntüle
        </ButtonAtom>
      ) : null}

    </div>
  );
}

export default QuickActions;
