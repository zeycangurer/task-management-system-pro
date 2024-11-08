import {
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  ASSIGN_TASK_REQUEST,
  ASSIGN_TASK_SUCCESS,
  ASSIGN_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
} from '../actions/taskActions';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK_REQUEST:
    case FETCH_TASKS_REQUEST:
    case ASSIGN_TASK_REQUEST:
    case UPDATE_TASK_REQUEST:
    case ADD_COMMENT_REQUEST:
    case DELETE_TASK_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, action.payload],
      };

    case FETCH_TASKS_SUCCESS:
      return { ...state, loading: false, tasks: action.payload };

    case UPDATE_TASK_SUCCESS:
    case ASSIGN_TASK_SUCCESS:
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...action.payload }
            : task
        ),
      };

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };

    case CREATE_TASK_FAILURE:
    case FETCH_TASKS_FAILURE:
    case ASSIGN_TASK_FAILURE:
    case UPDATE_TASK_FAILURE:
    case ADD_COMMENT_FAILURE:
    case DELETE_TASK_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default taskReducer;
