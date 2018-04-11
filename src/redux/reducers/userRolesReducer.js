import { SET_USER_ROLES, SET_USER_ROLES_LOADING, ADD_USER_ROLE, SET_USER_ROLE_LOADING, SET_USER_ROLE, EDIT_USER_ROLE, LOGIN_LOGOUT } from '../types'

const initialState = {
  userRoles:[],
  userRolesLoaded:false,
  userRoles:null,
  userRoleLoaded:false,
};

export default function userRolesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ROLES:
      return { ...state, userRoles:action.userRoles };
    case ADD_USER_ROLE:
      return { ...state, userRoles:[action.userRole,...state.userRoles] };
      case SET_USER_ROLES_LOADING:
        return { ...state, userRolesLoaded:action.userRolesLoaded };
      case SET_USER_ROLE_LOADING:
        return { ...state, userRoleLoaded:action.userRoleLoaded };
      case SET_USER_ROLE:
        return { ...state, userRole:action.userRole };
      case EDIT_USER_ROLE:{
        //finds location of the current userRole and replaces it with newer version
        let newUserRoles=[...state.userRoles];
        newUserRoles[newUserRoles.findIndex((userRole)=>userRole.id==action.userRole.id)]=action.userRole;
        return { ...state, userRoles:newUserRoles };
      }
      case LOGIN_LOGOUT:
        return { ...initialState };
    default:
      return state;
  }
}
