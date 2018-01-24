import { SET_SMTPS, SET_SMTPS_LOADING, ADD_SMTP, SET_SMTP_LOADING, SET_SMTP, EDIT_SMTP } from '../types'

const initialState = {
  SMTPs:[],
  SMTPsLoaded:false,
  SMTPs:null,
  SMTPLoaded:false,
};

export default function SMTPsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SMTPS:
      return { ...state, SMTPs:action.SMTPs };
    case ADD_SMTP:
      return { ...state, SMTPs:[action.SMTP,...state.SMTPs] };
      case SET_SMTPS_LOADING:
        return { ...state, SMTPsLoaded:action.SMTPsLoaded };
      case SET_SMTP_LOADING:
        return { ...state, SMTPLoaded:action.SMTPLoaded };
      case SET_SMTP:
        return { ...state, SMTP:action.SMTP };
      case EDIT_SMTP:{
        //finds location of the current SMTP and replaces it with newer version
        let newSMTPs=[...state.SMTPs];
        newSMTPs[newSMTPs.findIndex((SMTP)=>SMTP.id==action.SMTP.id)]=action.SMTP;
        return { ...state, SMTPs:newSMTPs };
      }
    default:
      return state;
  }
}
