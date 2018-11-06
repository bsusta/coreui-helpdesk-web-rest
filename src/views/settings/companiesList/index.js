import React, { Component } from "react";
import { connect } from 'react-redux';

import {getCompanies, startCompaniesLoading,clearErrorMessage, setActiveRequests } from '../../../redux/actions';
import CompaniesList from './companiesList';


class CompaniesListLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all available users
  componentWillMount(){
    this.props.setActiveRequests(1);
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startCompaniesLoading();
    this.props.getCompanies(this.props.updateDate,this.props.token);
  }

  render(){
    if(!this.props.companiesLoaded){
      return null;
    }
    return <CompaniesList history={this.props.history} match={this.props.match}/>
  }
}

//all below is just redux storage
const mapStateToProps = ({companiesReducer, login }) => {
  const {companiesLoaded,updateDate} = companiesReducer;
  const {token} = login;
  return {companiesLoaded,updateDate,token};
};

export default connect(mapStateToProps, {getCompanies, startCompaniesLoading,clearErrorMessage, setActiveRequests})(CompaniesListLoader);
