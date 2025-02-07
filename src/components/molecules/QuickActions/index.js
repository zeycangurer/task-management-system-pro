import React from 'react';
import ButtonAtom from '../../atoms/Button';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function QuickActions() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userRole = useSelector(state => state.profiles.user?.role)
  
  return (
    <div className="quick-actions">
      <ButtonAtom className="action-button primary" onClick={() => navigate('/createTask')}>
      {t("Create Task")}
      </ButtonAtom>
      <ButtonAtom className="action-button default" onClick={() => navigate('/projects/new')}>
      {t("Create Project")}
      </ButtonAtom>
      {userRole === 'admin' || userRole === 'user' || userRole === 'manager' ? (
        <ButtonAtom className="action-button dashed" onClick={() => navigate('/analytics')}>
        {t("View Analysis")}
        </ButtonAtom>
      ) : null}

    </div>
  );
}

export default QuickActions;
