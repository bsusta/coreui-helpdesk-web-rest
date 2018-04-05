import { SET_COMMENT_ATTACHEMENTS, ADD_COMMENT_ATTACHEMENT, SET_COMMENT_ATTACHEMENTS_LOADING, DELETE_COMMENT_ATTACHEMENT,DELETE_COMMENT_ATTACHEMENTS } from '../types'

const initialState = {
  commentAttachements:[],
  commentAttachementsError:'',
};

export default function commentAttachementsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT_ATTACHEMENT:
    return { ...state, commentAttachements:[action.commentAttachement,...state.commentAttachements],commentAttachementsError:state.commentAttachementsError+action.error };
    case DELETE_COMMENT_ATTACHEMENT:{
      let newCommentAttachements=state.commentAttachements;
      newCommentAttachements.splice(newCommentAttachements.findIndex((commentAttachement)=>commentAttachement.id===action.id),1);
      return { ...state, commentAttachements:[...newCommentAttachements] };
    }
    case DELETE_COMMENT_ATTACHEMENTS:{
      return { ...state, commentAttachements:[] };
    }
    default:
      return state;
  }
}
