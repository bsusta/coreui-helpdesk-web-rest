import React, { Component } from "react";
import { connect } from 'react-redux';

import {startTaskProjectsLoading,startStatusesLoading,
  getTaskStatuses,getTaskProjects,startCompaniesLoading,getTaskCompanies,
startTaskAttributesLoading, getTaskAttributes,getTags, startTagsLoading,
 startUnitsLoading, getTaskUnits, deleteTaskSolvers,setActiveRequests,
startUsersLoading, getUsers,clearErrorMessage, clearTask } from '../../redux/actions';
import AddTask from './AddTask';
import Loading from '../../components/Loading';

class AddTaskLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.clearTask();
    this.props.startTaskProjectsLoading();
    this.props.startStatusesLoading();
    this.props.startCompaniesLoading();
    this.props.startTaskAttributesLoading();
    this.props.startTagsLoading();
    this.props.startUnitsLoading();
    this.props.startUsersLoading();
    this.props.deleteTaskSolvers();

    this.props.setActiveRequests(7);
    this.props.getTaskStatuses(this.props.statusesUpdateDate,this.props.token);
    this.props.getTaskProjects(this.props.token);
    this.props.getTaskCompanies(this.props.companiesUpdateDate,this.props.token);
    this.props.getTaskAttributes(this.props.token);
    this.props.getTags(this.props.token);
    this.props.getTaskUnits(this.props.token);
    this.props.getUsers("",this.props.token);
  }

  render(){
    //check if everything is loaded
    if(!this.props.taskProjectsLoaded||!this.props.statusesLoaded||
      !this.props.companiesLoaded||!this.props.taskAttributesLoaded||!this.props.tagsLoaded||!this.props.unitsLoaded||
    !this.props.usersLoaded){
    return null;
    }
    return <AddTask history={this.props.history} match={this.props.match}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({tasksReducer, statusesReducer, companiesReducer,tagsReducer,taskAttributesReducer,unitsReducer, usersReducer, login }) => {
  const {taskProjectsLoaded } = tasksReducer;
  const {statusesLoaded, updateDate } = statusesReducer;
  const {companiesLoaded } = companiesReducer;
  const {tagsLoaded} = tagsReducer;
  const {taskAttributesLoaded} = taskAttributesReducer;
  const {unitsLoaded} = unitsReducer;
  const {usersLoaded} = usersReducer;
  const {token} = login;

  return {taskProjectsLoaded,taskAttributesLoaded, statusesLoaded, statusesUpdateDate:updateDate,companiesLoaded,companiesUpdateDate:companiesReducer.updateDate,tagsLoaded,unitsLoaded, usersLoaded, token};
};


export default connect(mapStateToProps, {
  startTaskProjectsLoading,startStatusesLoading,
  getTaskStatuses,getTaskProjects, startCompaniesLoading,getTaskCompanies,
  startTaskAttributesLoading,getTaskAttributes,getTags,startTagsLoading,setActiveRequests,
  startUnitsLoading, getTaskUnits, deleteTaskSolvers, startUsersLoading, getUsers,
  clearErrorMessage, clearTask})(AddTaskLoader);
