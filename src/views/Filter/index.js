import React, { Component } from "react";
import { connect } from "react-redux";
import Reactions from "./reactions";

class DataLoader extends Component {
  constructor(props){
    super(props);
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
  }
  render() {
    if(!this.props.statusesLoaded||
      !this.props.companiesLoaded||
      !this.props.taskAttributesLoaded||
      !this.props.tagsLoaded||
      !this.props.unitsLoaded||
      !this.props.usersLoaded||
      !this.props.sidebar){
      return null;
    }
    return <Reactions {...this.props}/>
  }
}

const mapStateToProps = ({tasksReducer, statusesReducer, companiesReducer,tagsReducer,taskAttributesReducer,unitsReducer, usersReducer,filtersReducer,sidebarReducer, login }) => {
  const {statusesLoaded, updateDate } = statusesReducer;
  const {companiesLoaded } = companiesReducer;
  const {tagsLoaded} = tagsReducer;
  const {taskAttributesLoaded} = taskAttributesReducer;
  const {unitsLoaded} = unitsReducer;
  const {usersLoaded} = usersReducer;
  const { sidebar } = sidebarReducer;
  const {token} = login;
    return {taskAttributesLoaded, statusesLoaded,
      statusesUpdateDate:updateDate,companiesLoaded,companiesUpdateDate:companiesReducer.updateDate,
      tagsLoaded, unitsLoaded, usersLoaded, sidebar, token};
  };
import {
  startStatusesLoading,startCompaniesLoading,startTaskAttributesLoading,startTagsLoading,startUnitsLoading,
  startUsersLoading,deleteTaskSolvers,addActiveRequests,getTaskStatuses,getTaskCompanies,getTaskAttributes,
  getTags,getTaskUnits,getUsers
} from '../../redux/actions';

export default connect(mapStateToProps, {
  startStatusesLoading,startCompaniesLoading,startTaskAttributesLoading,startTagsLoading,startUnitsLoading,
  startUsersLoading,deleteTaskSolvers,addActiveRequests,getTaskStatuses,getTaskCompanies,getTaskAttributes,
  getTags,getTaskUnits,getUsers
})(DataLoader);
