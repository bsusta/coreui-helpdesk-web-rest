import React, { Component } from "react";
import { connect } from 'react-redux';

import {getImap, startImapLoading } from '../../../redux/actions';
import ImapEdit from './ImapEdit';

class ImapEditLoader extends Component {
  componentWillMount(){
    this.props.startImapLoading();  // first it sets, that unit hasnt been loaded
    this.props.getImap(this.props.token,parseInt(this.props.match.params.id, 10));  //send request for download and storing of the units data
  }
  render(){
    if(!this.props.ImapLoaded){ //data hasnt been loaded yet
      return(<div>Loading...</div>)
    }
    return <ImapEdit history={this.props.history}/>
  }
}

//All below is redux information storage
const mapStateToProps = ({imapsReducer, login }) => {
  const {imapLoaded} = imapsReducer;
  const {token} = login;
  return {imapLoaded,token};
};

export default connect(mapStateToProps, {getImap, startImapLoading})(ImapEditLoader);
