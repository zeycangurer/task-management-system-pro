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
import { useTranslation } from 'react-i18next';


function RegisterFormOrganism({ isEditMode, initialValues }) {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [userType, setUserType] = useState(initialValues?.role || 'user');
  const [error, setError] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState()

  const handleBack = () => navigate(-1);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  useEffect(() => {
    const handleLanguageChange = () => {
      form.validateFields().catch(() => {});
    };
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n, form]);

  const handleSubmit = async (values) => {
    const selectedRole = userType || initialValues.role;

    if (!selectedRole) {
      setError(t('Please select user type!'));
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
      setError(t('An error occurred during the operation.'));
    }
  };





  return (
    <div className="register-form">

      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <div className='back-button-container'>
          <ButtonAtom type="link" onClick={handleBack} className="back-button">
            <FaArrowLeft /> {t('Back')}
          </ButtonAtom>
        </div>

        <ErrorContainerMolecule error={error} />

        <FormItemMolecule style={{paddingTop:'25px'}} label={t('User Type')} name="role" rules={[{ required: !isEditMode, message: t('Please select user type!') }]}>
          <SelectAtom
            placeholder={t('User Type')}
            value={userType || initialValues.role}
            onChange={(value) => setUserType(value)}
          >
            <SelectAtom.Option value="user">{t('User')}</SelectAtom.Option>
            <SelectAtom.Option value="customer">{t('Customer')}</SelectAtom.Option>
            <SelectAtom.Option value="manager">{t('Manager')}</SelectAtom.Option>
          </SelectAtom>
        </FormItemMolecule>


        <FormItemMolecule style={{paddingTop:'25px'}} label={t('NameSurname')} name="name" rules={[{ required: true, message: t('Please enter your name!') }]}>
          <InputAtom placeholder={t('NameSurname')} />
        </FormItemMolecule>

        <FormItemMolecule style={{paddingTop:'25px'}} label={t('Email')} name="email" rules={[
          { required: true, message: t('Email is required') },
          { type: 'email', message: t('Please enter a valid email') }]}>
          <InputAtom type="email" placeholder={t('Email')} />
        </FormItemMolecule>

        <FormItemMolecule style={{paddingTop:'25px'}} label={t('Phone Number')} name="contactNumber" rules={[
          { required: true, message: t('Phone number is required') },
          {
            pattern: /^\d{10,15}$/,
            message: t('Phone number must be between 10 and 15 digits')
          }
        ]}>
          <InputAtom type="tel" placeholder={t('Phone Number')} />
        </FormItemMolecule>

        {userType === 'customer' && (
          <FormItemMolecule style={{paddingTop:'25px'}} label={t('Company Name')} name="company" rules={[{ required: true, message: t('Please enter company name!') }]}>
            <InputAtom placeholder={t('Company Name')} />
          </FormItemMolecule>
        )}

        <FormItemMolecule label={t('Password')} name="password" rules={[
          { required: true, message: t('Password is required') },
          { min: 6, message: t('Password must be at least 6 characters long') },
          { pattern: /[A-Z]/, message: t('Password must contain at least one uppercase letter') },
          { pattern: /[a-z]/, message: t('Password must contain at least one lowercase letter') },
          { pattern: /[0-9]/, message: t('Password must contain at least one digit') }
        ]} style={{paddingTop:'30px'}}>
          <InputAtom
            type={visiblePasswords ? 'text' : 'password'}
            placeholder={t('Password')}
            suffix={
              visiblePasswords ? (
                <EyeTwoTone onClick={() => setVisiblePasswords(false)} style={{ cursor: 'pointer' }} />
              ) : (
                <EyeInvisibleOutlined onClick={() => setVisiblePasswords(true)} style={{ cursor: 'pointer' }} />
              )
            }
          />
        </FormItemMolecule>

        <Form.Item style={{paddingTop:'25px'}}>
          <ButtonAtom type="primary" htmlType="submit">
            {t('Save')}
          </ButtonAtom>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegisterFormOrganism;
