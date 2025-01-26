import React from 'react';
import ButtonAtom from '../../atoms/Button';
import './styles.css';
import { useNavigate } from 'react-router-dom';

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="quick-actions">
      <ButtonAtom className="action-button primary" onClick={() => navigate('/createTask')}>
        Görev Oluştur
      </ButtonAtom>
      <ButtonAtom className="action-button default" onClick={() => navigate('/projects/new')}>
        Proje Oluştur
      </ButtonAtom>
      <ButtonAtom className="action-button dashed" onClick={() => navigate('/analytics')}>
        Analizleri Görüntüle
      </ButtonAtom>
    </div>
  );
}

export default QuickActions;
