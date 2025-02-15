import React from 'react';
import { Modal, List } from 'antd';
import ButtonAtom from '../../atoms/Button'
import { useTranslation } from 'react-i18next';
import useWindowSize from '../../../hooks/useWindowsSize';
import { useSelector } from 'react-redux';
import { projectCategories, projectPriorities, taskCategories, taskPriorities } from '../../../utils/arrays';

function HistoryModal({ isVisible, handleClose, filteredHistory, getChangedByName, formatTimestamp, dataType }) {
  const { t } = useTranslation();
  const { width } = useWindowSize();

  const modalWidth = width > 1024 ? 800 : width > 768 ? 600 : 400;

  const users = useSelector((state) => state.users.users);
  const customers = useSelector((state) => state.customers.customers);
  const tasks = useSelector((state) => state.tasks.tasks);

  const getHistoryDescription = (entry) => {
    switch (entry.changeType) {
      case 'firsthistory': {
        return dataType === 'task'
          ? t('history.firsthistory.task')
          : t('history.firsthistory.project');
      }
      case 'assign':
      case 'unassign': {
        const ids = entry.description.split(',').map(item => item.trim());
        const names = ids.map(id => {
          const found = users.find(u => u.id === id);
          return found ? found.name : id;
        });
        return t(`history.${entry.changeType}`, { users: names.join(', ') });
      }
      case 'customerupdate': {
        const ids = entry.description.split(',').map(item => item.trim());
        const names = ids.map(id => {
          const found = customers.find(c => c.id === id);
          return found ? found.name : id;
        });
        return t('history.customerupdate', { customer: names.join(', ') });
      }
      case 'taskupdate':
      case 'unassigntaskupdate': {
        const ids = entry.description.split(',').map(item => item.trim());
        const titles = ids.map(id => {
          const found = tasks.find(t => t.id === id);
          return found ? found.title : id;
        });
        return t(`history.${entry.changeType}`, { tasks: titles.join(', ') });
      }
      case 'update': {
        return t('history.update', { details: entry.description });
      }
      case 'categoryupdate': {
        let categoryKey = entry.description;
        let found;
        if (dataType === 'task') {
          found = taskCategories.find(item => item.value === categoryKey);
        } else {
          found = projectCategories.find(item => item.value === categoryKey);
        }
        const categoryLabel = found ? t(found.label) : t('Not specified');
        return t('history.categoryupdate', { category: categoryLabel });
      }
      case 'priorityupdate': {
        let priorityKey = entry.description;
        let found;
        if (dataType === 'task') {
          found = taskPriorities.find(item => item.value === priorityKey);
        } else {
          found = projectPriorities.find(item => item.value === priorityKey);
        }
        const priorityLabel = found ? t(found.label) : t('Not specified');
        return t('history.priorityupdate', { priority: priorityLabel });
      }
      case 'statusupdate': {
        let statusText;
        if (entry.description === 'close') {
          statusText = t('Complete');
        } else if (entry.description === 'open') {
          statusText = t('Incomplete');
        } else {
          statusText = t('Not specified');
        }
        return t('history.statusupdate', { status: statusText });
      }
      case 'titleupdate': {
        return t('history.titleupdate', { title: entry.description || t('Not specified') });
      }
      case 'descriptionupdate': {
        return t('history.descriptionupdate', { description: entry.description || t('Not specified') });
      }
      default:
        return entry.description || t('Detail not available');
    }
  };


  // console.log(filteredHistory)
  return (
    <Modal
      title={dataType === 'task' ? t('Task History') : t('Project History')}
      visible={isVisible}
      onCancel={handleClose}
      footer={[
        <ButtonAtom key="close" onClick={handleClose}>
          {t('Close')}
        </ButtonAtom>,
      ]}
      width={modalWidth}
    >
      {filteredHistory.length > 0 ? (
        <List
          itemLayout="vertical"
          dataSource={filteredHistory}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                title={t('changedBy', {
                  name: getChangedByName(item.changedBy),
                  timestamp: formatTimestamp(item.timestamp)
                })}
              />
              <div>{getHistoryDescription(item)}</div>
            </List.Item>
          )}
        />
      ) : (
        <p>{t('No task history')}</p>
      )}
    </Modal>
  );
}

export default HistoryModal;
