import React, { Component } from "react";
import { connect } from 'react-redux';

import {getCompanyAttributes, startCompanyAttributesLoading, clearErrorMessage, setActiveRequests } from '../../../redux/actions';
import CompanyAttributesList from './companyAttributesList';


class CompanyAttributesListLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all available companyAttributes
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startCompanyAttributesLoading();
    this.props.setActiveRequests(1);
    this.props.getCompanyAttributes(this.props.token);
  }
  render(){
    if(!this.props.companyAttributesLoaded){
      return null;
    }
    return <CompanyAttributesList history={this.props.history} match={this.props.match}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({companyAttributesReducer, login }) => {
  const {companyAttributesLoaded} = companyAttributesReducer;
  const {token} = login;
  return {companyAttributesLoaded,token};
};


export default connect(mapStateToProps, {getCompanyAttributes, startCompanyAttributesLoading, clearErrorMessage, setActiveRequests})(CompanyAttributesListLoader);
