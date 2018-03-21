import React, { Component } from "react";
import { connect } from 'react-redux';

import {getTask, startTaskLoading } from '../../redux/actions';
import EditTask from './EditTask';

class EditTaskLoader extends Component {
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.startTaskLoading();
    this.props.getTask(parseInt(this.props.match.params.id, 10),this.props.token);
  }

  render(){
    if(!this.props.taskLoaded){
      return(<div>Loading...</div>)
    }
    return <EditTask history={this.props.history} match={this.props.match}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({tasksReducer, login }) => {
  const {taskLoaded} = tasksReducer;
  const {token} = login;
  return {taskLoaded,token};
};


export default connect(mapStateToProps, {getTask, startTaskLoading})(EditTaskLoader);
