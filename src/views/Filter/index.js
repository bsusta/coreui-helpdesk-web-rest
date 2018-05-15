import React, { Component } from "react";
import { connect } from 'react-redux';

import {startTaskProjectsLoading,startStatusesLoading,setFilterHide,
  getTaskStatuses,getTaskProjects,startCompaniesLoading,getTaskCompanies,
startTaskAttributesLoading, getTaskAttributes,getTags, startTagsLoading,
 startUnitsLoading, getUnits, deleteTaskSolvers,loadUnsavedFilter,
startUsersLoading, getUsers,clearErrorMessage, clearFilterTasks,setCanUpdate,
startFilterLoading, getFilter } from '../../redux/actions';
import Tasks from './Tasks';
import Loading from '../../components/Loading';

class FilterLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
      filterID:this.props.body?JSON.stringify(this.props.originalBody):null,
      count:this.props.match.params.count?parseInt(this.props.match.params.count, 10):20,
      page:this.props.match.params.page?parseInt(this.props.match.params.page, 10):1,
      id:this.props.match.params.id?parseInt(this.props.match.params.id, 10):null,
    }
    console.log(this.state);
  }
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    if(!this.props.originalBody){
      this.props.clearFilterTasks();
    }
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startTaskProjectsLoading();
    this.props.startStatusesLoading();
    this.props.startCompaniesLoading();
    this.props.startTaskAttributesLoading();
    this.props.startTagsLoading();
    this.props.startUnitsLoading();
    this.props.startUsersLoading();
    this.props.deleteTaskSolvers();
    if(this.props.match.params.id){
      this.props.startFilterLoading();
      this.props.getFilter(this.props.match.params.id,this.props.token);
    }
    this.props.setFilterHide(false);
    this.props.getTaskStatuses(this.props.statusesUpdateDate,this.props.token);
    this.props.getTaskProjects(this.props.token);
    this.props.getTaskCompanies(this.props.companiesUpdateDate,this.props.token);
    this.props.getTaskAttributes(this.props.token);
    this.props.getTags(this.props.token);
    this.props.getUnits(this.props.token);
    this.props.getUsers("",this.props.token);
  }

  render(){
    if(!this.props.taskProjectsLoaded||!this.props.statusesLoaded||
      !this.props.companiesLoaded||!this.props.taskAttributesLoaded||!this.props.tagsLoaded||!this.props.unitsLoaded||
    !this.props.usersLoaded||(this.props.match.params.id&&!this.props.filterLoaded)){
      return(<Loading errorID={this.state.errorID} history={this.props.history}/>)
    }
    return <Tasks history={this.props.history} match={this.props.match} />
  }
}

//all below is just redux storage

const mapStateToProps = ({tasksReducer, statusesReducer, companiesReducer,tagsReducer,taskAttributesReducer,unitsReducer, usersReducer,filtersReducer, login }) => {
  const {taskProjectsLoaded } = tasksReducer;
  const {statusesLoaded, updateDate } = statusesReducer;
  const {companiesLoaded } = companiesReducer;
  const {tagsLoaded} = tagsReducer;
  const {taskAttributesLoaded} = taskAttributesReducer;
  const {unitsLoaded} = unitsReducer;
  const {usersLoaded} = usersReducer;
  const { body, originalBody, filterLoaded, hideFilter, canUpdate } = filtersReducer;
  const {token} = login;

  return {taskProjectsLoaded,taskAttributesLoaded, statusesLoaded,hideFilter,
    statusesUpdateDate:updateDate,companiesLoaded,companiesUpdateDate:companiesReducer.updateDate,
    tagsLoaded,unitsLoaded, usersLoaded,originalBody,body, filterLoaded,canUpdate, token};
};


export default connect(mapStateToProps, {
  startTaskProjectsLoading,startStatusesLoading,loadUnsavedFilter,setFilterHide,
  getTaskStatuses,getTaskProjects, startCompaniesLoading,getTaskCompanies,
  startTaskAttributesLoading,getTaskAttributes,getTags,startTagsLoading,setCanUpdate,
  startUnitsLoading, getUnits, deleteTaskSolvers, startUsersLoading, getUsers,
  clearErrorMessage, clearFilterTasks,startFilterLoading, getFilter})(FilterLoader);
