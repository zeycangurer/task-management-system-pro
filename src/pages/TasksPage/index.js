import React, { useEffect, useState, useMemo } from 'react';
import Header from '../../components/organisms/Header';
import Sidebar from '../../components/organisms/Sidebar';
import TaskList from '../../components/organisms/TaskList';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../store/actions/taskActions';
import { fetchUsers } from '../../store/actions/userActions';
import { fetchCustomers } from '../../store/actions/customerActions';
import { startOfYear, format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function TasksPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasksState = useSelector((state) => state.tasks);
  const usersState = useSelector((state) => state.users);
  const customersState = useSelector((state) => state.customers);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [dateRange, setDateRange] = useState({
    startDate: format(startOfYear(new Date()), 'yyyy-MM-dd'), 
    endDate: format(new Date(), 'yyyy-MM-dd'), 
  });
  const [selectedUser, setSelectedUser] = useState('');

  const [filteredTasks, setFilteredTasks] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getTaskDate = (task) => {
    if (task.date) {
      return new Date(task.date);
    } else if (task.dueDate) {
      return new Date(task.dueDate.seconds * 1000 + task.dueDate.nanoseconds / 1000000);
    } else if (task.createdAt) {
      if (typeof task.createdAt === 'string') {
        return new Date(task.createdAt);
      } else if (task.createdAt.seconds) {
        return new Date(task.createdAt.seconds * 1000 + task.createdAt.nanoseconds / 1000000);
      }
    }
    return null;
  };

  const filterTasks = () => {
    console.log("Filtering tasks with selectedUser:", selectedUser);
    let filtered = tasksState.tasks;

    if (dateRange.startDate && dateRange.endDate) {
      const start = new Date(dateRange.startDate);
      const end = new Date(dateRange.endDate);
      end.setHours(23, 59, 59, 999); 
      filtered = filtered.filter(task => {
        const taskDate = getTaskDate(task);
        if (!taskDate) {
          console.log("Task excluded due to missing date:", task.id);
          return false;
        }
        const isWithinRange = taskDate >= start && taskDate <= end;
        if (!isWithinRange) {
          console.log(`Task excluded due to date: ${task.id}, Date: ${taskDate}`);
        }
        return isWithinRange;
      });
    }

    if (selectedUser) {
      filtered = filtered.filter(task => {
        const assignedTo = Array.isArray(task.assignedTo) ? task.assignedTo : [];
        const hasUser = assignedTo.includes(selectedUser);
        console.log(`Task ID: ${task.id}, has selected user: ${hasUser}`);
        return hasUser;
      });
    }

    console.log("Filtered tasks count:", filtered.length);
    setFilteredTasks(filtered);
  };

  const handleCreateTask = () => {
    navigate('/createTask');
  };

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchUsers());
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (tasksState.loading || usersState.loading || customersState.loading) {
      console.log("Veriler yükleniyor...");
      return;
    }

    if (tasksState.error || usersState.error || customersState.error) {
      console.log("Veri yükleme hatası:", tasksState.error, usersState.error, customersState.error);
      return;
    }

    if (!Array.isArray(tasksState.tasks) || !Array.isArray(usersState.users) || !Array.isArray(customersState.customers)) {
      console.log("Veriler doğru formatta değil");
      return;
    }

    console.log("Yüklenen görevler:", JSON.stringify(tasksState.tasks));
    console.log("Yüklenen kullanıcılar:", JSON.stringify(usersState.users));
    console.log("Yüklenen müşteriler:", JSON.stringify(customersState.customers));

    filterTasks();
  }, [
    tasksState.loading,
    usersState.loading,
    customersState.loading,
    tasksState.error,
    usersState.error,
    customersState.error,
    tasksState.tasks,
    usersState.users,
    customersState.customers,
    dateRange,
    selectedUser,
  ]);

  const tasksWithUserNames = useMemo(() => {
    return filteredTasks.map(task => {
      const assignedUserNames = Array.isArray(task.assignedTo) && task.assignedTo.length > 0
        ? task.assignedTo.map(userId => {
            const user = usersState.users.find(user => user.id === userId);
            return user ? user.name : 'Bilinmiyor';
          }).join(', ')
        : 'Bilinmiyor';

      let createdUserName = 'Bilinmiyor';
      const createdUserInUsers = usersState.users.find(user => user.id === task.createdUser);
      const createdUserInCustomers = customersState.customers.find(customer => customer.id === task.createdUser);
      if (createdUserInUsers) {
        createdUserName = createdUserInUsers.name;
      } else if (createdUserInCustomers) {
        createdUserName = createdUserInCustomers.name;
      }

      return { ...task, assignedToName: assignedUserNames, createdUserName };
    });
  }, [filteredTasks, usersState.users, customersState.customers]);

  useEffect(() => {
    console.log("Tasks:", tasksState.tasks);
    console.log("Users:", usersState.users);
    console.log("Customers:", customersState.customers);
    console.log("Filtered Tasks:", filteredTasks);
    console.log("Tasks with User Names:", tasksWithUserNames);
  }, [tasksState.tasks, usersState.users, customersState.customers, filteredTasks, tasksWithUserNames]);

  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`dashboard-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="tasks-main">
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
              {usersState.loading || customersState.loading ? (
                <p>Yükleniyor...</p>
              ) : usersState.error || customersState.error ? (
                <p className="error">{usersState.error || customersState.error}</p>
              ) : (
                <select
                  id="user-select"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  <option value="">Tüm Kullanıcılar</option>
                  {usersState.users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            
            <div className="button-group">
              <button className="list-button" onClick={filterTasks}>
                Talep Listele
              </button>
              <button className="create-button" onClick={handleCreateTask}>
                Talep Oluştur
              </button>
            </div>
          </div>
          
          <div className="tasks-list-section">
            {tasksState.loading ? (
              <p>Görevler yükleniyor...</p>
            ) : tasksState.error ? (
              <p className="error">{tasksState.error}</p>
            ) : (
              <TaskList tasks={tasksWithUserNames} onTaskClick={handleTaskClick} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default TasksPage;
