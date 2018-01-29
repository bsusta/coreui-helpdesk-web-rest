import React, { Component } from "react";
import { connect } from 'react-redux';

import {getUserRole, startUserRoleLoading } from '../../../redux/actions';
import RoleEdit from './roleEdit';

class RoleEditLoader extends Component {
  //before loader page is loaded, we send requests to get all available users
  componentWillMount(){
    this.props.startUserRoleLoading();
    this.props.getUserRole(parseInt(this.props.match.params.id, 10),this.props.token);
  }
  render(){
    if(!this.props.userRoleLoaded){
      return(<div>Loading...</div>)
    }
    return <RoleEdit history={this.props.history} match={this.props.match}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({userRolesReducer, login }) => {
  const {userRoleLoaded} = userRolesReducer;
  const {token} = login;
  return {userRoleLoaded,token};
};


export default connect(mapStateToProps, {getUserRole, startUserRoleLoading})(RoleEditLoader);
