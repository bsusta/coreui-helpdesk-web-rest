import React, { Component } from "react";
import { connect } from 'react-redux';

import {getCompanies, startCompaniesLoading, getUserRoles, startUserRolesLoading, startUserLoading,getUser,clearErrorMessage, setActiveRequests } from '../../redux/actions';
import UserEdit from './userEdit';
import Loading from '../../components/Loading';

class UserAddLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all user information
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startUserLoading();
    this.props.setActiveRequests(1);
    this.props.getUser( this.props.user.id,this.props.token);
  }
  render(){
    if(!this.props.userLoaded){
    return null;
    }
    return <UserEdit history={this.props.history}/>
  }
}
//all below is just redux storage

const mapStateToProps = ({ companiesReducer, login, userRolesReducer, usersReducer }) => {
  const {companiesLoaded,updateDate} = companiesReducer;
  const {userRolesLoaded} = userRolesReducer;
  const {userLoaded} = usersReducer;
  const {user,token} = login;
  return {token,companiesLoaded,user, updateDate,userRolesLoaded, userLoaded};
};


export default connect(mapStateToProps, {getCompanies, startCompaniesLoading,getUserRoles, startUserRolesLoading,startUserLoading,getUser,clearErrorMessage, setActiveRequests})(UserAddLoader);
