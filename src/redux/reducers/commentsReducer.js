import { SET_COMMENTS, SET_COMMENTS_LOADING, ADD_COMMENT, EDIT_COMMENT,DELETE_COMMENT, ADD_COMMENT_AVATAR_URL, SET_COMMENT_ATTACHMENT, LOGIN_LOGOUT } from '../types'

const initialState = {
  comments:[],
  commentsLoaded:false,
};

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMMENTS:
      return { ...state, comments:action.comments };
    case ADD_COMMENT:
      return { ...state, comments:[...state.comments,action.comment] };
    case ADD_COMMENT_AVATAR_URL:{
      //finds location of the current comment and replaces it with newer version
      let newComments=[...state.comments];
      newComments[newComments.findIndex((comment)=>comment.id==action.id)].url=action.url;
      return { ...state, comments:newComments };
    }
    case SET_COMMENT_ATTACHMENT:{
      //finds location of the current comment and replaces it with newer version
      let newComments=[...state.comments];
      let commentIndex=newComments.findIndex((comment)=>comment.id==action.commentID);
      let attachmentIndex= newComments[commentIndex].commentHasAttachments.findIndex((attachment)=>attachment.id==action.attachmentID);
      newComments[commentIndex].commentHasAttachments[attachmentIndex].url=action.url;
      return { ...state, comments:[...newComments] };
    }
    case SET_COMMENTS_LOADING:
      return { ...state, commentsLoaded:action.commentsLoaded };
    case EDIT_COMMENT:{
      //finds location of the current comment and replaces it with newer version
      let newComments=[...state.comments];
      newComments[newComments.findIndex((comment)=>comment.id==action.comment.id)]=action.comment;
      return { ...state, comments:newComments };
    }
    case DELETE_COMMENT:{
      let newComments=state.comments;
      newComments.splice(newComments.findIndex((comment)=>comment.id===action.id),1);
      return { ...state, comments:[...newComments] };
    }
    case LOGIN_LOGOUT:
      return { ...initialState };
    default:
      return state;
    }
}
