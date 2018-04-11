import React, { Component } from "react";
import { connect } from 'react-redux';

import {getTaskAttributes, startTaskAttributesLoading,clearErrorMessage } from '../../../redux/actions';
import TaskAttributesList from './taskAttributesList';
import Loading from '../../../components/Loading';

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
    this.props.getTaskAttributes(this.props.token);
  }
  render(){
    if(!this.props.taskAttributesLoaded){
      return(<Loading errorID={this.state.errorID}/>)
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


export default connect(mapStateToProps, {getTaskAttributes, startTaskAttributesLoading,clearErrorMessage})(TaskAttributesListLoader);
