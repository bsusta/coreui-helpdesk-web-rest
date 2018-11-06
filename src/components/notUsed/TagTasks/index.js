import React, { Component } from "react";
import { connect } from 'react-redux';

import {getTagTasks, startTagTasksLoading, clearErrorMessage, setActiveRequests } from '../../redux/actions';
import TagTasks from './TagTasks';

class TagTasksLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
      count:this.props.match.params.count?parseInt(this.props.match.params.count, 10):20,
      id:parseInt(this.props.match.params.id, 10),
      page:this.props.match.params.page?parseInt(this.props.match.params.page, 10):1,
    }
  }
  setPage(number) {
    this.setState({ pageNumber: number });
  }
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startTagTasksLoading();
    this.props.setActiveRequests(1);
    this.props.getTagTasks(this.props.match.params.count?parseInt(this.props.match.params.count, 10):20,this.props.match.params.page?parseInt(this.props.match.params.page, 10):1,this.props.token,parseInt(this.props.match.params.id, 10));
  }

  componentWillReceiveProps(props){
    if(this.state.id!==parseInt(props.match.params.id, 10)){
      let randomFloat= Math.random();
      this.setState({randomFloat,id:parseInt(props.match.params.id, 10)});
      this.props.clearErrorMessage(randomFloat);
      this.props.startTagTasksLoading();
      this.props.getTagTasks(props.match.params.count?parseInt(props.match.params.count, 10):20,props.match.params.page?parseInt(props.match.params.page, 10):1,props.token,parseInt(props.match.params.id, 10));
    }
    if(!isNaN(parseInt(props.match.params.page, 10))&&!isNaN(parseInt(props.match.params.count, 10))&&(this.state.page!==parseInt(props.match.params.page, 10)||this.state.count!==parseInt(props.match.params.count, 10))){
      this.props.getTagTasks(parseInt(props.match.params.count, 10),parseInt(props.match.params.page, 10),this.props.token,parseInt(props.match.params.id, 10));
      this.setState({page:parseInt(props.match.params.page, 10),count:parseInt(props.match.params.count, 10)});
    }
  }

  render(){
    if(!this.props.tagTasksLoaded||this.props.sidebar.length===0){
      return null;
    }
    return <TagTasks history={this.props.history} match={this.props.match} setPage={(page)=>this.props.setState({page})} page={this.state.page}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({tasksReducer,sidebarReducer, login }) => {
  const {tagTasksLoaded} = tasksReducer;
  const { sidebar } = sidebarReducer;
  const {token} = login;
  return {tagTasksLoaded,tagID:tasksReducer.tagLinks?tasksReducer.tagLinks.id:null,sidebar,token};
};


export default connect(mapStateToProps, {getTagTasks, startTagTasksLoading, clearErrorMessage, setActiveRequests})(TagTasksLoader);
