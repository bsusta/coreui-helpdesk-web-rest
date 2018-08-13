import React, { Component } from "react";
import { connect } from 'react-redux';

import {startStatusesLoading,loadUnsavedFilter,addActiveRequests,
  getTaskStatuses, startCompaniesLoading,getTaskCompanies,setFilterBody,
  startTaskAttributesLoading,getTaskAttributes,getTags,startTagsLoading,getProject,
  startUnitsLoading, getTaskUnits, deleteTaskSolvers, startUsersLoading, getUsers,
  clearErrorMessage, clearFilterTasks, getFilter, getUsersFilter,startFilterLoading, setFilterPage
} from '../../redux/actions';
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
    if(this.props.body){
      let randomFloat= Math.random();
      this.setState({randomFloat,id:parseInt(this.props.match.params.id, 10)});
      this.props.clearErrorMessage(randomFloat);
      this.props.addActiveRequests(1);
      this.props.loadUnsavedFilter(this.props.match.params.count?this.props.match.params.count:20,this.props.page?this.props.page:1,this.props.body,this.props.order,this.props.token);
      if(!this.props.match.params.page){
        this.props.setFilterPage(1);
      }
    }
    if(this.props.match.params.projectID && this.props.match.params.projectID!=='all'){
      this.props.addActiveRequests(1);
      this.props.getProject(this.props.match.params.projectID,this.props.history,this.props.token);
    }

    this.props.setFilterPage(this.props.match.params?this.props.match.params.page:1);
  }

  getFilterItem(ID,items){
    let res=items.find((item)=>item.id&&item.id.toString()===ID);
    if(res===undefined){
      console.log('not found');
      return false;
    }
    res.label=res.name;
    res.value=res.id;
    return res;
  }

  componentWillReceiveProps(props){
    //ak sa zmeni filter, nacitaj ho
    if(props.match.params.id && this.props.match.params.id!==props.match.params.id){
      if(props.match.params.id==='add'){
        this.props.startFilterLoading(false);
        this.props.addActiveRequests(1);
        this.props.getUsersFilter(this.props.taskAttributes,this.props.statuses,this.props.projects,this.props.users,this.props.tags,this.props.companies,this.props.token);
      }
      else{
        this.props.startFilterLoading(false);
        this.props.addActiveRequests(1);
        let project;
        if(props.match.params.projectID!=='all'){
          project= this.getFilterItem(props.match.params.projectID, props.projects);
          if(!project){
            this.props.history.push('/404');
            return;
          }
        }
        this.props.getFilter(props.taskAttributes,props.statuses,props.projects,props.users,props.tags,props.companies,props.match.params.id,this.props.history,project,props.token);
      }
    }
    //ak sa zmeni project, nacitaj ho
    else if(props.match.params.projectID && this.props.match.params.projectID!==props.match.params.projectID ){

      let project;
      if(props.match.params.projectID!=='all'){
        project= this.getFilterItem(props.match.params.projectID, props.projects);
        if(!project){
          console.log('not found');
          this.props.history.push('/404');
          return;
        }
        this.props.addActiveRequests(1);
        this.props.getProject(props.match.params.projectID,this.props.history,this.props.token);
      }

      let tag;
      if(props.match.params.tagID){
        tag=this.getFilterItem(props.match.params.tagID);
        if(!tag){
          console.log('not found');
          this.props.history.push('/404');
          return;
        }
      }

      let filter = this.props.match.params.id!=='add'?this.props.match.params.id:undefined;

      if(project && tag){
        this.props.setFilterBody('tag='+this.props.match.params.tagID+'&project='+this.props.match.params.projectID,{tags:[tag], projects:[project]},1);
      }else if(project && filter){
        this.props.getFilter(this.props.taskAttributes,this.props.statuses,this.props.projects,this.props.users,this.props.tags,this.props.companies,this.props.match.params.id,this.props.history,project,this.props.token);
      }else if(!project && tag){
        this.props.setFilterBody('tag='+this.props.match.params.tagID,{tags:[tag]},1);
      }else if(!project && filter){
        this.props.getFilter(this.props.taskAttributes,this.props.statuses,this.props.projects,this.props.users,this.props.tags,this.props.companies,this.props.match.params.id,this.props.history,null,this.props.token);
      }else if(!project && !filter){
        this.props.getUsersFilter(this.props.taskAttributes,this.props.statuses,this.props.projects,this.props.users,this.props.tags,this.props.companies,null,this.props.token);
      }
    }
    //ak sa zmeni tag, nacitaj ho
    else if(props.match.params.tagID && this.props.match.params.tagID!==props.match.params.tagID){
      console.log('tag zmena');
      let project;
      if(props.match.params.projectID!=='all'){
        project= this.getFilterItem(props.match.params.projectID, props.projects);
        if(!project){
          console.log('not found');

          this.props.history.push('/404');
          return;
        }
      }

      let tag;
      if(props.match.params.tagID){
        tag=this.getFilterItem(props.match.params.tagID);
        if(!tag){
          console.log('not found');

          this.props.history.push('/404');
          return;
        }
      }
      if(project && tag){
        this.props.setFilterBody('tag='+this.props.match.params.tagID+'&project='+this.props.match.params.projectID,{tags:[tag], projects:[project]},1);
      }else{
        this.props.setFilterBody('tag='+this.props.match.params.tagID,{tags:[tag]},1);
      }
    }
    //ak sa ymeni body alebo order nacitaj nanovo tasky
    else if((props.body!==null && (this.props.body===null) ||this.props.order!==props.order|| JSON.stringify(this.props.body)!=JSON.stringify(props.body))){
      let randomFloat= Math.random();
      this.setState({randomFloat,id:parseInt(props.match.params.id, 10)});
      this.props.clearErrorMessage(randomFloat);
      this.props.addActiveRequests(1);
      this.props.loadUnsavedFilter(props.match.params.count?props.match.params.count:20,props.page?props.page:1,props.body,props.order,props.token);
      if(!this.props.match.params.page){
        this.props.setFilterPage(1);
      }
      if(props.match.params.tagID){
        this.props.history.push('/tag/'+props.match.params.tagID+'/project/'+props.match.params.projectID+'/1,'+(props.match.params.count?props.match.params.count:20));
      }else{
        this.props.history.push('/filter/'+props.match.params.id+'/project/'+props.match.params.projectID+'/1,'+(props.match.params.count?props.match.params.count:20));
      }
    }
    //ak sa zmeni stranka, nacitaj tasky a zmen URL
    else if((this.props.page!=props.page && props.body!==null )||(this.props.match.params.count!=props.match.params.count && props.body!==null)||(this.props.updateAt!==props.updateAt && props.body!==null)){
      let randomFloat= Math.random();
      this.setState({randomFloat,id:parseInt(props.match.params.id, 10)});
      this.props.clearErrorMessage(randomFloat);
      this.props.addActiveRequests(1);
      this.props.loadUnsavedFilter(props.match.params.count?props.match.params.count:20,props.page?props.page:1,props.body,props.order,props.token);
      if(props.match.params.tagID){
        this.props.history.push('/tag/'+props.match.params.tagID+'/project/'+props.match.params.projectID+'/'+(props.page===undefined?1:props.page)+','+(props.match.params.count?props.match.params.count:20));
      }
      else {
        this.props.history.push('/filter/'+props.match.params.id+'/project/'+props.match.params.projectID+'/'+(props.page===undefined?1:props.page)+','+(props.match.params.count?props.match.params.count:20));
      }
    }
  }

  render(){
    if(!this.props.statusesLoaded||
      !this.props.companiesLoaded||!this.props.taskAttributesLoaded||!this.props.tagsLoaded||!this.props.unitsLoaded||
      !this.props.usersLoaded||!this.props.sidebar){
        return null;
      }
      return <FilterLoader history={this.props.history} match={this.props.match} />
    }
  }

  //all below is just redux storage

  const mapStateToProps = ({tasksReducer, statusesReducer, companiesReducer,tagsReducer,taskAttributesReducer,unitsReducer, usersReducer,filtersReducer,sidebarReducer, login }) => {
    const {statusesLoaded, updateDate, taskStatuses } = statusesReducer;
    const {companiesLoaded, taskCompanies } = companiesReducer;
    const {tagsLoaded, tags} = tagsReducer;
    const {taskAttributesLoaded, taskAttributes} = taskAttributesReducer;
    const {unitsLoaded} = unitsReducer;
    const {usersLoaded, users} = usersReducer;
    const { body, filterState, page, order, updateAt } = filtersReducer;
    const { sidebar } = sidebarReducer;
    const {token} = login;
    let projectsOnly = sidebar?sidebar.projects.children:[];
    let archived = sidebar?sidebar.archived.children:[];

      return {statuses:taskStatuses,
        projects: (projectsOnly.concat(archived)),
        taskAttributesLoaded, taskAttributes, statusesLoaded,updateAt,
        statusesUpdateDate:updateDate,companiesLoaded,companies:taskCompanies,companiesUpdateDate:companiesReducer.updateDate,
        tagsLoaded,tags, unitsLoaded, usersLoaded,users, filterState,body,page,sidebar, order, token};
      };

      export default connect(mapStateToProps, {
        startStatusesLoading,loadUnsavedFilter,addActiveRequests,
        getTaskStatuses, startCompaniesLoading,getTaskCompanies,getProject,
        startTaskAttributesLoading,getTaskAttributes,getTags,startTagsLoading,
        startUnitsLoading, getTaskUnits, deleteTaskSolvers, startUsersLoading, getUsers,
        clearErrorMessage, clearFilterTasks, getFilter,getUsersFilter,startFilterLoading, setFilterPage,
        setFilterBody})(Loader);
