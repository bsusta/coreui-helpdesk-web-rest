import React, { Component } from "react";
import { connect } from 'react-redux';

import {getUnit, startUnitLoading, clearErrorMessage, setActiveRequests } from '../../../redux/actions';
import UnitEdit from './unitEdit';


class UnitEditLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startUnitLoading();  // first it sets, that unit hasnt been loaded
    this.props.setActiveRequests(1);
    this.props.getUnit(parseInt(this.props.match.params.id, 10),this.props.token);  //send request for download and storing of the units data
  }
  render(){
    if(!this.props.unitLoaded){ //data hasnt been loaded yet
      return null;
    }
    return <UnitEdit history={this.props.history}/>
  }
}

//All below is redux information storage
const mapStateToProps = ({unitsReducer, login }) => {
  const {unitLoaded} = unitsReducer;
  const {token} = login;
  return {unitLoaded,token};
};

export default connect(mapStateToProps, {getUnit, startUnitLoading, clearErrorMessage, setActiveRequests})(UnitEditLoader);
