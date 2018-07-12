import { SET_SIDEBAR,SET_ERROR_MESSAGE, UPDATE_SIDEBAR, LOWER_ACTIVE_REQUESTS } from "../types";
import { SIDEBAR_DATA } from "../urls";

/**
 * Gets all sidebar data available with no pagination
 * @param {string} token universal token for API comunication
 */
export const getSidebar = (date,ACL,token) => {
  return dispatch => {
    if(date){
      fetch(SIDEBAR_DATA+'/'+date, {
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if(!response.ok){
            processError(response,dispatch);
            return;
          }
          response.json().then(data => {
            dispatch({ type: UPDATE_SIDEBAR, ...data });
          });
        })
        .catch(function(error) {
          dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
          console.log(error);
        });
      return;
    }
    fetch(SIDEBAR_DATA, {
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if(!response.ok){
          processError(response,dispatch);
          return;
        }
        response.json().then(data => {
          let nav = [];
          let reports = {
            name: "reports",
            open: false,
            url: "",
            icon: "fa fa-file",
            children: []
          };
          if(ACL.includes('report_filters')&&data.reports){
            data.reports.map(report =>
              reports.children.push({
                name: report.title,
                id: report.id,
                url: "/reports/" + report.id.toString()
                //icon: "fa fa-play"
              })
            );
          }
          let filters = {
            name: "filters",
            open: true,
            url: "",
            icon: "fa fa-filter",
            children: []
          };
          data.filters.map(filter =>
            filters.children.push({
              name: filter.title,
              id:filter.id,
              url: "/filter/" + filter.id.toString(),
              icon: filter.icon_class?filter.icon_class:undefined
              //icon: "fa fa-filter"
            })
          );

          filters.children.push({
             name: "filter",
             url: "/filter/add",
             icon: "fa fa-plus"
           });

           let tags = "";
           let projects = "";
           let archived = "";
           {/*
                     let tags = {
                       name: "tags",
                       open: false,
                       url: "",
                       icon: "fa fa-tags",
                       children: []
                     };
                     if(data.tags){
                       data.tags.map(tag =>
                         tags.children.push({
                           name: tag.title,
                           color: tag.color,
                           id:tag.id,
                           public:tag.public,
                           url: "/tag/" + tag.id.toString()
                         })
                       );
                     }
                     tags.children.push({
                       name: "tag",
                       url: "/tag/add",
                       icon: "fa fa-plus"
                     });
        
          let projects = {
            name: "projects",
            open: false,
            url: "",
            icon: "icon-folder",
            children: []
          };

          if(data.projects){
            data.projects.map(project =>
              projects.children.push({
                name: project.title,
                id:project.id,
                url: "/project/" + project.id.toString(),
                //icon: "icon-folder",
                badge: {
                  variant: "info",
                  text: project.numberOfTasks
                }
              })
            );

          }

            if(ACL.includes('create_projects')){

              projects.children.push({
                name: "project",
                url: "/project/add",
                icon: "fa fa-plus"
              });
            }

          let archived = {
            name: "archived",
            open: false,
            url: "",
            icon: "fa fa-archive",
            children: []
          };
          data.archived.map(project =>
            archived.children.push({
              name: project.title,
              id:project.id,
              url: "/project/" + project.id.toString(),
              //icon: "icon-folder",
              badge: {
                variant: "info",
                text: project.numberOfTasks
              }
            })
          );
   */}
          nav.push(filters, reports ,projects, tags, archived);
          dispatch({ type: SET_SIDEBAR, sidebar: nav, date:data.date });
        });
      })
      .catch(function(error) {
        dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
        console.log(error);
      });
  };
};
