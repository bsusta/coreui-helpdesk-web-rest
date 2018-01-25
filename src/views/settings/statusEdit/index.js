import React, { Component } from "react";
import { connect } from 'react-redux';

import {getStatus, startStatusLoading } from '../../../redux/actions';
import StatusEdit from './statusEdit';

class StatusEditLoader extends Component {
  componentWillMount(){
    this.props.startStatusLoading();  // first it sets, that status hasnt been loaded
    this.props.getStatus(this.props.token,parseInt(this.props.match.params.id, 10));  //send request for download and storing of the status data
  }
  render(){
    if(!this.props.statusLoaded){ //data hasnt been loaded yet
      return(<div>Loading...</div>)
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

export default connect(mapStateToProps, {getStatus, startStatusLoading})(StatusEditLoader);
