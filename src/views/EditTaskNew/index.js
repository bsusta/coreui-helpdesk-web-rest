import React, { Component } from "react";
import { connect } from 'react-redux';

import {  startTaskLoading,startTaskProjectsLoading,startStatusesLoading,getTask,
  getTaskStatuses,getTaskProjects, startCompaniesLoading,getTaskCompanies,
  startTaskAttributesLoading,getTaskAttributes,getTags,startTagsLoading,
  startUnitsLoading, getTaskUnits, deleteTaskSolvers, startUsersLoading, getUsers,
  startFollowersLoading, getFollowers,clearErrorMessage,setActiveRequests,
  startCommentsLoading, getComments,startSubtasksLoading,getSubtasks,startItemsLoading,getItems,
  setRepeatLoaded,getRepeat} from '../../redux/actions';
import EditTask from './EditTask';

class EditTaskLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
      taskID:this.props.match.params.taskID?parseInt(this.props.match.params.taskID, 10):this.props.taskID,
    }
  }
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    if(!this.props.disabled){
      this.props.deleteTaskSolvers();
    }
    this.props.setRepeatLoaded(false);
    this.props.startTaskLoading();
    this.props.startCommentsLoading();
    this.props.startSubtasksLoading();
    this.props.startItemsLoading();
    this.props.startFollowersLoading();
    if(!this.props.disabled){
      this.props.setActiveRequests(13);
      this.props.getTaskStatuses(this.props.statusesUpdateDate,this.props.token);
      this.props.getTaskProjects(this.props.token);
      this.props.getTaskCompanies(this.props.companiesUpdateDate,this.props.token);
      this.props.getTags(this.props.token);
      this.props.getTaskUnits(this.props.token);
      this.props.getUsers("",this.props.token);
    }else{
      this.props.setActiveRequests(7);
    }
    this.props.getTaskAttributes(this.props.token);
    this.props.getSubtasks(this.state.taskID,this.props.token);
    this.props.getItems(this.state.taskID,this.props.token);
    this.props.getComments(this.state.taskID,this.props.token);
    this.props.getTask(this.state.taskID,this.props.token);
    this.props.getFollowers(this.state.taskID,this.props.token);
    this.props.getRepeat(this.state.taskID,this.props.token);
  }

  render(){
    if(!this.props.disabled && (!this.props.taskLoaded||!this.props.taskProjectsLoaded||!this.props.statusesLoaded||
      !this.props.companiesLoaded||!this.props.taskAttributesLoaded||!this.props.tagsLoaded||!this.props.unitsLoaded||
      !this.props.usersLoaded||!this.props.followersLoaded||!this.props.commentsLoaded||
      !this.props.subtasksLoaded||!this.props.itemsLoaded||!this.props.repeatLoaded||
      this.props.task.id!==parseInt(this.state.taskID))||
      this.props.disabled && !this.props.taskLoaded||
      !this.props.commentsLoaded||!this.props.repeatLoaded||
        !this.props.subtasksLoaded||!this.props.itemsLoaded||
        !this.props.taskAttributesLoaded||!this.props.followersLoaded
    ){
      return null;
    }
    return <EditTask history={this.props.history} match={this.props.match} disabled={this.props.disabled?true:false} taskID={this.state.taskID} tripod={this.props.tripod}/>
  }
    componentWillReceiveProps(props){
      let oldTaskID=this.props.match.params.taskID?parseInt(this.props.match.params.taskID, 10):this.props.taskID;
      let newTaskID=props.match.params.taskID?parseInt(props.match.params.taskID, 10):props.taskID;
      if(oldTaskID!==newTaskID){
        this.setState({taskID:newTaskID?parseInt(newTaskID, 10):props.taskID});
        props.deleteTaskSolvers();
        props.startSubtasksLoading();
        props.startItemsLoading();
        props.startCommentsLoading();
        props.startTaskLoading();
        props.startFollowersLoading();
        props.setRepeatLoaded(false);
        if(newTaskID){
          props.setActiveRequests(13);
          props.getSubtasks(newTaskID,props.token);
          props.getItems(newTaskID,props.token);
          props.getComments(newTaskID,props.token);
          props.getTask(newTaskID,props.token);
          props.getTaskStatuses(props.statusesUpdateDate,props.token);
          props.getTaskProjects(props.token);
          props.getTaskCompanies(props.companiesUpdateDate,props.token);
          props.getTaskAttributes(props.token);
          props.getTags(props.token);
          props.getTaskUnits(props.token);
          props.getUsers("",props.token);
          props.getFollowers(newTaskID,props.token);
          props.getRepeat(newTaskID,props.token);
        }
      }
    }
}

//all below is just redux storage
const mapStateToProps = ({tasksReducer, statusesReducer, companiesReducer,commentsReducer,tagsReducer,unitsReducer, usersReducer, followersReducer, taskAttributesReducer,subtasksReducer,itemsReducer, login }) => {
  const {taskLoaded,taskProjectsLoaded, repeatLoaded,task } = tasksReducer;
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
  return {taskLoaded,taskProjectsLoaded,task,repeatLoaded,taskAttributesLoaded, statusesLoaded, statusesUpdateDate:updateDate,companiesLoaded,companiesUpdateDate:companiesReducer.updateDate,tagsLoaded,unitsLoaded, usersLoaded,followersLoaded,commentsLoaded,subtasksLoaded, itemsLoaded, token};
};


export default connect(mapStateToProps, {
  startTaskLoading,startTaskProjectsLoading,startStatusesLoading,getTask,
  getTaskStatuses,getTaskProjects, startCompaniesLoading,getTaskCompanies,
  startTaskAttributesLoading,getTaskAttributes,getTags,startTagsLoading,
  startUnitsLoading, getTaskUnits, deleteTaskSolvers, startUsersLoading, getUsers,
  startFollowersLoading, getFollowers,clearErrorMessage,setActiveRequests,
  startCommentsLoading, getComments,startSubtasksLoading,getSubtasks,startItemsLoading,getItems,
  setRepeatLoaded,getRepeat})(EditTaskLoader);
