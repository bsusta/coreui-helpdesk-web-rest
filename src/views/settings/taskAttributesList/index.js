import React, { Component } from "react";
import { connect } from 'react-redux';

import {getTaskAttributes, startTaskAttributesLoading,clearErrorMessage, setActiveRequests } from '../../../redux/actions';
import TaskAttributesList from './taskAttributesList';


class TaskAttributesListLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all available taskAttributes
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startTaskAttributesLoading();
    this.props.setActiveRequests(1);
    this.props.getTaskAttributes(this.props.token);
  }
  render(){
    if(!this.props.taskAttributesLoaded){
      return null;
    }
    return <TaskAttributesList history={this.props.history} match={this.props.match}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({taskAttributesReducer, login }) => {
  const {taskAttributesLoaded} = taskAttributesReducer;
  const {token} = login;
  return {taskAttributesLoaded,token};
};


export default connect(mapStateToProps, {getTaskAttributes, startTaskAttributesLoading,clearErrorMessage, setActiveRequests})(TaskAttributesListLoader);
