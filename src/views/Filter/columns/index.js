import React, { Component } from "react";
import { connect } from "react-redux";
import { setTaskID, setFilterBody, setShowFilter } from "../../../redux/actions";
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
import { timestampToString } from "../../../helperFunctions";
import i18n from 'i18next';
import Column from './column';

class Project extends Component {

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
    <div style={{display:'flex', paddingLeft:15, overflowY:'scroll'}}>
      {
        (selectedStatusesIDs.length!==0?
          this.props.taskStatuses.filter(item => selectedStatusesIDs.includes(item.id)):this.props.taskStatuses)
          .map((item) => <Column status={item} history={this.props.history} match={this.props.match} key={item.id} />)
        }
      </div>
    </div>
  </div>
);
}
}

const mapStateToProps = ({ tasksReducer,projectsReducer,statusesReducer, sidebarReducer,filtersReducer, login }) => {
  const { taskID } = tasksReducer;
  const {numberOfPages, tasks, body, showFilter} = filtersReducer;
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
    projects: (projectsOnly.concat(archived)),
    token
  };
};

export default connect(mapStateToProps, { setTaskID, setFilterBody, setShowFilter })(Project);
