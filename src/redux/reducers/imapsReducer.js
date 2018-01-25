import { SET_IMAPS, SET_IMAPS_LOADING, ADD_IMAP, SET_IMAP_LOADING, SET_IMAP, EDIT_IMAP, DELETE_IMAP } from '../types'

const initialState = {
  imaps:[],
  imapsLoaded:false,
  imap:null,
  imapLoaded:false,
};

export default function imapsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IMAPS:
      return { ...state, imaps:action.imaps };
    case ADD_IMAP:
      return { ...state, imaps:[action.imap,...state.imaps] };
      case SET_IMAPS_LOADING:
        return { ...state, imapsLoaded:action.imapsLoaded };
      case SET_IMAP_LOADING:
        return { ...state, imapLoaded:action.imapLoaded };
      case SET_IMAP:
        return { ...state, imap:action.imap };
      case EDIT_IMAP:{
        //finds location of the current imap and replaces it with newer version
        let newImaps=[...state.imaps];
        newImaps[newImaps.findIndex((imap)=>imap.id==action.imap.id)]=action.imap;
        return { ...state, imaps:newImaps };
      }
      case DELETE_IMAP:{
        let newImaps=[...state.imaps];
          newImaps.splice(newImaps[newImaps.findIndex((imap)=>imap.id==action.id)],1);
          return { ...state, imaps:newImaps };
      }
    default:
      return state;
  }
}
