import React from 'react';
import ProjectCreationFormOrganism from '../../../components/organisms/ProjectCreation';
import './styles.css'
import { useTranslation } from 'react-i18next';

function ProjectCreationTemplate({ onFinish, initialValues, isEditMode}) {
  const { t } = useTranslation();

    return (
    <div className="project-creation-template">
      <h1>{isEditMode ? t('Edit Project') : t('New Project')}</h1>
      <div className="project-creation-form">
        <ProjectCreationFormOrganism
          onFinish={onFinish}
          initialValues={initialValues}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
}

export default ProjectCreationTemplate;
