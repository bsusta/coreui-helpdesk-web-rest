import { CLEAR_FILTER_TASKS, SET_FILTERED_TASKS, SET_FILTER,SET_FILTER_PAGE,SET_SHOW_FILTER,SET_FILTER_LOADING, LOGIN_LOGOUT, SET_FILTER_ORDER, SET_UPDATE_AT, EDIT_TASK } from '../types'

const initialState = {
  numberOfPages:0,
  total:null,
  tasks:[],
  body:null,
  filterState:null,
  page:1,
  showFilter:true,
  filterLoaded:false,
  order:'order=status=>asc',
  filter:null,
  updateAt:(new Date()).getTime(),
};


export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_TASK:{
      //finds location of the current task and replaces it with newer
      let newTasks=[...state.tasks];
      let index =newTasks.findIndex((task)=>task.id==action.task.id);
      if(index===-1){
        return state;
      }
      newTasks[index]=action.task;
      return { ...state, tasks:newTasks };
    }
    case SET_FILTER_ORDER:{
      return {...state, order:action.order};
    }
    case SET_UPDATE_AT:{
      return {...state, updateAt:action.updateAt};
    }
    case CLEAR_FILTER_TASKS:{
      return {...state, tasks:[], numberOfPages:0, page:1, total:null, body:null, filterState:null};
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
      return { ...state, tasks:action.tasks, numberOfPages:action.numberOfPages, total:action.total };
    }
    case SET_FILTER:{
      return { ...state, body:action.body, filterState:action.filterState,filter:action.filter?action.filter:state.filter, page:action.page };
    }
    case LOGIN_LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}
