import { createStore, applyMiddleware, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import { thunk } from 'redux-thunk';
import taskReducer from './reducers/taskReducer';
import userReducer from './reducers/userReducer'
import customerReducer from './reducers/customerReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
  users: userReducer,
  customers: customerReducer,

});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
