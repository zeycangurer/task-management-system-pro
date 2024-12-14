import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../../store/actions/taskActions';
import { message, Spin, Alert, Button, Card } from 'antd';
import HeaderSideBarTemplate from '../../../components/templates/HeaderSideBarTemplate';
import TaskHeader from '../../../components/organisms/TaskHeader';
import TaskInfo from '../../../components/organisms/TaskInfo';
import CommentsList from '../../../components/organisms/CommentsList';
import AddCommentForm from '../../../components/organisms/AddCommentForm';
import HistoryModal from '../../../components/organisms/HistoryModal';
import useWindowsSize from '../../../hooks/useWindowsSize';
import { FaArrowLeft } from 'react-icons/fa';


function TaskDetailPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const root = useSelector(state => state);

  const tasks = root.tasks.tasks;
  const users = root.users.users;
  const customers = root.customers.customers;
  const currentUser = root.auth.user;
  const usersLoading = root.users.loading;
  const customersLoading = root.customers.loading;
  const tasksLoading = root.tasks.loading;
  const usersError = root.users.error;
  const customersError = root.customers.error;
  const tasksError = root.tasks.error;

  const [task, setTask] = useState(null);
  const [assignment, setAssignment] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);

  
  const size = useWindowsSize()
  // console.log(size)

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
    return customer ? customer.name : 'Bilinmiyor';
  };

  useEffect(() => {
    // console.log(tasks)
    const foundTask = tasks.find((t) => t.id === taskId);
    setTask(foundTask);
    if (foundTask) {
      setEditTitle(foundTask.title);
      setAssignment(foundTask.assignedTo || []);
      // console.log('Görev:', foundTask);
      // console.log('Kullanıcılar:', JSON.stringify(users));
      // console.log('Müşteriler:', JSON.stringify(customers));
    }
  }, [tasks, taskId, users, customers]);
  

 

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
  }, [users]);

  const assignedUserNames = useMemo(() => {
    if (!task || !Array.isArray(task.assignedTo) || task.assignedTo.length === 0) return 'Atanmamış';
    const names = task.assignedTo
      .filter(userId => userId)
      .map(userId => {
        const user = users.find(u => u.id === userId);
        if (user) return user.name;
        const customer = customers.find(c => c.id === userId);
        return customer ? customer.name : 'Bilinmiyor';
      });
    return names.length > 0 ? names.join(', ') : 'Atanmamış';
  }, [task, users, customers]);

  const createdUserName = useMemo(() => {
    if (!task) return 'Bilinmiyor';
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
    return 'Bilinmiyor';
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
      message.error('Atama yapabilmek için en az bir kullanıcı seçmelisiniz.');
      return;
    }

    newAssignees = newAssignees.filter(userId => userId);

    dispatch(action.assignTask(task.id, newAssignees, currentUser.uid))
      .catch((error) => {
        // console.error('Görev atama hatası:', error);
      });
  };

  const handleCommentSubmit = (values) => {
    const { comment, attachments } = values;
    if (comment.trim() === '') {
      message.error('Yorum boş olamaz.');
      return;
    }
    dispatch(action.addComment(task.id, comment, currentUser.uid, attachments))
      .then(() => {
        message.success('Yorum başarıyla eklendi.');
      })
      .catch((error) => {
        message.error('Yorum eklenirken bir hata oluştu.');
      });
      console.log(values)
      console.log('Görev ID:', task.id);

  };


  const handleEditTitle = () => {
    if (editTitle.trim() === '') {
      message.error('Başlık boş olamaz.');
      return;
    }
    dispatch(action.updateTask(task.id, { title: editTitle }, currentUser.uid))
      .then(() => {
        message.success('Görev başlığı güncellendi.');
        setIsEditing(false);
      })
      .catch((error) => {
        message.error('Görev başlığı güncellenirken bir hata oluştu.');
      });
  };

  const handleDeleteTask = () => {
    dispatch(action.deleteTask(task.id))
      .then(() => {
        message.success('Görev başarıyla silindi.');
        navigate('/tasks');
      })
      .catch((error) => {
        message.error('Görev silinirken bir hata oluştu.');
      });
  };

  const handleToggleComplete = () => {
    dispatch(action.updateTask(task.id, { completed: !task.completed }, currentUser.uid))
      .then(() => {
        message.success('Görev durumu güncellendi.');
      })
      .catch((error) => {
        message.error('Görev durumu güncellenirken bir hata oluştu.');
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

  const filteredHistory = useMemo(() => {
    if (!task || !Array.isArray(task.history)) return [];
    return task.history.filter(entry => ['assign', 'unassign', 'update'].includes(entry.changeType));
  }, [task]);


  if (tasksLoading || usersLoading || customersLoading) {
    return (
      <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <div className="loading-container">
          <Spin size="large" tip="Yükleniyor..." />
        </div>
      </HeaderSideBarTemplate>
    );
  }


  if (tasksError || usersError || customersError) {
    return (
      <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <div className="error-container">
          {tasksError && <Alert message="Görev Hatası" description={tasksError} type="error" showIcon style={{ marginBottom: '10px' }} />}
          {usersError && <Alert message="Kullanıcı Hatası" description={usersError} type="error" showIcon style={{ marginBottom: '10px' }} />}
          {customersError && <Alert message="Müşteri Hatası" description={customersError} type="error" showIcon style={{ marginBottom: '10px' }} />}
        </div>
      </HeaderSideBarTemplate>
    );
  }

  if (!task) {
    return (
      <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <div className="task-detail">
          <Alert message="Görev bulunamadı." type="warning" showIcon />
        </div>
      </HeaderSideBarTemplate>
    );
  }

  return (
    <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
      <div className="task-detail">
        <Card bordered={false} className='task-header-info'>
          <Button type="link" onClick={handleBack} className="back-button">
            <FaArrowLeft /> Geri
          </Button>
          <TaskHeader
            isEditing={isEditing}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            handleEditTitle={handleEditTitle}
            setIsEditing={setIsEditing}
            showHistoryModal={showHistoryModal}
            handleDeleteTask={handleDeleteTask}
            handleToggleComplete={handleToggleComplete}
            size={size.width <= 768 ? 'small' : 'middle'}
            task={task}
          />
          <TaskInfo
            task={task}
            assignedUserNames={assignedUserNames}
            formattedCreatedAt={formattedCreatedAt}
            createdUserName={createdUserName}
            assignment={assignment}
            handleAssignChange={handleAssignChange}
            handleAssignSubmit={handleAssignSubmit}
            sortedUsers={sortedUsers}
            size={size.width <= 768 ? 'small' : 'middle'}
          />
        </Card>
        <CommentsList formattedComments={formattedComments} />
        <AddCommentForm handleCommentSubmit={handleCommentSubmit} size={size.width <= 768 ? 'small' : 'middle'} />
        <HistoryModal
          isVisible={isHistoryModalVisible}
          handleClose={handleHistoryModalClose}
          filteredHistory={filteredHistory}
          getChangedByName={getChangedByName}
          formatTimestamp={formatTimestamp}
        />
      </div>
    </HeaderSideBarTemplate>
  );
}

export default TaskDetailPage;
