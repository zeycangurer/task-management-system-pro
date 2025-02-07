import { Card, List, Select, Spin, message,Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ButtonAtom from '../../atoms/Button';
import { assignTaskToProject, fetchProjects } from '../../../store/actions/projectActions';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

function AttachmentsandTasks({ project, tasks, currentUser, allTasks }) {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [selectedTaskIds, setSelectedTaskIds] = useState(project.assignedTasks || []);
    const [loading, setLoading] = useState(false);

    const projectCustomerId = project.customerId;

    const filteredTasks = allTasks.filter(task => task.customer === projectCustomerId);
    const tasksWithStatus = filteredTasks.map(task => ({
        ...task,
        isAssigned: task.projectId !== null && task.projectId !== project.id, 
    }));

    const handleTaskAssign = () => {
        const alreadyAssignedTasks = selectedTaskIds.filter(taskId => {
            const task = tasksWithStatus.find(t => t.id === taskId);
            return task && task.isAssigned; 
        });

        if (alreadyAssignedTasks.length > 0) {
            message.warning(t('Some tasks have already been assigned to another project.'));
            return;
        }

        setLoading(true);
        dispatch(assignTaskToProject(project.id, selectedTaskIds, currentUser.uid))
            .then(() => {
                message.success(t('The task assignment process was completed successfully.'));
                dispatch(fetchProjects());
                setSelectedTaskIds([]); 
            })
            .catch((error) => {
                message.error(t('An error occurred while assigning a task') + ': ' + error.message);
            })
            .finally(() => setLoading(false));
    };


    const handleClearTasks = () => {
        setSelectedTaskIds([]);
        message.info(t('All tasks have been removed.'));
    };

    return loading ? (
        <Spin size="large" />
    ) : (
        <Card className="project-tasks-attachments-card" bordered={false} style={{ marginTop: '2rem' }}>
            <p><strong>{t('All Tasks')}</strong></p>
            <Select
                mode="multiple"
                style={{ width: '100%', paddingHorizontal:20 }}
                placeholder={t('Select a task')}
                value={selectedTaskIds}
                onChange={(values) => setSelectedTaskIds(values)}
                showSearch
                optionFilterProp="children"
            >
                {tasksWithStatus.length > 0 ? (
                    tasksWithStatus.map((task) => (
                        <Option key={task.id} value={task.id} disabled={task.isAssigned}>
                            {task.title} {task.isAssigned && <Tag color="red">📌 {t('Already assigned')}</Tag>}
                        </Option>
                    ))
                ) : (
                    <Option disabled>{t('No tasks available for this project')}</Option>
                )}
            </Select>

            <ButtonAtom type="primary" onClick={handleTaskAssign} style={{ marginTop: '1rem' }}>
            {t('Assign Task')}
            </ButtonAtom>
            <p><strong>{t('Tasks assigned to the project')}</strong></p>
            <List
                itemLayout="horizontal"
                dataSource={tasks}
                renderItem={(task) => (
                    <List.Item>
                        <List.Item.Meta onClick={() => navigate(`/tasks/${task.id}`)} title={<span>&bull; {task.title}</span>} description={task.description} />
                    </List.Item>
                )}
            />

            <p><strong>{t('Attached Files')}</strong></p>
            {project.attachments && project.attachments.length > 0 ? (
                <List
                    dataSource={project.attachments}
                    renderItem={(file, index) => (
                        <List.Item key={index}>
                            <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name || `${t('File')} ${index + 1}`}</a>
                        </List.Item>
                    )}
                />
            ) : (
                <p>{t('No attached files found.')}</p>
            )}
        </Card>
    );
}

export default AttachmentsandTasks;
