import React, { Component } from "react";
import { connect } from 'react-redux';

import {getCompanyAttribute, startCompanyAttributeLoading } from '../../../redux/actions';
import CompanyAttributeEdit from './companyAttributeEdit';

class CompanyAttributeEditLoader extends Component {
  componentWillMount(){
    this.props.startCompanyAttributeLoading();  // first it sets, that company attribute hasnt been loaded
    this.props.getCompanyAttribute(parseInt(this.props.match.params.id, 10),this.props.token);  //send request for download and storing of the company attributes data
  }
  render(){
    if(!this.props.companyAttributeLoaded){ //data hasnt been loaded yet
      return(<div>Loading...</div>)
    }
    return <CompanyAttributeEdit history={this.props.history}/>
  }
}

//All below is redux information storage
const mapStateToProps = ({companyAttributesReducer, login }) => {
  const {companyAttributeLoaded} = companyAttributesReducer;
  const {token} = login;
  return {companyAttributeLoaded,token};
};

export default connect(mapStateToProps, {getCompanyAttribute, startCompanyAttributeLoading})(CompanyAttributeEditLoader);
