import React, { Component } from "react";
import { connect } from 'react-redux';

import {getProject, startProjectLoading } from '../../redux/actions';
import ProjectInfo from './ProjectInfo';

class ProjectInfoLoader extends Component {
  componentWillMount(){
    this.props.startProjectLoading();  // first it sets, that project hasnt been loaded
    this.props.getProject(parseInt(this.props.match.params.id, 10),this.props.token);  //send request for download and storing of the projects data
  }
  render(){
    if(!this.props.projectLoaded){ //data hasnt been loaded yet
      return(<div>Loading...</div>)
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

export default connect(mapStateToProps, {getProject, startProjectLoading})(ProjectInfoLoader);
