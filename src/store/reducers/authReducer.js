import * as types from '../constants/authActionType';

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAdmin: false,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_REQUEST:
    case types.DELETE_USER_REQUEST:
    case types.LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        authError: null,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload ? action.payload : state.user,
        authError: null,
        loading: false,
      };
    case types.LOGIN_ERROR:
    case types.REGISTER_ERROR:
    case types.DELETE_USER_ERROR:
      return {
        ...state,
        authError: action.payload,
      };
    case types.LOGOUT:
      return initialState;
    case types.SET_ADMIN_STATUS:
      return { ...state, isAdmin: action.payload };
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
