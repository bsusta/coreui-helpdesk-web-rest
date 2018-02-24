import React, { Component } from "react";
import { connect } from 'react-redux';

import {getTag, startTagLoading } from '../../redux/actions';
import TagEdit from './TagEdit';

class TagEditLoader extends Component {
  componentWillMount(){
    this.props.startTagLoading();  // first it sets, that tag hasnt been loaded
    this.props.getTag(parseInt(this.props.match.params.id, 10),this.props.token);  //send request for download and storing of the tags data
  }
  render(){
    if(!this.props.tagLoaded){ //data hasnt been loaded yet
      return(<div>Loading...</div>)
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

export default connect(mapStateToProps, {getTag, startTagLoading})(TagEditLoader);
