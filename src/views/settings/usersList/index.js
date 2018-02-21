import React, { Component } from "react";
import { connect } from 'react-redux';

import {getUsers, startUsersLoading } from '../../../redux/actions';
import UsersList from './usersList';

class UsersListLoader extends Component {
  //before loader page is loaded, we send requests to get all available users
  componentWillMount(){
    this.props.startUsersLoading();
    this.props.getUsers(this.props.updateDate,this.props.token);
  }
  render(){
    if(!this.props.usersLoaded){
      return(<div>Loading...</div>)
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


export default connect(mapStateToProps, {getUsers, startUsersLoading})(UsersListLoader);
