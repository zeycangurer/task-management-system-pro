
import React from 'react';
import './styles.css';

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
    <div className="project-list-container">
      {projects.length === 0 ? (
        <p>Proje bulunmamaktadır.</p>
      ) : (
        <table className="project-table">
          <thead>
            <tr>
              <th>Başlık</th>
              <th>Tanım</th>
              <th>Atanan Kişi</th>
              <th>Oluşturan Kişi</th>
              <th>Oluşturulma Tarihi</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} onClick={() => onItemClick(project.id)} className="clickable-row">
                <td>{project.title}</td>
                <td>{project.description}</td>
                <td>{project.assignedToName}</td>
                <td>{project.createdUserName}</td>
                <td>{project.date || (project.createdAt ? new Date(project.createdAt.seconds * 1000 + project.createdAt.nanoseconds / 1000000).toLocaleDateString() : 'N/A')}</td>
                <td>
                  <span className={`status ${project.status=='close' ? 'completed' : 'pending'}`}>
                    {project.status == 'close' ? 'Tamamlandı' : 'Bekliyor'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProjectListOrganism;
