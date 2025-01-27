import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TaskDetailPage from './pages/Tasks/TaskDetailPage';
import ProtectedRoute from './ProtectedRoute';
import TasksPage from './pages/Tasks/TasksPage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './store/actions/userActions';
import { fetchCustomers } from './store/actions/customerActions';
import TaskCreationPage from './pages/Tasks/TaskCreationPage';
import ProjectsPage from './pages/Projects/ProjectsPage';
import NewProjectPage from './pages/Projects/NewProjectPage';
import ProjectDetailPage from './pages/Projects/ProjectDetailPage';
import EditProjectPage from './pages/Projects/EditProjectPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import AdminPanelPage from './pages/AdminPanelPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import EditTaskPage from './pages/Tasks/EditTaskPage';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchUsers());
      dispatch(fetchCustomers());
    }
  }, [dispatch, user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin', 'user', 'customer']}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createTask"
          element={
            <ProtectedRoute allowedRoles={['admin', 'user', 'customer']}>
              <TaskCreationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/:taskId"
          element={
            <ProtectedRoute allowedRoles={['admin', 'user', 'customer']}>
              <TaskDetailPage />
            </ProtectedRoute>
          }
        />
         <Route
          path="/tasks/:taskId/edit"
          element={
            <ProtectedRoute allowedRoles={['admin', 'customer']}>
              <EditTaskPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute allowedRoles={['admin', 'user', 'customer']}>
              <TasksPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute allowedRoles={['admin', 'user', 'customer']}>
              <ProjectsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/new"
          element={
            <ProtectedRoute allowedRoles={['admin', 'user', 'customer']}>
              <NewProjectPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId"
          element={
            <ProtectedRoute allowedRoles={['admin', 'user', 'customer']}>
              <ProjectDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId/edit"
          element={
            <ProtectedRoute allowedRoles={['admin', 'customer']}>
              <EditProjectPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute allowedRoles={['admin', 'user', 'customer']}>
              <AnalyticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['admin', 'user', 'customer']}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPanelPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/register"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1>404: Sayfa Bulunamadı</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
