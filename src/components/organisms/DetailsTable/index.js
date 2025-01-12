import React from 'react';
import TableAtom from '../../atoms/Table';
import './styles.css';
import { useNavigate } from 'react-router-dom';

function DetailsTable({ tasks, users }) {
  // const navigate = useNavigate();

  const data = tasks.map((task) => ({
    key: task.id,
    title: task.title,
    status: task.status,
    assignedToName: task.assignedTo
      .map((userId) => users.find((user) => user.id === userId)?.name || 'Bilinmiyor')
      .join(', '),
    dueDate: task.dueDate ? task.dueDate.toDate().toLocaleDateString() : 'Belirtilmemiş',
  }));

  // const columns = [
  //   { title: 'Görev Adı', dataIndex: 'title', key: 'title' },
  //   { title: 'Durum', dataIndex: 'status', key: 'status' },
  //   { title: 'Atanan Kullanıcılar', dataIndex: 'assignedToName', key: 'assignedToName' },
  //   { title: 'Bitiş Tarihi', dataIndex: 'dueDate', key: 'dueDate' },
  // ];

  // const handleTaskClick = (taskId) => {
  //   navigate(`/tasks/${taskId}`);
  // }; 
  // console.log('data', JSON.stringify(data))
  return (
    <div className='table-container'>
      <TableAtom data={data} dataType='analytics' />
    </div>
  )

}

export default DetailsTable;
