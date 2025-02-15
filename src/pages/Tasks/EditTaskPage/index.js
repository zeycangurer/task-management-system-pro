import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as taskActions from '../../../store/actions/taskActions';
import { message } from 'antd';
import SpinAtom from '../../../components/atoms/Spin';
import HeaderSideBarTemplate from '../../../components/templates/HeaderSideBarTemplate';
import './styles.css'
import TaskCreationTemplate from '../../../components/templates/TaskCreationTemplate';
import { useTranslation } from 'react-i18next';

function EditTaskPage() {
    const { t } = useTranslation();
    const { taskId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.profiles.user);



    const { tasks, loading } = useSelector((state) => state.tasks);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        if (!tasks.length) {
            dispatch(taskActions.fetchTasks());
        }
    }, [dispatch, tasks.length]);

    const task = tasks.find((t) => t.id === taskId);

    const onFinish = (values) => {
        const { dueDate, ...otherValues } = values;

        const taskData = {
            ...otherValues,
            changedBy: currentUser.id,
        };
        // console.log(taskData)
        // console.log(taskId)
        dispatch(taskActions.updateTask(taskId, taskData))
            .then(() => {
                message.success(t('Task successfully updated'));
                navigate(`/tasks/${taskId}`);
            })
            .catch((error) => {
                message.error(t('Task could not be updated') + ': ' + error.message);
            });
    };

    if (loading || !task) {
        return <SpinAtom tip="Yükleniyor..." />;
    }

    const initialValues = {
        ...task,
    };
    // console.log(initialValues)

    return (
        <div className="dashboard-container">
            <HeaderSideBarTemplate isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <TaskCreationTemplate
                    onSubmit={onFinish}
                    isEditMode={true}
                    initialValues={initialValues}
                />
            </HeaderSideBarTemplate>
        </div>
    );
}

export default EditTaskPage;
