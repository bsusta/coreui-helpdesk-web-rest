import React, { Component } from "react";
import { connect } from "react-redux";
import { setTaskID, setFilterBody, setShowFilter, editTask } from "../../../redux/actions";
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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Column from './column';
import {TASKS_LIST} from '../../../redux/urls';

class Project extends Component {
  constructor(props){
    super(props);
      this.state = {
        tasks:{},
        tasksLoaded:false,
        lastStatusCount:0
      };
      this.getTasks.bind(this);
      this.getTasks(this.props.body);
    }

    componentWillReceiveProps(props){
      if(JSON.stringify(this.props.body)!==JSON.stringify(props.body)|| (props.body.body && props.body.body.statuses.length!==this.state.lastStatusCount)){
        this.getTasks(props.body);
      }
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

    getTasks(body){
      fetch(TASKS_LIST+'?limit=1999&page=1&'+body.order+(body.body?('&'+filterBodyFromState(body.body,this.props.taskAttributes)):""), {
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
          let tasks ={};
          this.props.taskStatuses.map((status)=>tasks[status.id]=data.data.filter((task)=>task.status.id===status.id));
          this.setState({tasksLoaded:true,tasks:tasks, lastStatusCount:body.body.statuses.length});
        });
      }).catch(function (error) {
        console.log(error);
      });
    }

    onDragEnd (result){
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
          let items = [...this.state.tasks[source.droppableId]];
          const [removed] = items.splice(source.index, 1);
          items.splice(destination.index, 0, removed);
          let tasks = { ...this.state.tasks };
          tasks[source.droppableId] = items;
          this.setState({tasks});
        } else {
              let sourceTasks = [...this.state.tasks[source.droppableId]];
              let destinationTasks = [...this.state.tasks[destination.droppableId]];
              let [removed] = sourceTasks.splice(source.index, 1);

              let body={title:removed.title};
              let tempStatus=this.props.taskStatuses.find((item)=>item.id.toString()===parseInt(destination.droppableId).toString());
              if(tempStatus.title!=='Closed'||!tempStatus.default){
                body.closedAt=null;
              }
              else{
                if(removed.status.id===tempStatus.id){
                  body.closedAt=removed.closedAt;
                }else{
                  body.closedAt=new Date().getTime()/1000;
                }
              }
              this.props.editTask(
                body,
                removed.id,
                removed.project.id,
                parseInt(destination.droppableId),
                removed.requestedBy.id,
                removed.company.id,
                this.props.token
              );

              removed.status.id = parseInt(destination.droppableId);
              destinationTasks.splice(destination.index, 0, removed);
              let tasks = {...this.state.tasks};
              tasks[source.droppableId] = sourceTasks;
              tasks[destination.droppableId] = destinationTasks;
              this.setState({tasks});
        }
    }

  render() {
    let selectedStatusesIDs=this.props.body.body.statuses.map((item2)=>item2.id);
    return (
      <div className="row">
        <CardHeader style={{display:'flex'}}>
          <label className="switch switch-text switch-primary">
            <input
              type="checkbox"
              className="switch-input"
              checked={this.props.showFilter}
              onChange={() => this.props.setShowFilter(!this.props.showFilter)}
              />
            <span className="switch-label" data-on="On" data-off="Off" />
            <span className="switch-handle" />
          </label>
          <label style={{ paddingLeft: 10 }}>
            {i18n.t('filter')}
          </label>
          <span className="form-check" style={{paddingLeft:10}}>
            <label className="form-check-label">
              <input
                type="checkbox"
                checked={selectedStatusesIDs.length===0}
                onChange={() =>{
                  if(selectedStatusesIDs.length!==0){
                    let body = {...this.props.body.body,statuses:[]};
                    this.props.setFilterBody({body});
                  }
                }
              }
              className="form-check-input"
              />
            {i18n.t('all')}
          </label>
        </span>
        {
          this.props.taskStatuses.map((item)=>
          <span className="form-check" style={{paddingLeft:10}}>
            <label className="form-check-label">
              <input
                type="checkbox"
                checked={selectedStatusesIDs.includes(item.id)}
                onChange={() =>{
                  let newStatuses=this.props.body.body.statuses;
                  if(selectedStatusesIDs.includes(item.id)){
                    newStatuses.splice(newStatuses.findIndex((item2)=>item.id===item2.id),1);
                  }else{
                    newStatuses.push(item);
                  }

                  let body = {...this.props.body.body,statuses:[...newStatuses]};
                  this.props.setFilterBody({ body });
                }
              }
              className="form-check-input"
              />
            {item.title}
          </label>
        </span>
      )
    }

  </CardHeader>
  <div style={{width:'100%'}}>
    <div style={{display:'flex', paddingLeft:20, overflowY:'scroll'}}>
      <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
        {
          (selectedStatusesIDs.length!==0?
          this.props.taskStatuses.filter(item => selectedStatusesIDs.includes(item.id)):this.props.taskStatuses)
          .map((status)=>
          <div>
            <CardHeader style={{backgroundColor:status.color, color:'white', width:'270px', fontWeight:'bold',marginLeft:3}}>
              {status.title.toUpperCase()}
            </CardHeader>
          <Droppable droppableId={status.id.toString()}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                    background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                    padding: 2,
                    margin:3,
                    width:'270px'
                }}>
                { Object.keys(this.state.tasks).includes(status.id.toString()) && this.state.tasks[status.id].map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id}
                    index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        >
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
                            <span className="badge badge-success" style={{backgroundColor:status.color,padding:2,marginTop:'auto', marginBottom:'auto'}}>{status.title}</span>
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
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        )
        }
          </DragDropContext>
      </div>
    </div>
  </div>
);
}
}

const mapStateToProps = ({ tasksReducer,projectsReducer,statusesReducer, sidebarReducer,filtersReducer,taskAttributesReducer, login }) => {
  const { taskID } = tasksReducer;
  const {numberOfPages, tasks, body, showFilter} = filtersReducer;
  const { taskAttributes} = taskAttributesReducer;
  const { taskStatuses } = statusesReducer;
  const { project } = projectsReducer;
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
    taskStatuses,
    taskAttributes,
    projects: (projectsOnly.concat(archived)),
    token
  };
};

export default connect(mapStateToProps, { setTaskID, setFilterBody, setShowFilter, editTask })(Project);
