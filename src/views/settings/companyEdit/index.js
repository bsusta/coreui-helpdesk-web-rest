import React, { Component } from "react";
import { connect } from 'react-redux';

import {getCompany, startCompanyLoading, getActiveCompanyAttributes, startCompanyAttributesLoading, clearErrorMessage } from '../../../redux/actions';
import CompanyEdit from './companyEdit';
import Loading from '../../../components/Loading';

class CompanyEditLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all user information
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startCompanyLoading();
    this.props.startCompanyAttributesLoading();
    this.props.getCompany( parseInt(this.props.match.params.id, 10),this.props.token);
    this.props.getActiveCompanyAttributes(this.props.token);
  }

  render(){
    if(!this.props.companyLoaded||!this.props.companyAttributesLoaded){
      return(<Loading errorID={this.state.errorID} history={this.props.history}/>)
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


export default connect(mapStateToProps, {getCompany, startCompanyLoading ,getActiveCompanyAttributes,startCompanyAttributesLoading, clearErrorMessage})(CompanyEditLoader);
