import { message } from 'antd';
import { auth, db } from '../../firebaseConfig';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { fetchUserDetails } from './profileActions';
import { doc, setDoc } from 'firebase/firestore';

import * as types from '../constants/authActionType'

export const loginUser = (email, password) => {
  return (dispatch) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch({ type: types.LOGIN_SUCCESS, payload: userCredential.user });
        dispatch(fetchUserDetails( userCredential.user.uid));
      })
      .catch((error) => {  
        let errorMessage = '';  

        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            errorMessage = 'Kullanıcı adı veya şifre yanlış.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Geçersiz email adresi.';
            break;
          default:
            errorMessage = 'Giriş başarısız. Lütfen tekrar deneyin.';
        }
        dispatch({ type: types.LOGIN_ERROR, payload: errorMessage });
        return Promise.reject(error);
      });
  };
};


export const logout = () => {
  return (dispatch) => {
    signOut(auth)
      .then(() => {
        dispatch({ type: types.LOGOUT });
        message.success('Başarıyla çıkış yapıldı.');
      })
      .catch((error) => {
        message.error('Çıkış yaparken bir hata oluştu.');
      });
  };
};
export const registerUser = (userData) => {
  return async (dispatch) => {
    dispatch({ type: types.REGISTER_REQUEST });

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const userId = userCredential.user.uid;

      const collectionName = userData.role === 'customer' ? 'customers' : 'users';

      const userDocData = {
        name: userData.name,
        email: userData.email,
        contactNumber: userData.contactNumber,
        role: userData.role,
        password:userData.password
      };

      if (userData.role === 'customer') {
        userDocData.company = userData.company;
        userDocData.createdTasks = [];
        userDocData.projects = [];
      } else if (userData.role === 'user') {
        userDocData.assignedProjects = [];
        userDocData.assignedTasks = [];
      }

      await setDoc(doc(db, collectionName, userId), userDocData);

      console.log(userDocData)
      dispatch({ type: types.REGISTER_SUCCESS, payload: { id: userId, ...userDocData } });
    } catch (error) {
      dispatch({ type: types.REGISTER_ERROR, payload: error.message });
    }
  };
};