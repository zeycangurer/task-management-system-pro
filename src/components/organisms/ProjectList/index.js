
import React from 'react';
import './styles.css';
import TableAtom from '../../atoms/Table';
import { useTranslation } from 'react-i18next';

function ProjectListOrganism({ projects, onItemClick }) {
  const { t } = useTranslation();

  // console.log("ProjectList received projects:", projects); 

  // if (!Array.isArray(projects)) {
  //   console.error("Projeler dizisi değil:", projects);
  //   return <p>Görevler yükleniyor...</p>;
  // }

  // if (projects.length === 0) {
  //   console.log("Hiç proje bulunmuyor.");
  // }

  return (
    <>
      {projects.length === 0 ? (<p>{t('There are no project to list.')}</p>) : (<TableAtom data={projects} onDataClick={onItemClick} dataType='project' />)}
    </>

  );
}

export default ProjectListOrganism;
