import React, { useMemo } from 'react';
import TitleAtom from '../../atoms/Title';
import ButtonAtom from '../../atoms/Button';
import ProjectListOrganism from '../../organisms/ProjectList';
import './styles.css';
import { useSelector } from 'react-redux';

function ProjectsTemplate({
  projects,
  onProjectClick,
  onCreateProject,
  dateRange,
  setDateRange,
  users,
  selectedUser,
  setSelectedUser,
  onFilter
}) {
  const root = useSelector(state => state)
  const usersState = root.users;
  const customersState = root.customers;

  const projectsWithUserNames = useMemo(() => {
    return projects.map(project => {
      const assignedUserNames = Array.isArray(project.assignedUsers) && project.assignedUsers.length > 0
        ? project.assignedUsers.map(userId => {
            const user = usersState.users.find(user => user.id === userId);
            return user ? user.name : 'Bilinmiyor';
          }).join(', ')
        : 'Bilinmiyor';

      let createdUserName = 'Bilinmiyor';
      const createdUserInUsers = usersState.users.find(user => user.id === project.createdBy);
      const createdUserInCustomers = customersState.customers.find(customer => customer.id === project.createdBy);
      if (createdUserInUsers) {
        createdUserName = createdUserInUsers.name;
      } else if (createdUserInCustomers) {
        createdUserName = createdUserInCustomers.name;
      }

      return { ...project, assignedToName: assignedUserNames, createdUserName };
    });
  }, [projects, usersState.users, customersState.customers]);
  return (
    <div className='projects-main'>
      <TitleAtom level={1} className="title">Projeler</TitleAtom>

      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="start-date">Başlangıç Tarihi:</label>
          <input
            type="date"
            id="start-date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="end-date">Bitiş Tarihi:</label>
          <input
            type="date"
            id="end-date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="user-select">Kullanıcı Seç:</label>
          <select
            id="user-select"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Tüm Kullanıcılar</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name || user.email}
              </option>
            ))}
          </select>
        </div>

        <div className="button-group">
          <ButtonAtom type="primary" className="list-button" onClick={onFilter}>
            Projeleri Listele
          </ButtonAtom>
          <ButtonAtom type="primary" className="create-button" onClick={onCreateProject}>
            Proje Oluştur
          </ButtonAtom>
        </div>
      </div>

      <div className="tasks-list-section">
        <ProjectListOrganism
          projects={projectsWithUserNames}
          onItemClick={onProjectClick}
        />
      </div>
    </div>
  );
}

export default ProjectsTemplate;
