import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../store/actions/profileActions';
import { logout } from '../../../store/actions/authActions';
import InputAtom from '../../atoms/Input';
import ButtonAtom from '../../atoms/Button';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import FormItemMolecule from '../../molecules/FormItem';
import { Form } from 'antd';

function ProfileFormOrganism({ user }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.users);
  const currentUserPassword = user.password;

  const [visiblePasswords, setVisiblePasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [form] = Form.useForm();

  const handleChangePassword = async () => {
    try {
      const values = await form.validateFields();
      const { currentPassword, newPassword, confirmPassword } = values;

      let errors = [];

      if (currentPassword !== currentUserPassword) {
        errors.push({ name: 'currentPassword', errors: ['Mevcut şifre hatalı!'] });
      }

      if (newPassword !== confirmPassword) {
        errors.push({ name: 'confirmPassword', errors: ['Yeni şifreler eşleşmiyor!'] });
      }

      if (errors.length > 0) {
        form.setFields(errors);
        return;
      }

      await dispatch(changePassword(user.id, newPassword, user.role));
      dispatch(logout()); 
    } catch (errorInfo) {
      console.log('Validasyon hatası:', errorInfo);
    }
  };

  return (
    <div className="profile-form">
      <Form layout="vertical" form={form} onFinish={handleChangePassword}>
        <FormItemMolecule label="Mevcut Şifre" name="currentPassword" rules={[{ required: true, message: 'Mevcut şifreyi giriniz!' }]}>
          <InputAtom
            type={visiblePasswords.current ? 'text' : 'password'}
            placeholder="Mevcut Şifre"
            suffix={
              visiblePasswords.current ? (
                <EyeTwoTone onClick={() => setVisiblePasswords({ ...visiblePasswords, current: false })} style={{ cursor: 'pointer' }} />
              ) : (
                <EyeInvisibleOutlined onClick={() => setVisiblePasswords({ ...visiblePasswords, current: true })} style={{ cursor: 'pointer' }} />
              )
            }
          />
        </FormItemMolecule>

        <FormItemMolecule label="Yeni Şifre" name="newPassword" rules={[
          { required: true, message: 'Yeni şifre giriniz!' },
          { min: 6, message: 'Şifre en az 6 karakter olmalıdır!' }
        ]}>
          <InputAtom
            type={visiblePasswords.new ? 'text' : 'password'}
            placeholder="Yeni Şifre"
            suffix={
              visiblePasswords.new ? (
                <EyeTwoTone onClick={() => setVisiblePasswords({ ...visiblePasswords, new: false })} style={{ cursor: 'pointer' }} />
              ) : (
                <EyeInvisibleOutlined onClick={() => setVisiblePasswords({ ...visiblePasswords, new: true })} style={{ cursor: 'pointer' }} />
              )
            }
          />
        </FormItemMolecule>

        <FormItemMolecule label="Yeni Şifre Tekrarı" name="confirmPassword" rules={[{ required: true, message: 'Şifre tekrarını giriniz!' }]}>
          <InputAtom
            type={visiblePasswords.confirm ? 'text' : 'password'}
            placeholder="Yeni Şifre Tekrarı"
            suffix={
              visiblePasswords.confirm ? (
                <EyeTwoTone onClick={() => setVisiblePasswords({ ...visiblePasswords, confirm: false })} style={{ cursor: 'pointer' }} />
              ) : (
                <EyeInvisibleOutlined onClick={() => setVisiblePasswords({ ...visiblePasswords, confirm: true })} style={{ cursor: 'pointer' }} />
              )
            }
          />
        </FormItemMolecule>

        <Form.Item className="full-width-button">
          <ButtonAtom type="primary" htmlType="submit" loading={loading}>
            Şifreyi Güncelle
          </ButtonAtom>
        </Form.Item>

        {error && <p className="error-text">{error}</p>}
      </Form>
    </div>
  );
}

export default ProfileFormOrganism;
