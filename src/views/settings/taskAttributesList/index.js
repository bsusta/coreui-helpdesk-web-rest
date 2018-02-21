import React, { Component } from "react";
import { connect } from 'react-redux';

import {getTaskAttributes, startTaskAttributesLoading } from '../../../redux/actions';
import TaskAttributesList from './taskAttributesList';

class TaskAttributesListLoader extends Component {
  //before loader page is loaded, we send requests to get all available taskAttributes
  componentWillMount(){
    this.props.startTaskAttributesLoading();
    this.props.getTaskAttributes(this.props.token);
  }
  render(){
    if(!this.props.taskAttributesLoaded){
      return(<div>Loading...</div>)
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


export default connect(mapStateToProps, {getTaskAttributes, startTaskAttributesLoading})(TaskAttributesListLoader);
