import React, { Component } from "react";
import { connect } from 'react-redux';

import {startSubtasksLoading, getSubtasks,startItemsLoading,getItems,clearErrorMessage } from '../../redux/actions';
import Loading from '../../components/Loading';
import Subtasks from './Subtasks';

class SubtasksLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startSubtasksLoading();
    this.props.startItemsLoading();
    this.props.getSubtasks(this.props.taskID,this.props.token);
    this.props.getItems(this.props.taskID,this.props.token);
  }

  render(){
    if(!this.props.subtasksLoaded||!this.props.itemsLoaded){
      return(<Loading errorID={this.state.errorID}/>)
    }
    return <Subtasks taskID={this.props.taskID} units={this.props.units}/>
  }
}

const mapStateToProps = ({subtasksReducer,itemsReducer, login }) => {
  const {subtasksLoaded } = subtasksReducer;
  const {itemsLoaded } = itemsReducer;
  const {token} = login;
  return {subtasksLoaded, itemsLoaded, token};
};


export default connect(mapStateToProps, {startSubtasksLoading,getSubtasks,startItemsLoading,getItems, clearErrorMessage})(SubtasksLoader);
