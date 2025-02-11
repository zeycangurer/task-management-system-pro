import React, { useState, useMemo } from 'react';
import ButtonAtom from '../../atoms/Button';
import { Col, Select, List, Tag, Avatar, Card, Modal, message } from 'antd';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import ProjectHeader from '../../organisms/ProjectHeader';
import ProjectInfo from '../../organisms/ProjectInfo';
import { useSelector, useDispatch } from 'react-redux';
import CommentsList from '../../organisms/CommentsList';
import AddCommentForm from '../../organisms/AddCommentForm';
import * as action from '../../../store/actions/projectActions';
import HistoryModal from '../../organisms/HistoryModal';
import AttachmentsandTasks from '../../organisms/AttachmentsandTasks';
import { useTranslation } from 'react-i18next';


function ProjectDetailTemplate({
    project,
    tasks,
    onTaskClick,
    onEditProject,
    onDeleteProject,
    onCreateTask,
    assignment,
    handleAssignChange,
    handleAssignSubmit,
    onToggleComplete,
    assignedUsers,
    sortedUsers,
    size,
    projectCustomer,
}) {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const root = useSelector(state => state)
    const currentUser = root.auth.user;
    const users = root.users.users;
    const customers = root.customers.customers;
    const allTasks = root.tasks.tasks;


    const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);

    const createdUserName = useMemo(() => {
        if (!project) return t('Unknown');
        // console.log('Task createdUser ID:', task.createdUser);
        const user = users.find(u => u.id === project.createdBy);
        if (user) {
            // console.log('Found user:', user);
            return user.name;
        }
        const customer = customers.find(c => c.id === project.createdBy);
        if (customer) {
            // console.log('Found customer:', customer);
            return customer.name;
        }
        // console.log('User veya customer bulunamadı.');
        return t('Unknown');
    }, [project, users, customers]);

    const showHistoryModal = () => {
        setIsHistoryModalVisible(true);
    };
    const handleHistoryModalClose = () => {
        setIsHistoryModalVisible(false);
    };
    const handleBack = () => {
        navigate(-1);
    };
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



    const formattedComments = useMemo(() => {
        if (!project || !Array.isArray(project.history)) return [];
        return project.history
            .filter(entry => entry.changeType === 'comment')
            .map(entry => ({
                ...entry,
                timestamp: formatTimestamp(entry.timestamp),
                authorName: getChangedByName(entry.changedBy),
                attachments: entry.attachments || [],
            }));
    }, [project, users, customers]);

    const handleCommentSubmit = (values) => {
        const { comment, attachments } = values;
        if (comment.trim() === '') {
            message.error(t('Comment cannot be empty'));
            return;
        }
        dispatch(action.addComment(project.id, comment, currentUser.uid, attachments))
            .then(() => {
                message.success(t('Comment added successfully'));
            })
            .catch((error) => {
                message.error(t('An error occurred while adding the comment'));
            });
        // console.log(values)
        // console.log('Proje ID:', project.id);

    };

    const filteredHistory = useMemo(() => {
        if (!project || !Array.isArray(project.history)) return [];
        return project.history.filter(entry => ['assign', 'unassign', 'update', 'taskAssign', 'taskupdate'].includes(entry.changeType));
    }, [project]);

    return (
        <div className="project-detail">
            <Card className="project-info-card" bordered={false}>
                <div className="detail-header-info">
                    <ButtonAtom type="link" onClick={handleBack} className="back-button">
                        <FaArrowLeft /> {t('Back')}
                    </ButtonAtom>
                    <ProjectHeader
                        project={project}
                        onBack={() => window.history.back()}
                        onEditProject={onEditProject}
                        onDeleteProject={onDeleteProject}
                        onToggleComplete={onToggleComplete}
                        onCreateTask={onCreateTask}
                        showHistoryModal={showHistoryModal}
                        size={size.width <= 768 ? 'small' : 'middle'}

                    />
                    <ProjectInfo
                        project={project}
                        assignedUsers={assignedUsers}
                        sortedUsers={sortedUsers}
                        assignment={assignment}
                        handleAssignChange={handleAssignChange}
                        handleAssignSubmit={handleAssignSubmit}
                        size={size.width <= 768 ? 'small' : 'middle'}
                        createdUserName={createdUserName}
                        projectCustomer={projectCustomer}
                    />
                </div>
            </Card>
            <AttachmentsandTasks project={project} onTaskClick={onTaskClick} tasks={tasks} currentUser={currentUser} allTasks={allTasks} />
            <div className="project-comments" style={{ marginTop: '2rem' }}>
                <CommentsList formattedComments={formattedComments} />
            </div>

            <AddCommentForm handleCommentSubmit={handleCommentSubmit} size={size.width <= 768 ? 'small' : 'middle'} />

            <HistoryModal
                isVisible={isHistoryModalVisible}
                handleClose={handleHistoryModalClose}
                filteredHistory={filteredHistory}
                getChangedByName={getChangedByName}
                formatTimestamp={formatTimestamp}
                dataType = 'project'
            />
        </div>
    );
}

export default ProjectDetailTemplate;
