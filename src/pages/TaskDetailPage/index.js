import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask, assignTask, deleteTask, addComment } from '../../store/actions/taskActions';
import { FaEdit, FaCheck, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { Select, message, Button, Spin, Alert, Card, List, Avatar, Form, Input, Tooltip, Row, Col } from 'antd';
import Header from '../../components/organisms/Header';
import Sidebar from '../../components/organisms/Sidebar';
import useWindowsSize from '../../hooks/useWindowsSize'

const { Option } = Select;
const { TextArea } = Input;

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
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const size = useWindowsSize()
  console.log(size)

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
      console.log('Görev:', JSON.stringify(foundTask));
      console.log('Kullanıcılar:', JSON.stringify(users));
      console.log('Müşteriler:', JSON.stringify(customers));
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
    console.log('Task createdUser ID:', task.createdUser);
    const user = users.find(u => u.id === task.createdUser);
    if (user) {
      console.log('Found user:', user);
      return user.name;
    }
    const customer = customers.find(c => c.id === task.createdUser);
    if (customer) {
      console.log('Found customer:', customer);
      return customer.name;
    }
    console.log('User veya customer bulunamadı.');
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

    dispatch(assignTask(task.id, newAssignees, currentUser.uid))
      .catch((error) => {
        console.error('Görev atama hatası:', error);
      });
  };

  const handleCommentSubmit = (values) => {
    const { comment } = values;
    if (comment.trim() === '') {
      message.error('Yorum boş olamaz.');
      return;
    }
    dispatch(addComment(task.id, comment, currentUser.uid))
      .then(() => {
        message.success('Yorum başarıyla eklendi.');
      })
      .catch((error) => {
        message.error('Yorum eklenirken bir hata oluştu.');
      });
  };

  const handleEditTitle = () => {
    if (editTitle.trim() === '') {
      message.error('Başlık boş olamaz.');
      return;
    }
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
          <div className="loading-container">
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
          <div className="error-container">
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
          <div className="task-detail">
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
          <Button type="link" onClick={handleBack} className="back-button">
            <FaArrowLeft /> Geri
          </Button>

          <Card
            title={
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} sm={12}>
                  {isEditing ? (
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="edit-title-input"
                      placeholder="Görev Başlığını Düzenleyin"
                    />
                  ) : (
                    <h2 style={{ fontSize: 20 }}>{task.title}</h2>
                  )}
                </Col>
                <Col xs={24} sm={12}>
                  <Row gutter={[8, 8]} justify="end" align="middle">
                    <Col xs={24} sm={12} md={8}>
                      <Row gutter={[8, 8]} justify="end">
                        {isEditing ? (
                          <Col>
                            <Tooltip title="Kaydet">
                              <Button type="primary" onClick={handleEditTitle} className="action-button save-button">
                                <FaCheck />
                              </Button>
                            </Tooltip>
                          </Col>
                        ) : (
                          <Col>
                            <Tooltip title="Düzenle">
                              <Button type="default" size={size.width <= 768 ? 'small' : 'middle'} onClick={() => setIsEditing(true)} className="action-button edit-button">
                                <FaEdit />
                              </Button>
                            </Tooltip>
                          </Col>
                        )}
                        <Col>
                          <Tooltip title="Sil">
                            <Button type="danger" size={size.width <= 768 ? 'small' : 'middle'} onClick={handleDeleteTask} className="action-button delete-button">
                              <FaTrash />
                            </Button>
                          </Tooltip>
                        </Col>
                        <Col>
                          <Tooltip title={task.completed ? "Görevi Geri Al" : "Görevi Tamamla"}>
                            <Button type="primary" size={size.width <= 768 ? 'small' : 'middle'} onClick={handleToggleComplete} className="action-button complete-button">
                              <FaCheck />
                            </Button>
                          </Tooltip>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            }
            className="task-header-card"
          >
            <div className="task-info">
              <p><strong>Durum:</strong> {task.completed ? 'Tamamlandı' : 'Tamamlanmadı'}</p>
              <p><strong>Atanan Kişi:</strong> {assignedUserNames}</p>
              <p><strong>Oluşturulma Tarihi:</strong> {formattedCreatedAt}</p>
              <p><strong>Görev İçeriği:</strong> {task.description || 'Açıklama yok.'}</p>
              <p><strong>Oluşturan Kişi:</strong> {createdUserName}</p>
              <Col xs={24} sm={16} md={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Select
                    mode="multiple"
                    allowClear
                    placeholder="Atanacak kişiler"
                    value={assignment.includes('all') ? ['all'] : assignment}
                    onChange={handleAssignChange}
                    style={{ flex: 1, marginRight: '8px' }}
                    optionLabelProp="label"
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
                  <Tooltip title="Atama">
                    <Button type="primary" onClick={handleAssignSubmit} className="action-button assign-button" size={size.width <= 768 ? 'small' : 'middle'}>
                      Atama
                    </Button>
                  </Tooltip>
                </div>
              </Col>
            </div>
          </Card>

          <Card title="Yorumlar" bordered={false} className="comments-list-card">
            {formattedComments && formattedComments.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={formattedComments}
                renderItem={(cmt, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar>{cmt.authorName.charAt(0)}</Avatar>}
                      title={`${cmt.authorName} - ${cmt.timestamp}`}
                      description={cmt.description}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <p>Henüz yorum eklenmemiş.</p>
            )}
          </Card>

          <Card title="Yeni Yorum Ekle" bordered={false} className="add-comment-card">
            <Form layout="vertical" onFinish={handleCommentSubmit}>
              <Form.Item
                name="comment"
                label="Yorumunuz"
                rules={[{ required: true, message: 'Yorumunuz boş olamaz!' }]}
              >
                <TextArea rows={4} placeholder="Yorumunuzu buraya yazın..." />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="action-button submit-button" size={size.width <= 768 ? 'small' : 'middle'}>
                  Gönder
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailPage;
