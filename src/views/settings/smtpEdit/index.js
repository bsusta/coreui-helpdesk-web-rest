import React, { Component } from "react";
import { connect } from 'react-redux';

import {getSMTP, startSMTPLoading, clearErrorMessage } from '../../../redux/actions';
import SMTPEdit from './SMTPEdit';
import Loading from '../../../components/Loading';

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
    this.props.getSMTP(this.props.token,parseInt(this.props.match.params.id, 10));  //send request for download and storing of the units data
  }
  render(){
    if(!this.props.SMTPLoaded){ //data hasnt been loaded yet
      return(<Loading errorID={this.state.errorID}/>)
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

export default connect(mapStateToProps, {getSMTP, startSMTPLoading, clearErrorMessage})(SMTPEditLoader);
