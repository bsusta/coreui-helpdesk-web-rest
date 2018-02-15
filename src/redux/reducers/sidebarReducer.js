import { SET_SIDEBAR, SET_SIDEBAR_LOADING } from '../types'

const initialState = {
  sidebar:[],
};

export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SIDEBAR:
      return { ...state, sidebar:action.sidebar };
    default:
      return state;
  }
}
