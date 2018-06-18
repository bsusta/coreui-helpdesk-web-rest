import React, { Component } from "react";
import { connect } from 'react-redux';

import {getCompanies, startCompaniesLoading, getUserRoles, startUserRolesLoading, clearErrorMessage, setActiveRequests } from '../../../redux/actions';
import UserAdd from './userAdd';
import Loading from '../../../components/Loading';

class UserAddLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all available users
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    if(!this.props.modal){
      this.props.startCompaniesLoading();
      this.props.getCompanies(this.props.updateDate,this.props.token);
    }
    this.props.startUserRolesLoading();
    this.props.setActiveRequests(2);
    this.props.getUserRoles(this.props.token);
  }
  render(){
    if((this.props.modal&&!this.props.companiesLoaded) || !this.props.userRolesLoaded){
    return null;
    }
    return <UserAdd history={this.props.history} modal={this.props.modal}/>
  }
}
//all below is just redux storage

const mapStateToProps = ({ companiesReducer, login, userRolesReducer }) => {
  const {companiesLoaded,updateDate} = companiesReducer;
  const {userRolesLoaded} = userRolesReducer;
  const {token} = login;
  return {token,companiesLoaded,updateDate,userRolesLoaded};
};


export default connect(mapStateToProps, {getCompanies, startCompaniesLoading,getUserRoles, startUserRolesLoading, clearErrorMessage, setActiveRequests})(UserAddLoader);
