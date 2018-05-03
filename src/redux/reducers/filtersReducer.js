import { SET_FILTERS, LOGIN_LOGOUT } from '../types'

const initialState = {
  tasks:[],
  filterID:null,
};

export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTERS:
      return { ...state, tasks:action.tasks, filterID:action.filterID };
    case LOGIN_LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}
