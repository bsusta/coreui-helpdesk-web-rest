import { SET_FOLLOWERS, SET_FOLLOWERS_LOADING, ADD_FOLLOWER, DELETE_FOLLOWER, LOGIN_LOGOUT } from '../types'

const initialState = {
  followers:[],
  followersLoaded:false
};

export default function followersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FOLLOWERS:
      return { ...state, followers:action.followers };
    case ADD_FOLLOWER:{
      return { ...state, followers:[action.follower,...state.followers] };
    }
    case SET_FOLLOWERS_LOADING:
      return { ...state, followersLoaded:action.followersLoaded };
    case DELETE_FOLLOWER:{
      let newFollowers=state.followers;
      newFollowers.splice(newFollowers.findIndex((follower)=>follower.id===action.id),1);
      return { ...state, followers:[...newFollowers]};
    }
    case LOGIN_LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}
