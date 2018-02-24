import React, { Component } from "react";
import { connect } from 'react-redux';

import {getProjectTasks, startProjectTasksLoading } from '../../redux/actions';
import Project from './Project';

class ProjectLoader extends Component {
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.startProjectTasksLoading();
    this.props.getProjectTasks(this.props.match.params.count?parseInt(this.props.match.params.count, 10):20,this.props.match.params.page?parseInt(this.props.match.params.page, 10):1,this.props.token,parseInt(this.props.match.params.id, 10));
  }
  componentDidUpdate(){
    if(this.props.projectID!==parseInt(this.props.match.params.id, 10) && this.props.projectTasksLoaded){
      this.props.startProjectTasksLoading();
      this.props.getProjectTasks(this.props.match.params.count?parseInt(this.props.match.params.count, 10):20,this.props.match.params.page?parseInt(this.props.match.params.page, 10):1,this.props.token,parseInt(this.props.match.params.id, 10));
    }
  }

  render(){
    if(!this.props.projectTasksLoaded){
      return(<div>Loading...</div>)
    }
    return <Project history={this.props.history} match={this.props.match}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({tasksReducer, login }) => {
  const {projectTasksLoaded} = tasksReducer;
  const {token} = login;
  return {projectTasksLoaded,projectID:tasksReducer.projectLinks?tasksReducer.projectLinks.id:null,token};
};


export default connect(mapStateToProps, {getProjectTasks, startProjectTasksLoading})(ProjectLoader);
