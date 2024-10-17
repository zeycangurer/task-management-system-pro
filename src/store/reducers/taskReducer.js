import { 
  SET_TASKS, 
  SET_TASKS_ERROR,
  ADD_TASK,
  ADD_TASK_ERROR,
  UPDATE_TASK, 
  UPDATE_TASK_ERROR,
  DELETE_TASK, 
  DELETE_TASK_ERROR,
  ASSIGN_TASK, 
  ASSIGN_TASK_ERROR,
  ADD_COMMENT, 
  ADD_COMMENT_ERROR
} from '../actions/taskActions';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_TASKS:
      return { 
        ...state, 
        tasks: action.payload, 
        loading: false, 
        error: null 
      };
      
    case SET_TASKS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
      
    case ADD_TASK:
      return { 
        ...state, 
        tasks: [...state.tasks, action.payload],
        error: null,
      };
      
    case ADD_TASK_ERROR:
      return {
        ...state,
        error: action.payload,
      };
      
    case UPDATE_TASK:
      return { 
        ...state, 
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
        error: null,
      };
      
    case UPDATE_TASK_ERROR:
      return {
        ...state,
        error: action.payload,
      };
      
    case ASSIGN_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.taskId ? { 
            ...task, 
            assignedTo: action.payload.assignees,
          } : task
        ),
        error: null,
      };
      
    case ASSIGN_TASK_ERROR:
      return {
        ...state,
        error: action.payload,
      };
      
    case ADD_COMMENT:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId ? { 
            ...task, 
            history: [
              ...(task.history || []), 
              action.payload.comment
            ],
          } : task
        ),
        error: null,
      };
      
    case ADD_COMMENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
      
    case DELETE_TASK:
      return { 
        ...state, 
        tasks: state.tasks.filter(task => task.id !== action.payload),
        error: null,
      };
      
    case DELETE_TASK_ERROR:
      return {
        ...state,
        error: action.payload,
      };
      
    default:
      return state;
  }
};

export default taskReducer;
