import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { useDispatch } from 'react-redux';
import InputAtom from '../../atoms/Input';
import ButtonAtom from '../../atoms/Button';
import SelectAtom from '../../atoms/Select';
import FormItemMolecule from '../../molecules/FormItem';
import ErrorContainerMolecule from '../../molecules/ErrorContainerMolecule';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMoon, FaSun } from 'react-icons/fa';
import { registerUser } from '../../../store/actions/authActions';

function RegisterFormOrganism() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleBack = () => navigate(-1);

  const toggleThemeMode = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleSubmit = async (values) => {
    if (!userType) {
      setError('Lütfen kullanıcı tipini seçin!');
      return;
    }
  
    const userData = {
      ...values,
      role: userType,
    };
  
    console.log('Kayıt verisi:', userData);
  
    try {
      await dispatch(registerUser(userData));
      form.resetFields();
    } catch (err) {
      setError('Kayıt sırasında hata oluştu.');
    }
  };
  

  return (
    <div className="register-form">
      <div className='register-header-container'>
        <ButtonAtom type="link" onClick={handleBack} className="back-button">
          <FaArrowLeft /> Geri
        </ButtonAtom>
        <button onClick={toggleThemeMode} className="theme-button-register" aria-label="Temayı Değiştir">
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      </div>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <ErrorContainerMolecule error={error} />

        <FormItemMolecule label="Kullanıcı Tipi" name="role" rules={[{ required: true, message: 'Kullanıcı tipini seçin!' }]}>
          <SelectAtom placeholder="Kullanıcı Tipini Seçin" onChange={(value) => setUserType(value)}>
            <SelectAtom.Option value="user">Çalışan</SelectAtom.Option>
            <SelectAtom.Option value="customer">Müşteri</SelectAtom.Option>
          </SelectAtom>
        </FormItemMolecule>

        <FormItemMolecule label="Ad Soyad" name="name" rules={[{ required: true, message: 'Adınızı girin!' }]}>
          <InputAtom placeholder="Adınızı girin" />
        </FormItemMolecule>

        <FormItemMolecule label="E-Posta" name="email" rules={[{ required: true, message: 'E-posta giriniz!' }]}>
          <InputAtom type="email" placeholder="E-posta adresiniz" />
        </FormItemMolecule>

        <FormItemMolecule label="Telefon Numarası" name="contactNumber" rules={[{ required: true, message: 'Telefon numarası giriniz!' }]}>
          <InputAtom type="tel" placeholder="Telefon numaranız" />
        </FormItemMolecule>

        {userType === 'customer' && (
          <FormItemMolecule label="Şirket Adı" name="company" rules={[{ required: true, message: 'Şirket adını girin!' }]}>
            <InputAtom placeholder="Şirket adı" />
          </FormItemMolecule>
        )}

        <FormItemMolecule label="Şifre" name="password" rules={[{ required: true, message: 'Şifre giriniz!', min: 6 }]}>
          <InputAtom type="password" placeholder="Şifreniz" />
        </FormItemMolecule>

        <Form.Item>
          <ButtonAtom type="primary" htmlType="submit">
            Kayıt Ol
          </ButtonAtom>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegisterFormOrganism;
