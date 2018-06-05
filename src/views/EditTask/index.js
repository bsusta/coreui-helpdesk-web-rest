import React, { Component } from "react";
import { connect } from 'react-redux';

import {startTaskLoading,startTaskProjectsLoading,startStatusesLoading,getTask,
  getTaskStatuses,getTaskProjects,startCompaniesLoading,getTaskCompanies,
startTaskAttributesLoading, getTaskAttributes,getTags, startTagsLoading,
 startUnitsLoading, getUnits, deleteTaskSolvers,startCommentsLoading, getComments,
startUsersLoading, getUsers,startFollowersLoading, getFollowers,clearErrorMessage,
startSubtasksLoading, getSubtasks,startItemsLoading,getItems,setActiveRequests } from '../../redux/actions';
import EditTask from './EditTask';
import Loading from '../../components/Loading';

class EditTaskLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
      taskID:this.props.match.params.task?parseInt(this.props.match.params.task, 10):this.props.taskID,
    }
  }
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startTaskLoading();
    this.props.startTaskProjectsLoading();
    this.props.startStatusesLoading();
    this.props.startCompaniesLoading();
    this.props.startTaskAttributesLoading();
    this.props.startTagsLoading();
    this.props.startUnitsLoading();
    this.props.startUsersLoading();
    this.props.deleteTaskSolvers();
    this.props.startFollowersLoading();
    this.props.startCommentsLoading();
    this.props.startSubtasksLoading();
    this.props.startItemsLoading();

    this.props.setActiveRequests(12);
    this.props.getSubtasks(this.state.taskID,this.props.token);
    this.props.getItems(this.state.taskID,this.props.token);
    this.props.getComments(this.state.taskID,this.props.token);
    this.props.getTask(this.state.taskID,this.props.token);
    this.props.getTaskStatuses(this.props.statusesUpdateDate,this.props.token);
    this.props.getTaskProjects(this.props.token);
    this.props.getTaskCompanies(this.props.companiesUpdateDate,this.props.token);
    this.props.getTaskAttributes(this.props.token);
    this.props.getTags(this.props.token);
    this.props.getUnits(this.props.token);
    this.props.getUsers("",this.props.token);
    this.props.getFollowers(this.state.taskID,this.props.token);
  }

  render(){
    if(!this.props.taskLoaded||!this.props.taskProjectsLoaded||!this.props.statusesLoaded||
      !this.props.companiesLoaded||!this.props.taskAttributesLoaded||!this.props.tagsLoaded||!this.props.unitsLoaded||
      !this.props.usersLoaded||!this.props.followersLoaded||!this.props.commentsLoaded||
      !this.props.subtasksLoaded||!this.props.itemsLoaded){
      return null;
    }
    return <EditTask history={this.props.history} match={this.props.match} taskID={this.state.taskID}/>
  }
}

//all below is just redux storage
const mapStateToProps = ({tasksReducer, statusesReducer, companiesReducer,commentsReducer,tagsReducer,unitsReducer, usersReducer, followersReducer, taskAttributesReducer,subtasksReducer,itemsReducer, login }) => {
  const {taskLoaded,taskProjectsLoaded } = tasksReducer;
  const {statusesLoaded, updateDate } = statusesReducer;
  const {companiesLoaded } = companiesReducer;
  const {tagsLoaded} = tagsReducer;
  const {taskAttributesLoaded} = taskAttributesReducer;
  const {unitsLoaded} = unitsReducer;
  const {usersLoaded} = usersReducer;
  const {followersLoaded } = followersReducer;
  const {commentsLoaded } = commentsReducer;
    const {subtasksLoaded } = subtasksReducer;
    const {itemsLoaded } = itemsReducer;
  const {token} = login;
  return {taskLoaded,taskProjectsLoaded,taskAttributesLoaded, statusesLoaded, statusesUpdateDate:updateDate,companiesLoaded,companiesUpdateDate:companiesReducer.updateDate,tagsLoaded,unitsLoaded, usersLoaded,followersLoaded,commentsLoaded,subtasksLoaded, itemsLoaded, token};
};


export default connect(mapStateToProps, {
  startTaskLoading,startTaskProjectsLoading,startStatusesLoading,getTask,
  getTaskStatuses,getTaskProjects, startCompaniesLoading,getTaskCompanies,
  startTaskAttributesLoading,getTaskAttributes,getTags,startTagsLoading,
  startUnitsLoading, getUnits, deleteTaskSolvers, startUsersLoading, getUsers,
  startFollowersLoading, getFollowers,clearErrorMessage,setActiveRequests,
  startCommentsLoading, getComments,startSubtasksLoading,getSubtasks,startItemsLoading,getItems})(EditTaskLoader);
