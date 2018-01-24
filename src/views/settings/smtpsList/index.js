import React, { Component } from "react";
import { connect } from 'react-redux';

import {getSMTPs, startSMTPsLoading } from '../../../redux/actions';
import SMTPsList from './smtpsList';

class SMTPsListLoader extends Component {
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.startSMTPsLoading();
    this.props.getSMTPs(this.props.token);
  }
  render(){
    if(!this.props.SMTPsLoaded){
      return(<div>Loading...</div>)
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


export default connect(mapStateToProps, {getSMTPs, startSMTPsLoading})(SMTPsListLoader);
