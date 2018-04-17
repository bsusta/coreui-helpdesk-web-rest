import React, { Component } from "react";
import { connect } from 'react-redux';

import {startTaskProjectsLoading,startStatusesLoading,
  getStatuses,getTaskProjects,startCompaniesLoading,getCompanies,
startTasksAttributesLoading, getTasksAttributes,getTags, startTagsLoading,
 startUnitsLoading, getUnits, deleteTaskSolvers,
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
    this.props.startTasksAttributesLoading();
    this.props.startTagsLoading();
    this.props.startUnitsLoading();
    this.props.startUsersLoading();
    this.props.deleteTaskSolvers();

    this.props.getStatuses(this.props.statusesUpdateDate,this.props.token);
    this.props.getTaskProjects(this.props.token);
    this.props.getCompanies(this.props.companiesUpdateDate,this.props.token);
    this.props.getTasksAttributes(this.props.token);
    this.props.getTags(this.props.token);
    this.props.getUnits(this.props.token);
    this.props.getUsers("",this.props.token);
  }

  render(){
    if(!this.props.taskProjectsLoaded||!this.props.statusesLoaded||
      !this.props.companiesLoaded||!this.props.taskAttributesLoaded||!this.props.tagsLoaded||!this.props.unitsLoaded||
    !this.props.usersLoaded){
      return(<Loading errorID={this.state.errorID}/>)
    }
    return <AddTask history={this.props.history} match={this.props.match}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({tasksReducer, statusesReducer, companiesReducer,tagsReducer,unitsReducer, usersReducer, login }) => {
  const {taskProjectsLoaded, taskAttributesLoaded } = tasksReducer;
  const {statusesLoaded, updateDate } = statusesReducer;
  const {companiesLoaded } = companiesReducer;
  const {tagsLoaded} = tagsReducer;
  const {unitsLoaded} = unitsReducer;
  const {usersLoaded} = usersReducer;
  const {token} = login;

  return {taskProjectsLoaded,taskAttributesLoaded, statusesLoaded, statusesUpdateDate:updateDate,companiesLoaded,companiesUpdateDate:companiesReducer.updateDate,tagsLoaded,unitsLoaded, usersLoaded, token};
};


export default connect(mapStateToProps, {
  startTaskProjectsLoading,startStatusesLoading,
  getStatuses,getTaskProjects, startCompaniesLoading,getCompanies,
  startTasksAttributesLoading,getTasksAttributes,getTags,startTagsLoading,
  startUnitsLoading, getUnits, deleteTaskSolvers, startUsersLoading, getUsers,
  clearErrorMessage, clearTask})(AddTaskLoader);
