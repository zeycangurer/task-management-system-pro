import * as types from '../constants/userActionTypes';

const initialState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch(action.type){
    case types.FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case types.FETCH_USERS_SUCCESS:
      return { ...state, users: action.payload, loading: false };
    case types.FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case types.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};

export default userReducer;
