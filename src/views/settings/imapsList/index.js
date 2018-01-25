import React, { Component } from "react";
import { connect } from 'react-redux';

import {getImaps, startImapsLoading } from '../../../redux/actions';
import ImapsList from './imapsList';

class ImapsListLoader extends Component {
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.startImapsLoading();
    this.props.getImaps(this.props.token);
  }
  render(){
    if(!this.props.imapsLoaded){
      return(<div>Loading...</div>)
    }
    return <ImapsList history={this.props.history}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({imapsReducer, login }) => {
  const {imapsLoaded} = imapsReducer;
  const {token} = login;
  return {imapsLoaded,token};
};


export default connect(mapStateToProps, {getImaps, startImapsLoading})(ImapsListLoader);
