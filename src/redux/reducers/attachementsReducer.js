import { ADD_ATTACHEMENT, DELETE_ATTACHEMENT,EDIT_ATTACHEMENT,LOGIN_LOGOUT } from '../types'

const initialState = {
  attachements:[],
  attachementsError:'',
};

export default function attachementsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ATTACHEMENT:
      return { ...state, attachements:[action.attachement,...state.attachements],attachementsError:state.attachementsError+action.error };
    case LOGIN_LOGOUT:
      return { ...initialState };
    case EDIT_ATTACHEMENT:{
      let newAttachements=[...state.attachements];
        newAttachements[newAttachements.findIndex((attachement)=>attachement.id==action.attachement.id)]=action.attachement;
      return { ...state, attachements:newAttachements };
    }
    case DELETE_ATTACHEMENT:{
      let newAttachements=state.attachements;
      newAttachements.splice(newAttachements.findIndex((attachement)=>attachement.id===action.id),1);
      return { ...state, attachements:[...newAttachements] };
    }
    default:
      return state;
  }
}
