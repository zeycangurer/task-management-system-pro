
import React from 'react';
import './styles.css';
import TableAtom from '../../atoms/Table';

function TaskList({ tasks, onTaskClick }) {
  // console.log("TaskList received tasks:", tasks); 

  // if (!Array.isArray(tasks)) {
  //   console.error("Görevler dizisi değil:", tasks);
  //   return <p>Görevler yükleniyor...</p>;
  // }

  // if (tasks.length === 0) {
  //   console.log("Hiç görev bulunmuyor.");
  // }

  return (
    <TableAtom data={tasks} onDataClick={onTaskClick}  dataType='task' />
  );
}

export default TaskList;
