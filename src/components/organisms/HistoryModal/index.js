import React from 'react';
import { Modal, List } from 'antd';
import ButtonAtom from '../../atoms/Button'
import { useTranslation } from 'react-i18next';
import useWindowSize from '../../../hooks/useWindowsSize';

function HistoryModal({ isVisible, handleClose, filteredHistory, getChangedByName, formatTimestamp, dataType }) {
  const { t } = useTranslation();
  const { width } = useWindowSize();

  const modalWidth = width > 1024 ? 800 : width > 768 ? 600 : 400;


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
              <div>{item.description || t('Detail not available')}</div>
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
