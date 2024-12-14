import React from 'react';
import { List } from 'antd';
import ProjectListItemMolecule from '../../molecules/ProjectListItem';

function ProjectListOrganism({ projects, onItemClick }) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={projects}
      renderItem={(project) => (
        <ProjectListItemMolecule
          project={project}
          onClick={() => onItemClick(project.id)}
        />
      )}
    />
  );
}

export default ProjectListOrganism;
