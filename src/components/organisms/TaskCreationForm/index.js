import React from 'react';
import { Form } from 'antd';
import InputAtom from '../../atoms/Input';
import TextAreaAtom from '../../atoms/TextArea';
import SelectAtom from '../../atoms/Select';
import UploadAtom from '../../atoms/Upload';
import ButtonAtom from '../../atoms/Button';
import FormItemMolecule from '../../molecules/FormItem';

function TaskCreationFormOrganism({ onSubmit, customers, priorities, categories, projects, initialValues }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log(values)
    onSubmit(values);
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical" initialValues={initialValues}>
      <FormItemMolecule
        label="Görev Başlığı"
        name="title"
        rules={[{ required: true, message: 'Lütfen görev başlığını girin.' }]}
      >
        <InputAtom placeholder="Görev başlığı girin" />
      </FormItemMolecule>

      <FormItemMolecule
        label="Açıklama"
        name="description"
        rules={[{ required: true, message: 'Lütfen görev açıklamasını girin.' }]}
      >
        <TextAreaAtom placeholder="Görev açıklamasını girin" rows={4} />
      </FormItemMolecule>

      <FormItemMolecule
        label="Müşteri"
        name="customer"
        rules={[{ required: true, message: 'Lütfen bir müşteri seçin.' }]}
      >
        <SelectAtom placeholder="Müşteri seçin" loading={!customers || customers.length === 0}
          disabled={!customers || customers.length === 0}>
          {customers.map((customer) => (
            <SelectAtom.Option key={customer.id} value={customer.id}>
              {customer.name}
            </SelectAtom.Option>
          ))}
        </SelectAtom>
      </FormItemMolecule>

      <FormItemMolecule label="Dosya Yükleme" name="attachments">
        <UploadAtom multiple beforeUpload={() => false}>
          <ButtonAtom>Dosya Seç</ButtonAtom>
        </UploadAtom>
      </FormItemMolecule>

      <FormItemMolecule
        label="Öncelik Seviyesi"
        name="priority"
        rules={[{ required: true, message: 'Lütfen öncelik seviyesini seçin.' }]}

      >
        <SelectAtom placeholder="Öncelik seviyesi seçin" loading={!priorities || priorities.length === 0}
          disabled={!priorities || priorities.length === 0}>
          {priorities.map((priority) => (
            <SelectAtom.Option key={priority.value} value={priority.value}>
              {priority.label}
            </SelectAtom.Option>
          ))}
        </SelectAtom>
      </FormItemMolecule>

      <FormItemMolecule
        label="Kategori"
        name="category"
        rules={[{ required: true, message: 'Lütfen bir kategori seçin.' }]}
      >
        <SelectAtom placeholder="Kategori seçin" loading={!categories || categories.length === 0}
          disabled={!categories || categories.length === 0}>
          {categories.map((category) => (
            <SelectAtom.Option key={category.value} value={category.value}>
              {category.label}
            </SelectAtom.Option>
          ))}
        </SelectAtom>
      </FormItemMolecule>
      <FormItemMolecule
        label="Proje"
        name="projectId"
        rules={[{ required: true, message: 'Lütfen bir proje seçin' }]}
      >
        <SelectAtom placeholder="Bir proje seçin">
          {projects.map((project) => (
            <SelectAtom.Option key={project.id} value={project.id}>
              {project.title}
            </SelectAtom.Option>
          ))}
        </SelectAtom>
      </FormItemMolecule>
      <FormItemMolecule>
        <ButtonAtom type="primary" htmlType="submit">
          Görevi Oluştur
        </ButtonAtom>
      </FormItemMolecule>
    </Form>
  );
}

export default TaskCreationFormOrganism;
