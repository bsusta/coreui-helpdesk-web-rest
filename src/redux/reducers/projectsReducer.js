import { SET_PROJECTS, SET_PROJECTS_LOADING, ADD_PROJECT, SET_PROJECT_LOADING, SET_PROJECT, EDIT_PROJECT, SET_PERMISSIONS_SAVED } from '../types'

const initialState = {
  projects:[],
  projectsLoaded:false,
  project:null,
  projectLoaded:false,
  permissionsSaved:false,
};

export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECTS:
      return { ...state, projects:action.projects };
    case ADD_PROJECT:
      return { ...state, projects:[action.project,...state.projects] };
    case SET_PROJECTS_LOADING:
      return { ...state, projectsLoaded:action.projectsLoaded };
    case SET_PROJECT_LOADING:
      return { ...state, projectLoaded:action.projectLoaded, permissionsSaved:false };
    case SET_PROJECT:
      return { ...state, project:action.project };
    case SET_PERMISSIONS_SAVED:
      return { ...state, permissionsSaved:action.permissionsSaved };
    case EDIT_PROJECT:{
      //finds location of the current project and replaces it with newer version
      let newProjects=[...state.projects];
      newProjects[newProjects.findIndex((project)=>project.id==action.project.id)]=action.project;
      return { ...state, projects:newProjects };
    }
    default:
      return state;
  }
}
