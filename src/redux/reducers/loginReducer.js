import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_LOGOUT} from '../types'

const initialState = {
  authenticated: false,
  loading:false,
  error:'',
  token: null,
  user: null,
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
    case LOGIN_FAIL:
      return {
        ...state,
        authenticated: false,
        error: 'Login failed, invalid name or password',
        loading:false,
      };
    case LOGIN_LOGOUT:
      return {
        ...state,
        authenticated: false,
        error: '',
        loading:false,
      };
    default:
      return state;
  }
}
