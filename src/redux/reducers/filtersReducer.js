import { CLEAR_FILTER_TASKS, SET_FILTERED_TASKS, SET_FILTER,SET_FILTER_PAGE,SET_SHOW_FILTER,SET_FILTER_LOADING, LOGIN_LOGOUT, SET_FILTER_ORDER, SET_UPDATE_AT, EDIT_TASK,
  SET_FILTER_BODY, ADD_TO_FILTER_BODY, SET_FILTER_FORCE_UPDATE } from '../types';
import {createEmptyFilterBody} from '../../helperFunctions';
const initialState = {
  numberOfPages:0,
  total:null,
  tasks:[],
  body:{page:1,count:20,projectID:'all',filterID:null,tagID:null,forcedUpdate:null,body:createEmptyFilterBody(),search:'',order:'order=status=>asc'},
  showFilter:false,
  filterLoaded:false,
  filter:null,
  forceUpdate:false
};


export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER_BODY:{
      let newBody={...state.body};
      if(action.page!==undefined){
        newBody.page=action.page;
      }
      if(action.count!==undefined){
        newBody.count=action.count;
      }
      if(action.projectID!==undefined){
        newBody.projectID=action.projectID;
      }
      if(action.filterID!==undefined){
        newBody.filterID=action.filterID;
      }
      if(action.tagID!==undefined){
        newBody.tagID=action.tagID;
      }
      if(action.order!==undefined){
        newBody.order=action.order;
      }
      if(action.search!==undefined){
        newBody.search=action.search;
      }
      if(action.forcedUpdate!==undefined){
        newBody.forcedUpdate=action.forcedUpdate;
      }
      if(action.body!==undefined){
        if(action.partial){
          Object.keys(action.body).map(key=>{
            newBody.body[key]=action.body[key];
          });
        }else{
          newBody.body=action.body;
        }
      }
      return {...state, body:newBody,filter:action.filter?action.filter:state.filter};
    }
    case ADD_TO_FILTER_BODY:{
      let newBody={...state.body};
      Object.keys(action.body).map(key=>{
        if(Object.keys(newBody).includes(key)){
          newBody[key]=[...newBody[key],action.body[key]]
        }else{
          newBody[key]=action.body[key];
        }
      });
      if(action.body){
        newBody.body=action.body;
      }
      return {...state, body:newBody};
    }
    case SET_FILTER_FORCE_UPDATE:{
      return {...state, forceUpdate:action.forceUpdate};
    }

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
