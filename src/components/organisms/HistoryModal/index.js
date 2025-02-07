import React from 'react';
import { Modal, List } from 'antd';
import ButtonAtom from '../../atoms/Button'
import { useTranslation } from 'react-i18next';

function HistoryModal({ isVisible, handleClose, filteredHistory, getChangedByName, formatTimestamp }) {
  const { t } = useTranslation();

  return (
    <Modal
      title={t('Task History')}
      visible={isVisible}
      onCancel={handleClose}
      footer={[
        <ButtonAtom key="close" onClick={handleClose}>
          {t('Close')}
        </ButtonAtom>,
      ]}
      width={800}
    >
      {filteredHistory.length > 0 ? (
        <List
          itemLayout="vertical"
          dataSource={filteredHistory}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                title={`${getChangedByName(item.changedBy)} tarafından ${formatTimestamp(
                  item.timestamp
                )}`}
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
