import React, { Component } from "react";
import { connect } from "react-redux";
import { setTaskID, setFilterBody } from "../../redux/actions";
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
import ViewTask from '../ViewTask';

class Project extends Component {
  constructor(props) {
    super(props);
    let task = null;
    if(this.props.tasks.length>0){
      if(this.props.match.params.taskID){
        task = this.props.tasks.find((item)=>item.id===parseInt(this.props.match.params.taskID));
      }
      if(!task){
        task = this.props.tasks[0];
        if(task.canEdit){
          this.props.history.push(this.getURL()+'/task/edit/'+task.id);
        }else{
          this.props.history.push(this.getURL()+'/task/view/'+task.id);
        }
      }
    }
    this.props.setTaskID(task.id);
    this.state = {
        taskID:task.id,
        canEdit:task.canEdit
    };
    this.getURL.bind(this);
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

  getURL(withoutCount){
    let url=withoutCount?'':'/';
    if(this.props.body.filterID){
      url+='filter/'+this.props.body.filterID;
    }else{
      url+='tag/'+this.props.body.tagID;
    }
    url+='/project/'+this.props.body.projectID;
    if(!withoutCount && this.props.body.page){
      url+='/'+this.props.body.page+','+this.props.body.count;
    }
    return url;
  }

  render() {
    return (
      <div className="row">
        <div style={{overflowY:'scroll',height:'calc(100vh - 55px)',paddingRight:0, overflowX:'hidden'}} className='col-4'>
          <ul className="list-group" style={{paddingBottom:'1em'}}>
              {this.props.tasks.map(task => (
                  <li className={"list-group-item"+(task.id===this.props.taskID?" active":"")} style={{cursor:'pointer',borderLeft:'none',borderRight:'none'}} key={task.id} onClick={()=>{
                      this.setState({taskID:task.id, canEdit:task.canEdit});
                      if( task.canEdit){
                        this.props.history.push(this.getURL(false)+'/task/edit/'+task.id);
                      }else{
                        this.props.history.push(this.getURL(false)+'/task/view/'+task.id);
                      }
                      setTimeout(()=>this.props.setTaskID(task.id), 10);
                    }}>
                    <div  className="d-flex flex-row justify-content-between">
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
              ))}
            </ul>
            <Pagination
              link={this.getURL(true)}
              history={this.props.history}
              numberOfPages={this.props.numberOfPages}
              refetchData={() => {}}
              token={this.props.token}
              disabled={this.props.body === null}
              small={true}
              refetchParameters={[]}
              pageNumber={parseInt(this.props.body.page)}
              setPageNumber={page => {
                this.props.setFilterBody({page});
              }}
              paginationOptions={[
                { title: 20, value: 20 },
                { title: 50, value: 50 },
                { title: 100, value: 100 },
              ]}
              onPaginationChange={count => {
                this.props.setFilterBody({count});
              }}
              pagination={
                parseInt(this.props.body.count)
              }
            />
        </div>
        <div style={{height:'calc(100vh - 55px)', overflowY:'scroll',overflowX:'hidden',margin:0,padding:0}} className='col-8'>
          {this.props.taskID===this.state.taskID && this.props.numberOfPages>0 && this.state.canEdit &&
            <EditTask taskID={this.state.taskID} tripod={true} history={this.props.history} match={this.props.match}/>}
          {this.props.taskID===this.state.taskID && this.props.numberOfPages>0 && !this.state.canEdit &&
            <ViewTask taskID={this.state.taskID} tripod={true} history={this.props.history} match={this.props.match}/>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tasksReducer,projectsReducer, sidebarReducer,filtersReducer, login }) => {
  const { taskID } = tasksReducer;
  const {numberOfPages, tasks, body} = filtersReducer;
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
    projects: (projectsOnly.concat(archived)),
    token
  };
};

export default connect(mapStateToProps, { setTaskID, setFilterBody })(Project);
