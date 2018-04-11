import React, { Component } from "react";
import { connect } from 'react-redux';

import {getCompanies, startCompaniesLoading,clearErrorMessage } from '../../../redux/actions';
import CompaniesList from './companiesList';
import Loading from '../../../components/Loading';

class CompaniesListLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all available users
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startCompaniesLoading();
    this.props.getCompanies(this.props.updateDate,this.props.token);
  }

  render(){
    if(!this.props.companiesLoaded){
      return(<Loading errorID={this.state.errorID}/>)
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

export default connect(mapStateToProps, {getCompanies, startCompaniesLoading,clearErrorMessage})(CompaniesListLoader);
