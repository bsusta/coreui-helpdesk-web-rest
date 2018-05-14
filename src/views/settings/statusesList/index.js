import React, { Component } from "react";
import { connect } from 'react-redux';

import {getStatuses, startStatusesLoading, clearErrorMessage } from '../../../redux/actions';
import StatusesList from './statusesList';
import Loading from '../../../components/Loading';

class StatusesListLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all available statuses
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startStatusesLoading();
    this.props.getStatuses(this.props.udateDate,this.props.token);
  }
  render(){
    if(!this.props.statusesLoaded){
      return(<Loading errorID={this.state.errorID} history={this.props.history}/>)
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


export default connect(mapStateToProps, {getStatuses, startStatusesLoading, clearErrorMessage})(StatusesListLoader);
