import React, { Component } from "react";
import { connect } from 'react-redux';

import {getTag, startTagLoading,clearErrorMessage, setActiveRequests } from '../../redux/actions';
import TagEdit from './TagEdit';
import Loading from '../../components/Loading';

class TagEditLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startTagLoading();  // first it sets, that tag hasnt been loaded
    this.props.setActiveRequests(1);
    this.props.getTag(parseInt(this.props.match.params.id, 10),this.props.token);  //send request for download and storing of the tags data
  }
  render(){
    if(!this.props.tagLoaded){ //data hasnt been loaded yet
      return null;
    }
    return <TagEdit history={this.props.history}/>
  }
}

//All below is redux information storage
const mapStateToProps = ({tagsReducer,usersReducer, login }) => {
  const {tagLoaded} = tagsReducer;
  const {token} = login;
  return {tagLoaded,token};
};

export default connect(mapStateToProps, {getTag, startTagLoading,clearErrorMessage, setActiveRequests})(TagEditLoader);
