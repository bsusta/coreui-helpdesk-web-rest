import React, { Component } from "react";
import { connect } from 'react-redux';

import {  startFollowersLoading,getFollowers,
  startTaskLoading,startCommentsLoading,startSubtasksLoading,startItemsLoading,
  setActiveRequests,getSubtasks,getItems,getComments,getTask, getTaskAttributes } from '../../redux/actions';
import ViewTask from './ViewTask';
import Loading from '../../components/Loading';

class ViewTaskLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      taskID:this.props.match.params.taskID?parseInt(this.props.match.params.taskID, 10):this.props.taskID,
    }
  }
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.startTaskLoading();
    this.props.startCommentsLoading();
    this.props.startSubtasksLoading();
    this.props.startItemsLoading();
    this.props.startFollowersLoading();

    this.props.setActiveRequests(4);
    this.props.getSubtasks(this.state.taskID,this.props.token);
    this.props.getItems(this.state.taskID,this.props.token);
    this.props.getComments(this.state.taskID,this.props.token);
    this.props.getTask(this.state.taskID,this.props.token);
    this.props.getFollowers(this.state.taskID,this.props.token);
    this.props.getTaskAttributes(this.props.token);
  }

  render(){
    if(!this.props.taskLoaded||!this.props.commentsLoaded||
      !this.props.subtasksLoaded||!this.props.itemsLoaded||
      !this.props.taskAttributesLoaded||!this.props.followersLoaded){
      return null;
    }
    return <ViewTask history={this.props.history} match={this.props.match} taskID={this.state.taskID}/>
  }
}

//all below is just redux storage
const mapStateToProps = ({tasksReducer, statusesReducer, companiesReducer,commentsReducer,tagsReducer,unitsReducer, usersReducer, followersReducer, taskAttributesReducer,subtasksReducer,itemsReducer, login }) => {
  const {taskLoaded } = tasksReducer;
  const {commentsLoaded } = commentsReducer;
  const {subtasksLoaded } = subtasksReducer;
  const {itemsLoaded } = itemsReducer;
  const {followersLoaded } = followersReducer;
  const {taskAttributesLoaded} = taskAttributesReducer;
  const {token} = login;

  return {taskLoaded,commentsLoaded,subtasksLoaded, itemsLoaded,followersLoaded, taskAttributesLoaded,token };
};


export default connect(mapStateToProps, {
  startFollowersLoading,getFollowers,
  startTaskLoading,startCommentsLoading,startSubtasksLoading,startItemsLoading,
    setActiveRequests,getSubtasks,getItems,getComments,getTask, getTaskAttributes})(ViewTaskLoader);
