import React from 'react';
import { Form } from 'antd';

function FormItemMolecule({ label, children, name, rules }) {
  const labelStyle = { color: 'var(--text-color)' };

  return (
    <Form.Item
      label={<span style={labelStyle}>{label}</span>}
      name={name}
      rules={rules}
    >
      {children}
    </Form.Item>
  );
}

export default FormItemMolecule;
