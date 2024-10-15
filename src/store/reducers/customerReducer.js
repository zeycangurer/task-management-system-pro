
import { FETCH_CUSTOMERS_REQUEST, FETCH_CUSTOMERS_SUCCESS, FETCH_CUSTOMERS_FAILURE } from '../actions/customerActions';

const initialState = {
  customers: [],
  loading: false,
  error: null,
};

const customerReducer = (state = initialState, action) => {
  switch(action.type){
    case FETCH_CUSTOMERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CUSTOMERS_SUCCESS:
      return { ...state, customers: action.payload, loading: false };
    case FETCH_CUSTOMERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default customerReducer;
