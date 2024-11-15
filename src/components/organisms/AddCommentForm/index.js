import React from 'react';
import { Card, Form } from 'antd';
import TextAreaAtom from '../../atoms/TextArea';
import ButtonAtom from '../../atoms/Button';
import UploadAtom from '../../atoms/Upload';
import FormItemMolecule from '../../molecules/FormItem';

function AddCommentForm({ handleCommentSubmit, size }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    handleCommentSubmit(values);
    form.resetFields();
  };

  return (
    <Card bordered={false} className="add-comment-card">
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="comment"
          label="Açıklama"
          rules={[{ required: true, message: 'Yorumunuz boş olamaz!' }]}
        >
          <TextAreaAtom rows={4} placeholder="Yorumunuzu buraya yazın..." />
        </Form.Item>
        <FormItemMolecule label="Dosya Ekle" name="attachments">
          <UploadAtom multiple beforeUpload={() => false}>
            <ButtonAtom>Dosya Seç</ButtonAtom>
          </UploadAtom>
        </FormItemMolecule>
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
