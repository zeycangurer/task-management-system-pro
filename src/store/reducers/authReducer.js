import * as types from '../actions/authActions';

const initialState = {
  user: null,
  authError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        authError: null,
      };
    case types.LOGIN_ERROR:
    case types.REGISTER_ERROR:
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
