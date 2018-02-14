import { SET_USERS, SET_USERS_LOADING, ADD_USER, SET_USER_LOADING, SET_USER, EDIT_USER } from '../types'

const initialState = {
  users:[],
  usersLoaded:false,
  users:null,
  userLoaded:false,
  usersLinks:null,
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users:action.users, usersLinks:action.links };
    case ADD_USER:
      return { ...state, users:[action.user,...state.users] };
      case SET_USERS_LOADING:
        return { ...state, usersLoaded:action.usersLoaded };
      case SET_USER_LOADING:
        return { ...state, userLoaded:action.userLoaded };
      case SET_USER:
        return { ...state, user:action.user,userLoaded:true };
      case EDIT_USER:{
        //finds location of the current user and replaces it with newer version
        let newUsers=[...state.users];
        newUsers[newUsers.findIndex((user)=>user.id==action.user.id)]=action.user;
        return { ...state, users:newUsers };
      }
    default:
      return state;
  }
}
