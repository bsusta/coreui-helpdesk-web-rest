import { CLEAR_ERROR_MESSAGES, ADD_ERROR_MESSAGE,SET_ERROR_MESSAGE, LOGIN_LOGOUT } from '../types'

//{date:(new Date()).getTime()/1000,message:'This is a test error message'} 
const initialState = {
  errorMessages:[],
};

export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERROR_MESSAGES:
    return { ...state, errorMessages:[] };
    case SET_ERROR_MESSAGE:{
      return { ...state, errorMessages:[{date:(new Date()).getTime()/1000,message:action.errorMessage},...state.errorMessages] };
    }
    case ADD_ERROR_MESSAGE:{
      return { ...state, errorMessages:[{date:(new Date()).getTime()/1000,message:action.errorMessage},...state.errorMessages] };
    }
    case LOGIN_LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}
