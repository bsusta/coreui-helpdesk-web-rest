import React, { Component } from "react";
import { connect } from 'react-redux';

import {getAllUsers, startUsersLoading,clearErrorMessage, setActiveRequests } from '../../../redux/actions';
import UsersList from './usersList';
import Loading from '../../../components/Loading';

class UsersListLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all available users
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startUsersLoading();
    this.props.setActiveRequests(1);
    this.props.getAllUsers(this.props.token);
  }
  render(){
    if(!this.props.usersLoaded){
    return null;
    }
    return <UsersList history={this.props.history} match={this.props.match}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({usersReducer, login }) => {
  const {usersLoaded,updateDate} = usersReducer;
  const {token} = login;
  return {usersLoaded,updateDate,token};
};


export default connect(mapStateToProps, {getAllUsers, startUsersLoading,clearErrorMessage, setActiveRequests})(UsersListLoader);
