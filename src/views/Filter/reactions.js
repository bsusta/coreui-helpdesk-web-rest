import React, { Component } from "react";
import { connect } from 'react-redux';

import Tasks from './Tasks';
import Loading from '../../components/Loading';
import {createEmptyFilterBody} from '../../helperFunctions';

class Loader extends Component {

  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.startStatusesLoading();
    this.props.startCompaniesLoading();
    this.props.startTaskAttributesLoading();
    this.props.startTagsLoading();
    this.props.startUnitsLoading();
    this.props.startUsersLoading();
    this.props.deleteTaskSolvers();
    this.props.addActiveRequests(6);
    this.props.getTaskStatuses(this.props.statusesUpdateDate,this.props.token);
    this.props.getTaskCompanies(this.props.companiesUpdateDate,this.props.token);
    this.props.getTaskAttributes(this.props.token);
    this.props.getTags(this.props.token);
    this.props.getTaskUnits(this.props.token);
    this.props.getUsers("",this.props.token);
    let urlData=this.props.match.params;
    let body={body:createEmptyFilterBody()};
    if(urlData.id){
      body.filterID=urlData.id;
    }else{
      body.filterID=null;
    }
    if(urlData.tagID){
      body.tagID=urlData.tagID;
      let tag = this.getFilterItem(urlData.tagID,this.props.tags);
      body.body.tags=tag?[tag]:[];
    }
    if(!urlData.tagID){
      body.tagID=null;
    }
    if(urlData.projectID){
      body.projectID=urlData.projectID;
      let project = this.getFilterItem(urlData.projectID,this.props.projects);
        body.body.projects=project?[project]:[];
    }
    if(urlData.count){
      body.count=urlData.count;
    }
    if(urlData.page){
      body.page=urlData.page;
    }
    this.props.setFilterBody(body);
  }

  getFilterItem(ID,items){
    let res=items.find((item)=>item.id&&item.id.toString()===ID);
    if(res===undefined){
      return false;
    }
    res.label=res.name;
    res.value=res.id;
    return res;
  }

  componentWillReceiveProps(props){
    //ak sa zmeni filter, nacitaj ho
    if(JSON.stringify(this.props.body)!==JSON.stringify(props.body)){
      console.log('something has changed in body');
      if((this.props.body.filterID!==props.body.filterID||this.props.body.projectID!==props.body.projectID) && props.body.filterID!==null){
        console.log('filter has changed');
        if(props.body.filterID!=='add'){
        this.props.getFilter(this.props.taskAttributes,this.props.statuses,this.props.projects,this.props.users,this.props.tags,this.props.companies,this.props.history,props.body,this.props.token);
        }else{
          this.props.getUsersFilter(this.props.taskAttributes,this.props.statuses,this.props.projects,this.props.users,this.props.tags,this.props.companies,props.body,this.props.token);
        }
      }
      else{
        //neziskali sme novu ID filtra, nacitame z body
        this.props.loadUnsavedFilter(props.body,this.props.taskAttributes,this.props.token);
      }
    }
    else if(
      this.props.match.params.projectID!==props.match.params.projectID||
      this.props.match.params.tagID!==props.match.params.tagID||
      this.props.match.params.page!=props.match.params.page||
      this.props.match.params.count!=props.match.params.count||
      this.props.match.params.id!==props.match.params.id
    ){
      console.log('something has changed in parameters');
      let urlData=props.match.params;
      let body={body:props.body.body};
      if(urlData.id){
        body.filterID=urlData.id;
      }else{
        body.filterID=null;
      }
      if(urlData.tagID && this.props.match.params.tagID!==props.match.params.tagID){
        body.body=createEmptyFilterBody();
        body.tagID=urlData.tagID;
        let tag = this.getFilterItem(urlData.tagID,props.tags);
        body.body.tags=tag?[tag]:[];
      }
      if(!urlData.tagID){
        body.tagID=null;
      }
      if(urlData.projectID){
        body.projectID=urlData.projectID;
        let project = this.getFilterItem(urlData.projectID,props.projects);
          body.body.projects=project?[project]:[];
      }
      if(urlData.count){
        body.count=urlData.count;
      }
      if(urlData.page){
        body.page=urlData.page;
      }
      this.props.setFilterBody(body);
    }
  }

  render(){
    if(!this.props.statusesLoaded||
      !this.props.companiesLoaded||!this.props.taskAttributesLoaded||!this.props.tagsLoaded||!this.props.unitsLoaded||
      !this.props.usersLoaded||!this.props.sidebar){
        return null;
      }
      return <Tasks history={this.props.history} match={this.props.match} />
    }
}

  //all below is just redux storage

const mapStateToProps = ({tasksReducer, statusesReducer, companiesReducer,tagsReducer,taskAttributesReducer,unitsReducer, usersReducer,filtersReducer,sidebarReducer, login }) => {
  const {statusesLoaded, updateDate, taskStatuses } = statusesReducer;
  const {companiesLoaded, taskCompanies } = companiesReducer;
  const {tagsLoaded} = tagsReducer;
  const {taskAttributesLoaded, taskAttributes} = taskAttributesReducer;
  const {unitsLoaded} = unitsReducer;
  const {usersLoaded, users} = usersReducer;
  const { body, filterState, page, order, updateAt } = filtersReducer;
  const { sidebar } = sidebarReducer;
  const {token} = login;
  let projectsOnly = sidebar?sidebar.projects.children:[];
  let archived = sidebar?sidebar.archived.children:[];
  let tags = sidebar?sidebar.tags.children:[];
    return {statuses:taskStatuses,
      projects: (projectsOnly.concat(archived)),
      taskAttributesLoaded, taskAttributes, statusesLoaded,updateAt,
      statusesUpdateDate:updateDate,companiesLoaded,companies:taskCompanies,companiesUpdateDate:companiesReducer.updateDate,
      tagsLoaded,tags, unitsLoaded, usersLoaded,users, filterState,body,page,sidebar, order, token};
  };
import {startStatusesLoading,loadUnsavedFilter,addActiveRequests,
  getTaskStatuses, startCompaniesLoading,getTaskCompanies,
  startTaskAttributesLoading,getTaskAttributes,getTags,startTagsLoading,getProject,
  startUnitsLoading, getTaskUnits, deleteTaskSolvers, startUsersLoading, getUsers,
  clearErrorMessage, clearFilterTasks, getFilter, getUsersFilter,startFilterLoading, setFilterPage,
  setFilterBody
} from '../../redux/actions';

export default connect(mapStateToProps, {
  startStatusesLoading,loadUnsavedFilter,addActiveRequests,
  getTaskStatuses, startCompaniesLoading,getTaskCompanies,getProject,
  startTaskAttributesLoading,getTaskAttributes,getTags,startTagsLoading,
  startUnitsLoading, getTaskUnits, deleteTaskSolvers, startUsersLoading, getUsers,
  clearErrorMessage, clearFilterTasks, getFilter,getUsersFilter,startFilterLoading, setFilterPage,
  setFilterBody
})(Loader);
