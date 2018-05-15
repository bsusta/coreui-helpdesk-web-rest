import React, { Component } from "react";
import { connect } from 'react-redux';

import {getProjectTasks, startProjectTasksLoading,clearErrorMessage,startProjectLoading,getProject,  } from '../../redux/actions';
import Loading from '../../components/Loading';
import Project from './ProjectContainer';

class ProjectLoader extends Component {
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
    this.props.startProjectTasksLoading();
    this.props.startProjectLoading();
    this.props.getProject(parseInt(this.props.match.params.id, 10),this.props.token);
    this.props.getProjectTasks(this.props.match.params.count?parseInt(this.props.match.params.count, 10):20,this.props.match.params.page?parseInt(this.props.match.params.page, 10):1,this.props.token,parseInt(this.props.match.params.id, 10));
  }

  componentWillReceiveProps(props){
    if(this.state.id!==parseInt(props.match.params.id, 10)){
      let randomFloat= Math.random();
      this.setState({randomFloat,id:parseInt(props.match.params.id, 10)});
      this.props.clearErrorMessage(randomFloat);
      this.props.startProjectTasksLoading();
      this.props.getProjectTasks(props.match.params.count?parseInt(props.match.params.count, 10):20,props.match.params.page?parseInt(props.match.params.page, 10):1,props.token,parseInt(props.match.params.id, 10));
    }
    if(!isNaN(parseInt(props.match.params.page, 10))&&!isNaN(parseInt(props.match.params.count, 10))&&(this.state.page!==parseInt(props.match.params.page, 10)||this.state.count!==parseInt(props.match.params.count, 10))){
      this.props.getProjectTasks(props.match.params.count?parseInt(props.match.params.count, 10):20,props.match.params.page?parseInt(props.match.params.page, 10):1,props.token,parseInt(props.match.params.id, 10));
      this.setState({page:parseInt(props.match.params.page, 10),count:parseInt(props.match.params.count, 10)});
    }
  }

  render(){
    if(!this.props.projectTasksLoaded||!this.props.projectLoaded||this.props.sidebar.length===0){
      return(<Loading errorID={this.state.errorID} history={this.props.history}/>)
    }
    return <Project history={this.props.history} match={this.props.match}  setPage={(page)=>this.setState({page})} page={this.state.page}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({tasksReducer,projectsReducer,sidebarReducer, login }) => {
  const {projectTasksLoaded} = tasksReducer;
  const {projectLoaded} = projectsReducer;
  const { sidebar } = sidebarReducer;
  const {token} = login;
  return {projectTasksLoaded,sidebar,projectID:tasksReducer.projectLinks?tasksReducer.projectLinks.id:null,token, projectLoaded};
};


export default connect(mapStateToProps, {getProjectTasks, startProjectTasksLoading,clearErrorMessage,startProjectLoading,getProject})(ProjectLoader);
