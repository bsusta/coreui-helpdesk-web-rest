import { CLEAR_FILTER_TASKS, SET_FILTERED_TASKS, SET_FILTER,SET_FILTER_PAGE,SET_SHOW_FILTER,SET_FILTER_LOADING, LOGIN_LOGOUT } from '../types'

const initialState = {
  numberOfPages:0,
  tasks:[],
  body:null,
  filterState:null,
  page:1,
  showFilter:true,
  filterLoaded:false,
};


export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_FILTER_TASKS:{
      return {...state, tasks:[], numberOfPages:0, page:1};
    }
    case SET_FILTER_LOADING:{
      return {...state, filterLoaded:action.filterLoaded};
    }
    case SET_FILTER_PAGE:{
      return {...state, page:action.page};
    }
    case SET_SHOW_FILTER:{
      return {...state, showFilter:action.showFilter};
    }
    case SET_FILTERED_TASKS:{
      return { ...state, tasks:action.tasks, numberOfPages:action.numberOfPages };
    }
    case SET_FILTER:{
      return { ...state, body:action.body, filterState:action.filterState, page:action.page };
    }
    case LOGIN_LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}
