import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/actions/userActions';
import { fetchProjects, deleteProject } from '../../store/actions/projectActions';
import { fetchTasks, deleteTask } from '../../store/actions/taskActions';
import AdminPanel from '../../components/organisms/AdminPanel';
import HeaderSideBarTemplate from '../../components/templates/HeaderSideBarTemplate';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../store/actions/authActions';

function AdminPanelPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.profiles.user);
    const users = useSelector(state => state.users.users);
    const projects = useSelector(state => state.projects.projects);
    const tasks = useSelector(state => state.tasks.tasks);
    const customers = useSelector(state => state.customers.customers);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// console.log(user)
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/unauthorized');
        }
    }, [user, navigate]);


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchProjects());
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleEditProject = (projectId) => {
        navigate(`/projects/${projectId}/edit`);
    };

    const handleEditTask = (taskId) => {
        navigate(`/tasks/${taskId}/edit`);
    };

    const handleDeleteProject = (projectId) => {
        dispatch(deleteProject(projectId))
            .then(() => navigate('/admin'))
            .catch((err) => console.error(err));
    };

    const handleDeleteTask = (taskId) => {
        dispatch(deleteTask(taskId))
            .then(() => navigate('/admin'))
            .catch((err) => console.error(err));
    };

    const combinedUsers = [
        ...users.map(user => ({ ...user})), 
        ...customers.map(customer => ({ ...customer }))
    ];

    return (
        <div className="dashboard-container">
            <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <AdminPanel
                    users={combinedUsers}
                    projects={projects}
                    tasks={tasks}
                    onEditUser={(user) => console.log('Edit user', user)}
                    onDeleteUser={(userId) => dispatch(deleteUser(userId))}
                    onEditProject={(project) => handleEditProject(project.id)}
                    onDeleteProject={(projectId) => handleDeleteProject(projectId)}
                    onEditTask={(task) => handleEditTask(task.id)}
                    onDeleteTask={(taskId) => handleDeleteTask(taskId)}
                />
            </HeaderSideBarTemplate>
        </div>
    );
}

export default AdminPanelPage;
