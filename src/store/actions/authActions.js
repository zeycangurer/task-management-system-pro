import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const loginUser = (email, password) => {
  return (dispatch) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch({ type: LOGIN_SUCCESS, payload: userCredential.user });
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

        dispatch({ type: LOGIN_ERROR, payload: errorMessage });
        return Promise.reject(error);
      });
  };
};


export const logoutUser = () => {
  return (dispatch) => {
    return signOut(auth)
      .then(() => {
        dispatch({ type: LOGOUT });
      })
      .catch((error) => {
        console.error('Çıkış yaparken hata oluştu:', error);
      });
  };
};

export const registerUser = (email, password) => {
  return (dispatch) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch({ type: REGISTER_SUCCESS, payload: userCredential.user });
        dispatch({ type: LOGIN_SUCCESS, payload: userCredential.user });
      })
      .catch((error) => {
        let errorMessage = '';

        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'Bu email zaten kullanımda.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Geçersiz email adresi.';
            break;
          case 'auth/weak-password':
            errorMessage = 'Şifre çok zayıf. Lütfen daha güçlü bir şifre seçin.';
            break;
          default:
            errorMessage = 'Kayıt başarısız. Lütfen tekrar deneyin.';
        }

        dispatch({ type: REGISTER_ERROR, payload: errorMessage });
        return Promise.reject(error);
      });
  };
};