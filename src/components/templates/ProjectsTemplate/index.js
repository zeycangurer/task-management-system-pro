import React from 'react';
import TitleAtom from '../../atoms/Title';
import ButtonAtom from '../../atoms/Button';
import ProjectListOrganism from '../../organisms/ProjectList';

function ProjectsTemplate({ projects, onProjectClick, onCreateProject }) {
  return (
    <div>
      <TitleAtom level={1}>Projeler</TitleAtom>
      <ButtonAtom type="primary" onClick={onCreateProject}>
        Yeni Proje Oluştur
      </ButtonAtom>
      <ProjectListOrganism
        projects={projects}
        onItemClick={onProjectClick}
      />
    </div>
  );
}

export default ProjectsTemplate;
