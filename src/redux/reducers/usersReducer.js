import { SET_USERS, SET_USERS_LOADING, ADD_USER, SET_USER_LOADING, SET_USER, EDIT_USER, LOGIN_LOGOUT } from '../types'

const initialState = {
  users:[],
  usersLoaded:false,
  users:null,
  userLoaded:false,
  updateDate:null,
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:{
      if(!state.updateDate){
        return { ...state, users:action.users, updateDate:action.updateDate };
      }
      let newUsers=[...state.users];
      action.users.map((user)=>{
        let index= newUsers.findIndex((item)=>item.id===user.id);
        if(index!=-1){
          if(!user.is_active){
            newUsers.splice(index,1);
          }
          else{

            newUsers[index]=user;
          }
        }
        else{
          newUsers.push(user);
        }
      });
      return { ...state, users:newUsers, updateDate:action.updateDate };

    }
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
        if(action.user.is_active){
          newUsers[newUsers.findIndex((user)=>user.id==action.user.id)]=action.user;
        }
        else{
          newUsers.splice(newUsers.findIndex((user)=>user.id==action.user.id),1);
        }
        return { ...state, users:newUsers };
      }
      case LOGIN_LOGOUT:
        return { ...initialState };
    default:
      return state;
  }
}
