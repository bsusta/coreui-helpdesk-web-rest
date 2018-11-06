import React, { Component } from "react";
import { connect } from 'react-redux';

import {getUnits, startUnitsLoading,clearErrorMessage, setActiveRequests } from '../../../redux/actions';
import UnitsList from './unitsList';


class UnitsListLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startUnitsLoading();
    this.props.setActiveRequests(1);
    this.props.getUnits(this.props.token);
  }
  render(){
    if(!this.props.unitsLoaded){
      return null;
    }
    return <UnitsList history={this.props.history}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({unitsReducer, login }) => {
  const {unitsLoaded} = unitsReducer;
  const {token} = login;
  return {unitsLoaded,token};
};


export default connect(mapStateToProps, {getUnits, startUnitsLoading,clearErrorMessage, setActiveRequests})(UnitsListLoader);
