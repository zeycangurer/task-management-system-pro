import React from 'react';
import { Card, Form } from 'antd';
import TextAreaAtom from '../../atoms/TextArea';
import ButtonAtom from '../../atoms/Button';
import UploadAtom from '../../atoms/Upload';
import FormItemMolecule from '../../molecules/FormItem';
import { useTranslation } from 'react-i18next';

function AddCommentForm({ handleCommentSubmit, size }) {
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    handleCommentSubmit(values);
    form.resetFields();
  };

  return (
    <Card bordered={false} className="add-comment-card">
      <Form layout="vertical" onFinish={onFinish} form={form}>
      <FormItemMolecule label={t('Add File')} name="attachments">
          <UploadAtom multiple beforeUpload={() => false}>
            <ButtonAtom>{t('Choose File')}</ButtonAtom>
          </UploadAtom>
        </FormItemMolecule>
        <Form.Item
          name="comment"
          label={t('Comment')}
          rules={[{ required: true, message: t('Comment cannot be empty') }]}
        >
          <TextAreaAtom rows={4} placeholder={t('Your comment here...')} />
        </Form.Item>
        <Form.Item>
          <ButtonAtom
            type="primary"
            htmlType="submit"
            className="action-button submit-button"
            size={size}
          >
            {t('Submit')}
          </ButtonAtom>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default AddCommentForm;
