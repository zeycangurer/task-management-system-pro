import { auth, db } from '../../firebaseConfig'; 
import { updatePassword} from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { message } from 'antd';
import * as types from '../constants/profileActionTypes';

export const fetchUserDetails = (userId) => {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_USER_REQUEST });

    try {
      // console.log(`Firestore'dan ${userId} için kullanıcı bilgisi çekiliyor...`);

      let userDoc = await getDoc(doc(db, "users", userId));
      
      if (!userDoc.exists()) {
        // console.log(`${userId} 'users' koleksiyonunda bulunamadı. 'customers' koleksiyonuna bakılıyor...`);
        userDoc = await getDoc(doc(db, "customers", userId));
      }

      if (userDoc.exists()) {
        const userData = { id: userId, ...userDoc.data() };
        // console.log("Firestore'dan gelen kullanıcı bilgisi:", userData);

        dispatch({ type: types.FETCH_USER_SUCCESS, payload: userData });
      } else {
        // console.log("Firestore'da bu ID'ye sahip kullanıcı bulunamadı.");
        throw new Error("Kullanıcı bilgileri bulunamadı.");
      }
    } catch (error) {
      dispatch({ type: types.FETCH_USER_FAILURE, payload: error.message });
      // console.error("Kullanıcı bilgisi alınırken hata oluştu:", error);
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

      message.success('Şifreniz başarıyla güncellendi.');
    } catch (error) {
      console.error('Şifre değiştirme hatası:', error);
      dispatch({ type: types.CHANGE_PASSWORD_FAILURE, payload: error.message });
      message.error('Şifre değiştirme sırasında bir hata oluştu.');
    }
  };
};
