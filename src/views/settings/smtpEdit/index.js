import React, { Component } from "react";
import { connect } from 'react-redux';

import {getSMTP, startSMTPLoading } from '../../../redux/actions';
import SMTPEdit from './SMTPEdit';

class SMTPEditLoader extends Component {
  componentWillMount(){
    this.props.startSMTPLoading();  // first it sets, that unit hasnt been loaded
    this.props.getSMTP(this.props.token,parseInt(this.props.match.params.id, 10));  //send request for download and storing of the units data
  }
  render(){
    if(!this.props.SMTPLoaded){ //data hasnt been loaded yet
      return(<div>Loading...</div>)
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

export default connect(mapStateToProps, {getSMTP, startSMTPLoading})(SMTPEditLoader);
