import { SET_MESSAGES,SET_TOP_MESSAGES,SET_MESSAGES_READ,DELETE_MESSAGE,START_MESSAGES_LOADING, LOGIN_LOGOUT } from '../types'

const initialState = {
  messages:[],
  topMessages:[],
  count:0,
  messagesLoaded:false,
  numberOfPages:0,
};

export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGES:{
        return { ...state, messages:action.messages, messagesLoaded:true, numberOfPages:action.numberOfPages };
    }
    case START_MESSAGES_LOADING:{
        return { ...state, messagesLoaded:false };
    }
    case SET_TOP_MESSAGES:{
        return { ...state, topMessages:action.messages, count:action.count };
    }
    case SET_MESSAGES_READ:{
      let newMessages=[...state.messages];
      newMessages = newMessages.map((message)=>{
        if(action.messages.includes(message.id)){
          message.read=action.read;
        }
        return message;
      });
        return { ...state, messages:newMessages };
    }
    case DELETE_MESSAGE:{
      let newMessages=state.messages;
      newMessages.splice(newMessages.findIndex((message)=>message.id===action.id),1);
      return { ...state, messages:[...newMessages] };
      }
    case LOGIN_LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}
