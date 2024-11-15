import React from 'react';
import { Select } from 'antd';

function SelectAtom(props) {
  return <Select {...props}>{props.children}</Select>;
}

SelectAtom.Option = Select.Option;

export default SelectAtom;
