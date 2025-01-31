import React, { useState } from 'react';
import { Select } from 'antd';
import AdminUserTable from '../../molecules/AdminUserTable';
import AdminProjectTable from '../../molecules/AdminProjectTable';
import AdminTaskTable from '../../molecules/AdminTaskTable';
import ButtonAtom from '../../atoms/Button';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const { Option } = Select;

function AdminPanel({ users, projects, tasks, onEditUser, onDeleteUser, onEditProject, onDeleteProject, onEditTask, onDeleteTask }) {
    const navigate = useNavigate();

    const [selectedUserRole, setSelectedUserRole] = useState('all');
    const [selectedCustomer, setSelectedCustomer] = useState('all');
    const [selectedAssignedUser, setSelectedAssignedUser] = useState('all');
    const [selectedProject, setSelectedProject] = useState('all');

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
            <div className="admin-action-container">
                <h2>Kullanıcı Yönetimi</h2>
                <div className='admin-filter-button'>
                    <Select className="filter-dropdown" value={selectedUserRole} onChange={setSelectedUserRole}>
                        <Option value="all">Tüm Kullanıcılar</Option>
                        <Option value="admin">Admin</Option>
                        <Option value="manager">Yöneticiler</Option>
                        <Option value="user">Çalışanlar</Option>
                        <Option value="customer">Müşteriler</Option>
                    </Select>
                    <ButtonAtom className="action-button secondary" onClick={() => navigate('/admin/register')}>Kullanıcı Oluştur</ButtonAtom>
                </div>

            </div>
            {filteredUsers.length > 0 ? (
                <AdminUserTable users={filteredUsers} onEdit={onEditUser} onDelete={onDeleteUser} />
            ) : (
                <p className="no-data">Kullanıcı bulunmamaktadır.</p>
            )}

            <div className="admin-action-container">
                <h2>Proje Yönetimi</h2>
                <div className='admin-filter-button'>
                    <Select className="filter-dropdown" value={selectedCustomer} onChange={setSelectedCustomer}>
                        <Option value="all">Tüm Projeler</Option>
                        {users.filter(user => user.role === 'customer').map(customer => (
                            <Option key={customer.id} value={customer.id}>{customer.name}</Option>
                        ))}
                    </Select>
                    <ButtonAtom className="action-button default" onClick={() => navigate('/projects/new')}>
                        Proje Oluştur
                    </ButtonAtom>
                </div>
            </div>
            {filteredProjects.length > 0 ? (
                <AdminProjectTable projects={filteredProjects} onEdit={onEditProject} onDelete={onDeleteProject} />
            ) : (
                <p className="no-data">Proje bulunmamaktadır.</p>
            )}

            <div className="admin-action-container">
                <h2>Görev Yönetimi</h2>
                <div className='admin-filter-button'>
                    <Select className="filter-dropdown" value={selectedAssignedUser} onChange={setSelectedAssignedUser}>
                        <Option value="all">Tüm Görevler</Option>
                        {users.map(user => (
                            <Option key={user.id} value={user.id}>{user.name}</Option>
                        ))}
                    </Select>
                    <Select className="filter-dropdown" value={selectedProject} onChange={setSelectedProject}>
                        <Option value="all">Tüm Projeler</Option>
                        {projects.map(project => (
                            <Option key={project.id} value={project.id}>{project.title}</Option>
                        ))}
                    </Select>
                    <ButtonAtom className="action-button primary" onClick={() => navigate('/createTask')}>
                        Görev Oluştur
                    </ButtonAtom>
                </div>
            </div>
            {filteredTasks.length > 0 ? (
                <AdminTaskTable tasks={filteredTasks} onEdit={onEditTask} onDelete={onDeleteTask} />
            ) : (
                <p className="no-data">Görev bulunmamaktadır.</p>
            )}
        </div>
    );
}

export default AdminPanel;
