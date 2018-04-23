import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_LOGOUT,TOKEN_CHECKED, EDIT_USER} from '../types'
import i18n from 'i18next';

const initialState = {
  authenticated: false,
  loading:false,
  error:'',
  token: null,
  user: null,
  tokenChecked:false,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, loading: true, error: '' };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        user: action.user,
        token: action.token,
        error: '',
        loading:false,
      };
    case EDIT_USER:{
      if(action.user.id===state.user.id){
        i18n.changeLanguage(action.user.language);
        return {...state,user:action.user};
      }
      return state;
    }
    case LOGIN_FAIL:
      return {
        ...state,
        authenticated: false,
        error: action.error==='Forbidden'?'Login failed, invalid name or password':action.error,
        loading:false,
      };
      case TOKEN_CHECKED:
        return { ...state, tokenChecked: true };
      case LOGIN_LOGOUT:
        return {
          authenticated: false,
          loading:false,
          error:'',
          token: null,
          user: null,
          tokenChecked:true
         };
    default:
      return state;
  }
}
