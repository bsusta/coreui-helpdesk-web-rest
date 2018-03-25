import React, { Component } from "react";
import { connect } from 'react-redux';

import {getStatuses, startStatusesLoading } from '../../../redux/actions';
import StatusesList from './statusesList';

class StatusesListLoader extends Component {
  //before loader page is loaded, we send requests to get all available statuses
  componentWillMount(){
    this.props.startStatusesLoading();
    this.props.getStatuses(this.props.udateDate,this.props.token);
  }
  render(){
    if(!this.props.statusesLoaded){
      return(<div>Loading...</div>)
    }
    return <StatusesList history={this.props.history}/>
  }
}

//all below is just redux storage
const mapStateToProps = ({statusesReducer, login }) => {
  const {statusesLoaded, updateDate} = statusesReducer;
  const {token} = login;
  return {statusesLoaded,updateDate,token};
};


export default connect(mapStateToProps, {getStatuses, startStatusesLoading})(StatusesListLoader);
