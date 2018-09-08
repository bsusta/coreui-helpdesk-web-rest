import React, { Component } from "react";
import { connect } from 'react-redux';

import Tasks from './main';
import Loading from '../../components/Loading';
import {createEmptyFilterBody} from '../../helperFunctions';

class Loader extends Component {

  //before loader page is loaded, we send requests to get all available units
  constructor(props){
    super(props);
    let urlData=this.props.match.params;
    let body={body:createEmptyFilterBody(),order:this.props.body.order};
    body.forcedUpdate=this.props.forcedUpdate;

    if(urlData.id){
      body.filterID=urlData.id;
    }else{
      body.filterID=null;
    }
    if(urlData.tagID){
      let tag = this.getFilterItem(urlData.tagID,this.props.tags);
      body.body.tags=tag?[tag]:[];
    }else{
      body.tagID=null;
    }
    if(urlData.projectID){
      body.projectID=urlData.projectID;
      let project = this.getFilterItem(urlData.projectID,this.props.projects);
      body.body.projects=project?[project]:[];
      if(project){
        this.props.getProject(urlData.projectID,this.props.history,this.props.token);
      }else{
        body.body.title=this.props.body.search;
      }
    }
    if(urlData.count){
      body.count=urlData.count;
    }else{
      body.count=this.props.body.count;
    }
    if(urlData.page){
      body.page=urlData.page;
    }else{
      body.page=1;
    }
    if(body.filterID!==null ){
      if(body.filterID!=='add'){
      this.props.getFilter(this.props.taskAttributes,this.props.statuses,this.props.projects,this.props.users,this.props.tags,this.props.companies,this.props.history,body,this.props.token);
      }else{
        this.props.getUsersFilter(this.props.taskAttributes,this.props.statuses,this.props.projects,this.props.users,this.props.tags,this.props.companies,body,this.props.token);
      }
    }else{
      this.props.loadUnsavedFilter(body,this.props.taskAttributes,this.props.token);
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
      //console.log('something has changed in body');
      //console.log(props.body.filterID);
      if(props.body.filterID!==null  && props.body.filterID!==this.props.body.filterID){
        //console.log('filter has changed');
        if(props.body.filterID!=='add'){
        this.props.getFilter(this.props.taskAttributes,this.props.statuses,this.props.projects,this.props.users,this.props.tags,this.props.companies,this.props.history,props.body,this.props.token);
        }else{
          this.props.getUsersFilter(this.props.taskAttributes,this.props.statuses,this.props.projects,this.props.users,this.props.tags,this.props.companies,props.body,this.props.token);
        }
      }
      else{
        //console.log('from change watcher');
        //console.log(props.body);
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
      //console.log('something has changed in parameters');
      //console.log(props.match);
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
          if(this.props.match.params.projectID!==props.match.params.projectID && urlData.projectID!=='all'){
            this.props.getProject(urlData.projectID,this.props.history,this.props.token);
          }
          body.body.projects=[project];
      }
      if(urlData.count){
        body.count=urlData.count;
      }
      if(urlData.page){
        body.page=urlData.page;
      }
      if(this.props.match.params.projectID!==props.match.params.projectID||
      this.props.match.params.tagID!==props.match.params.tagID||
      this.props.match.params.id!==props.match.params.id){
        body.page=1;
      }
      //console.log(body);
      //console.log('change of params');
      this.props.setFilterBody(body);
    }
  }

  render(){
      return <Tasks history={this.props.history} match={this.props.match} />
    }
}

  //all below is just redux storage

const mapStateToProps = ({tasksReducer, statusesReducer, companiesReducer,tagsReducer,taskAttributesReducer,unitsReducer, usersReducer,filtersReducer,sidebarReducer, login }) => {
  const { taskStatuses } = statusesReducer;
  const { taskCompanies } = companiesReducer;
  const { taskAttributes} = taskAttributesReducer;
  const { users} = usersReducer;
  const { body, filter } = filtersReducer;
  const { sidebar } = sidebarReducer;
  const {token} = login;
  let projectsOnly = sidebar?sidebar.projects.children:[];
  let archived = sidebar?sidebar.archived.children:[];
  let tags = sidebar?sidebar.tags.children:[];
    return {statuses:taskStatuses,companies:taskCompanies,
      projects: (projectsOnly.concat(archived)),
      taskAttributes,tags, users, body, filter,sidebar, token};
  };
import {loadUnsavedFilter,getProject, getFilter, getUsersFilter,setFilterBody} from '../../redux/actions';

export default connect(mapStateToProps, {
  loadUnsavedFilter,getProject, getFilter, getUsersFilter,setFilterBody
})(Loader);
