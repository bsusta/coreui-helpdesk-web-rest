import React, { Component } from "react";
import { connect } from 'react-redux';

import {getActiveCompanyAttributes, startCompanyAttributesLoading,clearErrorMessage } from '../../../redux/actions';
import CompanyAdd from './companyAdd';
import Loading from '../../../components/Loading';

class companyAddLoader extends Component {
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
    this.props.getActiveCompanyAttributes(this.props.token);
  }
  render(){
    if(!this.props.companyAttributesLoaded){
      return(<Loading errorID={this.state.errorID} history={this.props.history}/>)
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


export default connect(mapStateToProps, {getActiveCompanyAttributes, startCompanyAttributesLoading,clearErrorMessage})(companyAddLoader);
