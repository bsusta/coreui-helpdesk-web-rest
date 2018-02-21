import React, { Component } from "react";
import { connect } from 'react-redux';

import {getTaskAttribute, startTaskAttributeLoading } from '../../../redux/actions';
import TaskAttributeEdit from './taskAttributeEdit';

class TaskAttributeEditLoader extends Component {
  componentWillMount(){
    this.props.startTaskAttributeLoading();  // first it sets, that task attribute hasnt been loaded
    this.props.getTaskAttribute(parseInt(this.props.match.params.id, 10),this.props.token);  //send request for download and storing of the task attributes data
  }
  render(){
    if(!this.props.taskAttributeLoaded){ //data hasnt been loaded yet
      return(<div>Loading...</div>)
    }
    return <TaskAttributeEdit history={this.props.history}/>
  }
}

//All below is redux information storage
const mapStateToProps = ({taskAttributesReducer, login }) => {
  const {taskAttributeLoaded} = taskAttributesReducer;
  const {token} = login;
  return {taskAttributeLoaded,token};
};

export default connect(mapStateToProps, {getTaskAttribute, startTaskAttributeLoading})(TaskAttributeEditLoader);
