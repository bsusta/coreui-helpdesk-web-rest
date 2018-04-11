import React, { Component } from "react";
import { connect } from 'react-redux';

import {startTaskLoading,startTaskProjectsLoading,startStatusesLoading,getTask,
  getStatuses,getTaskProjects,startCompaniesLoading,getCompanies,
startTasksAttributesLoading, getTasksAttributes,getTags, startTagsLoading,
 startUnitsLoading, getUnits, deleteTaskSolvers,
startUsersLoading, getUsers,startFollowersLoading, getFollowers,clearErrorMessage } from '../../redux/actions';
import EditTask from './EditTask';
import Loading from '../../components/Loading';

class EditTaskLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startTaskLoading();
    this.props.startTaskProjectsLoading();
    this.props.startStatusesLoading();
    this.props.startCompaniesLoading();
    this.props.startTasksAttributesLoading();
    this.props.startTagsLoading();
    this.props.startUnitsLoading();
    this.props.startUsersLoading();
    this.props.deleteTaskSolvers();
    this.props.startFollowersLoading();

    this.props.getTask(parseInt(this.props.match.params.id, 10),this.props.token);
    this.props.getStatuses(this.props.statusesUpdateDate,this.props.token);
    this.props.getTaskProjects(this.props.token);
    this.props.getCompanies(this.props.companiesUpdateDate,this.props.token);
    this.props.getTasksAttributes(this.props.token);
    this.props.getTags(this.props.token);
    this.props.getUnits(this.props.token);
    this.props.getUsers("",this.props.token);
    this.props.getFollowers(parseInt(this.props.match.params.id, 10),this.props.token);
  }

  render(){
    if(!this.props.taskLoaded||!this.props.taskProjectsLoaded||!this.props.statusesLoaded||
      !this.props.companiesLoaded||!this.props.taskAttributesLoaded||!this.props.tagsLoaded||!this.props.unitsLoaded||
    !this.props.usersLoaded||!this.props.followersLoaded){
      return(<Loading errorID={this.state.errorID}/>)
    }
    return <EditTask history={this.props.history} match={this.props.match}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({tasksReducer, statusesReducer, companiesReducer,tagsReducer,unitsReducer, usersReducer, followersReducer, login }) => {
  const {taskLoaded,taskProjectsLoaded, taskAttributesLoaded } = tasksReducer;
  const {statusesLoaded, updateDate } = statusesReducer;
  const {companiesLoaded } = companiesReducer;
  const {tagsLoaded} = tagsReducer;
  const {unitsLoaded} = unitsReducer;
  const {usersLoaded} = usersReducer;
  const {followersLoaded } = followersReducer;
  const {token} = login;
  return {taskLoaded,taskProjectsLoaded,taskAttributesLoaded, statusesLoaded, statusesUpdateDate:updateDate,companiesLoaded,companiesUpdateDate:companiesReducer.updateDate,tagsLoaded,unitsLoaded, usersLoaded,followersLoaded, token};
};


export default connect(mapStateToProps, {
  startTaskLoading,startTaskProjectsLoading,startStatusesLoading,getTask,
  getStatuses,getTaskProjects, startCompaniesLoading,getCompanies,
  startTasksAttributesLoading,getTasksAttributes,getTags,startTagsLoading,
  startUnitsLoading, getUnits, deleteTaskSolvers, startUsersLoading, getUsers,
  startFollowersLoading, getFollowers,clearErrorMessage})(EditTaskLoader);
