import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../store/actions/profileActions';
import { logout } from '../../../store/actions/authActions';
import InputAtom from '../../atoms/Input';
import ButtonAtom from '../../atoms/Button';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import FormItemMolecule from '../../molecules/FormItem';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

function ProfileFormOrganism({ user }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const { loading, error } = useSelector(state => state.users);
  const currentUserPassword = user.password;

  const [visiblePasswords, setVisiblePasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [form] = Form.useForm();
  // console.log(user)

  // useEffect(() => {
  //   const handleLanguageChange = () => {
  //     const currentErrors = form.getFieldsError().filter(({ errors }) => errors.length > 0);
  //     const updatedErrors = currentErrors.map(({ name }) => {
  //       const fieldName = name[0];
  //       if (fieldName === 'currentPassword') {
  //         return { name, errors: [t('Current password is wrong!')] };
  //       }
  //       if (fieldName === 'confirmPassword') {
  //         return { name, errors: [t('New passwords do not match!')] };
  //       }
  //       return null;
  //     }).filter(e => e !== null);
      
  //     if (updatedErrors.length > 0) {
  //       form.setFields(updatedErrors);
  //     }
  //   };

  //   i18n.on('languageChanged', handleLanguageChange);
  //   return () => {
  //     i18n.off('languageChanged', handleLanguageChange);
  //   };
  // }, [i18n, form, t]);

  useEffect(() => {
    const updateErrors = () => {
      const currentErrors = form.getFieldsError().filter(({ errors }) => errors.length > 0);
      if (currentErrors.length > 0) {
        const updatedErrors = currentErrors.map(({ name, errors }) => {
          const field = name[0];
          let newError;
          if (field === 'currentPassword') {
            newError = errors[0].includes(t('wrong')) ? [t('Current password is wrong!')] : [t('Please enter your current password!')];
          } else if (field === 'newPassword') {
            newError = errors[0].includes(t('least')) ? [t('Password must be at least 6 characters long!')] : [t('Please enter your new password!')];
          } else if (field === 'confirmPassword') {
            newError = errors[0].includes(t('match')) ? [t('New passwords do not match!')] : [t('Please confirm your new password!')];
          } else {
            newError = errors; 
          }
          return { name, errors: newError };
        });
        form.setFields(updatedErrors);
      }
    };

    i18n.on('languageChanged', updateErrors);
    return () => {
      i18n.off('languageChanged', updateErrors);
    };
  }, [i18n, form, t]);

  const handleChangePassword = async () => {
    try {
      const values = await form.validateFields();
      const { currentPassword, newPassword, confirmPassword } = values;

      let errors = [];

      if (currentPassword !== currentUserPassword) {
        errors.push({ name: 'currentPassword', errors: [t('Current password is wrong!')] });
      }

      if (newPassword !== confirmPassword) {
        errors.push({ name: 'confirmPassword', errors: [t('New passwords do not match!')] });
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
        <FormItemMolecule label={t('Current Password')} name="currentPassword" rules={[{ required: true, message: t('Please enter your current password!') }]}>
          <InputAtom
            type={visiblePasswords.current ? 'text' : 'password'}
            placeholder={t('Current Password')}
            suffix={
              visiblePasswords.current ? (
                <EyeTwoTone onClick={() => setVisiblePasswords({ ...visiblePasswords, current: false })} style={{ cursor: 'pointer' }} />
              ) : (
                <EyeInvisibleOutlined onClick={() => setVisiblePasswords({ ...visiblePasswords, current: true })} style={{ cursor: 'pointer' }} />
              )
            }
          />
        </FormItemMolecule>

        <FormItemMolecule label={t('New Password')} name="newPassword" rules={[
          { required: true, message: t('Please enter your new password!') },
          {
            min: 6,
            message: t('Password must be at least 6 characters long!')
          }
        ]}>
          <InputAtom
            type={visiblePasswords.new ? 'text' : 'password'}
            placeholder={t('New Password')}
            suffix={
              visiblePasswords.new ? (
                <EyeTwoTone onClick={() => setVisiblePasswords({ ...visiblePasswords, new: false })} style={{ cursor: 'pointer' }} />
              ) : (
                <EyeInvisibleOutlined onClick={() => setVisiblePasswords({ ...visiblePasswords, new: true })} style={{ cursor: 'pointer' }} />
              )
            }
          />
        </FormItemMolecule>

        <FormItemMolecule label={t('Confirm New Password')} name="confirmPassword" rules={[{ required: true, message: t('Please confirm your new password!') }]}>
          <InputAtom
            type={visiblePasswords.confirm ? 'text' : 'password'}
            placeholder={t('Confirm New Password')}
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
            {t('Update Password')}
          </ButtonAtom>
        </Form.Item>

        {error && <p className="error-text">{error}</p>}
      </Form>
    </div>
  );
}

export default ProfileFormOrganism;
