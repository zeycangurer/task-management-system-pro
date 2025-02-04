import { Card, List, Select, Spin, message,Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ButtonAtom from '../../atoms/Button';
import { assignTaskToProject, fetchProjects } from '../../../store/actions/projectActions';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function AttachmentsandTasks({ project, tasks, currentUser, allTasks }) {
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
            message.warning('Bazı görevler zaten başka bir projeye atanmış.');
            return;
        }

        setLoading(true);
        dispatch(assignTaskToProject(project.id, selectedTaskIds, currentUser.uid))
            .then(() => {
                message.success('Görev atama işlemi başarıyla tamamlandı.');
                dispatch(fetchProjects());
                setSelectedTaskIds([]); 
            })
            .catch((error) => {
                message.error('Görev atama işlemi sırasında bir hata oluştu: ' + error.message);
            })
            .finally(() => setLoading(false));
    };


    const handleClearTasks = () => {
        setSelectedTaskIds([]);
        message.info('Tüm görevler kaldırıldı.');
    };

    return loading ? (
        <Spin size="large" />
    ) : (
        <Card className="project-tasks-attachments-card" bordered={false} style={{ marginTop: '2rem' }}>
            <p><strong>Tüm Görevler</strong></p>
            <Select
                mode="multiple"
                style={{ width: '100%', paddingHorizontal:20 }}
                placeholder="Görev seçiniz"
                value={selectedTaskIds}
                onChange={(values) => setSelectedTaskIds(values)}
                showSearch
                optionFilterProp="children"
            >
                {tasksWithStatus.length > 0 ? (
                    tasksWithStatus.map((task) => (
                        <Option key={task.id} value={task.id} disabled={task.isAssigned}>
                            {task.title} {task.isAssigned && <Tag color="red">📌 Zaten atanmış</Tag>}
                        </Option>
                    ))
                ) : (
                    <Option disabled>Bu proje için uygun görev yok</Option>
                )}
            </Select>

            <ButtonAtom type="primary" onClick={handleTaskAssign} style={{ marginTop: '1rem' }}>
                Görev Ata
            </ButtonAtom>
            <p><strong>Projeye Atanmış Görevler</strong></p>
            <List
                itemLayout="horizontal"
                dataSource={tasks}
                renderItem={(task) => (
                    <List.Item>
                        <List.Item.Meta onClick={() => navigate(`/tasks/${task.id}`)} title={<span>&bull; {task.title}</span>} description={task.description} />
                    </List.Item>
                )}
            />

            <p><strong>Ekli Dosyalar</strong></p>
            {project.attachments && project.attachments.length > 0 ? (
                <List
                    dataSource={project.attachments}
                    renderItem={(file, index) => (
                        <List.Item key={index}>
                            <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name || `Dosya ${index + 1}`}</a>
                        </List.Item>
                    )}
                />
            ) : (
                <p>Ekli dosya bulunmuyor.</p>
            )}
        </Card>
    );
}

export default AttachmentsandTasks;
