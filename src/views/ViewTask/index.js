import React, { Component } from "react";
import { connect } from 'react-redux';
import EditTask from '../EditTaskNew';

export default class ViewTaskLoader extends Component {
  render(){
    return <EditTask {...this.props} disabled={true}/>
  }
}
