
import React from 'react';
import './styles.css';
import TableAtom from '../../atoms/Table';

function ProjectListOrganism({ projects, onItemClick }) {
  // console.log("ProjectList received projects:", projects); 

  // if (!Array.isArray(projects)) {
  //   console.error("Projeler dizisi değil:", projects);
  //   return <p>Görevler yükleniyor...</p>;
  // }

  // if (projects.length === 0) {
  //   console.log("Hiç proje bulunmuyor.");
  // }

  return (
    <TableAtom data={projects} onDataClick={onItemClick}  dataType='project' />
  );
}

export default ProjectListOrganism;
