import React, { Component } from "react";
import { connect } from 'react-redux';

import {startTaskProjectsLoading,startStatusesLoading,loadUnsavedFilter,addActiveRequests,
getTaskStatuses,getTaskProjects, startCompaniesLoading,getTaskCompanies,setFilterBody,
startTaskAttributesLoading,getTaskAttributes,getTags,startTagsLoading,getProject,
startUnitsLoading, getTaskUnits, deleteTaskSolvers, startUsersLoading, getUsers,
clearErrorMessage, clearFilterTasks, getFilter, getUsersFilter,startFilterLoading, setFilterPage } from '../../redux/actions';
import FilterLoader from './FilterLoader';
import Loading from '../../components/Loading';

class Loader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }

  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.clearErrorMessage(this.state.randomFloat);
    this.props.startTaskProjectsLoading();
    this.props.startStatusesLoading();
    this.props.startCompaniesLoading();
    this.props.startTaskAttributesLoading();
    this.props.startTagsLoading();
    this.props.startUnitsLoading();
    this.props.startUsersLoading();
    this.props.deleteTaskSolvers();
    this.props.addActiveRequests(7);
    this.props.getTaskStatuses(this.props.statusesUpdateDate,this.props.token);
    this.props.getTaskProjects(this.props.token);
    this.props.getTaskCompanies(this.props.companiesUpdateDate,this.props.token);
    this.props.getTaskAttributes(this.props.token);
    this.props.getTags(this.props.token);
    this.props.getTaskUnits(this.props.token);
    this.props.getUsers("",this.props.token);
    if(this.props.body){
      let randomFloat= Math.random();
      this.setState({randomFloat,id:parseInt(this.props.match.params.id, 10)});
      this.props.clearErrorMessage(randomFloat);
      this.props.addActiveRequests(1);
      this.props.loadUnsavedFilter(this.props.match.params.count?this.props.match.params.count:20,this.props.page,this.props.body,this.props.order,this.props.token);
      if(!this.props.match.params.page){
        this.props.setFilterPage(1);
      }
    }
    if(this.props.match.params.projectID){
      this.props.addActiveRequests(1);
      this.props.getProject(this.props.match.params.projectID,this.props.history,this.props.token);
    }

    this.props.setFilterPage(this.props.match.params?this.props.match.params.page:1);
  }

  componentWillReceiveProps(props){
    if(props.match.params.id && this.props.match.params.id!==props.match.params.id){
      if(props.match.params.id==='add'){
        this.props.startFilterLoading(false);
        this.props.addActiveRequests(1);
        this.props.getUsersFilter(this.props.taskAttributes,this.props.statuses,this.props.projects,this.props.users,this.props.tags,this.props.companies,this.props.token);
      }
      else{
        this.props.startFilterLoading(false);
        this.props.addActiveRequests(1);
        this.props.getFilter(props.taskAttributes,props.statuses,props.projects,props.users,props.tags,props.companies,props.match.params.id,this.props.history,props.token);
      }
    }
    else if(props.match.params.projectID && this.props.match.params.projectID!==props.match.params.projectID){
      let project=props.projects.find((item)=>item.id&&item.id.toString()===props.match.params.projectID);
      if(project===undefined){
        this.props.history.push('/404');
        return;
      }
      project.label=project.name;
      project.value=project.id;
      this.props.addActiveRequests(1);
      this.props.getProject(props.match.params.projectID,this.props.history,this.props.token);
      props.setFilterBody('project='+props.match.params.projectID,{projects:[project]},1);
    }
    else if(props.match.params.tagID && this.props.match.params.tagID!==props.match.params.tagID){
      let tag=props.tags.find((item)=>item.id&&item.id.toString()===props.match.params.tagID);
      if(tag===undefined){
        this.props.history.push('/404');
        return;
      }
      tag.label=tag.name;
      tag.value=tag.id;
      props.setFilterBody('tag='+props.match.params.tagID,{tags:[tag]},1);
    }
    else if((props.body!==null && (this.props.body===null) ||this.props.order!==props.order|| JSON.stringify(this.props.body)!=JSON.stringify(props.body))){
      let randomFloat= Math.random();
      this.setState({randomFloat,id:parseInt(props.match.params.id, 10)});
      this.props.clearErrorMessage(randomFloat);
      this.props.addActiveRequests(1);
      this.props.loadUnsavedFilter(props.match.params.count?props.match.params.count:20,props.page,props.body,props.order,props.token);
      if(!this.props.match.params.page){
        this.props.setFilterPage(1);
      }
      if(props.match.params.projectID){
        this.props.history.push('/project/'+props.match.params.projectID+'/1,'+(props.match.params.count?props.match.params.count:20));
      }else if(props.match.params.tagID){
        this.props.history.push('/tag/'+props.match.params.tagID+'/1,'+(props.match.params.count?props.match.params.count:20));
      }else if(props.match.params.id){
        this.props.history.push('/filter/'+props.match.params.id+'/1,'+(props.match.params.count?props.match.params.count:20));
      }
      else{
        this.props.history.push('/filter/1,'+(props.match.params.count?props.match.params.count:20));
      }
      }
      else if(props.match.params.page===undefined&&props.match.params.id!=="add"){
        if(props.match.params.projectID){
          this.props.history.push('/project/'+props.match.params.projectID+'/'+(props.page===undefined?1:props.page)+','+(props.match.params.count?props.match.params.count:20));
        }else if(props.match.params.tagID){
          this.props.history.push('/tag/'+props.match.params.tagID+'/'+(props.page===undefined?1:props.page)+','+(props.match.params.count?props.match.params.count:20));
        }
      else if(props.match.params.id){
          this.props.history.push('/filter/'+props.match.params.id+'/'+(props.page===undefined?1:props.page)+','+(props.match.params.count?props.match.params.count:20));
        }
        else{
          this.props.history.push('/filter/'+(props.page===undefined?1:props.page)+','+(props.match.params.count?props.match.params.count:20));
        }
      }
    else if((this.props.page!=props.page && props.body!==null )||(this.props.match.params.count!=props.match.params.count && props.body!==null)){
      let randomFloat= Math.random();
      this.setState({randomFloat,id:parseInt(props.match.params.id, 10)});
      this.props.clearErrorMessage(randomFloat);
      this.props.addActiveRequests(1);
      this.props.loadUnsavedFilter(props.match.params.count?props.match.params.count:20,props.page,props.body,props.order,props.token);
      if(props.match.params.projectID){
        this.props.history.push('/project/'+props.match.params.projectID+'/'+(props.page===undefined?1:props.page)+','+(props.match.params.count?props.match.params.count:20));
      }else if(props.match.params.tagID){
        this.props.history.push('/tag/'+props.match.params.tagID+'/'+(props.page===undefined?1:props.page)+','+(props.match.params.count?props.match.params.count:20));
      }
      else{
        this.props.history.push('/filter/'+props.match.params.id+'/'+(props.page===undefined?1:props.page)+','+(props.match.params.count?props.match.params.count:20));
      }
    }
  }

  render(){
    if(!this.props.taskProjectsLoaded||!this.props.statusesLoaded||
      !this.props.companiesLoaded||!this.props.taskAttributesLoaded||!this.props.tagsLoaded||!this.props.unitsLoaded||
    !this.props.usersLoaded||this.props.sidebar.length===0){
      return null;
    }
    return <FilterLoader history={this.props.history} match={this.props.match} />
  }
}

//all below is just redux storage

const mapStateToProps = ({tasksReducer, statusesReducer, companiesReducer,tagsReducer,taskAttributesReducer,unitsReducer, usersReducer,filtersReducer,sidebarReducer, login }) => {
  const {taskProjectsLoaded } = tasksReducer;
  const {statusesLoaded, updateDate, taskStatuses } = statusesReducer;
  const {companiesLoaded, taskCompanies } = companiesReducer;
  const {tagsLoaded, tags} = tagsReducer;
  const {taskAttributesLoaded, taskAttributes} = taskAttributesReducer;
  const {unitsLoaded} = unitsReducer;
  const {usersLoaded, users} = usersReducer;
  const { body, filterState, page, order } = filtersReducer;
  const { sidebar } = sidebarReducer;
  const {token} = login;
	let index = sidebar.findIndex(item => item.name === "projects");
	let index2 = sidebar.findIndex(item => item.name === "archived");

  return {statuses:taskStatuses,
    projects:(index===-1?[]:sidebar[index].children).concat(index2===-1?[]:sidebar[index2].children),
    taskProjectsLoaded,taskAttributesLoaded, taskAttributes, statusesLoaded,
    statusesUpdateDate:updateDate,companiesLoaded,companies:taskCompanies,companiesUpdateDate:companiesReducer.updateDate,
    tagsLoaded,tags, unitsLoaded, usersLoaded,users, filterState,body,page,sidebar, order, token};
  };

export default connect(mapStateToProps, {
  startTaskProjectsLoading,startStatusesLoading,loadUnsavedFilter,addActiveRequests,
  getTaskStatuses,getTaskProjects, startCompaniesLoading,getTaskCompanies,getProject,
  startTaskAttributesLoading,getTaskAttributes,getTags,startTagsLoading,
  startUnitsLoading, getTaskUnits, deleteTaskSolvers, startUsersLoading, getUsers,
  clearErrorMessage, clearFilterTasks, getFilter,getUsersFilter,startFilterLoading, setFilterPage,
  setFilterBody})(Loader);
