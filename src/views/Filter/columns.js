import React, { Component } from "react";
import { connect } from "react-redux";
import { setTaskID, setFilterBody, setShowFilter, editTask } from "../../redux/actions";
import {
  Row,
  Col,
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
import Pagination from "../../components/pagination";
import { timestampToString, filterBodyFromState } from "../../helperFunctions";
import i18n from 'i18next';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {TASKS_LIST} from '../../redux/urls';

class Project extends Component {
  constructor(props){
    super(props);
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


  onDragEnd (result){
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      let items = [...this.props.tasks[source.droppableId]];
      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);
      let tasks = { ...this.props.tasks };
      tasks[source.droppableId] = items;
      this.setState({tasks});
    } else {
      let sourceTasks = [...this.props.tasks[source.droppableId]];
      let destinationTasks = [...this.props.tasks[destination.droppableId]];
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
      let tasks = {...this.props.tasks};
      tasks[source.droppableId] = sourceTasks;
      tasks[destination.droppableId] = destinationTasks;
      this.setState({tasks});
    }
  }

  render() {
		let selectedStatusesIDs=this.props.body.body.statuses.map((item2)=>item2.id);
    return (
      <div className="row main-container">
  <div style={{width:'100%'}} className="main-body">
    <div style={{display:'flex'}}>
      <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
        {
          (selectedStatusesIDs.length!==0?
            this.props.taskStatuses.filter(item => selectedStatusesIDs.includes(item.id)):this.props.taskStatuses)
            .map((status)=>
            <div key={status.id} className="column-container">
              <CardHeader className="column-header" style={{backgroundColor:status.color}}>
                {status.title.toUpperCase()}
              </CardHeader>
              <Droppable droppableId={status.id.toString()} style={{backgroundColor:'#fafafa'}}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver ? 'lightblue' : '#fafafa',
                      padding:20
                    }}>
                    { Object.keys(this.props.tasks).includes(status.id.toString()) && this.props.tasks[status.id].map((task, index) => (
                      <Draggable
                        key={task.id}
                        style={{border:'none'}}
                        draggableId={task.id}
                        index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            >
                            <li className="list-group-item item-in-column" style={{borderLeftColor:status.color}} key={task.id}
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
                                  <label className="mb-0">
                                    {task.title}
                                  </label>
                              </div>
                              <div style={{marginBottom:0}}>
                                <p className="pull-right">
                                  <i className="fa fa-clock-o" style={{marginRight:5}}/>
                                  <span>
                                    {task.deadline ? timestampToString(task.deadline) :  i18n.t('none')}
                                  </span>
                                </p>
                                <p className="text-muted">
                                  Zadal:{task.requestedBy.username}
                                </p>
                                <p className="text-muted">
                                  Riešil/i:{this.usersToString(task.taskHasAssignedUsers)}
                                </p>
                              </div>
                              <div style={{marginBottom:5, width:'100%'}} className="row">
                                {task.tags.map(tag => (
                                  <span
                                    key={tag.id}
                                    className="badge mr-1"
                                    style={{
                                      backgroundColor:
                                      (tag.color.includes("#") ? "" : "#") + tag.color,
                                      marginTop:5,
                                      color: "white"
                                    }}
                                    >
                                    {tag.title}
                                  </span>
                                ))}
                              </div>
                            </li>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div style={{position:'absolute',bottom:5}}>
                <span style={{padding:5}}>{i18n.t('taskCount')}: {this.props.tasks[status.id].length}</span>
              </div>
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
  let modifiedTasks ={};
  taskStatuses.map((status)=>modifiedTasks[status.id]=[...tasks].filter((task)=>task.status.id===status.id));
  console.log(tasks);
  console.log(modifiedTasks);
  return {
    tasks:modifiedTasks,
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