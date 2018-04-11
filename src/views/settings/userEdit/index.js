import React, { Component } from "react";
import { connect } from 'react-redux';

import {getCompanies, startCompaniesLoading, getUserRoles, startUserRolesLoading, startUserLoading,getUser,clearErrorMessage } from '../../../redux/actions';
import UserEdit from './userEdit';
import Loading from '../../../components/Loading';

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
    this.props.startCompaniesLoading();
    this.props.startUserRolesLoading();
    this.props.startUserLoading();
    this.props.getCompanies(this.props.updateDate,this.props.token);
    this.props.getUserRoles(this.props.token);
    this.props.getUser( parseInt(this.props.match.params.id, 10),this.props.token);
  }
  render(){
    if(!this.props.companiesLoaded || !this.props.userRolesLoaded||!this.props.userLoaded){
      return(<Loading errorID={this.state.errorID}/>)
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


export default connect(mapStateToProps, {getCompanies, startCompaniesLoading,getUserRoles, startUserRolesLoading,startUserLoading,getUser,clearErrorMessage})(UserAddLoader);
