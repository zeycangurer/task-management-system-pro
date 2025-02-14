import { Button, Card } from 'antd';
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import TaskHeader from '../../organisms/TaskHeader';
import TaskInfo from '../../organisms/TaskInfo';
import CommentsList from '../../organisms/CommentsList';
import AddCommentForm from '../../organisms/AddCommentForm';
import HistoryModal from '../../organisms/HistoryModal';
import { useTranslation } from 'react-i18next';

function TaskDetailTemplate({
    handleBack,
    isEditing,
    editTitle,
    setEditTitle,
    handleEditTitle,
    handleEdit,
    showHistoryModal,
    handleDeleteTask,
    handleToggleComplete,
    size,
    task,
    assignedUserNames,
    formattedCreatedAt,
    createdUserName,
    assignment,
    handleAssignChange,
    handleAssignSubmit,
    sortedUsers,
    taskCustomer,
    project,
    formattedComments,
    handleCommentSubmit,
    isHistoryModalVisible,
    handleHistoryModalClose,
    filteredHistory,
    getChangedByName,
    formatTimestamp
}) {
    const { t } = useTranslation();

    return (
        <div className="task-detail">
            <Card bordered={false} className='task-header-info'>
                <Button type="link" onClick={handleBack} className="back-button">
                    <FaArrowLeft /> {t('Back')}
                </Button>
                <TaskHeader
                    isEditing={isEditing}
                    editTitle={editTitle}
                    setEditTitle={setEditTitle}
                    handleEditTitle={handleEditTitle}
                    onEditTask={handleEdit}
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
                    taskCustomer={taskCustomer}
                    project={project}
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
                dataType='task'
            />
        </div>
    )
}

export default TaskDetailTemplate