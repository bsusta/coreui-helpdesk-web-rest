import React, { Component } from "react";
import { connect } from 'react-redux';

import {getProject, startProjectLoading,clearErrorMessage, setActiveRequests } from '../../redux/actions';
import ProjectInfo from './projectInfo';

class ProjectInfoLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startProjectLoading();  // first it sets, that project hasnt been loaded
    this.props.setActiveRequests(1);
    this.props.getProject(parseInt(this.props.match.params.id, 10),this.props.history,this.props.token);  //send request for download and storing of the projects data
  }
  componentWillReceiveProps(props){
    if(this.props.match.params.id!==props.match.params.id){
      this.props.setActiveRequests(1);
      this.props.startProjectLoading();  // first it sets, that project hasnt been loaded
      this.props.getProject(parseInt(props.match.params.id, 10),this.props.history,this.props.token);  //send request for download and storing of the projects data
    }
  }

  render(){
    if(!this.props.projectLoaded){ //data hasnt been loaded yet
    return null;
    }
    return <ProjectInfo history={this.props.history}/>
  }
}

//All below is redux information storage
const mapStateToProps = ({projectsReducer, login }) => {
  const {projectLoaded} = projectsReducer;
  const {token} = login;
  return {projectLoaded,token};
};

export default connect(mapStateToProps, {getProject, startProjectLoading,clearErrorMessage, setActiveRequests})(ProjectInfoLoader);
