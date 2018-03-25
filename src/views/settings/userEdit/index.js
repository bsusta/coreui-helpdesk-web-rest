import React, { Component } from "react";
import { connect } from 'react-redux';

import {getCompanies, startCompaniesLoading, getUserRoles, startUserRolesLoading, startUserLoading,getUser } from '../../../redux/actions';
import UserEdit from './userEdit';

class UserAddLoader extends Component {
  //before loader page is loaded, we send requests to get all user information
  componentWillMount(){
    this.props.startCompaniesLoading();
    this.props.startUserRolesLoading();
    this.props.startUserLoading();
    this.props.getCompanies(this.props.updateDate,this.props.token);
    this.props.getUserRoles(this.props.token);
    this.props.getUser( parseInt(this.props.match.params.id, 10),this.props.token);
  }
  render(){
    if(!this.props.companiesLoaded || !this.props.userRolesLoaded||!this.props.userLoaded){
      return(<div>Loading...</div>)
    }
    return <UserEdit history={this.props.history}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({ companiesReducer, login, userRolesReducer, usersReducer }) => {
  const {companiesLoaded,updateDate} = companiesReducer;
  const {userRolesLoaded} = userRolesReducer;
  const {userLoaded} = usersReducer;
  const {token} = login;
  return {token,companiesLoaded,updateDate,userRolesLoaded, userLoaded};
};


export default connect(mapStateToProps, {getCompanies, startCompaniesLoading,getUserRoles, startUserRolesLoading,startUserLoading,getUser})(UserAddLoader);
