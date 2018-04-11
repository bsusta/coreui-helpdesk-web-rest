import { SET_TAGS, SET_TAGS_LOADING, ADD_TAG, SET_TAG_LOADING, SET_TAG, EDIT_TAG, DELETE_TAG, LOGIN_LOGOUT } from '../types'

const initialState = {
  tags:[],
  tagsLoaded:false,
  tag:null,
  tagLoaded:false,
};

export default function tagsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TAGS:
      return { ...state, tags:action.tags };
    case ADD_TAG:
      return { ...state, tags:[action.tag,...state.tags] };
    case SET_TAGS_LOADING:
      return { ...state, tagsLoaded:action.tagsLoaded };
    case SET_TAG_LOADING:
      return { ...state, tagLoaded:action.tagLoaded, permissionsSaved:false };
    case SET_TAG:
      return { ...state, tag:action.tag };
    case EDIT_TAG:{
      //finds location of the current tag and replaces it with newer version
      let newTags=[...state.tags];
      newTags[newTags.findIndex((tag)=>tag.id==action.tag.id)]=action.tag;
      return { ...state, tags:newTags };
    }
    case DELETE_TAG:{
      let newTags=[...state.tags];
        newTags.splice(newTags[newTags.findIndex((tag)=>tag.id==action.id)],1);
        return { ...state, tags:newTags };
    }
    case LOGIN_LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}
