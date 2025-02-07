import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (value) => {
    i18n.changeLanguage(value);
    localStorage.setItem('selectedLanguage', value);
  };

  return (
    <Select
      defaultValue={localStorage.getItem('selectedLanguage') || 'tr'}
      onChange={handleLanguageChange}
      style={{ width: 120, marginRight: 10 }}
    >
      <Option value="tr">🇹🇷 Türkçe</Option>
      <Option value="en">🇬🇧 English</Option>
    </Select>
  );
}

export default LanguageSwitcher;
