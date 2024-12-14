import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actionProject from '../../../store/actions/projectActions';
import { fetchTasks } from '../../../store/actions/taskActions';
import ProjectDetailTemplate from '../../../components/templates/ProjectDetailTemplate';
import SpinAtom from '../../../components/atoms/Spin';
import AlertAtom from '../../../components/atoms/Alert';
import { Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import * as userAction from '../../../store/actions/userActions';
import useWindowsSize from '../../../hooks/useWindowsSize';
import HeaderSideBarTemplate from '../../../components/templates/HeaderSideBarTemplate';


function ProjectDetailPage() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const size = useWindowsSize()

  const root = useSelector(state => state);
  const { users } = root.users;
  const { projects, loading, error } = root.projects;
  const { tasks } = root.tasks;
  const currentUser = root.auth.user;

  const [project, setProject] = useState(null);
  const [assignment, setAssignment] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  useEffect(() => {
    if (!users.length) {
      dispatch(userAction.fetchUsers());
    }
  }, [dispatch, users.length]);

  const assignedUsers = users.filter((user) =>
    (project?.assignedUsers || []).includes(user.id)
  );

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => (a.displayName || a.email).localeCompare(b.displayName || b.email));
  }, [users]);

  useEffect(() => {
    if (!projects.length) {
      dispatch(actionProject.fetchProjects());
    } else {
      const foundProject = projects.find((p) => p.id === projectId);
      setProject(foundProject);
    }
  }, [dispatch, projects, projectId]);

  useEffect(() => {
    if (projects.length) {
      const foundProject = projects.find((p) => p.id === projectId);
      setProject(foundProject);
    }
  }, [projects, projectId]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const projectTasks = tasks.filter((task) => task.projectId === projectId);

  const handleDelete = () => {
    Modal.confirm({
      title: 'Projeyi silmek istediğinize emin misiniz?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Evet',
      okType: 'danger',
      cancelText: 'Hayır',
      onOk() {
        dispatch(actionProject.deleteProject(projectId))
          .then(() => {
            navigate('/projects');
          })
          .catch((error) => {
            console.error('Proje silinemedi:', error);
          });
      },
    });
  };

  const handleCreateTask = () => {
    navigate(`/createTask?projectId=${projectId}`);
  };

  const handleEdit = () => {
    navigate(`/projects/${projectId}/edit`);
  };

  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleToggleComplete = () => {
    const updatedProject = {
      ...project,
      status: project.status === 'completed' ? 'active' : 'completed',
    };
    dispatch(actionProject.updateProject(projectId, updatedProject))
      .then(() => {
        message.success('Proje durumu güncellendi');
      })
      .catch((error) => {
        message.error('Proje durumu güncellenemedi: ' + error.message);
      });
  };

  if (loading || !project) {
    return <SpinAtom tip="Yükleniyor..." />;
  }

  const handleAssignChange = (value) => {
    setAssignment(value);
    console.log(assignment)
  };

  const handleAssignSubmit = () => {
    if (!project) return;
    let newAssignees = assignment;

    if (newAssignees.includes('all')) {
      newAssignees = users.map(user => user.id);
    }

    if (newAssignees.length === 0) {
      message.error('Atama yapabilmek için en az bir kullanıcı seçmelisiniz.');
      return;
    }

    newAssignees = newAssignees.filter(userId => userId);

    dispatch(actionProject.assignProject(project.id, newAssignees, currentUser.id))
      .catch((error) => {
        console.error('Görev atama hatası:', error);
      });
  };

  if (error) {
    return (
      <AlertAtom
        message="Hata"
        description={error}
        type="error"
        showIcon
      />
    );
  }

  return (
    <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
      <ProjectDetailTemplate
        project={project}
        tasks={projectTasks}
        onTaskClick={handleTaskClick}
        onEditProject={handleEdit}
        onDeleteProject={handleDelete}
        onCreateTask={handleCreateTask}
        assignedUsers={assignedUsers}
        handleAssignChange={handleAssignChange}
        handleAssignSubmit={handleAssignSubmit}
        handleToggleComplete={handleToggleComplete}
        assignment={assignment}
        sortedUsers={sortedUsers}
        size={size}
      />
    </HeaderSideBarTemplate>
  );
}

export default ProjectDetailPage;
