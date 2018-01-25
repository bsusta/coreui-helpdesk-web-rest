import React, { Component } from "react";
import { connect } from 'react-redux';

import {getProjects, startProjectsLoading } from '../../../redux/actions';
import ImapAdd from './imapAdd';

class ImapAddLoader extends Component {
  //before loader page is loaded, we send requests to get all available users
  componentWillMount(){
    this.props.startProjectsLoading();
    this.props.getProjects(this.props.token);
  }
  render(){
    if(!this.props.projectsLoaded){
      return(<div>Loading...</div>)
    }
    return <ImapAdd history={this.props.history}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({ projectsReducer, login }) => {
  const {projectsLoaded} = projectsReducer;
  const {token} = login;
  return {token,projectsLoaded};
};


export default connect(mapStateToProps, {getProjects, startProjectsLoading })(ImapAddLoader);
