import { SET_SIDEBAR, SET_SIDEBAR_LOADING, LOGIN_LOGOUT } from '../types'

const initialState = {
  sidebar:[],
  date:null,
};

export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SIDEBAR:
      return { ...state, sidebar:action.sidebar, date:action.date };
    case LOGIN_LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}
