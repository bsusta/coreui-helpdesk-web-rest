import { CLEAR_ERROR_MESSAGE, SET_ERROR_MESSAGE, LOGIN_LOGOUT } from '../types'

const initialState = {
  errorMessage:'',
  errorID:null,
};

export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
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
