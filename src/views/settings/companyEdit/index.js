import React, { Component } from "react";
import { connect } from 'react-redux';

import {getCompany, startCompanyLoading, getActiveCompanyAttributes, startCompanyAttributesLoading } from '../../../redux/actions';
import CompanyEdit from './companyEdit';

class CompanyEditLoader extends Component {
  //before loader page is loaded, we send requests to get all user information
  componentWillMount(){
    this.props.startCompanyLoading();
    this.props.startCompanyAttributesLoading();
    this.props.getCompany( parseInt(this.props.match.params.id, 10),this.props.token);
    this.props.getActiveCompanyAttributes(this.props.token);
  }
  
  render(){
    if(!this.props.companyLoaded||!this.props.companyAttributesLoaded){
      return(<div>Loading...</div>)
    }
    return <CompanyEdit history={this.props.history}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({ companiesReducer,companyAttributesReducer, login }) => {
  const {companyLoaded} = companiesReducer;
  const {companyAttributesLoaded} = companyAttributesReducer;
  const {token} = login;
  return {token,companyLoaded,companyAttributesLoaded};
};


export default connect(mapStateToProps, {getCompany, startCompanyLoading ,getActiveCompanyAttributes,startCompanyAttributesLoading})(CompanyEditLoader);
