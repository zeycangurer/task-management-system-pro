import React from 'react';
import { Form } from 'antd';

function FormItemMolecule({ label, children, name, rules }) {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      {children}
    </Form.Item>
  );
}

export default FormItemMolecule;
