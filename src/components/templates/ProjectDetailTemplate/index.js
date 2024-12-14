import React from 'react';
import TitleAtom from '../../atoms/Title';
import ButtonAtom from '../../atoms/Button';
import { Col, Select, List, Tag, Avatar, Card } from 'antd';
import ActionButton from '../../molecules/ActionButton';
import TooltipAtom from '../../atoms/Tooltip';
import { FaCheck } from 'react-icons/fa';
import { projectPriorities } from '../../../utils/arrays';

const { Option } = Select;

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
    handleToggleComplete,
    assignedUsers,
    sortedUsers,
    size
}) {
    const statusColor = project.status === 'completed' ? 'green' : 'blue';
    const statusLabel = project.status === 'completed' ? 'Tamamlandı' : 'Tamamlanmadı';
    const priorityColor = project.priority === 'high' ? 'red' : project.priority === 'medium' ? 'orange' : 'blue';
    const priorityLabel = projectPriorities.filter(item => item.value === project.priority)[0].label || 'Belirsiz';

    const startDateStr = project.startDate ? project.startDate.toDate().toLocaleDateString() : 'Belirtilmemiş';
    const endDateStr = project.endDate ? project.endDate.toDate().toLocaleDateString() : 'Belirtilmemiş';

    return (
        <div>
            <TitleAtom level={1}>{project.title}</TitleAtom>
            <p><strong>Açıklama: </strong>{project.description}</p>
            <p><strong>Durum: </strong><Tag color={statusColor}>{statusLabel}</Tag></p>
            <p><strong>Öncelik: </strong><Tag color={priorityColor}>{priorityLabel}</Tag></p>
            <p><strong>Başlangıç Tarihi: </strong>{startDateStr}</p>
            <p><strong>Bitiş Tarihi: </strong>{endDateStr}</p>

            <h3>Atanan Kullanıcılar</h3>
            <List
                itemLayout="horizontal"
                dataSource={assignedUsers}
                renderItem={(user) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar>{(user.name || user.email)[0].toUpperCase()}</Avatar>}
                            title={user.name || user.email}
                        />
                    </List.Item>
                )}
            />

            <h3>Kullanıcı Atama</h3>
            <Col xs={24} sm={16} md={12}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
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
                        {sortedUsers.map((user) => (
                            <Option key={user.id} value={user.id} label={user.name || user.email}>
                                {user.name || user.email}
                            </Option>
                        ))}
                    </Select>
                    <TooltipAtom title="Atama">
                        <ActionButton
                            tooltipTitle="Atama"
                            icon={FaCheck}
                            onClick={handleAssignSubmit}
                            className="action-button assign-button"
                            size={size}
                            type="primary"
                        />
                    </TooltipAtom>
                </div>
            </Col>

            <h3>Görevler</h3>
            <List
                itemLayout="horizontal"
                dataSource={tasks}
                renderItem={(task) => (
                    <List.Item onClick={() => onTaskClick(task.id)}>
                        <List.Item.Meta title={task.title} description={task.description} />
                    </List.Item>
                )}
            />

            <div style={{ marginTop: '1rem' }}>
                <ButtonAtom type="primary" onClick={onEditProject} style={{ marginRight: '8px' }}>
                    Düzenle
                </ButtonAtom>
                <ButtonAtom type="danger" onClick={onDeleteProject} style={{ marginRight: '8px' }}>
                    Sil
                </ButtonAtom>
                <ButtonAtom type="primary" onClick={handleToggleComplete} style={{ marginRight: '8px' }}>
                    {project.status === 'completed' ? 'Aktif Yap' : 'Tamamla'}
                </ButtonAtom>
                <ButtonAtom type="primary" onClick={onCreateTask}>
                    Görev Oluştur
                </ButtonAtom>
            </div>

            <h3 style={{ marginTop: '2rem' }}>Ekli Dosyalar</h3>
            {project.attachments && project.attachments.length > 0 ? (
                <List
                    dataSource={project.attachments}
                    renderItem={(file, index) => (
                        <List.Item key={index}>
                            <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name || `Dosya ${index+1}`}</a>
                        </List.Item>
                    )}
                />
            ) : (
                <p>Ekli dosya bulunmuyor.</p>
            )}

            <h3 style={{ marginTop: '2rem' }}>Yorumlar</h3>
            {project.comments && project.comments.length > 0 ? (
                <List
                    dataSource={project.comments}
                    renderItem={(comment, index) => (
                        <List.Item key={index}>
                            <List.Item.Meta
                                avatar={<Avatar>{comment.authorName[0].toUpperCase()}</Avatar>}
                                title={comment.authorName}
                                description={comment.text}
                            />
                        </List.Item>
                    )}
                />
            ) : (
                <p>Henüz yorum eklenmemiş.</p>
            )}

            <h3 style={{ marginTop: '2rem' }}>Geçmiş (History)</h3>
            {project.history && project.history.length > 0 ? (
                <List
                    dataSource={project.history}
                    renderItem={(entry, index) => (
                        <List.Item key={index}>
                            <List.Item.Meta
                                title={`${entry.changeType} - ${entry.changedBy} tarafından`}
                                description={`Tarih: ${entry.timestamp.toDate().toLocaleString()} - ${entry.description}`}
                            />
                        </List.Item>
                    )}
                />
            ) : (
                <p>Proje ile ilgili henüz bir geçmiş kaydı yok.</p>
            )}

        </div>
    );
}

export default ProjectDetailTemplate;
