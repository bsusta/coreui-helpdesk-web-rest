import React, { Component } from "react";
import { connect } from 'react-redux';

import {getProject, startProjectLoading , getUsers, startUsersLoading,clearErrorMessage, setActiveRequests} from '../../redux/actions';
import ProjectEdit from './ProjectEdit';
import Loading from '../../components/Loading';

class ProjectEditLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startProjectLoading();  // first it sets, that project hasnt been loaded
    this.props.startUsersLoading();
    this.props.setActiveRequests(2);
    this.props.getProject(parseInt(this.props.match.params.id, 10),this.props.history,this.props.token);  //send request for download and storing of the projects data
    this.props.getUsers(this.props.updateDate,this.props.token);
  }

  componentWillReceiveProps(props){
    if(this.props.match.params.id!==props.match.params.id){
      this.props.setActiveRequests(1);
      this.props.startProjectLoading();  // first it sets, that project hasnt been loaded
      this.props.getProject(parseInt(props.match.params.id, 10),this.props.history,this.props.token);  //send request for download and storing of the projects data
    }
  }

  render(){
    if(!this.props.projectLoaded||!this.props.usersLoaded){ //data hasnt been loaded yet
    return null;
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

export default connect(mapStateToProps, {getProject, getUsers,startUsersLoading, startProjectLoading,clearErrorMessage, setActiveRequests})(ProjectEditLoader);
