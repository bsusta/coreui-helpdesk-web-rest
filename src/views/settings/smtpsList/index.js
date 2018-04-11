import React, { Component } from "react";
import { connect } from 'react-redux';

import {getSMTPs, startSMTPsLoading, clearErrorMessage } from '../../../redux/actions';
import SMTPsList from './smtpsList';
import Loading from '../../../components/Loading';

class SMTPsListLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startSMTPsLoading();
    this.props.getSMTPs(this.props.token);
  }
  render(){
    if(!this.props.SMTPsLoaded){
      return(<Loading errorID={this.state.errorID}/>)
    }
    return <SMTPsList history={this.props.history}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({SMTPsReducer, login }) => {
  const {SMTPsLoaded} = SMTPsReducer;
  const {token} = login;
  return {SMTPsLoaded,token};
};


export default connect(mapStateToProps, {getSMTPs, startSMTPsLoading, clearErrorMessage})(SMTPsListLoader);
