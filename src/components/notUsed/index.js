import React, { Component } from "react";
import { connect } from 'react-redux';

import {startTaskProjectsLoading,startStatusesLoading,loadUnsavedFilter,
getTaskStatuses,getTaskProjects, startCompaniesLoading,getTaskCompanies,
startTaskAttributesLoading,getTaskAttributes,getTags,startTagsLoading,
startUnitsLoading, getUnits, deleteTaskSolvers, startUsersLoading, getUsers,
clearErrorMessage, clearFilterTasks, getFilter, setFilterPage } from '../../redux/actions';
import FilterLoader from './FilterLoader';

class Loader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }

  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startTaskProjectsLoading();
    this.props.startStatusesLoading();
    this.props.startCompaniesLoading();
    this.props.startTaskAttributesLoading();
    this.props.startTagsLoading();
    this.props.startUnitsLoading();
    this.props.startUsersLoading();
    this.props.deleteTaskSolvers();
    this.props.getTaskStatuses(this.props.statusesUpdateDate,this.props.token);
    this.props.getTaskProjects(this.props.token);
    this.props.getTaskCompanies(this.props.companiesUpdateDate,this.props.token);
    this.props.getTaskAttributes(this.props.token);
    this.props.getTags(this.props.token);
    this.props.getUnits(this.props.token);
    this.props.getUsers("",this.props.token);

    this.props.setFilterPage(this.props.match.params?this.props.match.params.page:1);
  }

  componentWillReceiveProps(props){
    if(props.body!==null && (this.props.body===null || JSON.stringify(this.props.body)!=JSON.stringify(props.body))){
      let randomFloat= Math.random();
      this.setState({randomFloat,id:parseInt(props.match.params.id, 10)});
      this.props.clearErrorMessage(randomFloat);
      this.props.loadUnsavedFilter(props.match.params.count?props.match.params.count:20,props.page,props.body,props.token);
      this.props.setFilterPage(1);
      this.props.history.push(
        '/filter/'+(props.match.params.id?
          (props.match.params.id+'/1,'+(props.match.params.count?props.match.params.count:20)):
          ('1,'+(props.match.params.count?props.match.params.count:20))
        ));
      }
    else if((this.props.page!=props.page && props.body!==null )||(this.props.match.params.count!=props.match.params.count && props.body!==null)){
      let randomFloat= Math.random();
      this.setState({randomFloat,id:parseInt(props.match.params.id, 10)});
      this.props.clearErrorMessage(randomFloat);
      this.props.loadUnsavedFilter(props.match.params.count?props.match.params.count:20,props.page,props.body,props.token);
      this.props.history.push(
        '/filter/'+(props.match.params.id?
          (props.match.params.id+'/'+props.page+','+(props.match.params.count?props.match.params.count:20)):
          (props.page+','+(props.match.params.count?props.match.params.count:20))
        ));
    }
  }

  render(){
    if(!this.props.taskProjectsLoaded||!this.props.statusesLoaded||
      !this.props.companiesLoaded||!this.props.taskAttributesLoaded||!this.props.tagsLoaded||!this.props.unitsLoaded||
    !this.props.usersLoaded){
      return(<Loading errorID={this.state.errorID} history={this.props.history}/>)
    }
    return <FilterLoader history={this.props.history} match={this.props.match} />
  }
}

//all below is just redux storage

const mapStateToProps = ({tasksReducer, statusesReducer, companiesReducer,tagsReducer,taskAttributesReducer,unitsReducer, usersReducer,filtersReducer, login }) => {
  const {taskProjectsLoaded, taskProjects } = tasksReducer;
  const {statusesLoaded, updateDate, taskStatuses } = statusesReducer;
  const {companiesLoaded } = companiesReducer;
  const {tagsLoaded, tags} = tagsReducer;
  const {taskAttributesLoaded, taskAttributes} = taskAttributesReducer;
  const {unitsLoaded} = unitsReducer;
  const {usersLoaded, users} = usersReducer;
  const { body, filterState, page } = filtersReducer;
  const {token} = login;

  return {statuses:taskStatuses,projects:taskProjects,taskProjectsLoaded,taskAttributesLoaded, taskAttributes, statusesLoaded,
    statusesUpdateDate:updateDate,companiesLoaded,companiesUpdateDate:companiesReducer.updateDate,
    tagsLoaded,tags, unitsLoaded, usersLoaded,users, filterState,body,page, token};
};


export default connect(mapStateToProps, {
  startTaskProjectsLoading,startStatusesLoading,loadUnsavedFilter,
  getTaskStatuses,getTaskProjects, startCompaniesLoading,getTaskCompanies,
  startTaskAttributesLoading,getTaskAttributes,getTags,startTagsLoading,
  startUnitsLoading, getUnits, deleteTaskSolvers, startUsersLoading, getUsers,
  clearErrorMessage, clearFilterTasks, getFilter, setFilterPage})(Loader);
