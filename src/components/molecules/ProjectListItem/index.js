import React from 'react';
import { List } from 'antd';

function ProjectListItemMolecule({ project, onClick }) {
  return (
    <List.Item onClick={onClick}>
      <List.Item.Meta
        title={project.title}
        description={project.description}
      />
    </List.Item>
  );
}

export default ProjectListItemMolecule;
