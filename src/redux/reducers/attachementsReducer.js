import { SET_ATTACHEMENTS, ADD_ATTACHEMENT, SET_ATTACHEMENTS_LOADING, DELETE_ATTACHEMENT } from '../types'

const initialState = {
  attachements:[],
  attachementsError:'',
};

export default function attachementsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ATTACHEMENT:
      return { ...state, attachements:[action.attachement,...state.attachements],attachementsError:state.attachementsError+action.error };
    case DELETE_ATTACHEMENT:{
      let newAttachements=state.attachements;
      newAttachements.splice(newAttachements.findIndex((attachement)=>attachement.id===action.id),1);
      return { ...state, attachements:[...newAttachements] };
    }
    default:
      return state;
  }
}
