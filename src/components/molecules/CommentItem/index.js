import React from 'react';
import { List, Avatar } from 'antd';

function CommentItem({ authorName, timestamp, description }) {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar>{authorName.charAt(0)}</Avatar>}
        title={`${authorName} - ${timestamp}`}
        description={description}
      />
    </List.Item>
  );
}

export default CommentItem;
