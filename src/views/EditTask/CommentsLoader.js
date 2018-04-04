import React, { Component } from "react";
import { connect } from 'react-redux';

import {startCommentsLoading, getComments } from '../../redux/actions';
import Comments from './Comments';

class CommentsLoader extends Component {
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.startCommentsLoading();
    this.props.getComments(this.props.taskID,this.props.token);
  }

  render(){
    if(!this.props.commentsLoaded){
      return(<div>Loading...</div>)
    }
    return <Comments taskID={this.props.taskID}/>
  }
}

const mapStateToProps = ({commentsReducer, login }) => {
  const {commentsLoaded } = commentsReducer;
  const {token} = login;
  return {commentsLoaded, token};
};


export default connect(mapStateToProps, {startCommentsLoading,getComments})(CommentsLoader);
