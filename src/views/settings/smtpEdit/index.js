import React, { Component } from "react";
import { connect } from 'react-redux';

import {getSMTP, startSMTPLoading, clearErrorMessage, setActiveRequests } from '../../../redux/actions';
import SMTPEdit from './SMTPEdit';


class SMTPEditLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startSMTPLoading();  // first it sets, that unit hasnt been loaded
    this.props.setActiveRequests(1);
    this.props.getSMTP(this.props.token,parseInt(this.props.match.params.id, 10));  //send request for download and storing of the units data
  }
  render(){
    if(!this.props.SMTPLoaded){ //data hasnt been loaded yet
      return null;
    }
    return <SMTPEdit history={this.props.history}/>
  }
}

//All below is redux information storage
const mapStateToProps = ({SMTPsReducer, login }) => {
  const {SMTPLoaded} = SMTPsReducer;
  const {token} = login;
  return {SMTPLoaded,token};
};

export default connect(mapStateToProps, {getSMTP, startSMTPLoading, clearErrorMessage, setActiveRequests})(SMTPEditLoader);
