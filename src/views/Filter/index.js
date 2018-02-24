import React, { Component } from "react";
import { connect } from 'react-redux';

import {getFilteredTasks, startFilterTasksLoading } from '../../redux/actions';
import Filter from './Filter';

class FilterLoader extends Component {
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.startFilterTasksLoading();
    this.props.getFilteredTasks(this.props.match.params.count?parseInt(this.props.match.params.count, 10):20,this.props.match.params.page?parseInt(this.props.match.params.page, 10):1,this.props.token,parseInt(this.props.match.params.id, 10));
  }
  componentDidUpdate(){
    if(this.props.filterID!==parseInt(this.props.match.params.id, 10) && this.props.filterTasksLoaded){
      this.props.startFilterTasksLoading();
      this.props.getFilteredTasks(this.props.match.params.count?parseInt(this.props.match.params.count, 10):20,this.props.match.params.page?parseInt(this.props.match.params.page, 10):1,this.props.token,parseInt(this.props.match.params.id, 10));
    }
  }
  render(){
    if(!this.props.filterTasksLoaded){
      return(<div>Loading...</div>)
    }
    return <Filter history={this.props.history} match={this.props.match}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({tasksReducer, login }) => {
  const {filterTasksLoaded} = tasksReducer;
  const {token} = login;
  return {filterTasksLoaded,filterID:tasksReducer.filterLinks?tasksReducer.filterLinks.id:null,token};
};


export default connect(mapStateToProps, {getFilteredTasks, startFilterTasksLoading})(FilterLoader);
