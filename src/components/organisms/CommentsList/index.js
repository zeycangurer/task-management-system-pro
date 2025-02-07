import React from 'react';
import { Card, List } from 'antd';
import CommentItem from '../../molecules/CommentItem';
import { useTranslation } from 'react-i18next';

function CommentsList({ formattedComments }) {
  const { t } = useTranslation();

  return (
    <Card bordered={false} className="comments-list-card">
      {formattedComments && formattedComments.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={formattedComments}
          renderItem={(cmt) => (
            <CommentItem
              authorName={cmt.authorName}
              timestamp={cmt.timestamp}
              description={cmt.description}
              attachments={cmt.attachments}
            />
          )}
        />
      ) : (
        <p>{t('No comments yet')}</p>
      )}
    </Card>
  );
}

export default CommentsList;
