import { SET_TASKS, SET_TASKS_LOADING, ADD_TASK, SET_TASK_LOADING, SET_TASK, EDIT_TASK, SET_FILTER_LINKS, SET_PROJECT_LINKS,SET_PROJECT_TASKS_LOADING,SET_FILTER_TASKS_LOADING } from '../types'

const initialState = {
  tasks:[],
  tasksLoaded:false,
  tasks:null,
  taskLoaded:false,
  filterLinks:null,
  projectLinks:null,
  filterTasksLoaded:false,
  projectTasksLoaded:false,
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TASKS:
      return { ...state, tasks:action.tasks };
    case ADD_TASK:
      return { ...state, tasks:[action.task,...state.tasks] };
      case SET_TASKS_LOADING:
        return { ...state, tasksLoaded:action.tasksLoaded };
      case SET_PROJECT_TASKS_LOADING:
        return { ...state, projectTasksLoaded:action.tasksLoaded };
      case SET_FILTER_TASKS_LOADING:
        return { ...state, filterTasksLoaded:action.tasksLoaded };
      case SET_TASK_LOADING:
        return { ...state, taskLoaded:action.taskLoaded };
      case SET_FILTER_LINKS:
        return { ...state, filterLinks:action.filterLinks };
      case SET_PROJECT_LINKS:
        return { ...state, projectLinks:action.projectLinks };
      case SET_TASK:
        return { ...state, task:action.task };
      case EDIT_TASK:{
        //finds location of the current task and replaces it with newer version
        let newTasks=[...state.tasks];
        newTasks[newTasks.findIndex((task)=>task.id==action.task.id)]=action.task;
        return { ...state, tasks:newTasks };
      }
    default:
      return state;
  }
}
