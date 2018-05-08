import React, { Component } from "react";
import { connect } from 'react-redux';

import {startCommentsLoading, getComments,clearErrorMessage } from '../../../redux/actions';
import Comments from './Comments';
import Loading from '../../../components/Loading';

class CommentsLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startCommentsLoading();
    this.props.getComments(this.props.taskID,this.props.token);
  }

  render(){
    if(!this.props.commentsLoaded){
      return(<Loading errorID={this.state.errorID}/>)
    }
    return <Comments taskID={this.props.taskID}/>
  }
}

const mapStateToProps = ({commentsReducer, login }) => {
  const {commentsLoaded } = commentsReducer;
  const {token} = login;
  return {commentsLoaded, token};
};


export default connect(mapStateToProps, {startCommentsLoading,getComments,clearErrorMessage})(CommentsLoader);
