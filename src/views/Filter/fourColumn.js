import React, { Component } from "react";
import { connect } from "react-redux";
import { setTaskID, setFilterBody, setShowFilter } from "../../redux/actions";
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
import EditTask from '../EditTaskNew';
import ViewTask from '../ViewTask';

class Project extends Component {
  constructor(props) {
    super(props);
    this.getTask.bind(this);
    let task = this.getTask(this.props.tasks);
    this.state = {
        taskID:task?task.id:null,
        canEdit:task?task.canEdit:true
    };
    this.getURL.bind(this);
  }

  getTask(tasks){
    let task=null;
    if(tasks.length>0){
      if(this.props.match.params.taskID){
        task = tasks.find((item)=>item.id===parseInt(this.props.match.params.taskID));
      }
      if(!task){
        task = tasks[0];
        if(task.canEdit){
          this.props.history.push(this.getURL()+'/task/edit/'+task.id);
        }else{
          this.props.history.push(this.getURL()+'/task/view/'+task.id);
        }
      }
    }
    return task;
  }

  componentWillReceiveProps(props){
    if(JSON.stringify(props.tasks)!==JSON.stringify(this.props.tasks)){
      if(props.tasks.length===0){
        this.setState({taskID:null,canEdit:true});
      }else{
        let task = this.getTask(props.tasks);
        this.setState({
          taskID:task?task.id:null,
          canEdit:task?task.canEdit:true
        });
      }
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
        <div className='fourColumns'>
          <ul className="list-group" style={{paddingBottom:'1em'}}>
            {this.props.total===0 &&
              <li className="list-group-item item-in-column highlighted-item-in-column">
                <div className="d-flex flex-row justify-content-between">
                  <span style={{margin:'auto'}}>
                    {i18n.t('noTasksFound')}
                  </span>
                </div>
              </li>
            }
              {this.props.tasks.map(task => (
                <li className={task.id===this.state.taskID?"list-group-item item-in-column highlighted-item-in-column":"list-group-item item-in-column"} style={{borderLeftColor:task.status.color, cursor:'pointer'}} key={task.id}
                  onClick={()=>{
                      this.setState({taskID:task.id, canEdit:task.canEdit});
                        if( task.canEdit){
                          this.props.history.push(this.getURL(false)+'/task/edit/'+task.id);
                        }else{
                          this.props.history.push(this.getURL(false)+'/task/view/'+task.id);
                        }
                    }}>
                  <div  className="d-flex flex-row justify-content-between" >
                    <label htmlFor='statusCheckbox-myTasks'>
                      {task.title}
                    </label>
                  </div>
                  <div style={{marginBottom:5, width:'100%'}} className="row">
                    {task.tags.map(tag => (
                      <div
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
                      </div>
                    ))}
                  </div>
                  <div style={{marginBottom:0}}>
                    <p className="pull-right">
                      <i className="fa fa-clock-o" style={{marginRight:5}}/>
                      <span>
                        {task.deadline ? timestampToString(task.deadline) :  i18n.t('none')}
                      </span>
                    </p>
                    <p className="fontBold text-muted">
                      Zadal:{task.requestedBy.username}
                    </p>
                    <p className="fontBold text-muted">
                      Riešil/i:{this.usersToString(task.taskHasAssignedUsers)}
                    </p>
                  </div>
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
        <div style={{margin:0,padding:0,borderLeft:'1px solid #EFEFEF', flex:1}}>
          {this.state.taskID && this.props.numberOfPages>0 &&
            <div>
              <EditTask taskID={this.state.taskID} tripod={true} disabled={!this.state.canEdit} history={this.props.history} match={this.props.match}/>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tasksReducer,projectsReducer, sidebarReducer,filtersReducer, login }) => {
  const { taskID } = tasksReducer;
  const {numberOfPages, tasks, body, showFilter, total} = filtersReducer;
  const { project } = projectsReducer;
  const { sidebar } = sidebarReducer;
  const { token } = login;
  let projectsOnly = sidebar?sidebar.projects.children:[];
  let archived = sidebar?sidebar.archived.children:[];
  return {
    tasks,
    taskID,
    total,
    numberOfPages,
    project,
    body,
    showFilter,
    projects: (projectsOnly.concat(archived)),
    token
  };
};

export default connect(mapStateToProps, { setTaskID, setFilterBody, setShowFilter })(Project);
