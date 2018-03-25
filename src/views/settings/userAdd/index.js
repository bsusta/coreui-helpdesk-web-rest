import React, { Component } from "react";
import { connect } from 'react-redux';

import {getCompanies, startCompaniesLoading, getUserRoles, startUserRolesLoading } from '../../../redux/actions';
import UserAdd from './userAdd';

class UserAddLoader extends Component {
  //before loader page is loaded, we send requests to get all available users
  componentWillMount(){
    this.props.startCompaniesLoading();
    this.props.startUserRolesLoading();
    this.props.getCompanies(this.props.updateDate,this.props.token);
    this.props.getUserRoles(this.props.token);
  }
  render(){
    if(!this.props.companiesLoaded || !this.props.userRolesLoaded){
      return(<div>Loading...</div>)
    }
    return <UserAdd history={this.props.history}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({ companiesReducer, login, userRolesReducer }) => {
  const {companiesLoaded,updateDate} = companiesReducer;
  const {userRolesLoaded} = userRolesReducer;
  const {token} = login;
  return {token,companiesLoaded,updateDate,userRolesLoaded};
};


export default connect(mapStateToProps, {getCompanies, startCompaniesLoading,getUserRoles, startUserRolesLoading})(UserAddLoader);
