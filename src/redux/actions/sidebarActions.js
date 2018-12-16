import { SET_SIDEBAR,SET_ERROR_MESSAGE, UPDATE_SIDEBAR, LOWER_ACTIVE_REQUESTS } from "../types";
import { SIDEBAR_DATA } from "../urls";
import i18n from 'i18next';
import {processError} from '../../helperFunctions';
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
                url: "/reports/" + report.id.toString(),
                icon: report.icon_class?report.icon_class:undefined
                //icon: "fa fa-play"
              })
            );
          }

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

          /*filters.children.push({
             name: i18n.t('filter'),
             url: "/filter/add",
             icon: "fa fa-plus",
             id:'add'
           });*/

          let projects = {
            name: "projects",
            open: true,
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
                },
                canEdit:project.canEdit
              })
            );
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
              },
              canEdit:project.canEdit,
            })
          );
          dispatch({ type: SET_SIDEBAR, sidebar: {filters, projects, tags, archived, reports}, date:data.date });
        });
      })
      .catch(function(error) {
        dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
        console.log(error);
      });
  };
};
