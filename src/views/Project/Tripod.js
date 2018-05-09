import React, { Component } from "react";
import { connect } from "react-redux";
import { getProjectTasks, setTaskID } from "../../redux/actions";
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
import Pagination from "../../components/pagination";
import { timestampToString } from "../../helperFunctions";
import i18n from 'i18next';
import EditTask from '../EditTask';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: this.props.match.params.page
        ? parseInt(this.props.match.params.page, 10)
        : 1,
        taskID:this.props.tasks.length>0?this.props.tasks[0].id:null,
    };
    if(this.props.tasks.length>0){
      this.props.setTaskID(this.props.tasks[0].id);
    }
  }

  setPage(number) {
    this.setState({ pageNumber: number });
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
      <div className="table-div row">
        <div style={{overflowY:'scroll',height:'90vh', overflowX:'hide'}} className='col-4'>
          <div className="justify-content-between row table-div">
            <h2>
              {
                this.props.projects[
                  this.props.projects.findIndex(project =>
                    project.url.includes(this.props.match.params.id)
                  )
                ].name
              }
            </h2>
            <div>
              <i className="fa fa-columns"
                style={{
                  border: "none",
                  color: "#43A3D6",
                  fontSize:'2em',
                }}
                onClick={()=>{this.props.setTripod();this.props.history.push('/project/'+this.props.match.params.id);}}
                />
              <a
                href={(this.props.project.canEdit?"#/project/edit/":"#/project/info/") + parseInt(this.props.match.params.id, 10)}
                className="fa fa-info-circle"
                style={{
                  border: "none",
                  color: "grey",
                  textDecoration: "none",
                  fontSize:'2em',
                  marginLeft:5,
                }}
                />
            </div>
          </div>
          <ul className="list-group" style={{}}>
              {this.props.tasks.map(task => (
                  <li className="list-group-item" style={{cursor:'pointer'}} key={task.id} onClick={()=>{
                      this.setState({taskID:task.id});
                      this.props.history.push('/project/'+this.props.match.params.id+'/'+task.id);
                      setTimeout(()=>this.props.setTaskID(task.id), 30);
                    }}>
                    <h5>{task.title}</h5>
                    <p>
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
                      <p>
                        <span>
                          Zadal:{task.requestedBy.username}
                        </span>
                        <span style={{float:'right'}} className="badge badge-success">{task.status.title}</span>
                      </p>
                      <p>
                        <span>
                          Riešil/i:{this.usersToString(task.taskHasAssignedUsers)}
                        </span>
                        <span style={{float:'right'}}>
                          {task.deadline ? timestampToString(task.deadline) :  i18n.t('none')}
                        </span>
                      </p>
                  </li>
              ))}
            </ul>
          <Pagination
            link={"project/" + this.props.match.params.id}
            history={this.props.history}
            numberOfPages={this.props.numberOfPages}
            refetchData={this.props.getProjectTasks}
            token={this.props.token}
            refetchParameters={[parseInt(this.props.match.params.id, 10)]}
            pageNumber={this.state.pageNumber}
            setPageNumber={this.setPage.bind(this)}
            small={true}
            paginationOptions={[
              { title: 20, value: 20 },
              { title: 50, value: 50 },
              { title: 100, value: 100 }
            ]}
            pagination={
              this.props.match.params.count
                ? parseInt(this.props.match.params.count, 10)
                : 20
            }
          />
        </div>
        <div style={{height:'90vh', overflowY:'scroll',overflowX:'hide'}} className='col-8'>
          {this.props.taskID===this.state.taskID && <EditTask taskID={this.state.taskID} history={this.props.history} match={this.props.match}/>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tasksReducer,projectsReducer, sidebarReducer, login }) => {
  const { tasks, projectLinks,taskID } = tasksReducer;
  const { project } = projectsReducer;
  const { sidebar } = sidebarReducer;
  const { token } = login;
  return {
    tasks,
    taskID,
    project,
    projects:
      sidebar[sidebar.findIndex(item => item.name === "projects")].children.concat(sidebar[sidebar.findIndex(item => item.name === "archived")].children),
    numberOfPages: projectLinks.numberOfPages,
    projectID: projectLinks.id,
    token
  };
};

export default connect(mapStateToProps, { getProjectTasks,setTaskID })(Project);
