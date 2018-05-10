import React, { Component } from "react";
import { connect } from "react-redux";
import { getProjectTasks, setTaskID, setTripod } from "../../redux/actions";
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
      pageNumber: (this.props.match.params.page && this.props.tasks.length>0)
        ? parseInt(this.props.match.params.page, 10)
        : (this.props.tasks.length>0?1:0),
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
      <div className="row">
        <div style={{overflowY:'scroll',height:'calc(100vh - 55px)',paddingRight:0, overflowX:'hidden'}} className='col-4'>
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
                  cursor:'pointer',
                }}
                onClick={()=>{this.props.setTripod(false);this.props.history.push('/project/'+this.props.match.params.id+'/'+this.props.match.params.page+','+this.props.match.params.count);}}
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
          <ul className="list-group" style={{paddingBottom:'1em'}}>
              {this.props.tasks.map(task => (
                  <li className={"list-group-item"+(task.id===this.props.taskID?" active":"")} style={{cursor:'pointer',borderLeft:'none',borderRight:'none'}} key={task.id} onClick={()=>{
                      this.setState({taskID:task.id});
                      this.props.history.push('/project/'+this.props.match.params.id+'/'+this.props.match.params.page+','+this.props.match.params.count+'/'+task.id);
                      setTimeout(()=>this.props.setTaskID(task.id), 30);
                    }}>
                    <h5>{task.title}</h5>
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
                      <p style={{marginBottom:0}}>
                        <span>
                          Zadal:{task.requestedBy.username}
                        </span>
                        <span className="badge badge-success" style={{backgroundColor:task.status.color}}>{task.status.title}</span>
                      </p>
                      <p style={{marginBottom:0}}>
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
            disabled={false}
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
        <div style={{height:'calc(100vh - 55px)', overflowY:'scroll',overflowX:'hidden',margin:0,padding:0}} className='col-8'>
          {this.props.taskID===this.state.taskID && this.props.numberOfPages>0 && <EditTask taskID={this.state.taskID} history={this.props.history} match={this.props.match}/>}
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

export default connect(mapStateToProps, { getProjectTasks,setTaskID,setTripod })(Project);
