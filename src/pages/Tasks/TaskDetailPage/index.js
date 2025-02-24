import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../../store/actions/taskActions';
import * as projectAction from '../../../store/actions/projectActions';
import { message, Alert } from 'antd';
import HeaderSideBarTemplate from '../../../components/templates/HeaderSideBarTemplate';
import useWindowsSize from '../../../hooks/useWindowsSize';
import { useTranslation } from 'react-i18next';
import TaskDetailTemplate from '../../../components/templates/TaskDetailTemplate';
import LoadingSpinner from '../../../components/molecules/LoadingSpinner';


function TaskDetailPage() {
  const { t } = useTranslation();
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const root = useSelector(state => state);

  const tasks = root.tasks.tasks;
  const users = root.users.users;
  const customers = root.customers.customers;
  const projects = root.projects.projects;

  const currentUser = root.profiles.user;
  const usersLoading = root.users.loading;
  const customersLoading = root.customers.loading;
  const tasksLoading = root.tasks.loading;
  const usersError = root.users.error;
  const customersError = root.customers.error;
  const tasksError = root.tasks.error;

  const [task, setTask] = useState(null);
  const [project, setProject] = useState(null);
  const [assignment, setAssignment] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);


  const size = useWindowsSize()
  // console.log(size)

  useEffect(() => {
    if (!tasks || tasks.length === 0) {
      dispatch(action.fetchTasks());
    }
  }, [dispatch, tasks]);

  useEffect(() => {
    if (!projects || projects.length === 0) {
      dispatch(projectAction.fetchProjects());
    }
  }, [dispatch, projects]);




  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';

    let date;

    if (timestamp instanceof Date) {
      date = timestamp;
    } else if (timestamp.toDate && typeof timestamp.toDate === 'function') {
      date = timestamp.toDate();
    } else if (typeof timestamp === 'object' && timestamp.seconds && timestamp.nanoseconds) {
      date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    } else if (typeof timestamp === 'string') {
      date = new Date(timestamp);
    } else {
      return 'N/A';
    }

    if (isNaN(date.getTime())) {
      return 'N/A';
    }

    return date.toLocaleString();
  };

  const getChangedByName = (changedById) => {
    const user = users.find(u => u.id === changedById);
    if (user) return user.name;
    const customer = customers.find(c => c.id === changedById);
    return customer ? customer.name : t('Unknown');
  };

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const foundTask = tasks.find((t) => t.id === taskId);
      setTask(foundTask);
      if (foundTask) {
        setEditTitle(foundTask.title);
        setAssignment(foundTask.assignedTo || []);
        const foundProject = foundTask.projectId
          ? projects.find(p => p.id === foundTask.projectId)
          : null;
        setProject(foundProject);
        // console.log(foundProject)
        // console.log(foundTask)
        // console.log(projects)
      }
    }
  }, [tasks, taskId, users, customers, projects]);



  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
  }, [users]);

  const assignedUserNames = users.filter((user) => (task?.assignedTo || []).includes(user.id));
  const taskCustomer = customers.filter((customer) => (task?.customer || []).includes(customer.id));

  const createdUserName = useMemo(() => {
    if (!task) return t('Unknown');
    // console.log('Task createdUser ID:', task.createdUser);
    const user = users.find(u => u.id === task.createdUser);
    if (user) {
      // console.log('Found user:', user);
      return user.name;
    }
    const customer = customers.find(c => c.id === task.createdUser);
    if (customer) {
      // console.log('Found customer:', customer);
      return customer.name;
    }
    // console.log('User veya customer bulunamadı.');
    return t('Unknown');
  }, [task, users, customers]);

  const formattedCreatedAt = useMemo(() => {
    if (!task) return 'N/A';
    return formatTimestamp(task.createdAt);
  }, [task]);

  const formattedComments = useMemo(() => {
    if (!task || !Array.isArray(task.history)) return [];
    return task.history
      .filter(entry => entry.changeType === 'comment')
      .map(entry => ({
        ...entry,
        timestamp: formatTimestamp(entry.timestamp),
        authorName: getChangedByName(entry.changedBy),
        attachments: entry.attachments || [],
      }));
  }, [task, users, customers]);

  const handleAssignChange = (value) => {
    setAssignment(value);
  };

  const handleAssignSubmit = () => {
    if (!task) return;
    let newAssignees = assignment;

    if (newAssignees.includes('all')) {
      newAssignees = users.map(user => user.id);
    }

    if (newAssignees.length === 0) {
      message.error(t('At least one user must be selected'));
      return;
    }

    newAssignees = newAssignees.filter(userId => userId);

    dispatch(action.assignTask(task.id, newAssignees, currentUser.id))
      .catch((error) => {
        message.error(t('Assignment error'));
        // console.error('Görev atama hatası:', error);
      });
  };

  const handleCommentSubmit = (values) => {
    const { comment, attachments } = values;
    if (comment.trim() === '') {
      message.error(t('Comment cannot be empty'));
      return;
    }
    dispatch(action.addComment(task.id, comment, currentUser.id, attachments))
      .then(() => {
        message.success(t('Comment added successfully'));
      })
      .catch((error) => {
        message.error(t('An error occurred while adding the comment'));
      });
    // console.log(values)
    // console.log('Görev ID:', task.id);

  };


  const handleEditTitle = () => {
    if (editTitle.trim() === '') {
      message.error(t('Title cannot be empty'));
      return;
    }
    dispatch(action.updateTask(task.id, { title: editTitle }, currentUser.id))
      .then(() => {
        message.success(t('Task title updated'));
        setIsEditing(false);
      })
      .catch((error) => {
        message.error(t('An error occurred while updating the task title'));
      });
  };

  const handleDeleteTask = () => {
    dispatch(action.deleteTask(task.id))
      .then(() => {
        message.success(t('Task successfully deleted'));
        navigate('/tasks');
      })
      .catch((error) => {
        message.error(t('An error occurred while deleting the task'));
      });
  };


  const handleToggleComplete = () => {
    const newStatus = task.status === 'close' ? 'open' : 'close';

    const updatedTask = {
      ...task,
      status: newStatus,
      changedBy: currentUser.id,
    };

    dispatch(action.updateTask(taskId, updatedTask))
      .then(() => {
        message.success(t('Task status updated'));
      })
      .catch((error) => {
        message.error(t('Task status could not be updated') + ': ' + error.message);
      });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const showHistoryModal = () => {
    setIsHistoryModalVisible(true);
  };

  const handleHistoryModalClose = () => {
    setIsHistoryModalVisible(false);
  };

  const handleEdit = () => {
    navigate(`/tasks/${taskId}/edit`);
  };

  const filteredHistory = useMemo(() => {
    if (!task || !Array.isArray(task.history)) return [];
    return task.history.filter(entry => ['firsthistory','assign', 'unassign', 'update', 'taskAssign', 'taskupdate', 'categoryupdate','priorityupdate', 'statusupdate','unassigntaskupdate', 'customerupdate', 'titleupdate','descriptionupdate'].includes(entry.changeType));
  }, [task]);


  if (tasksLoading || usersLoading || customersLoading) {
    return (
      <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <LoadingSpinner tip={t('Loading...')}/>
      </HeaderSideBarTemplate>
    );
  }


  if (tasksError || usersError || customersError) {
    return (
      <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <div className="task-error-container">
          {tasksError && <Alert message={t('Task Error')} description={tasksError} type="error" showIcon style={{ marginBottom: '10px' }} />}
          {usersError && <Alert message={t('User Error')} description={usersError} type="error" showIcon style={{ marginBottom: '10px' }} />}
          {customersError && <Alert message={t('Customer Error')} description={customersError} type="error" showIcon style={{ marginBottom: '10px' }} />}
        </div>
      </HeaderSideBarTemplate>
    );
  }

  if (!task) {
    return (
      <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <div className="task-error-container">
          <Alert message={t('Task not found')} type="warning" showIcon />
        </div>
      </HeaderSideBarTemplate>
    );
  }

  return (
    <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
      <div className="dashboard-container">
        <TaskDetailTemplate
          handleBack={handleBack}
          editTitle={editTitle}
          isEditing={isEditing}
          setEditTitle={setEditTitle}
          handleEditTitle={handleEditTitle}
          handleEdit={handleEdit}
          showHistoryModal={showHistoryModal}
          handleDeleteTask={handleDeleteTask}
          handleToggleComplete={handleToggleComplete}
          size={size}
          task={task}
          assignedUserNames={assignedUserNames}
          formattedCreatedAt={formattedCreatedAt}
          createdUserName={createdUserName}
          assignment={assignment}
          handleAssignChange={handleAssignChange}
          handleAssignSubmit={handleAssignSubmit}
          sortedUsers={sortedUsers}
          taskCustomer={taskCustomer}
          project={project}
          formattedComments={formattedComments}
          handleCommentSubmit={handleCommentSubmit}
          isHistoryModalVisible={isHistoryModalVisible}
          handleHistoryModalClose={handleHistoryModalClose}
          filteredHistory={filteredHistory}
          getChangedByName={getChangedByName}
          formatTimestamp={formatTimestamp}
        />
      </div>
    </HeaderSideBarTemplate>

  );
}

export default TaskDetailPage;
