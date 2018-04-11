import React, { Component } from "react";
import { connect } from 'react-redux';

import {getProjects, startProjectsLoading,clearErrorMessage } from '../../../redux/actions';
import ImapAdd from './imapAdd';
import Loading from '../../../components/Loading';

class ImapAddLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all available users
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startProjectsLoading();
    this.props.getProjects(this.props.token);
  }
  render(){
    if(!this.props.projectsLoaded){
      return(<Loading errorID={this.state.errorID}/>)
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


export default connect(mapStateToProps, {getProjects, startProjectsLoading,clearErrorMessage })(ImapAddLoader);
