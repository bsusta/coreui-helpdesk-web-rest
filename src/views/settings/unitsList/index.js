import React, { Component } from "react";
import { connect } from 'react-redux';

import {getUnits, startUnitsLoading } from '../../../redux/actions';
import UnitsList from './unitsList';

class UnitsListLoader extends Component {
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.startUnitsLoading();
    this.props.getUnits(this.props.token);
  }
  render(){
    if(!this.props.unitsLoaded){
      return(<div>Loading...</div>)
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


export default connect(mapStateToProps, {getUnits, startUnitsLoading})(UnitsListLoader);
