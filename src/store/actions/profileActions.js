import { auth, db } from '../../firebaseConfig'; 
import { updatePassword} from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { message } from 'antd';
import * as types from '../constants/profileActionTypes';

export const fetchUserDetails = (userId) => {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_USER_REQUEST });

    try {
      let userDocRef = doc(db, "users", userId);
      let userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        userDocRef = doc(db, "customers", userId);
        userDoc = await getDoc(userDocRef);
      }

      if (userDoc.exists()) {
        const userData = { id: userId, ...userDoc.data() };
        dispatch({ type: types.FETCH_USER_SUCCESS, payload: userData });
      } else {
        dispatch({ type: types.FETCH_USER_FAILURE, payload: "Kullanıcı bilgileri bulunamadı." });
      }
    } catch (error) {
      dispatch({ type: types.FETCH_USER_FAILURE, payload: error.message });
    }
  };
};


export const changePassword = (userId, newPassword, userRole) => {
  return async (dispatch) => {
    dispatch({ type: types.CHANGE_PASSWORD_REQUEST });

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Kullanıcı oturum açmamış!');
      }

      await updatePassword(user, newPassword);
      // console.log('Şifre Firebase Auth üzerinde güncellendi.');

      const collectionName = userRole === 'customer' ? 'customers' : 'users';
      const userRef = doc(db, collectionName, userId);

      await updateDoc(userRef, { password:newPassword, updatedAt: new Date() });
      // console.log(`Şifre değişikliği Firestore'daki ${collectionName} koleksiyonunda güncellendi.`);

      dispatch({
        type: types.CHANGE_PASSWORD_SUCCESS,
        payload: { userId, updatedAt: new Date() },
      });

    } catch (error) {
      console.error('Şifre değiştirme hatası:', error);
      dispatch({ type: types.CHANGE_PASSWORD_FAILURE, payload: error.message });
    }
  };
};
