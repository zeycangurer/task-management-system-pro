import React from 'react';
import { Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import './styles.css'; 

const LoadingSpinner = ({ tip }) => {
  const { t } = useTranslation();

  return (
    <div className="loading-spinner">
      <Spin size="large" tip={tip || t('Loading...')} />
    </div>
  );
};

export default LoadingSpinner;
