import React, { Component } from "react";
import { connect } from 'react-redux';

import {getUnit, startUnitLoading } from '../../../redux/actions';
import UnitEdit from './unitEdit';

class UnitEditLoader extends Component {
  componentWillMount(){
    this.props.startUnitLoading();  // first it sets, that unit hasnt been loaded
    this.props.getUnit(this.props.token,parseInt(this.props.match.params.id, 10));  //send request for download and storing of the units data
  }
  render(){
    if(!this.props.unitLoaded){ //data hasnt been loaded yet
      return(<div>Loading...</div>)
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

export default connect(mapStateToProps, {getUnit, startUnitLoading})(UnitEditLoader);
