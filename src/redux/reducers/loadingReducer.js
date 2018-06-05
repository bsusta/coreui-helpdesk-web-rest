import { CLEAR_ERROR_MESSAGE, SET_ERROR_MESSAGE,SET_ACTIVE_REQUESTS,LOWER_ACTIVE_REQUESTS,ADD_ACTIVE_REQUESTS, LOGIN_LOGOUT } from '../types'

const initialState = {
  errorMessage:'',
  errorID:null,
  activeRequests:0,
};

export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_REQUESTS:
      return { ...state, activeRequests:action.activeRequests};
    case ADD_ACTIVE_REQUESTS:
      return { ...state, activeRequests:state.activeRequests+action.activeRequests};
    case LOWER_ACTIVE_REQUESTS:
      return { ...state, activeRequests:state.activeRequests-1};
    case CLEAR_ERROR_MESSAGE:
      return { ...state, errorMessage:'', errorID:action.id };
    case SET_ERROR_MESSAGE:
      return { ...state, errorMessage:(state.errorMessage+action.errorMessage) };
    case LOGIN_LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}
