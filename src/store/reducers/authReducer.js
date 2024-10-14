import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../actions/authActions';

const initialState = {
  user: null,
  authError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        authError: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        authError: action.payload,
      };
      case LOGOUT:
      return {
        ...state,
        user: null,
        authError: null,
      };
    default:
      return state;
  }
};

export default authReducer;
