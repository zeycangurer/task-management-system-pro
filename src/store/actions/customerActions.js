
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export const FETCH_CUSTOMERS_REQUEST = 'FETCH_CUSTOMERS_REQUEST';
export const FETCH_CUSTOMERS_SUCCESS = 'FETCH_CUSTOMERS_SUCCESS';
export const FETCH_CUSTOMERS_FAILURE = 'FETCH_CUSTOMERS_FAILURE';

export const fetchCustomers = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CUSTOMERS_REQUEST });
    try {
      const querySnapshot = await getDocs(collection(db, 'customers'));
      const customers = [];
      querySnapshot.forEach((doc) => {
        customers.push({ id: doc.id, ...doc.data() });
      });
      dispatch({ type: FETCH_CUSTOMERS_SUCCESS, payload: customers });
    } catch (error) {
      dispatch({ type: FETCH_CUSTOMERS_FAILURE, payload: error.message });
    }
  };
};
