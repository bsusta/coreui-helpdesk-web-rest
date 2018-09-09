import React, { Component } from "react";
import { connect } from 'react-redux';

import {  startTaskLoading,startTaskProjectsLoading,startStatusesLoading,getTask,
  getTaskStatuses,getTaskProjects, startCompaniesLoading,getTaskCompanies,
  startTaskAttributesLoading,getTaskAttributes,getTags,startTagsLoading,
  startUnitsLoading, getTaskUnits, deleteTaskSolvers, startUsersLoading, getUsers,
  startFollowersLoading, getFollowers,clearErrorMessage,setActiveRequests,
  startCommentsLoading, getComments,startSubtasksLoading,getSubtasks,startItemsLoading,getItems,
  setRepeatLoaded,getRepeat} from '../../../redux/actions';
import EditTask from './EditTask';
import Loading from '../../../components/Loading';

class EditTaskLoader extends Component {
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
      this.props.setActiveRequests(12);
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
    this.props.getSubtasks(this.props.taskID,this.props.token);
    this.props.getItems(this.props.taskID,this.props.token);
    this.props.getComments(this.props.taskID,this.props.token);
    this.props.getTask(this.props.taskID,this.props.token);
    this.props.getFollowers(this.props.taskID,this.props.token);
    this.props.getRepeat(this.props.taskID,this.props.token);
  }

  render(){
    if(!this.props.disabled && (!this.props.taskLoaded||!this.props.taskProjectsLoaded||!this.props.statusesLoaded||
      !this.props.companiesLoaded||!this.props.taskAttributesLoaded||!this.props.tagsLoaded||!this.props.unitsLoaded||
      !this.props.usersLoaded||!this.props.followersLoaded||!this.props.commentsLoaded||
      !this.props.subtasksLoaded||!this.props.itemsLoaded||!this.props.repeatLoaded||
      this.props.task.id!==parseInt(this.props.taskID))||
      this.props.disabled && !this.props.taskLoaded||
      !this.props.commentsLoaded||!this.props.repeatLoaded||
        !this.props.subtasksLoaded||!this.props.itemsLoaded||
        !this.props.taskAttributesLoaded||!this.props.followersLoaded
    ){
      return null;
    }
    return <EditTask history={this.props.history} match={this.props.match} disabled={this.props.disabled?true:false} taskID={this.props.taskID} tripod={this.props.tripod}/>
  }
    componentWillReceiveProps(props){

      if(props.taskID!==this.props.taskID){
        if(!props.disabled){
          props.deleteTaskSolvers();
        }
        props.setRepeatLoaded(false);
        props.startTaskLoading();
        props.startCommentsLoading();
        props.startSubtasksLoading();
        props.startItemsLoading();
        props.startFollowersLoading();

        if(!props.disabled){
          props.setActiveRequests(12);
          props.getTaskStatuses(props.statusesUpdateDate,props.token);
          props.getTaskProjects(props.token);
          props.getTaskCompanies(props.companiesUpdateDate,props.token);
          props.getTags(props.token);
          props.getTaskUnits(props.token);
          props.getUsers("",props.token);
        }else{
          props.setActiveRequests(7);
        }
        props.getTaskAttributes(props.token);
        props.getSubtasks(props.taskID,props.token);
        props.getItems(props.taskID,props.token);
        props.getComments(props.taskID,props.token);
        props.getTask(props.taskID,props.token);
        props.getFollowers(props.taskID,props.token);
        props.getRepeat(props.taskID,props.token);
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
