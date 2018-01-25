import { SET_STATUSES, SET_STATUSES_LOADING, ADD_STATUS, SET_STATUS_LOADING, SET_STATUS, EDIT_STATUS } from '../types'

const initialState = {
  statuses:[],
  statusesLoaded:false,
  statuses:null,
  statusLoaded:false,
};

export default function statusesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STATUSES:
      return { ...state, statuses:action.statuses };
    case ADD_STATUS:
      return { ...state, statuses:[action.status,...state.statuses] };
      case SET_STATUSES_LOADING:
        return { ...state, statusesLoaded:action.statusesLoaded };
      case SET_STATUS_LOADING:
        return { ...state, statusLoaded:action.statusLoaded };
      case SET_STATUS:
        return { ...state, status:action.status };
      case EDIT_STATUS:{
        //finds location of the current status and replaces it with newer version
        let newStatuses=[...state.statuses];
        newStatuses[newStatuses.findIndex((status)=>status.id==action.status.id)]=action.status;
        return { ...state, statuses:newStatuses };
      }
    default:
      return state;
  }
}
