import React, { useMemo } from 'react';
import TitleAtom from '../../atoms/Title';
import ButtonAtom from '../../atoms/Button';
import ProjectListOrganism from '../../organisms/ProjectList';
import './styles.css';
import { useSelector } from 'react-redux';
import FilterComponent from '../../molecules/FilterComponent';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const root = useSelector(state => state)
  const usersState = root.users;
  const customersState = root.customers;

  const projectsWithUserNames = useMemo(() => {
    return projects.map(project => {
      const assignedUserNames = Array.isArray(project.assignedUsers) && project.assignedUsers.length > 0
        ? project.assignedUsers.map(userId => {
          const user = usersState.users.find(user => user.id === userId);
          return user ? user.name : t('Unknown');
        }).join(', ')
        : t('Unknown');

      let createdUserName = t('Unknown');
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
      <TitleAtom level={1} className="title">{t('Projects')}</TitleAtom>
      <FilterComponent
        dateRange={dateRange}
        setDateRange={setDateRange}
        usersState={usersState}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        filterTasks={onFilter}
        handleCreateTask={onCreateProject}
        customersState={customersState}
        type='project'
      />

      <div className="projects-list-section">
        <ProjectListOrganism
          projects={projectsWithUserNames}
          onItemClick={onProjectClick}
        />
      </div>
    </div>
  );
}

export default ProjectsTemplate;
