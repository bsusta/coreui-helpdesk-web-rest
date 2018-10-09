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
    return (
      <div className="row">
          <CardHeader>
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
          </CardHeader>
          <div style={{width:'100%'}}>
          <div style={{display:'flex', paddingLeft:15}}>
            {console.log(this.props.body.body.statuses)}
            {
              ((this.props.body.body.statuses===null||this.props.body.body.statuses.length===0)?
              this.props.taskStatuses:
                this.props.taskStatuses.
                  filter((item)=>this.props.body.body.statuses.
                    map((item2)=>item2.id).includes(item.id)))
                  .map((item) => <Column status={item} history={this.props.history} match={this.props.match} />)
            }
          </div>
          <div style={{display:'block', paddingLeft:15}}>
            <Pagination
              link={""}
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
