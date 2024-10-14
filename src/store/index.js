import { createStore, applyMiddleware, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import { thunk } from 'redux-thunk';
import taskReducer from './reducers/taskReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
