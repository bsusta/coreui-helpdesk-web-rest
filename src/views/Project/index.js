import React, { Component } from "react";
import { connect } from 'react-redux';

import {getProjectTasks, startProjectTasksLoading,clearErrorMessage,startProjectLoading,getProject,  } from '../../redux/actions';
import Loading from '../../components/Loading';
import Project from './ProjectContainer';

class ProjectLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startProjectTasksLoading();
    this.props.startProjectLoading();
    this.props.getProject(parseInt(this.props.match.params.id, 10),this.props.token);
    this.props.getProjectTasks(this.props.match.params.count?parseInt(this.props.match.params.count, 10):20,this.props.match.params.page?parseInt(this.props.match.params.page, 10):1,this.props.token,parseInt(this.props.match.params.id, 10));
  }
  componentDidUpdate(){
    if(this.props.projectID!==parseInt(this.props.match.params.id, 10) && this.props.projectTasksLoaded){
      this.props.clearErrorMessage(this.state.randomFloat);
      this.props.startProjectTasksLoading();
      this.props.getProjectTasks(this.props.match.params.count?parseInt(this.props.match.params.count, 10):20,this.props.match.params.page?parseInt(this.props.match.params.page, 10):1,this.props.token,parseInt(this.props.match.params.id, 10));
    }
  }

  render(){
    if(!this.props.projectTasksLoaded||!this.props.projectLoaded){
      return(<Loading errorID={this.state.errorID} history={this.props.history}/>)
    }
    return <Project history={this.props.history} match={this.props.match}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({tasksReducer,projectsReducer, login }) => {
  const {projectTasksLoaded} = tasksReducer;
  const {projectLoaded} = projectsReducer;
  const {token} = login;
  return {projectTasksLoaded,projectID:tasksReducer.projectLinks?tasksReducer.projectLinks.id:null,token, projectLoaded};
};


export default connect(mapStateToProps, {getProjectTasks, startProjectTasksLoading,clearErrorMessage,startProjectLoading,getProject})(ProjectLoader);
