import React, { Component } from "react";
import { connect } from 'react-redux';
import Tasks from './main';
import {createEmptyFilterBody} from '../../helperFunctions';

class Loader extends Component {

  //before loader page is loaded, we send requests to get all available units
  constructor(props){
    super(props);
    this.state={
      lastStatusCount:0
    }
    let urlData=this.props.match.params;
    let body={body:createEmptyFilterBody(),order:this.props.body.order};
    body.forcedUpdate=this.props.forcedUpdate;

    if(urlData.id){
      body.reportID=urlData.id;
    }else{
      body.reportID=null;
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
    if(body.reportID!==null ){
      if(body.reportID!=='add'){
        this.props.addActiveRequests(2);
        this.props.getReport(this.props.taskAttributes,this.props.statuses,this.props.projects,this.props.users,this.props.tags,this.props.companies,this.props.history,body,this.props.token);
      }else{
        this.props.addActiveRequests(2);
        this.props.getUsersReport(this.props.taskAttributes,this.props.statuses,this.props.projects,this.props.users,this.props.tags,this.props.companies,body,this.props.token);
      }
    }else{
      this.props.addActiveRequests(1);
      this.props.loadUnsavedReport(body,this.props.taskAttributes,this.props.token);
    }
    this.props.setReportBody(body);
  }

  getReportItem(ID,items){
    let res=items.find((item)=>item.id&&item.id.toString()===ID);
    if(res===undefined){
      return false;
    }
    res.label=res.name;
    res.value=res.id;
    return res;
  }

  componentWillReceiveProps(props){
    if(props.forceUpdate){
      this.props.setReportForceUpdate(false);
      if(props.body.reportID!==null  && props.body.reportID!==this.props.body.reportID){
        if(props.body.reportID!=='add'){
          this.props.addActiveRequests(2);
          this.props.getReport(this.props.taskAttributes,this.props.statuses,this.props.projects,this.props.users,this.props.tags,this.props.companies,this.props.history,props.body,this.props.token);
        }else{
          this.props.addActiveRequests(2);
          this.props.getUsersReport(this.props.taskAttributes,this.props.statuses,this.props.projects,this.props.users,this.props.tags,this.props.companies,props.body,this.props.token);
        }
      }
      else{
        this.props.addActiveRequests(1);
        this.props.loadUnsavedReport(props.body,this.props.taskAttributes,this.props.token);
      }

    }
    else if(
      this.props.match.params.id!==props.match.params.id||
      this.props.match.params.page!=props.match.params.page||
      this.props.match.params.count!=props.match.params.count||
      this.props.match.params.id!==props.match.params.id
    ){
      //console.log('something has changed in parameters');
      //console.log(props.match);
      let urlData=props.match.params;
      let body={body:props.body.body};
      if(urlData.id){
        body.reportID=urlData.id;
      }else{
        body.reportID=null;
      }
      if(urlData.count){
        body.count=urlData.count;
      }
      if(urlData.page){
        body.page=urlData.page;
      }
      if(this.props.match.params.id!==props.match.params.id){
          body.page=1;
        }
        //console.log(body);
        //console.log('change of params');
        this.props.setReportBody(body);
        this.props.setReportForceUpdate(true);
      }
    }

    render(){
      return <Tasks history={this.props.history} match={this.props.match} />
    }
}

  //all below is just redux storage

  const mapStateToProps = ({tasksReducer, statusesReducer, companiesReducer,tagsReducer,taskAttributesReducer,unitsReducer, usersReducer,reportsReducer,sidebarReducer, login }) => {
    const { taskStatuses } = statusesReducer;
    const { taskCompanies } = companiesReducer;
    const { taskAttributes} = taskAttributesReducer;
    const { users } = usersReducer;
    const { body, report, forceUpdate } = reportsReducer;
    const { sidebar } = sidebarReducer;
    const {token} = login;
    let projectsOnly = sidebar?sidebar.projects.children:[];
    let archived = sidebar?sidebar.archived.children:[];
    let tags = sidebar?sidebar.tags.children:[];
    return {
      statuses:taskStatuses,
      companies:taskCompanies,
      forceUpdate,
      projects: (projectsOnly.concat(archived)),
      taskAttributes,tags, users, body, report, sidebar, token};
    };

    import {loadUnsavedReport, getReport, getUsersReport,setReportBody, addActiveRequests, setReportForceUpdate } from '../../redux/actions';

    export default connect(mapStateToProps, {
      loadUnsavedReport, getReport, getUsersReport,setReportBody, addActiveRequests, setReportForceUpdate
    })(Loader);
