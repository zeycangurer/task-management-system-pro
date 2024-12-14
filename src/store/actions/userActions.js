import { collection, getDocs, query, where, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import * as types from '../constants/userActionTypes';



export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_USERS_REQUEST });
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      dispatch({ type: types.FETCH_USERS_SUCCESS, payload: users });
    } catch (error) {
      dispatch({ type: types.FETCH_USERS_FAILURE, payload: error.message });
    }
  };
};

export const setCurrentUser = (user) => ({
  type: types.SET_CURRENT_USER,
  payload: user,
});
