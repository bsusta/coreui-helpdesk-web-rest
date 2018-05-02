import { SET_COMMENT_ATTACHMENTS, ADD_COMMENT_ATTACHMENT, SET_COMMENT_ATTACHMENTS_LOADING, DELETE_COMMENT_ATTACHMENT,DELETE_COMMENT_ATTACHMENTS, LOGIN_LOGOUT } from '../types'

const initialState = {
  commentAttachments:[],
  commentAttachmentsError:'',
};

export default function commentAttachmentsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT_ATTACHMENT:
    return { ...state, commentAttachments:[action.commentAttachment,...state.commentAttachments],commentAttachmentsError:state.commentAttachmentsError+action.error };
    case DELETE_COMMENT_ATTACHMENT:{
      let newCommentAttachments=state.commentAttachments;
      newCommentAttachments.splice(newCommentAttachments.findIndex((commentAttachment)=>commentAttachment.id===action.id),1);
      return { ...state, commentAttachments:[...newCommentAttachments] };
    }
    case DELETE_COMMENT_ATTACHMENTS:{
      return { ...state, commentAttachments:[] };
    }
    case LOGIN_LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}
