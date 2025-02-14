import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as projectAction from '../../../store/actions/projectActions';
import * as taskAction from '../../../store/actions/taskActions';
import * as userAction from '../../../store/actions/userActions';
import useWindowsSize from '../../../hooks/useWindowsSize';
import ProjectDetailTemplate from '../../../components/templates/ProjectDetailTemplate';
import { message } from 'antd';
import HeaderSideBarTemplate from '../../../components/templates/HeaderSideBarTemplate';
import './styles.css'
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '../../../components/molecules/LoadingSpinner';

function ProjectDetailPage() {
  const { t } = useTranslation();

  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const size = useWindowsSize();

  const root = useSelector(state => state);
  const { users } = root.users;
  const { customers } = root.customers;
  const { projects, loading, error } = root.projects;
  const { tasks } = root.tasks;
  const currentUser = root.auth.user;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [project, setProject] = useState(null);
  const [assignment, setAssignment] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // useEffect(() => {
  //   console.log('Proje veya görevler güncellendi:', project, tasks);
  // }, [project, tasks]);

  useEffect(() => {
    if (!users.length) {
      dispatch(userAction.fetchUsers());
    }
    if (!projects.length) {
      dispatch(projectAction.fetchProjects());
    }
    dispatch(taskAction.fetchTasks());
  }, [dispatch, users.length, projects.length]);

  useEffect(() => {
    if (projects.length) {
      const foundProject = projects.find(p => p.id === projectId);
      setProject(foundProject);
    }
  }, [projects, projectId]);

  const assignedUsers = users.filter((user) => (project?.assignedUsers || []).includes(user.id));
  const projectCustomer = customers.filter((customer) => (project?.customerId || []).includes(customer.id));

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => (a.displayName || a.email).localeCompare(b.displayName || b.email));
  }, [users]);

  const projectTasks = useMemo(() => {
    return tasks.filter((task) => task.projectId === projectId);
  }, [tasks, projectId]);

  const handleBack = () => navigate(-1);

  const handleEdit = () => {
    navigate(`/projects/${projectId}/edit`);
  };

  const handleDeleteProject = () => {
    dispatch(projectAction.deleteProject(projectId))
      .then(() => {
        message.success(t('Project successfully deleted'));
        navigate('/projects')
      })
      .catch((err) => console.error(err));
  };

  const handleCreateTask = () => {
    navigate(`/createTask?projectId=${projectId}`);
  };

  const handleToggleComplete = () => {
    const newStatus = project.status === 'close' ? 'open' : 'close';

    const updatedProject = {
      ...project,
      status: newStatus,
      changedBy: currentUser.uid,
    };

    dispatch(projectAction.updateProject(projectId, updatedProject))
      .then(() => {
        message.success(t('Project status updated'));
      })
      .catch((error) => {
        message.error(t('Project status could not be updated') + ': ' + error.message);
      });
  };


  const handleAssignChange = (value) => {
    setAssignment(value);
  };

  const handleAssignSubmit = () => {
    if (!project) return;
    let newAssignees = assignment;

    if (newAssignees.includes('all')) {
      newAssignees = users.map(user => user.id);
    }

    if (newAssignees.length === 0) {
      message.error(t('At least one user must be selected'));
      return;
    }

    newAssignees = newAssignees.filter(userId => userId);

    dispatch(projectAction.assignProject(project.id, newAssignees, currentUser.uid))
      .catch((error) => {
        console.error(t('Assignment error'), error);
      });
  };

  if (loading || !project) {
    return (
      <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <LoadingSpinner tip={t('Loading...')} />
      </HeaderSideBarTemplate>
    );

  }

  if (error) {
    return <div>{t('Error')}{error}</div>;
  }


  const comments = project.comments || [];
  const attachments = project.attachments || [];
  const historyEntries = project.history || [];
  const relatedTasks = project.relatedTasks || [];

  // console.log(JSON.stringify(project))

  return (

    <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
      <div className="dashboard-container">
        <ProjectDetailTemplate
          onBack={handleBack}
          project={project}
          tasks={projectTasks}
          assignedUsers={assignedUsers}
          sortedUsers={sortedUsers}
          assignment={assignment}
          handleAssignChange={handleAssignChange}
          handleAssignSubmit={handleAssignSubmit}
          onEditProject={handleEdit}
          onDeleteProject={handleDeleteProject}
          onCreateTask={handleCreateTask}
          onToggleComplete={handleToggleComplete}
          onTaskClick={(taskId) => navigate(`/tasks/${taskId}`)}
          comments={comments}
          attachments={attachments}
          historyEntries={historyEntries}
          relatedTasks={relatedTasks}
          size={size}
          projectCustomer={projectCustomer}
        />
      </div>
    </HeaderSideBarTemplate>

  );
}

export default ProjectDetailPage;
