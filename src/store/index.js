import { createStore, applyMiddleware, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import { thunk } from 'redux-thunk';
import taskReducer from './reducers/taskReducer';
import userReducer from './reducers/userReducer'
import customerReducer from './reducers/customerReducer';
import projectReducer from './reducers/projectReducer';
import profileReducer from './reducers/profileReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
  users: userReducer,
  customers: customerReducer,
  projects: projectReducer,
  profiles: profileReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'profiles'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);


export  {store, persistor};

