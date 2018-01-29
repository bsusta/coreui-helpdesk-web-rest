import React, { Component } from "react";
import { connect } from 'react-redux';

import {getUserRoles, startUserRolesLoading } from '../../../redux/actions';
import RolesList from './rolesList';

class RolesListLoader extends Component {
  //before loader page is loaded, we send requests to get all available users
  componentWillMount(){
    this.props.startUserRolesLoading();
    this.props.getUserRoles(this.props.token);
  }
  render(){
    if(!this.props.userRolesLoaded){
      return(<div>Loading...</div>)
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


export default connect(mapStateToProps, {getUserRoles, startUserRolesLoading})(RolesListLoader);
