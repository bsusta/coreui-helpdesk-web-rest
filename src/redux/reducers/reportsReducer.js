import {
  CLEAR_REPORT_TASKS,
  SET_REPORT_TASKS,
  SET_REPORT,
  SET_REPORT_PAGE,
  SET_SHOW_REPORT,
  SET_REPORT_LOADING,
  LOGIN_LOGOUT,
  SET_REPORT_ORDER,
  SET_REPORT_BODY,
  SET_REPORT_FORCE_UPDATE } from '../types';
import {createEmptyFilterBody} from '../../helperFunctions';
const initialState = {
  numberOfPages:0,
  total:null,
  tasks:[],
  body:{page:1,count:20,body:createEmptyFilterBody(),reportID:null,search:'',order:'order=status=>asc'},
  showFilter:false,
  report:null,
  reportLoaded:false,
  forceUpdate:false
};


export default function reportsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REPORT_BODY:{
      let newBody={...state.body};
      if(action.page!==undefined){
        newBody.page=action.page;
      }
      if(action.count!==undefined){
        newBody.count=action.count;
      }
      if(action.reportID!==undefined){
        newBody.reportID=action.reportID;
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
      return {...state, body:newBody,report:action.report?action.report:state.report};
    }
    case SET_REPORT_FORCE_UPDATE:{
      return {...state, forceUpdate:action.forceUpdate};
    }

    case SET_REPORT_ORDER:{
      return {...state, order:action.order};
    }
    case SET_REPORT_LOADING:{
      return {...state, reportLoaded:action.reportLoaded};
    }
    case SET_REPORT_PAGE:{
      return {...state, page:action.page};
    }
    case SET_SHOW_REPORT:{
      return {...state, showFilter:action.showFilter};
    }
    case SET_REPORT_TASKS:{
      return { ...state, tasks:action.tasks, numberOfPages:action.numberOfPages, total:action.total };
    }
    case SET_REPORT:{
      return { ...state, body:action.body, reportState:action.reportState,report:action.report?action.report:state.report, page:action.page };
    }
    case LOGIN_LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}
