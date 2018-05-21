import { SET_SIDEBAR,SET_ERROR_MESSAGE,ADD_ERROR_MESSAGE } from "../types";
import { SIDEBAR_DATA } from "../urls";

/**
 * Gets all sidebar data available with no pagination
 * @param {string} token universal token for API comunication
 */
export const getSidebar = token => {
  return dispatch => {
    fetch(SIDEBAR_DATA, {
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if(!response.ok){
          response.text().then((data)=>{
            dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response.statusText+ JSON.parse(data).message });
          });
          return;
        }
        response.json().then(data => {
          let nav = [];
          let reports = {
            name: "reports",
            url: "",
            icon: "fa fa-filter",
            children: []
          };
          data.reports.map(report =>
            reports.children.push({
              name: report.title,
              url: "/reports/" + report.id.toString()
              //icon: "fa fa-play"
            })
          );

          let tags = {
            name: "tags",
            url: "",
            icon: "fa fa-tags",
            children: []
          };
          data.tags.map(tag =>
            tags.children.push({
              name: tag.title,
              color: tag.color,
              url: "/tag/" + tag.id.toString()
            })
          );
          tags.children.push({
            name: "tag",
            url: "/tag/add",
            icon: "fa fa-plus"
          });

          let filters = {
            name: "filters",
            url: "",
            icon: "fa fa-filter",
            children: []
          };
          data.filters.map(filter =>
            filters.children.push({
              name: filter.title,
              url: "/filter/view/" + filter.id.toString()+'/1,20'
              //icon: "fa fa-filter"
            })
          );

          //mockup data filter
          let testFilters = [];
          let afterFilters = [];
          filters.children.map(filter => {
            switch (filter.name) {
              case "DO IT": {
                testFilters[0] = filter;
                filter.icon = "fa fa-play";
                break;
              }
              case "REQUESTED": {
                testFilters[1] = filter;
                filter.icon = "fa fa-users";
                break;
              }
              case "IMPORTANT": {
                testFilters[2] = filter;
                filter.icon = "fa fa-exclamation";
                break;
              }
              case "SCHEDULED": {
                testFilters[3] = filter;
                filter.icon = "fa fa-pause";
                break;
              }
              default: {
                afterFilters.push(filter);
                break;
              }
            }
          });

          afterFilters.push({
            name: "filter",
            url: "/filter",
            icon: "fa fa-plus"
          });
          filters.children = testFilters.concat(afterFilters);

          let projects = {
            name: "projects",
            url: "",
            icon: "icon-folder",
            children: []
          };
          data.projects.map(project =>
            projects.children.push({
              name: project.title,
              url: "/project/" + project.id.toString()+"/1,20",
              //icon: "icon-folder",
              badge: {
                variant: "info",
                text: project.numberOfTasks
              }
            })
          );

          projects.children.push({
            name: "project",
            url: "/project/add",
            icon: "fa fa-plus"
          });

          let archived = {
            name: "archived",
            url: "",
            icon: "fa fa-archive",
            children: []
          };
          data.archived.map(project =>
            archived.children.push({
              name: project.title,
              url: "/archived/" + project.id.toString()+"/1,20",
              //icon: "icon-folder",
              badge: {
                variant: "info",
                text: project.numberOfTasks
              }
            })
          );

          nav.push(filters, projects, archived);
          dispatch({ type: SET_SIDEBAR, sidebar: nav });
        });
      })
      .catch(function(error) {
        dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
        console.log(error);
      });
  };
};
