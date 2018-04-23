import { SET_STATUSES, SET_STATUSES_LOADING, ADD_STATUS, SET_STATUS_LOADING, SET_STATUS, EDIT_STATUS, LOGIN_LOGOUT, SET_TASK_STATUSES } from '../types'

const initialState = {
  statuses:[],
  statusesLoaded:false,
  statuses:null,
  statusLoaded:false,
  updateDate:null,
  taskStatuses:[],
};

export default function statusesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STATUSES:{
        return { ...state, statuses:action.statuses, updateDate:action.updateDate };
      }
    case SET_TASK_STATUSES:{
      if(!state.updateDate){
        return { ...state, taskStatuses:action.statuses, updateDate:action.updateDate };
      }
      let newStatuses=[...state.taskStatuses];
      action.statuses.map((status)=>{
        let index= newStatuses.findIndex((item)=>item.id===status.id);
        if(index!=-1){
          if(!status.is_active){
            newStatuses.splice(index,1);
          }
          else{
            newStatuses[index]=status;
          }
        }
        else{
          newStatuses.push(status);
        }
      });
      return { ...state, taskStatuses:newStatuses, updateDate:action.updateDate };

    }
    case ADD_STATUS:
      return { ...state, statuses:[action.status,...state.statuses] };
      case SET_STATUSES_LOADING:
        return { ...state, statusesLoaded:action.statusesLoaded };
      case SET_STATUS_LOADING:
        return { ...state, statusLoaded:action.statusLoaded };
      case SET_STATUS:
        return { ...state, status:action.status,statusLoaded:true };
      case EDIT_STATUS:{
        //finds location of the current status and replaces it with newer version
        let newStatuses=[...state.statuses];
        if(action.status.is_active){
          newStatuses[newStatuses.findIndex((status)=>status.id==action.status.id)]=action.status;
        }
        else{
          newStatuses.splice(newStatuses.findIndex((status)=>status.id==action.status.id),1);
        }
        return { ...state, statuses:newStatuses };
      }
      case LOGIN_LOGOUT:
        return { ...initialState };
    default:
      return state;
  }
}
