import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask, assignTask, deleteTask, addComment } from '../../store/actions/taskActions';
import { FaEdit, FaCheck, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { Select, message, Button, Spin, Alert } from 'antd'; 
import Header from '../../components/organisms/Header';
import Sidebar from '../../components/organisms/Sidebar';

const { Option } = Select;

function TaskDetailPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);
  const users = useSelector((state) => state.users.users);
  const customers = useSelector((state) => state.customers.customers);
  const currentUser = useSelector((state) => state.auth.user); 
  const usersLoading = useSelector((state) => state.users.loading);
  const customersLoading = useSelector((state) => state.customers.loading);
  const tasksLoading = useSelector((state) => state.tasks.loading);
  const usersError = useSelector((state) => state.users.error);
  const customersError = useSelector((state) => state.customers.error);
  const tasksError = useSelector((state) => state.tasks.error);

  const [task, setTask] = useState(null);
  const [assignment, setAssignment] = useState([]);
  const [comment, setComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

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
    const foundTask = tasks.find((t) => t.id === taskId);
    setTask(foundTask);
    if (foundTask) {
      setEditTitle(foundTask.title);
      setAssignment(foundTask.assignedTo || []);
      console.log('Görev:', foundTask);
      console.log('Kullanıcılar:', users);
      console.log('Müşteriler:', customers);
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
    const user = users.find(u => u.id === task.createdBy);
    if (user) return user.name;
    const customer = customers.find(c => c.id === task.createdBy);
    return customer ? customer.name : 'Bilinmiyor';
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

    newAssignees = newAssignees.filter(userId => userId);

    dispatch(assignTask(task.id, newAssignees, currentUser.uid))
      .catch((error) => {
        console.error('Görev atama hatası:', error);
      });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === '') return;
    dispatch(addComment(task.id, comment, currentUser.uid))
      .then(() => {
        message.success('Yorum başarıyla eklendi.');
      })
      .catch((error) => {
        message.error('Yorum eklenirken bir hata oluştu.');
      });
    setComment('');
  };

  const handleEditTitle = () => {
    if (editTitle.trim() === '') return;
    dispatch(updateTask(task.id, { title: editTitle }, currentUser.uid))
      .then(() => {
        message.success('Görev başlığı güncellendi.');
        setIsEditing(false);
      })
      .catch((error) => {
        message.error('Görev başlığı güncellenirken bir hata oluştu.');
      });
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id))
      .then(() => {
        message.success('Görev başarıyla silindi.');
        navigate('/tasks'); 
      })
      .catch((error) => {
        message.error('Görev silinirken bir hata oluştu.');
      });
  };

  const handleToggleComplete = () => {
    dispatch(updateTask(task.id, { completed: !task.completed }, currentUser.uid))
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

  if (tasksLoading || usersLoading || customersLoading) {
    return (
      <div className="dashboard-container">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`dashboard-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spin size="large" tip="Yükleniyor..." />
          </div>
        </div>
      </div>
    );
  }

  if (tasksError || usersError || customersError) {
    return (
      <div className="dashboard-container">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`dashboard-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <div className="error-container" style={{ padding: '20px' }}>
            {tasksError && <Alert message="Görev Hatası" description={tasksError} type="error" showIcon style={{ marginBottom: '10px' }} />}
            {usersError && <Alert message="Kullanıcı Hatası" description={usersError} type="error" showIcon style={{ marginBottom: '10px' }} />}
            {customersError && <Alert message="Müşteri Hatası" description={customersError} type="error" showIcon style={{ marginBottom: '10px' }} />}
          </div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="dashboard-container">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`dashboard-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <div className="task-detail" style={{ padding: '20px' }}>
            <Alert message="Görev bulunamadı." type="warning" showIcon />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`dashboard-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="task-detail">
          <button onClick={handleBack} className="back-button">
            <FaArrowLeft /> Geri
          </button>

          <div className="task-header">
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="edit-title-input"
              />
            ) : (
              <h2>{task.title}</h2>
            )}
            <div className="task-actions">
              {isEditing ? (
                <button onClick={handleEditTitle} className="action-button save-button">
                  <FaCheck /> Kaydet
                </button>
              ) : (
                <button onClick={() => setIsEditing(true)} className="action-button edit-button">
                  <FaEdit /> Düzenle
                </button>
              )}
              <button onClick={handleDeleteTask} className="action-button delete-button">
                <FaTrash /> Sil
              </button>
            </div>
          </div>

          <div className="task-info">
            <p><strong>Durum:</strong> {task.completed ? 'Tamamlandı' : 'Tamamlanmadı'}</p>
            <p><strong>Atanan Kişi:</strong> {assignedUserNames}</p>
            <p><strong>Oluşturulma Tarihi:</strong> {formattedCreatedAt}</p>
            <p><strong>Görev İçeriği:</strong> {task.description}</p>
            <p><strong>Oluşturan Kişi:</strong> {createdUserName}</p>
          </div>

          <div className="task-actions-section">
            <button onClick={handleToggleComplete} className="action-button complete-button">
              {task.completed ? <FaCheck /> : <FaEdit />} {task.completed ? 'Geri Al' : 'Tamamla'}
            </button>

            <div className="assign-section">
              <Select
                mode="multiple"
                allowClear
                placeholder="Atanacak kişiler"
                value={assignment.includes('all') ? ['all'] : assignment}
                onChange={handleAssignChange}
                style={{ width: 300 }}
                optionLabelProp="label"
                dropdownRender={menu => (
                  <>
                    {menu}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 8 }}>
                      <Button type="link" onClick={handleAssignSubmit}>
                        Gönder
                      </Button>
                    </div>
                  </>
                )}
              >
                <Option key="all" value="all" label="Tüm Kullanıcılar">
                  Tüm Kullanıcılar
                </Option>
                {sortedUsers.map(user => (
                  <Option key={user.id} value={user.id} label={user.name}>
                    {user.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="task-comments">
            <h3>Yorumlar</h3>
            {formattedComments && formattedComments.length > 0 ? (
              <ul className="comments-list">
                {formattedComments.map((cmt, index) => (
                  <li key={index} className="comment-item">
                    <p className="comment-text">{cmt.description}</p>
                    <span className="comment-meta">{cmt.timestamp} - {cmt.authorName}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Henüz yorum eklenmemiş.</p>
            )}
            <h4>Yeni Yorum Ekle</h4>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Yorumunuzu buraya yazın..."
                required
              ></textarea>
              <button type="submit" className="action-button submit-button">
                Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailPage;
