import React from 'react';
import ButtonAtom from '../../atoms/Button';

function ProjectHeader({ project, onEditProject, onDeleteProject, onToggleComplete, onCreateTask, size }) {
  const isCompleted = project.status === 'completed';

  return (
    <div style={{ marginBottom: '1rem' }}>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <div>
        <ButtonAtom type="primary" onClick={onEditProject} style={{ marginRight: '8px' }}>
          Düzenle
        </ButtonAtom>
        <ButtonAtom type="danger" onClick={onDeleteProject} style={{ marginRight: '8px' }}>
          Sil
        </ButtonAtom>
        <ButtonAtom type="primary" onClick={onToggleComplete} style={{ marginRight: '8px' }}>
          {isCompleted ? 'Aktif Yap' : 'Tamamla'}
        </ButtonAtom>
        <ButtonAtom type="primary" onClick={onCreateTask}>
          Görev Oluştur
        </ButtonAtom>
      </div>
    </div>
  );
}

export default ProjectHeader;
