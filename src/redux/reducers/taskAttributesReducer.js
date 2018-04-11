import { SET_TASK_ATTRIBUTES, SET_TASK_ATTRIBUTES_LOADING, ADD_TASK_ATTRIBUTE, SET_TASK_ATTRIBUTE_LOADING, SET_TASK_ATTRIBUTE, EDIT_TASK_ATTRIBUTE, LOGIN_LOGOUT } from '../types'

const initialState = {
  taskAttributes:[],
  taskAttributesLoaded:false,
  taskAttributes:null,
  taskAttributeLoaded:false,
};

export default function taskAttributesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TASK_ATTRIBUTES:
      return { ...state, taskAttributes:action.taskAttributes };
    case ADD_TASK_ATTRIBUTE:
      return { ...state, taskAttributes:[action.taskAttribute,...state.taskAttributes] };
    case SET_TASK_ATTRIBUTES_LOADING:
      return { ...state, taskAttributesLoaded:action.taskAttributesLoaded };
    case SET_TASK_ATTRIBUTE_LOADING:
      return { ...state, taskAttributeLoaded:action.taskAttributeLoaded };
    case SET_TASK_ATTRIBUTE:
      return { ...state, taskAttribute:action.taskAttribute };
    case EDIT_TASK_ATTRIBUTE:{
      //finds location of the current taskAttribute and replaces it with newer version
      let newTaskAttributes=[...state.taskAttributes];
      newTaskAttributes[newTaskAttributes.findIndex((taskAttribute)=>taskAttribute.id==action.taskAttribute.id)]=action.taskAttribute;
      return { ...state, taskAttributes:newTaskAttributes };
    }
    case LOGIN_LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}
