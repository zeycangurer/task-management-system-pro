import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';


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