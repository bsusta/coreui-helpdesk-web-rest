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
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    if(this.props.match.params.id){
      this.props.startFilterLoading(false);
      this.props.addActiveRequests(1);
     if(this.props.match.params.id!=='add'){
      this.props.getFilter(this.props.taskAttributes,this.props.statuses,this.props.projects,this.props.users,this.props.tags,this.props.companies,this.props.match.params.id,this.props.history,this.props.token);
      }
      else{
        this.props.getUsersFilter(this.props.taskAttributes,this.props.statuses,this.props.projects,this.props.users,this.props.tags,this.props.companies,this.props.token);
      }
    }
  }

  componentWillReceiveProps(props){
    return;
    if(props.match.params.id && this.props.match.params.id!==props.match.params.id){
      if(props.filters.findIndex(filter =>filter.url.includes('/'+props.match.params.id))===-1){
        this.props.history.push('/404');
      }
      /*
      if(props.match.params.id==='add'){
        this.props.startFilterLoading(false);
        this.props.getUsersFilter(this.props.taskAttributes,this.props.statuses,this.props.projects,this.props.users,this.props.tags,this.props.companies,this.props.token);
      }
      else{
        this.props.startFilterLoading(false);
        this.props.getFilter(props.taskAttributes,props.statuses,props.projects,props.users,props.tags,props.companies,props.match.params.id,this.props.history,props.token);
      }*/
    }
  }

  render(){
    if((this.props.match.params.id && !this.props.filterLoaded)||this.props.sidebar.length===0){
      return <Tasks history={this.props.history} match={this.props.match} />
    }
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
  const { body, filterState, page, filterLoaded } = filtersReducer;
  const {token} = login;

  return {statuses:taskStatuses,projects:taskProjects,taskProjectsLoaded,taskAttributesLoaded, taskAttributes, statusesLoaded,
    statusesUpdateDate:updateDate,companiesLoaded,companies:taskCompanies, companiesUpdateDate:companiesReducer.updateDate,
    tagsLoaded,tags, unitsLoaded, sidebar, usersLoaded,users,filterLoaded, filterState,body,page, token,
    filters: sidebar[sidebar.findIndex(item => item.name === "filters")].children};
  };


export default connect(mapStateToProps, {getFilter, startFilterLoading, getUsersFilter, clearFilterTasks, addActiveRequests})(FilterLoader);
