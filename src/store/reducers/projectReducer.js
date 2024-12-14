import * as types from '../constants/projectActionTypes';

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PROJECTS_REQUEST:
    case types.ADD_PROJECT_REQUEST:
    case types.ASSIGN_PROJECT_REQUEST:
    case types.UPDATE_PROJECT_REQUEST:
    case types.DELETE_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload,
      };
    case types.ADD_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: [...state.projects, action.payload],
      };
    case types.UPDATE_PROJECT_SUCCESS:
    case types.ASSIGN_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: state.projects.map((project) =>
          project.id === action.payload.id ? action.payload : project
        ),
      };
    case types.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: state.projects.filter((project) => project.id !== action.payload),
      };
    case types.FETCH_PROJECTS_FAILURE:
    case types.ADD_PROJECT_FAILURE:
    case types.UPDATE_PROJECT_FAILURE:
    case types.DELETE_PROJECT_FAILURE:
    case types.ASSIGN_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default projectReducer;
