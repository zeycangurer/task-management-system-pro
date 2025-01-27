import * as types from '../constants/authActionType';

const initialState = {
  user: null,
  authError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_REQUEST:
      case types.DELETE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
      case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        authError: null,
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
    default:
      return state;
  }
};

export default authReducer;
