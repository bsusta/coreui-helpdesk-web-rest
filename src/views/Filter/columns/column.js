import React, { Component } from "react";
import { connect } from "react-redux";
import {TASKS_LIST} from '../../../redux/urls';
import {
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton
} from "reactstrap";
import Pagination from "../../../components/pagination";
import { timestampToString, filterBodyFromState } from "../../../helperFunctions";
import i18n from 'i18next';

class Column extends Component {
  constructor(props){
    super(props);
    this.state={
      tasks:[],
      tasksLoaded:false
    }
    this.getTasks.bind(this);
    this.getTasks(this.props.body);
  }

  componentWillReceiveProps(props){
    if(JSON.stringify(this.props.body)!==JSON.stringify(props.body)){
      this.getTasks(props.body);
    }
  }

  getTasks(body){
    let loadBody={...body.body};
    loadBody.statuses=[this.props.status];
    fetch(TASKS_LIST+'?limit=1999&page=1&'+body.order+(loadBody?('&'+filterBodyFromState(loadBody,this.props.taskAttributes)):""), {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      }
    }).then((response) =>{
      if(!response.ok){
        this.setState({tasksLoaded:true});
        return;
      }
      response.json().then((data) => {
        this.setState({tasksLoaded:true,tasks:data.data});
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

  usersToString(users) {
    if (users.length === 0) {
      return  i18n.t('noone');
    }
    let text = "";
    Object.values(users).map(
      solver => (text = text + (solver.user.username + " "))
    );
    return text;
  }

  render() {
    return (
      <div style={{marginLeft:10}}  key={this.props.status.id}>
        <CardHeader style={{backgroundColor:this.props.status.color, color:'white', width:'270px', fontWeight:'bold'}}>
          {this.props.status.title.toUpperCase()}
        </CardHeader>
        <ul style={{paddingLeft:0, width:'270px'}}>
          {this.state.tasks.map((task)=>
            <li className="list-group-item item-in-column" key={task.id}
              onClick={() => {
                if(this.props.body.filterID){
                  if (task.canEdit) {
                    this.props.history.push(
                      '/filter/' +
                      this.props.body.filterID +
                      '/project/' +
                      this.props.match.params.projectID +
                      '/task/edit/' +
                      task.id
                    );
                  } else {
                    this.props.history.push(
                      '/filter/' +
                      this.props.body.filterID +
                      '/project/' +
                      this.props.match.params.projectID +
                      '/task/view/' +
                      task.id
                    );
                  }
                }else if(this.props.match.params.tagID){
                  if (task.canEdit) {
                    this.props.history.push(
                      '/tag/' +
                      this.props.match.params.tagID +
                      '/project/' +
                      this.props.match.params.projectID +
                      '/task/edit/' +
                      task.id
                    );
                  } else {
                    this.props.history.push(
                      '/tag/' +
                      this.props.match.params.tagID +
                      '/project/' +
                      this.props.match.params.projectID +
                      '/task/view/' +
                      task.id
                    );
                  }
                }else{
                  console.log('unexpected');
                }
              }}>
              <div  className="d-flex flex-row justify-content-between" >
                <h5>{task.title}</h5>
                <span className="badge badge-success" style={{backgroundColor:task.status.color,padding:2,marginTop:'auto', marginBottom:'auto'}}>{task.status.title}</span>
              </div>
              <p style={{marginBottom:0}}>
                {task.tags.map(tag => (
                  <span
                    key={tag.id}
                    className="badge mr-1"
                    style={{
                      backgroundColor:
                      (tag.color.includes("#") ? "" : "#") + tag.color,
                      color: "white"
                    }}
                    >
                    {tag.title}
                  </span>
                ))}
              </p>
              <div style={{marginBottom:0}}>
                Zadal:{task.requestedBy.username}
              </div>
              <p style={{marginBottom:0}}>
                <span>
                  Riešil/i:{this.usersToString(task.taskHasAssignedUsers)}
                </span>
                <span style={{float:'right'}}>
                  {task.deadline ? timestampToString(task.deadline) :  i18n.t('none')}
                </span>
              </p>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ tasksReducer,projectsReducer, sidebarReducer,filtersReducer,taskAttributesReducer, login }) => {
  const { taskID } = tasksReducer;
  const {numberOfPages, tasks, body, showFilter} = filtersReducer;
  const { project } = projectsReducer;
  const { taskAttributes} = taskAttributesReducer;
  const { sidebar } = sidebarReducer;
  const { token } = login;
  let projectsOnly = sidebar?sidebar.projects.children:[];
  let archived = sidebar?sidebar.archived.children:[];
  return {
    tasks,
    taskID,
    numberOfPages,
    project,
    body,
    showFilter,
    taskAttributes,
    projects: (projectsOnly.concat(archived)),
    token
  };
};

export default connect(mapStateToProps, { })(Column);
