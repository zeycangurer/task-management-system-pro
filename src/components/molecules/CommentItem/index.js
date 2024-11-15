import React from 'react';
import { List, Avatar } from 'antd';

function CommentItem({ authorName, timestamp, description, attachments }) {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar>{authorName.charAt(0)}</Avatar>}
        title={`${authorName} - ${timestamp}`}
        description={<>
          <p>{description}</p>
          {attachments && attachments.length > 0 && (
            <div>
              <strong>Ekler:</strong>
              <List
                dataSource={attachments}
                renderItem={(item, index) => (
                  <List.Item key={index}>
                    <a href={item} target="_blank" rel="noopener noreferrer">
                      Dosya {index + 1}
                    </a>
                  </List.Item>
                )}
              />
            </div>
          )}
        </>}
      />
    </List.Item>
  );
}

export default CommentItem;
