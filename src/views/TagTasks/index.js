import React, { Component } from "react";
import { connect } from 'react-redux';

import {getTagTasks, startTagTasksLoading } from '../../redux/actions';
import TagTasks from './TagTasks';

class TagTasksLoader extends Component {
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.startTagTasksLoading();
    this.props.getTagTasks(this.props.match.params.count?parseInt(this.props.match.params.count, 10):20,this.props.match.params.page?parseInt(this.props.match.params.page, 10):1,this.props.token,parseInt(this.props.match.params.id, 10));
  }
  componentDidUpdate(){
    if(this.props.tagID!==parseInt(this.props.match.params.id, 10) && this.props.tagTasksLoaded){
      this.props.startTagTasksLoading();
      this.props.getTagTasks(this.props.match.params.count?parseInt(this.props.match.params.count, 10):20,this.props.match.params.page?parseInt(this.props.match.params.page, 10):1,this.props.token,parseInt(this.props.match.params.id, 10));
    }
  }

  render(){
    if(!this.props.tagTasksLoaded){
      return(<div>Loading...</div>)
    }
    return <TagTasks history={this.props.history} match={this.props.match}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({tasksReducer, login }) => {
  const {tagTasksLoaded} = tasksReducer;
  const {token} = login;
  return {tagTasksLoaded,tagID:tasksReducer.tagLinks?tasksReducer.tagLinks.id:null,token};
};


export default connect(mapStateToProps, {getTagTasks, startTagTasksLoading})(TagTasksLoader);
