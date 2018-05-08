import { ADD_ATTACHMENT, DELETE_ATTACHMENT,EDIT_ATTACHMENT,LOGIN_LOGOUT,CLEAR_ATTACHMENTS  } from '../types'

const initialState = {
  attachments:[],
  attachmentsError:'',
};

export default function attachmentsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ATTACHMENT:
      return { ...state, attachments:[action.attachment,...state.attachments],attachmentsError:state.attachmentsError+action.error };
    case LOGIN_LOGOUT:
      return { ...initialState };
    case EDIT_ATTACHMENT:{
      let newAttachments=[...state.attachments];
        newAttachments[newAttachments.findIndex((attachment)=>attachment.id==action.attachment.id)]=action.attachment;
      return { ...state, attachments:newAttachments };
    }
    case DELETE_ATTACHMENT:{
      let newAttachments=state.attachments;
      newAttachments.splice(newAttachments.findIndex((attachment)=>attachment.id===action.id),1);
      return { ...state, attachments:[...newAttachments] };
    }
    case CLEAR_ATTACHMENTS:{
      return {...initialState};
    }
    default:
      return state;
  }
}
