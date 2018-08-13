import { SET_SIDEBAR, SET_SIDEBAR_LOADING, LOGIN_LOGOUT,UPDATE_SIDEBAR } from '../types'

const initialState = {
  sidebar:null,
  date:null,
};

export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SIDEBAR:{
      let newSidebar = state.sidebar;
      let sidebarFilterIndex=newSidebar.findIndex((item)=>item.name==="filters");
      let sidebarProjectIndex=newSidebar.findIndex((item)=>item.name==="projects");
      let sidebarTagIndex=newSidebar.findIndex((item)=>item.name==="tags");
      let sidebarArchivedIndex=newSidebar.findIndex((item)=>item.name==="archived");
      let sidebarReportsIndex=newSidebar.findIndex((item)=>item.name==="reports");

      let filters=newSidebar[sidebarFilterIndex].children;
      let projects=newSidebar[sidebarProjectIndex].children;
      let tags=newSidebar[sidebarTagIndex].children;
      let archived=newSidebar[sidebarArchivedIndex].children;
      let reports=newSidebar[sidebarReportsIndex].children;

      action.projects.map((project)=>{
        let index = projects.findIndex((item)=>item.id===project.id);
        if(index===-1){
          projects.splice(projects.length-1,0,{
            name: project.title,
            id:project.id,
            url: "/project/" + project.id.toString(),
            //icon: "icon-folder",
            badge: {
              variant: "info",
              text: project.numberOfTasks
            }
          });
        }
        else{
          projects[index]={
            name: project.title,
            id:project.id,
            url: "/project/" + project.id.toString(),
            //icon: "icon-folder",
            badge: {
              variant: "info",
              text: project.numberOfTasks
            }
          }
        }
        index=archived.findIndex((item)=>item.id===project.id);
        if(index!==-1){
          archived.splice(index,1);
        }
      });

      action.archived.map((project)=>{
        let index = archived.findIndex((item)=>item.id===project.id);
        if(index===-1){
          archived.splice(archived.length-1,0,{
            name: project.title,
            id:project.id,
            url: "/project/" + project.id.toString(),
            //icon: "icon-folder",
            badge: {
              variant: "info",
              text: project.numberOfTasks
            }
          });
        }
        else{
          archived[index]={
            name: project.title,
            id:project.id,
            url: "/project/" + project.id.toString(),
            //icon: "icon-folder",
            badge: {
              variant: "info",
              text: project.numberOfTasks
            }
          }
        }
        index=projects.findIndex((item)=>item.id===project.id);
        if(index!==-1){
          projects.splice(index,1);
        }
      });

      action.tags.map((tag)=>{
        let index = tags.findIndex((item)=>item.id===tag.id);
        if(index===-1){
          tags.splice(tags.length-1,0,{
            name: tag.title,
            color: tag.color,
            id: tag.id,
            url: "/tag/" + tag.id.toString()
          });
        }
        else{
          tags[index]={
            name: tag.title,
            id: tag.id,
            color: tag.color,
            url: "/tag/" + tag.id.toString()
          }
        }
      });

      action.filters.map((filter)=>{
        let index = filters.findIndex((item)=>item.id===filter.id);
        if(index===-1){
          filters.splice(filters.length-1,0,{
            name: filter.title,
            id: filter.id,
            url: "/filter/" + filter.id.toString()
          });
        }
        else{
          filters[index]={
            name: filter.title,
            id: filter.id,
            url: "/filter/" + filter.id.toString()
          }
        }
      });

      if(action.reports){
        action.reports
        .map((report)=>{
          let index = reports.findIndex((item)=>item.id===report.id);
          if(index===-1){
            reports.splice(reports.length-1,0,{
              name: report.title,
              id: report.id,
              url: "/reports/" + report.id.toString()
              //icon: "fa fa-play"
            });
          }
          else{
            reports[index]={
              name: report.title,
              id: report.id,
              url: "/reports/" + report.id.toString()
              //icon: "fa fa-play"
            }
          }
        });
      }

      newSidebar[sidebarFilterIndex].children=filters;
      newSidebar[sidebarProjectIndex].children=projects;
      newSidebar[sidebarTagIndex].children=tags;
      newSidebar[sidebarArchivedIndex].children=archived;
      newSidebar[sidebarReportsIndex].children=reports;

      return { ...state, sidebar:newSidebar,date:action.date };
    }
    case SET_SIDEBAR:
      return { ...state, sidebar:action.sidebar, date:action.date };
    case LOGIN_LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}
