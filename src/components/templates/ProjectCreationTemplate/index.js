import React from 'react';
import ProjectCreationFormOrganism from '../../../components/organisms/ProjectCreation';
import './styles.css'

function ProjectCreationTemplate({ onFinish, initialValues, isEditMode}) {
    return (
    <div className="project-creation-template">
      <h1>{isEditMode ? 'Görevi Düzenle' : 'Yeni Proje Oluştur'}</h1>
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
