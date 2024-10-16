
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask, assignTask, deleteTask, addComment } from '../../store/actions/taskActions';
import { FaEdit, FaCheck, FaTrash, FaHistory, FaArrowLeft } from 'react-icons/fa';
import { Modal, Select, notification, Button } from 'antd';
import Header from '../../components/organisms/Header';
import Sidebar from '../../components/organisms/Sidebar';
import { formatTimestamp } from '../../utils/formatTimestamp';

const { Option } = Select;

function TaskDetailPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);
  const users = useSelector((state) => state.users.users);
  const customers = useSelector((state) => state.customers.customers);
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
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar durumu

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === taskId);
    setTask(foundTask);
    if (foundTask) {
      setEditTitle(foundTask.title);
      setAssignment(foundTask.assignedTo || []);
    }
  }, [tasks, taskId]);

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
  }, [users]);

  const assignedUserNames = useMemo(() => {
    if (!task || !Array.isArray(task.assignedTo)) return 'Atanmamış';
    const names = task.assignedTo.map(userId => {
      const user = users.find(u => u.id === userId);
      return user ? user.name : 'Bilinmiyor';
    });
    return names.length > 0 ? names.join(', ') : 'Atanmamış';
  }, [task, users]);

  const createdUserName = useMemo(() => {
    if (!task) return 'Bilinmiyor';
    const user = users.find(u => u.id === task.createdUser);
    if (user) return user.name;
    const customer = customers.find(c => c.id === task.createdUser);
    return customer ? customer.name : 'Bilinmiyor';
  }, [task, users, customers]);

  const formattedCreatedAt = useMemo(() => {
    if (!task) return 'N/A';
    return formatTimestamp(task.createdAt);
  }, [task]);

  const formattedHistory = useMemo(() => {
    if (!task || !Array.isArray(task.history)) return [];
    return task.history.map((entry) => ({
      ...entry,
      timestamp: formatTimestamp(entry.timestamp),
    }));
  }, [task]);

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

  const handleAssignChange = (value) => {
    setAssignment(value);
  };

  const handleAssignSubmit = () => {
    let assignees = assignment;

    if (assignees.includes('all')) {
      assignees = users.map(user => user.id);
    }

    dispatch(assignTask(task.id, assignees))
      .then(() => {
        notification.success({
          message: 'Başarılı',
          description: 'Görev başarıyla atandı.',
          placement: 'topRight',
        });
      })
      .catch((error) => {
        notification.error({
          message: 'Hata',
          description: 'Görev atanırken bir hata oluştu.',
          placement: 'topRight',
        });
      });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === '') return;
    dispatch(addComment(task.id, comment))
      .then(() => {
        notification.success({
          message: 'Başarılı',
          description: 'Yorum başarıyla eklendi.',
          placement: 'topRight',
        });
      })
      .catch((error) => {
        notification.error({
          message: 'Hata',
          description: 'Yorum eklenirken bir hata oluştu.',
          placement: 'topRight',
        });
      });
    setComment('');
  };

  const handleEditTitle = () => {
    if (editTitle.trim() === '') return;
    dispatch(updateTask({ ...task, title: editTitle }))
      .then(() => {
        notification.success({
          message: 'Başarılı',
          description: 'Görev başlığı güncellendi.',
          placement: 'topRight',
        });
        setIsEditing(false);
      })
      .catch((error) => {
        notification.error({
          message: 'Hata',
          description: 'Görev başlığı güncellenirken bir hata oluştu.',
          placement: 'topRight',
        });
      });
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id))
      .then(() => {
        notification.success({
          message: 'Başarılı',
          description: 'Görev başarıyla silindi.',
          placement: 'topRight',
        });
        navigate('/tasks'); 
      })
      .catch((error) => {
        notification.error({
          message: 'Hata',
          description: 'Görev silinirken bir hata oluştu.',
          placement: 'topRight',
        });
      });
  };

  const handleToggleComplete = () => {
    dispatch(updateTask({ ...task, completed: !task.completed }))
      .then(() => {
        notification.success({
          message: 'Başarılı',
          description: 'Görev durumu güncellendi.',
          placement: 'topRight',
        });
      })
      .catch((error) => {
        notification.error({
          message: 'Hata',
          description: 'Görev durumu güncellenirken bir hata oluştu.',
          placement: 'topRight',
        });
      });
  };

  const showHistoryModal = () => {
    setIsHistoryModalVisible(true);
  };

  const handleHistoryOk = () => {
    setIsHistoryModalVisible(false);
  };

  const handleHistoryCancel = () => {
    setIsHistoryModalVisible(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!task) {
    return (
      <div className="dashboard-container">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`dashboard-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <div className="task-detail">Görev bulunamadı.</div>
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
                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                      <Button type="link" onClick={handleAssignSubmit}>
                        Gönder
                      </Button>
                    </div>
                  </>
                )}
              >
                <Option key="all" value="all" label="Tüm Kullanıcılar">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    Tüm Kullanıcılar
                  </div>
                </Option>
                {sortedUsers.map(user => (
                  <Option key={user.id} value={user.id} label={user.name}>
                    {user.name}
                  </Option>
                ))}
              </Select>
            </div>

            <button onClick={showHistoryModal} className="action-button history-button">
              <FaHistory /> Tarihçe
            </button>
          </div>

          <div className="task-comments">
            <h3>Göreve Yorum Ekle</h3>
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

          <Modal
            title="Görev Tarihçesi"
            visible={isHistoryModalVisible}
            onOk={handleHistoryOk}
            onCancel={handleHistoryCancel}
            footer={[
              <Button key="close" onClick={handleHistoryCancel}>
                Kapat
              </Button>,
            ]}
          >
            <ul>
              {formattedHistory && formattedHistory.length > 0 ? (
                formattedHistory.map((entry, index) => (
                  <li key={index}>
                    <p><strong>{entry.change || 'Değişiklik'}</strong></p>
                    <p>{entry.description || 'Açıklama yok.'}</p>
                    <span>{entry.timestamp}</span>
                  </li>
                ))
              ) : (
                <li>Tarihçe bulunmamaktadır.</li>
              )}
            </ul>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailPage;
