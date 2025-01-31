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
import { fetchCustomers } from '../../store/actions/customerActions';

function AdminPanelPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const currentUser = useSelector(state => state.profiles.user);
    // const isAdmin = useSelector(state => state.auth.user?.isAdmin);
    const users = useSelector(state => state.users.users);
    const projects = useSelector(state => state.projects.projects);
    const tasks = useSelector(state => state.tasks.tasks);
    const customers = useSelector(state => state.customers.customers);
    const authuser = useSelector(state => state.auth)
    // // console.log(authuser)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // console.log(currentUser)
    // console.log(isAdmin)

 

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchProjects());
        dispatch(fetchTasks());
        dispatch(fetchCustomers())
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

    const handleDeleteUser = async (userId) => {
        dispatch(deleteUser(userId))
        .then(() => navigate('/admin'))
        .catch((err) => console.error(err));
    };

    const combinedUsers = [
        ...users.map(user => ({ ...user })),
        ...customers.map(customer => ({ ...customer }))
    ];

    return (
        <div className="dashboard-container">
            <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <AdminPanel
                    users={combinedUsers}
                    projects={projects}
                    tasks={tasks}
                    onEditUser={(user) => navigate(`/admin/${user.id}/edit`, { state: { userData: user } })}
                    onDeleteUser={(userId) => handleDeleteUser(userId)}
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
