import React, { Component } from "react";
import { connect } from 'react-redux';

import {getImap, startImapLoading, getProjects, startProjectsLoading,clearErrorMessage } from '../../../redux/actions';
import ImapEdit from './ImapEdit';
import Loading from '../../../components/Loading';

class ImapEditLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startProjectsLoading();
    this.props.startImapLoading();  // first it sets, that unit hasnt been loaded
    this.props.getImap(this.props.token,parseInt(this.props.match.params.id, 10));  //send request for download and storing of the imap data
    this.props.getProjects(this.props.token);  //send request for download and storing of the projects data
  }
  render(){
    if(!this.props.imapLoaded||!this.props.projectsLoaded){ //data hasnt been loaded yet
      return(<Loading errorID={this.state.errorID}/>)
    }
    return <ImapEdit history={this.props.history}/>
  }
}

//All below is redux information storage
const mapStateToProps = ({imapsReducer, projectsReducer, login }) => {
  const {imapLoaded} = imapsReducer;
  const {projectsLoaded} = projectsReducer;
  const {token} = login;
  return {imapLoaded,projectsLoaded, token};
};

export default connect(mapStateToProps, {getImap, startImapLoading, getProjects, startProjectsLoading,clearErrorMessage})(ImapEditLoader);
