import React, { Component } from "react";
import { connect } from 'react-redux';

import {getFilteredTasks, startFilterTasksLoading,clearErrorMessage } from '../../redux/actions';
import Loading from '../../components/Loading';
import Filter from './FilterTasks';

class FilterLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startFilterTasksLoading();
    this.props.getFilteredTasks(this.props.match.params.count?parseInt(this.props.match.params.count, 10):20,this.props.match.params.page?parseInt(this.props.match.params.page, 10):1,this.props.token,parseInt(this.props.match.params.id, 10));
  }
  componentDidUpdate(){
    if(this.props.filterID!==parseInt(this.props.match.params.id, 10) && this.props.filterTasksLoaded){
      this.props.clearErrorMessage(this.state.randomFloat);
      this.props.startFilterTasksLoading();
      this.props.getFilteredTasks(this.props.match.params.count?parseInt(this.props.match.params.count, 10):20,this.props.match.params.page?parseInt(this.props.match.params.page, 10):1,this.props.token,parseInt(this.props.match.params.id, 10));
    }
  }
  render(){
    if(!this.props.filterTasksLoaded){
      return(<Loading errorID={this.state.errorID} history={this.props.history}/>)
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


export default connect(mapStateToProps, {getFilteredTasks, startFilterTasksLoading,clearErrorMessage})(FilterLoader);
