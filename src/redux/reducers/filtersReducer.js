import { SET_FILTERS, LOGIN_LOGOUT, SET_FILTER, SET_FILTER_LOADING, SET_FILTER_HIDE, SET_CAN_UPDATE } from '../types'

const initialState = {
  tasks:[],
  filterID:null,
  body:null,
  numberOfPages:0,
  originalBody:null,
  filterLoaded:false,
  filter:null,
  hideFilter:false,
  canUpdate:false,
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER:{
      return {...state, filter:action.filter,filterLoaded:true};
    }
    case SET_CAN_UPDATE:{
      return {...state, canUpdate:action.canUpdate};
    }
    case SET_FILTER_HIDE:{
      return {...state, hideFilter:action.hideFilter};
    }

    case SET_FILTER_LOADING:{
      return {...state,filterLoaded:false};
    }
    case SET_FILTERS:{
      if(action.originalBody){
        return { ...state, tasks:action.tasks, filterID:action.filterID, body:action.body, numberOfPages:action.numberOfPages,originalBody:action.originalBody,hideFilter:action.hideFilter };
      }
      else{
        return { ...state, tasks:action.tasks, filterID:action.filterID, numberOfPages:action.numberOfPages };
      }
    }
    case LOGIN_LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}
