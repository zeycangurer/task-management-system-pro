import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import InputAtom from '../../atoms/Input';
import ButtonAtom from '../../atoms/Button';
import SelectAtom from '../../atoms/Select';
import FormItemMolecule from '../../molecules/FormItem';
import ErrorContainerMolecule from '../../molecules/ErrorContainerMolecule';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMoon, FaSun } from 'react-icons/fa';
import { moveUserBetweenCollections, registerUser, updateUser } from '../../../store/actions/authActions';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';


function RegisterFormOrganism({ isEditMode, initialValues }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [userType, setUserType] = useState('user');
  const [error, setError] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [visiblePasswords, setVisiblePasswords] = useState()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleBack = () => navigate(-1);

  const toggleThemeMode = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleSubmit = async (values) => {
    const selectedRole = userType || initialValues.role; 
  
    if (!selectedRole) {
      setError('Lütfen kullanıcı tipini seçin!');
      return;
    }
  
    const updatedUserData = {
      ...initialValues,
      ...values,
      role: selectedRole,
    };
  
    try {
      if (isEditMode) {
        if (initialValues.role !== selectedRole) {
          await dispatch(moveUserBetweenCollections(initialValues, updatedUserData));
        } else {
          await dispatch(updateUser(updatedUserData));
        }
      } else {
        await dispatch(registerUser(updatedUserData));
      }
  
      navigate('/admin');
    } catch (err) {
      setError('İşlem sırasında hata oluştu.');
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

        <FormItemMolecule label="Kullanıcı Tipi" name="role" rules={[{ required: !isEditMode, message: 'Kullanıcı tipini seçin!' }]}>
          <SelectAtom
            placeholder="Kullanıcı Tipini Seçin"
            value={userType || initialValues.role} 
            onChange={(value) => setUserType(value)}
          >
            <SelectAtom.Option value="user">Çalışan</SelectAtom.Option>
            <SelectAtom.Option value="customer">Müşteri</SelectAtom.Option>
            <SelectAtom.Option value="manager">Yönetici</SelectAtom.Option>
          </SelectAtom>
        </FormItemMolecule>


        <FormItemMolecule label="Ad Soyad" name="name" rules={[{ required: true, message: 'Adınızı girin!' }]}>
          <InputAtom placeholder="Adınızı girin" />
        </FormItemMolecule>

        <FormItemMolecule label="E-Posta" name="email" rules={[
          { required: true, message: 'E-posta zorunludur' },
          { type: 'email', message: 'Geçerli bir e-posta adresi girin' }]}>
          <InputAtom type="email" placeholder="E-posta adresiniz" />
        </FormItemMolecule>

        <FormItemMolecule label="Telefon Numarası" name="contactNumber" rules={[
          { required: true, message: 'Telefon numarası zorunludur' },
          { pattern: /^\d{10,15}$/, message: 'Telefon numarası 10-15 rakam arasında olmalıdır' }
        ]}>
          <InputAtom type="tel" placeholder="Telefon numaranız" />
        </FormItemMolecule>

        {userType === 'customer' && (
          <FormItemMolecule label="Şirket Adı" name="company" rules={[{ required: true, message: 'Şirket adını girin!' }]}>
            <InputAtom placeholder="Şirket adı" />
          </FormItemMolecule>
        )}

        <FormItemMolecule label="Şifre" name="password" rules={[
          { required: true, message: 'Şifre giriniz' },
          { min: 6, message: 'Şifre en az 6 karakter olmalıdır' },
          { pattern: /[A-Z]/, message: 'Şifre en az bir büyük harf içermelidir' },
          { pattern: /[a-z]/, message: 'Şifre en az bir küçük harf içermelidir' },
          { pattern: /[0-9]/, message: 'Şifre en az bir rakam içermelidir' }
        ]}>
          <InputAtom
            type={visiblePasswords ? 'text' : 'password'}
            placeholder="Şifre"
            suffix={
              visiblePasswords ? (
                <EyeTwoTone onClick={() => setVisiblePasswords(false)} style={{ cursor: 'pointer' }} />
              ) : (
                <EyeInvisibleOutlined onClick={() => setVisiblePasswords(true)} style={{ cursor: 'pointer' }} />
              )
            }
          />
        </FormItemMolecule>

        <Form.Item>
          <ButtonAtom type="primary" htmlType="submit">
            Kaydet
          </ButtonAtom>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegisterFormOrganism;
