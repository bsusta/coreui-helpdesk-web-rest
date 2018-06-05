import React, { Component } from "react";
import { connect } from 'react-redux';

import {getStatus, startStatusLoading, clearErrorMessage, setActiveRequests } from '../../../redux/actions';
import StatusEdit from './statusEdit';
import Loading from '../../../components/Loading';

class StatusEditLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startStatusLoading();  // first it sets, that status hasnt been loaded
    this.props.setActiveRequests(1);
    this.props.getStatus(this.props.token,parseInt(this.props.match.params.id, 10));  //send request for download and storing of the status data
  }
  render(){
    if(!this.props.statusLoaded){ //data hasnt been loaded yet
      return null;
    }
    return <StatusEdit history={this.props.history}/>
  }
}

//All below is redux information storage
const mapStateToProps = ({statusesReducer, login }) => {
  const {statusLoaded} = statusesReducer;
  const {token} = login;
  return {statusLoaded,token};
};

export default connect(mapStateToProps, {getStatus, startStatusLoading, clearErrorMessage, setActiveRequests})(StatusEditLoader);
