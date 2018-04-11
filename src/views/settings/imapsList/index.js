import React, { Component } from "react";
import { connect } from 'react-redux';

import {getImaps, startImapsLoading,clearErrorMessage } from '../../../redux/actions';
import ImapsList from './imapsList';
import Loading from '../../../components/Loading';

class ImapsListLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startImapsLoading();
    this.props.getImaps(this.props.token);
  }
  render(){
    if(!this.props.imapsLoaded){
      return(<Loading errorID={this.state.errorID}/>)
    }
    return <ImapsList history={this.props.history}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({imapsReducer, login }) => {
  const {imapsLoaded} = imapsReducer;
  const {token} = login;
  return {imapsLoaded,token};
};


export default connect(mapStateToProps, {getImaps, startImapsLoading,clearErrorMessage})(ImapsListLoader);
