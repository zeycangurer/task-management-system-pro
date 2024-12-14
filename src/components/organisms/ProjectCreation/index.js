import React, { useEffect } from 'react';
import { Form } from 'antd';
import FormItemMolecule from '../../molecules/FormItem';
import InputAtom from '../../atoms/Input';
import TextAreaAtom from '../../atoms/TextArea';
import ButtonAtom from '../../atoms/Button';
import { useDispatch, useSelector } from 'react-redux';
import SelectAtom from '../../atoms/Select';
import DatePickerAtom from '../../atoms/DatePicker';
import * as userAction from '../../../store/actions/userActions';
import * as taskAction from '../../../store/actions/taskActions';
import dayjs from 'dayjs';
import { projectPriorities } from '../../../utils/arrays';

function ProjectCreationFormOrganism({ onFinish, initialValues, isEditMode = false }) {
    const dispatch = useDispatch();
    const root = useSelector((state) => state)
    const { users, loading: usersLoading } = root.users;
    const { tasks, loading: tasksLoading } = root.tasks;

    useEffect(() => {
        if (!users.length) {
            dispatch(userAction.fetchUsers());
        }
        if (!tasks.length) {
            dispatch(taskAction.fetchTasks());
        }
    }, [dispatch, users.length, tasks.length]);

    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                startDate: initialValues.startDate ? dayjs(initialValues.startDate.toDate()) : null,
                endDate: initialValues.endDate ? dayjs(initialValues.endDate.toDate()) : null,
            });
        }
    }, [initialValues, form]);


    return (
        <Form layout="vertical" onFinish={onFinish} form={form}>
            <FormItemMolecule
                label="Proje Başlığı"
                name="title"
                rules={[{ required: true, message: 'Lütfen proje başlığını girin' }]}
            >
                <InputAtom placeholder="Proje başlığı" />
            </FormItemMolecule>

            <FormItemMolecule label="Proje Açıklaması" name="description">
                <TextAreaAtom rows={4} placeholder="Proje açıklaması" />
            </FormItemMolecule>

            <FormItemMolecule
                label="Başlangıç Tarihi"
                name="startDate"
                rules={[{ required: true, message: 'Lütfen başlangıç tarihini girin' }]}
            >
                <DatePickerAtom placeholder="Başlangıç tarihi seçin" style={{ width: '100%' }} />
            </FormItemMolecule>

            <FormItemMolecule
                label="Bitiş Tarihi"
                name="endDate"
                rules={[{ required: true, message: 'Lütfen bitiş tarihini girin' }]}
            >
                <DatePickerAtom placeholder="Bitiş tarihi seçin" style={{ width: '100%' }} />
            </FormItemMolecule>

            <FormItemMolecule
                label="Öncelik"
                name="priority"
                rules={[{ required: true, message: 'Lütfen öncelik seçin' }]}
            >
                <SelectAtom placeholder="Öncelik seçin">
                    {projectPriorities.map((priority) => (
                        <SelectAtom.Option key={priority.value} value={priority.value}>
                            {priority.label}
                        </SelectAtom.Option>
                    ))}
                </SelectAtom>
            </FormItemMolecule>

            <FormItemMolecule
                label="Kullanıcılar"
                name="assignedUsers"
                rules={[{ required: true, message: 'Lütfen en az bir kullanıcı seçin' }]}
            >
                <SelectAtom
                    mode="multiple"
                    placeholder="Kullanıcıları seçin"
                    loading={usersLoading}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().includes(input.toLowerCase())
                    }
                >
                    {users.map((user) => (
                        <SelectAtom.Option key={user.id} value={user.id}>
                            {user.name || user.email}
                        </SelectAtom.Option>
                    ))}
                </SelectAtom>
            </FormItemMolecule>

            <FormItemMolecule label="Görevler" name="assignedTasks">
                <SelectAtom
                    mode="multiple"
                    placeholder="Görevleri seçin"
                    loading={tasksLoading}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().includes(input.toLowerCase())
                    }
                >
                    {tasks.map((task) => (
                        <SelectAtom.Option key={task.id} value={task.id}>
                            {task.title}
                        </SelectAtom.Option>
                    ))}
                </SelectAtom>
            </FormItemMolecule>

            <Form.Item>
                <ButtonAtom type="primary" htmlType="submit">
                    {isEditMode ? 'Güncelle' : 'Oluştur'}
                </ButtonAtom>
            </Form.Item>
        </Form>
    );
}

export default ProjectCreationFormOrganism;
