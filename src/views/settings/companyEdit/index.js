import React, { Component } from "react";
import { connect } from 'react-redux';

import {getCompany, startCompanyLoading } from '../../../redux/actions';
import CompanyEdit from './companyEdit';

class CompanyEditLoader extends Component {
  //before loader page is loaded, we send requests to get all user information
  componentWillMount(){
    this.props.startCompanyLoading();
    this.props.getCompany( parseInt(this.props.match.params.id, 10),this.props.token);
  }
  render(){
    if(!this.props.companyLoaded){
      return(<div>Loading...</div>)
    }
    return <CompanyEdit history={this.props.history}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({ companiesReducer, login }) => {
  const {companyLoaded} = companiesReducer;
  const {token} = login;
  return {token,companyLoaded};
};


export default connect(mapStateToProps, {getCompany, startCompanyLoading })(CompanyEditLoader);
