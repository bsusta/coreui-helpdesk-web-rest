import React, { Component } from "react";
import { connect } from 'react-redux';

import {getProject, startProjectLoading , getUsers, startUsersLoading} from '../../redux/actions';
import ProjectEdit from './ProjectEdit';

class ProjectEditLoader extends Component {
  componentWillMount(){
    this.props.startProjectLoading();  // first it sets, that project hasnt been loaded
    this.props.startUsersLoading();
    this.props.getProject(parseInt(this.props.match.params.id, 10),this.props.token);  //send request for download and storing of the projects data
    this.props.getUsers(this.props.updateDate,this.props.token);
  }
  render(){
    if(!this.props.projectLoaded||!this.props.usersLoaded){ //data hasnt been loaded yet
      return(<div>Loading...</div>)
    }
    return <ProjectEdit history={this.props.history}/>
  }
}

//All below is redux information storage
const mapStateToProps = ({projectsReducer,usersReducer, login }) => {
  const {projectLoaded} = projectsReducer;
  const {token} = login;
  const {usersLoaded, updateDate} = usersReducer;
  return {projectLoaded,usersLoaded,token};
};

export default connect(mapStateToProps, {getProject, getUsers,startUsersLoading, startProjectLoading})(ProjectEditLoader);
