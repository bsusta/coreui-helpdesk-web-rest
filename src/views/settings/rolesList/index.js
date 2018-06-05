import React, { Component } from "react";
import { connect } from 'react-redux';

import {getUserRoles, startUserRolesLoading,clearErrorMessage, setActiveRequests } from '../../../redux/actions';
import RolesList from './rolesList';
import Loading from '../../../components/Loading';

class RolesListLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all available users
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startUserRolesLoading();
    this.props.setActiveRequests(1);
    this.props.getUserRoles(this.props.token);
  }
  render(){
    if(!this.props.userRolesLoaded){
      return null;
    }
    return <RolesList history={this.props.history} match={this.props.match}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({userRolesReducer, login }) => {
  const {userRolesLoaded} = userRolesReducer;
  const {token} = login;
  return {userRolesLoaded,token};
};


export default connect(mapStateToProps, {getUserRoles, startUserRolesLoading,clearErrorMessage, setActiveRequests})(RolesListLoader);
