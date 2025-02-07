import React, { useState } from 'react';
import { Select } from 'antd';
import AdminUserTable from '../../molecules/AdminUserTable';
import AdminProjectTable from '../../molecules/AdminProjectTable';
import AdminTaskTable from '../../molecules/AdminTaskTable';
import ErrorContainerMolecule from '../../molecules/ErrorContainerMolecule';
import ButtonAtom from '../../atoms/Button';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

function AdminPanel({ users, projects, tasks, onEditUser, onDeleteUser, onEditProject, onDeleteProject, onEditTask, onDeleteTask }) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [selectedUserRole, setSelectedUserRole] = useState('all');
    const [selectedCustomer, setSelectedCustomer] = useState('all');
    const [selectedAssignedUser, setSelectedAssignedUser] = useState('all');
    const [selectedProject, setSelectedProject] = useState('all');
    const message = t('Firestore info message');

    const filteredUsers = selectedUserRole === 'all' ? users : users.filter(user => user.role === selectedUserRole);

    const filteredProjects = selectedCustomer === 'all' ? projects : projects.filter(project => project.customerId === selectedCustomer);

    let filteredTasks = tasks;
    if (selectedAssignedUser !== 'all') {
        filteredTasks = filteredTasks.filter(task => task.assignedTo.includes(selectedAssignedUser));
    }
    if (selectedProject !== 'all') {
        filteredTasks = filteredTasks.filter(task => task.projectId === selectedProject);
    }

    return (
        <div className="admin-panel">
            <div className='admin-panel-alert'>
                <ErrorContainerMolecule error={message} type='login' />
            </div>
            <div className="admin-action-container">
                <h2>{t('User Management')}</h2>
                <div className='admin-filter-button'>
                    <Select className="filter-dropdown" value={selectedUserRole} onChange={setSelectedUserRole}>
                        <Option value="all">{t('All Users')}</Option>
                        <Option value="admin">{t('Admin')}</Option>
                        <Option value="manager">{t('Manager')}</Option>
                        <Option value="user">{t('Employees')}</Option>
                        <Option value="customer">{t('Customers')}</Option>
                    </Select>
                    <ButtonAtom className="action-button secondary" onClick={() => navigate('/admin/register')}>{t('Create User')}</ButtonAtom>
                </div>

            </div>
            {filteredUsers.length > 0 ? (
                <AdminUserTable users={filteredUsers} onEdit={onEditUser} onDelete={onDeleteUser} />
            ) : (
                <p className="no-data">{t('No users found')}</p>
            )}

            <div className="admin-action-container">
                <h2>{t('Project Management')}</h2>
                <div className='admin-filter-button'>
                    <Select className="filter-dropdown" value={selectedCustomer} onChange={setSelectedCustomer}>
                        <Option value="all">{t('All Projects')}</Option>
                        {users.filter(user => user.role === 'customer').map(customer => (
                            <Option key={customer.id} value={customer.id}>{customer.name}</Option>
                        ))}
                    </Select>
                    <ButtonAtom className="action-button default" onClick={() => navigate('/projects/new')}>
                        {t('Create Project')}
                    </ButtonAtom>
                </div>
            </div>
            {filteredProjects.length > 0 ? (
                <AdminProjectTable projects={filteredProjects} onEdit={onEditProject} onDelete={onDeleteProject} />
            ) : (
                <p className="no-data">{t('No projects found')}</p>
            )}

            <div className="admin-action-container">
                <h2>{t('Task Management')}</h2>
                <div className='admin-filter-button'>
                    <Select className="filter-dropdown" value={selectedAssignedUser} onChange={setSelectedAssignedUser}>
                        <Option value="all">{t('All Tasks')}</Option>
                        {users.map(user => (
                            <Option key={user.id} value={user.id}>{user.name}</Option>
                        ))}
                    </Select>
                    <Select className="filter-dropdown" value={selectedProject} onChange={setSelectedProject}>
                        <Option value="all">{t('All Projects')}</Option>
                        {projects.map(project => (
                            <Option key={project.id} value={project.id}>{project.title}</Option>
                        ))}
                    </Select>
                    <ButtonAtom className="action-button primary" onClick={() => navigate('/createTask')}>
                        {t('Create Task')}
                    </ButtonAtom>
                </div>
            </div>
            {filteredTasks.length > 0 ? (
                <AdminTaskTable tasks={filteredTasks} onEdit={onEditTask} onDelete={onDeleteTask} />
            ) : (
                <p className="no-data">{t('No tasks found')}</p>
            )}
        </div>
    );
}

export default AdminPanel;
