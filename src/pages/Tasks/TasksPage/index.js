import React, { useEffect, useState, useMemo } from 'react';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../../store/actions/taskActions';
import { fetchUsers } from '../../../store/actions/userActions';
import { fetchCustomers } from '../../../store/actions/customerActions';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import TitleAtom from '../../../components/atoms/Title';
import FilterComponent from '../../../components/molecules/FilterComponent';
import HeaderSideBarTemplate from '../../../components/templates/HeaderSideBarTemplate';
import TaskList from '../../../components/organisms/TaskList';
import { useTranslation } from 'react-i18next';

function TasksPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tasksState = useSelector((state) => state.tasks);
  const usersState = useSelector((state) => state.users);
  const customersState = useSelector((state) => state.customers);
  const currentUser = useSelector((state) => state.profiles.user);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [dateRange, setDateRange] = useState({
    startDate: '2020-01-01',
    endDate: format(new Date(), 'yyyy-MM-dd')
  });
  const [selectedUser, setSelectedUser] = useState('');

  const [filteredTasks, setFilteredTasks] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchUsers());
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    const { loading, error, tasks } = tasksState;
    const { loading: usersLoading, error: usersError } = usersState;
    const { loading: customersLoading, error: customersError } = customersState;

    if (
      !loading &&
      !usersLoading &&
      !customersLoading &&
      !error &&
      !usersError &&
      !customersError &&
      Array.isArray(tasks)
    ) {
      if (currentUser?.role === 'customer') {
        const customerTasks = tasks.filter((task) => task.customer === currentUser.id);
        setFilteredTasks(customerTasks);
      } else {
        setFilteredTasks(tasks);
      }
    }
  }, [tasksState, usersState, customersState, currentUser]);

  const handleFilterTasks = () => {
    let baseTasks;
    if (currentUser?.role === 'customer') {
      baseTasks = tasksState.tasks.filter((task) => task.customer === currentUser.id);
    } else {
      baseTasks = tasksState.tasks;
    }

    if (dateRange.startDate && dateRange.endDate) {
      const start = new Date(dateRange.startDate);
      const end = new Date(dateRange.endDate);
      const fixedEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59, 999);

      baseTasks = baseTasks.filter((task) => {
        if (!task.createdAt) return false;
        const taskDate = new Date(task.createdAt.seconds * 1000);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate >= start && taskDate <= fixedEnd;
      });
    }

    if (selectedUser) {
      baseTasks = baseTasks.filter((task) => {
        const assignedTo = Array.isArray(task.assignedTo) ? task.assignedTo : [];
        return assignedTo.includes(selectedUser);
      });
    }

    setFilteredTasks(baseTasks);
  };

  const handleCreateTask = () => {
    navigate('/createTask');
  };

  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  const tasksWithUserNames = useMemo(() => {
    return filteredTasks.map((task) => {
      const assignedUserNames =
        Array.isArray(task.assignedTo) && task.assignedTo.length > 0
          ? task.assignedTo
              .map((userId) => {
                const user = usersState.users.find((u) => u.id === userId);
                return user ? user.name : t('Unknown');
              })
              .join(', ')
          : t('Unknown');

      let createdUserName = t('Unknown');
      const createdUserInUsers = usersState.users.find((u) => u.id === task.createdUser);
      const createdUserInCustomers = customersState.customers.find((c) => c.id === task.createdUser);

      if (createdUserInUsers) {
        createdUserName = createdUserInUsers.name;
      } else if (createdUserInCustomers) {
        createdUserName = createdUserInCustomers.name;
      }

      return {
        ...task,
        assignedToName: assignedUserNames,
        createdUserName
      };
    });
  }, [filteredTasks, usersState.users, customersState.customers, t]);

  return (
    <div className="dashboard-container">
      <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <main className="tasks-main">
          <TitleAtom level={1} className="title">
            {t('Tasks')}
          </TitleAtom>
          <FilterComponent
            dateRange={dateRange}
            setDateRange={setDateRange}
            usersState={usersState}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            filterTasks={handleFilterTasks} 
            handleCreateTask={handleCreateTask}
            customersState={customersState}
            type="tasks"
          />

          <div className="tasks-list-section">
            {tasksState.loading ? (
              <p>{t('Loading tasks...')}</p>
            ) : tasksState.error ? (
              <p className="error">{tasksState.error}</p>
            ) : tasksWithUserNames.length === 0 ? (
              <p>{t('There are no task to list.')}</p>
            ) : (
              <TaskList tasks={tasksWithUserNames} onTaskClick={handleTaskClick} />
            )}
          </div>
        </main>
      </HeaderSideBarTemplate>
    </div>
  );
}

export default TasksPage;
