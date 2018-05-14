import React, { Component } from "react";
import { connect } from 'react-redux';

import {getUsers, startUsersLoading,clearErrorMessage } from '../../../redux/actions';
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
    this.props.getUsers(this.props.updateDate,this.props.token);
  }
  render(){
    if(!this.props.usersLoaded){
      return(<Loading errorID={this.state.errorID} history={this.props.history}/>)
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


export default connect(mapStateToProps, {getUsers, startUsersLoading,clearErrorMessage})(UsersListLoader);
