import { SET_TASKS, SET_TASKS_LOADING, ADD_TASK, SET_TASK_LOADING, SET_TASK,
  EDIT_TASK, SET_FILTER_LINKS, SET_PROJECT_LINKS,SET_PROJECT_TASKS_LOADING,
  SET_FILTER_TASKS_LOADING,
  SET_TAG_TASKS_LOADING,SET_TAG_LINKS,
  SET_TASK_PROJECTS, SET_TASK_PROJECTS_LOADING,
  SET_TASKS_ATTRIBUTES,SET_TASKS_ATTRIBUTES_LOADING,
  SET_TASK_SOLVERS, DELETE_TASK_SOLVERS
} from '../types'

const initialState = {
  tasks:[],
  tasksLoaded:false,
  task:null,
  taskLoaded:false,
  filterLinks:null,
  filterTasksLoaded:false,
  projectLinks:null,
  projectTasksLoaded:false,
  tagLinks:null,
  tagTasksLoaded:false,
  taskProjects:[],
  taskProjectsLoaded:false,
  taskAttributes:[],
  taskAttributesLoaded:false,
  taskSolvers:[],
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
      case SET_TAG_TASKS_LOADING:
        return { ...state, tagTasksLoaded:action.tagTasksLoaded };
      case SET_TAG_LINKS:
        return { ...state, tagLinks:action.tagLinks };
      case SET_TASK:
        return { ...state, task:action.task };
      case EDIT_TASK:{
        //finds location of the current task and replaces it with newer version
        let newTasks=[...state.tasks];
        newTasks[newTasks.findIndex((task)=>task.id==action.task.id)]=action.task;
        return { ...state, tasks:newTasks };
      }
      case SET_TASK_PROJECTS:
        return { ...state, taskProjects:action.taskProjects };
      case SET_TASK_PROJECTS_LOADING:
        return { ...state, taskProjectsLoaded:action.taskProjectsLoaded };
        case SET_TASK_SOLVERS:
          return { ...state, taskSolvers:action.taskSolvers };
      case DELETE_TASK_SOLVERS:
        return { ...state, taskSolvers:[] };
      case SET_TASKS_ATTRIBUTES:
        return { ...state, taskAttributes:action.taskAttributes };
      case SET_TASKS_ATTRIBUTES_LOADING:
        return { ...state, taskAttributesLoaded:action.taskAttributesLoaded };
    default:
      return state;
  }
}
