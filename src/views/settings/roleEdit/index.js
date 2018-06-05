import React, { Component } from "react";
import { connect } from 'react-redux';

import {getUserRole, startUserRoleLoading, clearErrorMessage, setActiveRequests } from '../../../redux/actions';
import RoleEdit from './roleEdit';
import Loading from '../../../components/Loading';

class RoleEditLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all available users
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startUserRoleLoading();
    this.props.setActiveRequests(1);
    this.props.getUserRole(parseInt(this.props.match.params.id, 10),this.props.token);
  }
  render(){
    if(!this.props.userRoleLoaded){
      return null;
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


export default connect(mapStateToProps, {getUserRole, startUserRoleLoading, clearErrorMessage, setActiveRequests })(RoleEditLoader);
