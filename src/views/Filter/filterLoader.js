import React, { Component } from "react";
import { connect } from 'react-redux';

import { getFilter, startFilterLoading, getUsersFilter, clearFilterTasks, addActiveRequests } from '../../redux/actions';
import Tasks from './Tasks';
import Loading from '../../components/Loading';

class FilterLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      randomFloat:Math.random(),
    }
  }

  getFilterItem(ID,items){
    let res=items.find((item)=>item.id!==undefined&&item.id.toString()===ID);
    if(res===undefined){
      return false;
    }
    res.label=res.name;
    res.value=res.id;
    return res;
  }

  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    if(this.props.match.params.id){
      this.props.startFilterLoading(false);
      this.props.addActiveRequests(1);
      let project;
      if(this.props.match.params.projectID!=='all'){
        project= this.getFilterItem(this.props.match.params.projectID, this.props.projects);
        if(!project){
          this.props.history.push('/404');
          return;
        }
      }
     if(this.props.match.params.id!=='add'){
      this.props.getFilter(this.props.taskAttributes,this.props.statuses,this.props.projects,this.props.users,this.props.tags,this.props.companies,this.props.match.params.id,this.props.history,project,this.props.token);
      }
      else{
        this.props.getUsersFilter(this.props.taskAttributes,this.props.statuses,this.props.projects,this.props.users,this.props.tags,this.props.companies,project,this.props.match.params,this.props.order,this.props.token);
      }
    }
  }

  render(){
    return <Tasks history={this.props.history} match={this.props.match} />
  }
}

//all below is just redux storage

const mapStateToProps = ({tasksReducer, statusesReducer,sidebarReducer, companiesReducer,tagsReducer,taskAttributesReducer,unitsReducer, usersReducer,filtersReducer, login }) => {
  const {taskProjectsLoaded, taskProjects } = tasksReducer;
  const {statusesLoaded, updateDate, taskStatuses } = statusesReducer;
  const {companiesLoaded, taskCompanies } = companiesReducer;
  const {tagsLoaded, tags} = tagsReducer;
  const {taskAttributesLoaded, taskAttributes} = taskAttributesReducer;
  const {unitsLoaded} = unitsReducer;
  const {sidebar} = sidebarReducer;
  const {usersLoaded, users} = usersReducer;
  const { body, filterState, page, filterLoaded, order } = filtersReducer;
  const {token} = login;
  let projectsOnly = sidebar?sidebar.projects.children:[];
  let archived = sidebar?sidebar.archived.children:[];


  return {statuses:taskStatuses,projects: (projectsOnly.concat(archived)),taskProjectsLoaded,taskAttributesLoaded, taskAttributes, statusesLoaded,
    statusesUpdateDate:updateDate,companiesLoaded,companies:taskCompanies, companiesUpdateDate:companiesReducer.updateDate,
    tagsLoaded,tags, unitsLoaded, sidebar, usersLoaded,users,filterLoaded, filterState,body,page, token,order,
    filters: sidebar.filters.children};
  };


export default connect(mapStateToProps, {getFilter, startFilterLoading, getUsersFilter, clearFilterTasks, addActiveRequests})(FilterLoader);
