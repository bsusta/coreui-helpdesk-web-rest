import React, { Component } from "react";
import { connect } from 'react-redux';

import {getCompanyAttribute, startCompanyAttributeLoading, clearErrorMessage } from '../../../redux/actions';
import CompanyAttributeEdit from './companyAttributeEdit';
import Loading from '../../../components/Loading';

class CompanyAttributeEditLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startCompanyAttributeLoading();  // first it sets, that company attribute hasnt been loaded
    this.props.getCompanyAttribute(parseInt(this.props.match.params.id, 10),this.props.token);  //send request for download and storing of the company attributes data
  }
  render(){
    if(!this.props.companyAttributeLoaded){ //data hasnt been loaded yet
      return(<Loading errorID={this.state.errorID}/>)
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

export default connect(mapStateToProps, {getCompanyAttribute, startCompanyAttributeLoading, clearErrorMessage})(CompanyAttributeEditLoader);
