
import React from 'react';
import './styles.css';
import TableAtom from '../../atoms/Table';
import { useTranslation } from 'react-i18next';

function TaskList({ tasks, onTaskClick }) {
  const { t } = useTranslation();

  // console.log("TaskList received tasks:", tasks); 

  // if (!Array.isArray(tasks)) {
  //   console.error("Görevler dizisi değil:", tasks);
  //   return <p>Görevler yükleniyor...</p>;
  // }

  // if (tasks.length === 0) {
  //   console.log("Hiç görev bulunmuyor.");
  // }

  return (
    <>
      {tasks.length === 0 ? (<p>{t('There are no task to list.')}</p>) : (<TableAtom data={tasks} onDataClick={onTaskClick} dataType='task' />)}
    </>

  );
}

export default TaskList;
