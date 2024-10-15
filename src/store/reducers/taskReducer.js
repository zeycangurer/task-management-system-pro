
import { SET_TASKS, ADD_TASK, UPDATE_TASK, DELETE_TASK } from '../actions/taskActions';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_TASKS:
      return { ...state, tasks: action.payload, loading: false, error: null };
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case UPDATE_TASK:
      return { 
        ...state, 
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ) 
      };
    case DELETE_TASK:
      return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };
    default:
      return state;
  }
};

export default taskReducer;
