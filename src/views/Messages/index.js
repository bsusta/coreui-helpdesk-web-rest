import React, { Component } from "react";
import { connect } from 'react-redux';

import {getMessages, startMessagesLoading,clearErrorMessage ,setActiveRequests } from '../../redux/actions';
import Loading from '../../components/Loading';
import Messages from './Messages';

class MessagesLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.startMessagesLoading();
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.setActiveRequests(1);
    this.props.getMessages(this.props.match.params.count?parseInt(this.props.match.params.count, 10):20,this.props.match.params.page?parseInt(this.props.match.params.page, 10):1,this.props.token);
  }

  render(){
    if(!this.props.messagesLoaded){
      return null;
    }
    return <Messages history={this.props.history} match={this.props.match}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({messagesReducer, login }) => {
  const {messagesLoaded} = messagesReducer;
  const {token} = login;
  return {messagesLoaded,messagesReducer,token};
};


export default connect(mapStateToProps, {getMessages, startMessagesLoading,clearErrorMessage,setActiveRequests})(MessagesLoader);
