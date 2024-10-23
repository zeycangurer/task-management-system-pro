import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TaskDetailPage from './pages/TaskDetailPage';
import ProtectedRoute from './ProtectedRoute';
import TasksPage from './pages/TasksPage';
import { ToastContainer } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './store/actions/userActions';
import { fetchCustomers } from './store/actions/customerActions';

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
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/:taskId"
          element={
            <ProtectedRoute>
              <TaskDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1>404: Sayfa Bulunamadı</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
