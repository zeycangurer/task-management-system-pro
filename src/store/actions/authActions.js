import { message } from 'antd';
import { auth, db } from '../../firebaseConfig';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { fetchUserDetails } from './profileActions';
import { doc, getDoc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteUser as deleteAuthUser } from 'firebase/auth';
import * as types from '../constants/authActionType'

export const setUser = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user
});

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: types.LOGIN_REQUEST });
    try {

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await dispatch(fetchUserDetails(user.uid));
      localStorage.setItem('user', JSON.stringify(user));

      dispatch({ type: types.LOGIN_SUCCESS, payload: user });

    } catch (error) {

      let errorMessage = 'Giriş başarısız. Lütfen tekrar deneyin.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Kullanıcı adı veya şifre yanlış.';
      }
      dispatch({ type: types.LOGIN_ERROR, payload: errorMessage });
    }
  };
};


export const logout = () => {
  return (dispatch) => {
    signOut(auth)
      .then(() => {
        dispatch({ type: types.LOGOUT });
        localStorage.removeItem('user');
        message.success('Başarıyla çıkış yapıldı.');
      })
      .catch((error) => {
        message.error('Çıkış yaparken bir hata oluştu.');
      });
  };
};

export const restoreUser = () => {
  return (dispatch) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user)); 
      } else {
        dispatch({ type: types.LOGOUT });
      }
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
      } else if (userData.role === 'user' || userData.role === 'manager') {
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

export const deleteUser = (userId, getState) => {
  return async (dispatch) => {
    const state = getState();
    const currentUser = state.auth.user;
    dispatch({ type: types.DELETE_USER_REQUEST });

    try {
      const userRef = doc(db, 'users', userId);
      const customerRef = doc(db, 'customers', userId);
      
      const userSnap = await getDoc(userRef);
      const customerSnap = await getDoc(customerRef);

      if (!userSnap.exists() && !customerSnap.exists()) {
        throw new Error('Kullanıcı bulunamadı!');
      }

      if (userSnap.exists()) {
        await deleteDoc(userRef);
      }
      if (customerSnap.exists()) {
        await deleteDoc(customerRef);
      }

      const user = auth.currentUser;
      if (user && user.uid === userId) {
        await deleteAuthUser(user);
      }

      dispatch({ type: types.DELETE_USER_SUCCESS, payload: userId });
      if (currentUser && currentUser.uid !== userId) {
        dispatch({ type: types.LOGIN_SUCCESS, payload: currentUser }); 
      }
    } catch (error) {
      dispatch({ type: types.DELETE_USER_ERROR, payload: error.message });
      console.error('Kullanıcı silinirken hata oluştu:', error);
    }
  };
};

export const updateUser = (userData, getState) => async (dispatch) => {
  try {
    const state = getState();
    const currentUser = state.auth.user;
    const collectionName = userData.role === 'customer' ? 'customers' : 'users';
    await updateDoc(doc(db, collectionName, userData.id), userData);
    dispatch({ type: 'UPDATE_USER_SUCCESS', payload: userData });
    if (currentUser && currentUser.uid !== userData.id) {
      dispatch({ type: types.LOGIN_SUCCESS, payload: currentUser }); 
    }
  } catch (error) {
    console.error('Kullanıcı güncellenirken hata oluştu:', error);
  }
};

export const moveUserBetweenCollections = (oldUserData, newUserData) => async (dispatch) => {
  try {
    const oldCollection = oldUserData.role === 'customer' ? 'customers' : 'users';
    const newCollection = newUserData.role === 'customer' ? 'customers' : 'users';

    let updatedData = { ...newUserData };

    if (oldUserData.role === 'user' && newUserData.role === 'customer') {
      updatedData.projects = oldUserData.assignedProjects || []; 
      updatedData.createdTasks = oldUserData.assignedTasks || []; 
      delete updatedData.assignedProjects; 
      delete updatedData.assignedTasks; 
    }

    else if (oldUserData.role === 'customer' && newUserData.role === 'user') {
      updatedData.assignedProjects = oldUserData.projects || []; 
      updatedData.assignedTasks = oldUserData.createdTasks || []; 
      delete updatedData.projects;
      delete updatedData.createdTasks;
      delete updatedData.company;
    }

    await deleteDoc(doc(db, oldCollection, oldUserData.id));
    await setDoc(doc(db, newCollection, newUserData.id), updatedData);

    dispatch({ type: 'MOVE_USER_COLLECTION', payload: updatedData });
  } catch (error) {
    console.error('Rol değiştirme işlemi başarısız:', error);
  }
};
