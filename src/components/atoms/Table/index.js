import React from 'react';
import './styles.css';

function TableAtom({ data, onDataClick, dataType }) {
  const renderColumns = () => {
    if (dataType === 'analytics') {
      return (
        <>
          <th>Başlık</th>
          <th>Atanan Kullanıcılar</th>
          <th>Durum</th>
          <th>Bitiş Tarihi</th>
        </>
      );
    } else {
      return (
        <>
          <th>Başlık</th>
          <th>Tanım</th>
          <th>Atanan Kişi</th>
          <th>Oluşturan Kişi</th>
          <th>Oluşturulma Tarihi</th>
          <th>Durum</th>
        </>
      );
    }
  };

  const renderRows = () => {
    if (dataType === 'analytics') {
      return data.map((item) => (
        <tr key={item.id} onClick={() => onDataClick(item.id)} className="clickable-row">
          <td>{item.title}</td>
          <td>{item.assignedToName}</td>
          <td>
            <span className={`status ${item.status === 'close' ? 'completed' : 'pending'}`}>
              {item.status === 'close' ? 'Tamamlandı' : 'Bekliyor'}
            </span>
          </td>
          <td>{item.dueDate || 'Belirtilmemiş'}</td>
        </tr>
      ));
    } else {
      return data.map((item) => (
        <tr key={item.id} onClick={() => onDataClick(item.id)} className="clickable-row">
          <td>{item.title}</td>
          <td>{item.description}</td>
          <td>{item.assignedToName}</td>
          <td>{item.createdUserName}</td>
          <td>
            {item.date ||
              (item.createdAt
                ? new Date(item.createdAt.seconds * 1000 + item.createdAt.nanoseconds / 1000000).toLocaleDateString()
                : 'N/A')}
          </td>
          <td>
            <span className={`status ${item.status === 'close' ? 'completed' : 'pending'}`}>
              {item.status === 'close' ? 'Tamamlandı' : 'Bekliyor'}
            </span>
          </td>
        </tr>
      ));
    }
  };

  return (
    <div className="data-list-container">
      {data.length === 0 ? (
        <p>{dataType === 'project' ? 'Proje' : dataType === 'task' ? 'Görev' : 'Analiz' } bulunmamaktadır.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>{renderColumns()}</tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      )}
    </div>
  );
}

export default TableAtom;
