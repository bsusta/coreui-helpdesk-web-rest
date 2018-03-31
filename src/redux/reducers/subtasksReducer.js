import { SET_SUBTASKS, SET_SUBTASKS_LOADING, ADD_SUBTASK, EDIT_SUBTASK,DELETE_SUBTASK } from '../types'

const initialState = {
  subtasks:[],
  subtasksLoaded:false,
};

export default function subtasksReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SUBTASKS:
      return { ...state, subtasks:action.subtasks };
    case ADD_SUBTASK:
      return { ...state, subtasks:[...state.subtasks,action.subtask] };
    case SET_SUBTASKS_LOADING:
      return { ...state, subtasksLoaded:action.subtasksLoaded };
    case EDIT_SUBTASK:{
      //finds location of the current subtask and replaces it with newer version
      let newSubtasks=[...state.subtasks];
      newSubtasks[newSubtasks.findIndex((subtask)=>subtask.id==action.subtask.id)]=action.subtask;
      return { ...state, subtasks:newSubtasks };
    }
    case DELETE_SUBTASK:{
      let newSubtasks=state.subtasks;
      newSubtasks.splice(newSubtasks.findIndex((subtask)=>subtask.id===action.id),1);
      return { ...state, subtasks:[...newSubtasks] };
    }
    default:
      return state;
    }
}
