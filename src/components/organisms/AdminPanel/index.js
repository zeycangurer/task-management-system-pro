import React from 'react';
import AdminUserTable from '../../molecules/AdminUserTable';
import AdminProjectTable from '../../molecules/AdminProjectTable';
import AdminTaskTable from '../../molecules/AdminTaskTable';
import ButtonAtom from '../../atoms/Button';
import { useNavigate } from 'react-router-dom';
import './styles.css'

function AdminPanel({ users, projects, tasks, onEditUser, onDeleteUser, onEditProject, onDeleteProject, onEditTask, onDeleteTask }) {
    const navigate = useNavigate()
    return (
        <div className="admin-panel">
            <div className="admin-action-container">
                <h2>Kullanıcı Yönetimi</h2>
                <ButtonAtom className="action-button primary" onClick={() => navigate('/admin/register')}>Kullanıcı Oluştur</ButtonAtom>
            </div>
            <AdminUserTable users={users} onEdit={onEditUser} onDelete={onDeleteUser} />
            <div className="admin-action-container">
                <h2>Proje Yönetimi</h2>
                <ButtonAtom className="action-button default" onClick={() => navigate('/projects/new')}>
                    Proje Oluştur
                </ButtonAtom>
            </div>
            <AdminProjectTable projects={projects} onEdit={onEditProject} onDelete={onDeleteProject} />

            <div className="admin-action-container">
                <h2>Görev Yönetimi</h2>
                <ButtonAtom className="action-button primary" onClick={() => navigate('/createTask')}>
                    Görev Oluştur
                </ButtonAtom>
            </div>
            <AdminTaskTable tasks={tasks} onEdit={onEditTask} onDelete={onDeleteTask} />
        </div>
    );
}

export default AdminPanel;
