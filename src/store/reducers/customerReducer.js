import * as types from '../constants/customerActionTypes';

const initialState = {
  customers: [],
  loading: false,
  error: null,
};

const customerReducer = (state = initialState, action) => {
  switch(action.type){
    case types.FETCH_CUSTOMERS_REQUEST:
      return { ...state, loading: true, error: null };
    case types.FETCH_CUSTOMERS_SUCCESS:
      return { ...state, customers: action.payload, loading: false };
    case types.FETCH_CUSTOMERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default customerReducer;
