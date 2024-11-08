import React from 'react';
import { Modal, List } from 'antd';
import ButtonAtom from '../../atoms/Button'

function HistoryModal({ isVisible, handleClose, filteredHistory, getChangedByName, formatTimestamp }) {
  return (
    <Modal
      title="Görev Tarihçesi"
      visible={isVisible}
      onCancel={handleClose}
      footer={[
        <ButtonAtom key="close" onClick={handleClose}>
          Kapat
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
              <div>{item.description || 'Detay yok.'}</div>
            </List.Item>
          )}
        />
      ) : (
        <p>Görev tarihçesi bulunmamaktadır.</p>
      )}
    </Modal>
  );
}

export default HistoryModal;
