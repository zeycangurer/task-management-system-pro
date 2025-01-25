import * as types from '../constants/profileActionTypes';

const initialState = {
  users: [],
  customers: [],
  loading: false,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_PASSWORD_REQUEST:
    case types.FETCH_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case types.FETCH_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    case types.FETCH_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case types.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.map(user =>
          user.id === action.payload.userId ? { ...user, updatedAt: action.payload.updatedAt } : user
        ),
        customers: state.customers.map(customer =>
          customer.id === action.payload.userId ? { ...customer, updatedAt: action.payload.updatedAt } : customer
        ),
      };

    case types.CHANGE_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default profileReducer;
