import React from 'react';
import { List } from 'antd';

function RelatedTasksSection({ relatedTasks, onTaskClick }) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>İlgili Görevler</h3>
      {relatedTasks && relatedTasks.length > 0 ? (
        <List
          dataSource={relatedTasks}
          renderItem={(task) => (
            <List.Item onClick={() => onTaskClick(task.id)}>
              <List.Item.Meta title={task.title} description={task.description} />
            </List.Item>
          )}
        />
      ) : (
        <p>İlgili görev bulunmuyor.</p>
      )}
    </div>
  );
}

export default RelatedTasksSection;
