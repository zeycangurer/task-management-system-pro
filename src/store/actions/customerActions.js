
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import * as types from '../constants/customerActionTypes';


export const fetchCustomers = () => {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_CUSTOMERS_REQUEST });
    try {
      const querySnapshot = await getDocs(collection(db, 'customers'));
      const customers = [];
      querySnapshot.forEach((doc) => {
        customers.push({ id: doc.id, ...doc.data() });
      });
      dispatch({ type: types.FETCH_CUSTOMERS_SUCCESS, payload: customers });
    } catch (error) {
      dispatch({ type: types.FETCH_CUSTOMERS_FAILURE, payload: error.message });
    }
  };
};
