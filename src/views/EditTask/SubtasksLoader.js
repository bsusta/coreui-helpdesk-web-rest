import React, { Component } from "react";
import { connect } from 'react-redux';

import {startSubtasksLoading, getSubtasks } from '../../redux/actions';
import Subtasks from './Subtasks';

class SubtasksLoader extends Component {
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.startSubtasksLoading();
    this.props.getSubtasks(this.props.taskID,this.props.token);
  }

  render(){
    if(!this.props.subtasksLoaded){
      return(<div>Loading...</div>)
    }
    return <Subtasks taskID={this.props.taskID}/>
  }
}

const mapStateToProps = ({subtasksReducer, login }) => {
  const {subtasksLoaded } = subtasksReducer;
  const {token} = login;
  return {subtasksLoaded, token};
};


export default connect(mapStateToProps, {startSubtasksLoading,getSubtasks})(SubtasksLoader);
