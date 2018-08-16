import React, { Component } from "react";
import { connect } from 'react-redux';

import FilterLoader from './Tasks';
import Loading from '../../components/Loading';

class Loader extends Component {

  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.startStatusesLoading();
    this.props.startCompaniesLoading();
    this.props.startTaskAttributesLoading();
    this.props.startTagsLoading();
    this.props.startUnitsLoading();
    this.props.startUsersLoading();
    this.props.deleteTaskSolvers();
    this.props.addActiveRequests(6);
    this.props.getTaskStatuses(this.props.statusesUpdateDate,this.props.token);
    this.props.getTaskCompanies(this.props.companiesUpdateDate,this.props.token);
    this.props.getTaskAttributes(this.props.token);
    this.props.getTags(this.props.token);
    this.props.getTaskUnits(this.props.token);
    this.props.getUsers("",this.props.token);
    let urlData=this.props.match.params;
    let body={};
    if(urlData.id){
      body.filterID=urlData.id;
    }
    if(urlData.tagID){
      body.tagID=urlData.tagID;
    }
    if(urlData.projectID){
      body.projectID=urlData.projectID;
    }
    this.props.setFilterBody(body);
  }

  componentWillReceiveProps(props){
    //ak sa zmeni filter, nacitaj ho
    if(props.match.params.id && this.props.match.params.id!==props.match.params.id){
    }
    //ak sa zmeni project, nacitaj ho
    else if(props.match.params.projectID && this.props.match.params.projectID!==props.match.params.projectID ){
    }
    //ak sa zmeni tag, nacitaj ho
    else if(props.match.params.tagID && props.match.params.tagID!==this.props.match.params.tagID){
    }
    //ak sa ymeni body alebo order nacitaj nanovo tasky
    else if((props.body!==null && (this.props.body===null) ||this.props.order!==props.order|| JSON.stringify(this.props.body)!=JSON.stringify(props.body))){
    }
    //ak sa zmeni stranka, nacitaj tasky a zmen URL
    else if((this.props.page!=props.page)||(this.props.match.params.count!=props.match.params.count)||(this.props.updateAt!==props.updateAt)){
    }
  }

  render(){
    if(!this.props.statusesLoaded||
      !this.props.companiesLoaded||!this.props.taskAttributesLoaded||!this.props.tagsLoaded||!this.props.unitsLoaded||
      !this.props.usersLoaded||!this.props.sidebar){
        return null;
      }
      return <FilterLoader history={this.props.history} match={this.props.match} />
    }
}

  //all below is just redux storage

const mapStateToProps = ({tasksReducer, statusesReducer, companiesReducer,tagsReducer,taskAttributesReducer,unitsReducer, usersReducer,filtersReducer,sidebarReducer, login }) => {
  const {statusesLoaded, updateDate, taskStatuses } = statusesReducer;
  const {companiesLoaded, taskCompanies } = companiesReducer;
  const {tagsLoaded} = tagsReducer;
  const {taskAttributesLoaded, taskAttributes} = taskAttributesReducer;
  const {unitsLoaded} = unitsReducer;
  const {usersLoaded, users} = usersReducer;
  const { body, filterState, page, order, updateAt } = filtersReducer;
  const { sidebar } = sidebarReducer;
  const {token} = login;
  let projectsOnly = sidebar?sidebar.projects.children:[];
  let archived = sidebar?sidebar.archived.children:[];
  let tags = sidebar?sidebar.tags.children:[];
    return {statuses:taskStatuses,
      projects: (projectsOnly.concat(archived)),
      taskAttributesLoaded, taskAttributes, statusesLoaded,updateAt,
      statusesUpdateDate:updateDate,companiesLoaded,companies:taskCompanies,companiesUpdateDate:companiesReducer.updateDate,
      tagsLoaded,tags, unitsLoaded, usersLoaded,users, filterState,body,page,sidebar, order, token};
  };
import {startStatusesLoading,loadUnsavedFilter,addActiveRequests,
  getTaskStatuses, startCompaniesLoading,getTaskCompanies,
  startTaskAttributesLoading,getTaskAttributes,getTags,startTagsLoading,getProject,
  startUnitsLoading, getTaskUnits, deleteTaskSolvers, startUsersLoading, getUsers,
  clearErrorMessage, clearFilterTasks, getFilter, getUsersFilter,startFilterLoading, setFilterPage,
  setFilterBody
} from '../../redux/actions';

export default connect(mapStateToProps, {
  startStatusesLoading,loadUnsavedFilter,addActiveRequests,
  getTaskStatuses, startCompaniesLoading,getTaskCompanies,getProject,
  startTaskAttributesLoading,getTaskAttributes,getTags,startTagsLoading,
  startUnitsLoading, getTaskUnits, deleteTaskSolvers, startUsersLoading, getUsers,
  clearErrorMessage, clearFilterTasks, getFilter,getUsersFilter,startFilterLoading, setFilterPage,
  setFilterBody
})(Loader);
