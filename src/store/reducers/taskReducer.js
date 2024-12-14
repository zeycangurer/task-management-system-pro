import * as types from '../constants/taskActionTypes';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_TASK_REQUEST:
    case types.FETCH_TASKS_REQUEST:
    case types.ASSIGN_TASK_REQUEST:
    case types.UPDATE_TASK_REQUEST:
    case types.ADD_COMMENT_REQUEST:
    case types.DELETE_TASK_REQUEST:
      return { ...state, loading: true, error: null };

    case types.CREATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, action.payload],
      };

    case types.FETCH_TASKS_SUCCESS:
      return { ...state, loading: false, tasks: action.payload };

    case types.UPDATE_TASK_SUCCESS:
    case types.ASSIGN_TASK_SUCCESS:
    case types.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...action.payload }
            : task
        ),
      };

    case types.DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };

    case types.CREATE_TASK_FAILURE:
    case types.FETCH_TASKS_FAILURE:
    case types.ASSIGN_TASK_FAILURE:
    case types.UPDATE_TASK_FAILURE:
    case types.ADD_COMMENT_FAILURE:
    case types.DELETE_TASK_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default taskReducer;
