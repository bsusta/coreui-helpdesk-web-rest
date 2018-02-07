import React, { Component } from "react";
import { connect } from 'react-redux';

import {getCompanyAttributes, startCompanyAttributesLoading } from '../../../redux/actions';
import CompanyAdd from './companyAdd';

class companyAddLoader extends Component {
  //before loader page is loaded, we send requests to get all available companyAttributes
  componentWillMount(){
    this.props.startCompanyAttributesLoading();
    this.props.getCompanyAttributes(this.props.token);
  }
  render(){
    if(!this.props.companyAttributesLoaded){
      return(<div>Loading...</div>)
    }
    return <CompanyAdd history={this.props.history} match={this.props.match}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({companyAttributesReducer, login }) => {
  const {companyAttributesLoaded} = companyAttributesReducer;
  const {token} = login;
  return {companyAttributesLoaded,token};
};


export default connect(mapStateToProps, {getCompanyAttributes, startCompanyAttributesLoading})(companyAddLoader);
