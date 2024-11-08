import React from 'react';
import { Card, Form } from 'antd';
import InputAtom from '../../atoms/Input';
import TextAreaAtom from '../../atoms/TextArea'; 
import ButtonAtom from '../../atoms/Button';

function AddCommentForm({ handleCommentSubmit, size }) {
  return (
    <Card bordered={false} className="add-comment-card">
      <Form layout="vertical" onFinish={handleCommentSubmit}>
        <Form.Item
          name="comment"
          label="Açıklama"
          rules={[{ required: true, message: 'Yorumunuz boş olamaz!' }]}
        >
          <TextAreaAtom rows={4} placeholder="Yorumunuzu buraya yazın..." />
        </Form.Item>
        <Form.Item>
          <ButtonAtom
            type="primary"
            htmlType="submit"
            className="action-button submit-button"
            size={size}
          >
            Gönder
          </ButtonAtom>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default AddCommentForm;
