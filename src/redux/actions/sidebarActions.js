import { SET_SIDEBAR } from '../types';
import { SIDEBAR_DATA } from '../urls';

/**
 * Gets all sidebar data available with no pagination
 * @param {string} token universal token for API comunication
 */
export const getSidebar= (token) => {
  return (dispatch) => {
      fetch(SIDEBAR_DATA, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
      response.json().then((data) => {
        let nav = [];
        let reports = {
          name: "Reports",
          url: "",
          icon: "fa fa-filter",
          children:[]
        };
        data.reports.map((report)=>reports.children.push({
          name: report.title,
          url: '/reports/'+report.id.toString(),
          icon: "fa fa-play"
        }));

        let tags = {
          name: "Tags",
          url: "",
          icon: "fa fa-tags",
          children:[]
        };
        data.tags.map((tag)=>tags.children.push({
          name: tag.title,
          url: "/tag/"+tag.id.toString()
        }));
        tags.children.push({
            name: "Tag",
            url: "/tag/add",
            icon: "fa fa-plus",
        })

        let filters = {
          name: "Filters",
          url: "",
          icon: "fa fa-filter",
          children:[]
        };
        data.filters.map((filter)=>filters.children.push({
          name: filter.title,
          url: "/filter/"+filter.id.toString(),
          icon: "fa fa-filter"
        }));
        filters.children.push({
            name: "Filter",
            url: "/mytasks",
            icon: "fa fa-plus"
        });



        let projects = {
          name: "Projects",
          url: "",
          icon: "icon-folder",
          children:[]
        };
        data.projects.map((project)=>projects.children.push({
          name: project.title,
          url: "/project/"+project.id.toString(),
          icon: "icon-folder",
          badge: {
            variant: "info",
            text: project.numberOfTasks
          }
        }));

        projects.children.push({
            name: "Project",
            url: "/project/add",
            icon: "fa fa-plus"
          });

        let archived = {
          name: "Archived",
          url: "",
          icon: "icon-folder",
          children:[]
        };
        data.projects.map((project)=>archived.children.push({
          name: project.title,
          url: "/archived/"+project.id.toString(),
          icon: "icon-folder",
          badge: {
            variant: "info",
            text: project.numberOfTasks
          }
        }));

        nav.push(filters,projects,archived,tags,reports);
        dispatch({type: SET_SIDEBAR, sidebar:nav});
      });
    }
  ).catch(function (error) {
    console.log(error);
  });
}
}
