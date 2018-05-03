import React, { Component } from "react";
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
import DatePicker from "react-datepicker";
import moment from "moment";
import i18n from 'i18next';
import Select from "react-select";
import { connect } from 'react-redux';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state={
      createdFrom:null,
      createdTo:null,
      deadlineFrom:null,
      deadlineTo:null,
      closedFrom:null,
      closedTo:null,
      title:'',
      startedFrom:null,
      startedTo:null,

    }

  }


  saveChanges(value) {
    this.setState({ value });
  }
  render() {
    console.log(this.props.tags);
    return (
      <div className="filterDivInside">
        <div style={{ paddingLeft: 20 }}>
          <button type="button" className="btn btn-link" style={{ paddingLeft: 0 }}>
            Apply
          </button>
          <button type="button" className="btn btn-link">
            Save
          </button>
          <button type="button" className="btn btn-link">
            Reset
          </button>
          <FormGroup>
            <label htmlFor="title">{i18n.t('title')}</label>
            <input
              className="form-control"
              id="title"
              value={this.state.title}
              onChange={e => {
                this.setState({ title: e.target.value });
              }}
              placeholder="Filter podľa názvu"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="status">{i18n.t('status')}</label>
              <Select
                options={this.props.statuses.map(status => {
                  status.label = status.title;
                  status.value = status.id;
                  return status;
                })}
                isMulti
                style={{ width: "100%" }}
              />
          </FormGroup>

          <label className="mt-1">Zadal</label>
            <Select
              isMulti
              options={this.props.users.map(user => {
                user.label =
                  (user.name ? user.name : "") +
                  " " +
                  (user.surname ? user.surname : "");
                if (user.label === " ") {
                  user.label = user.email;
                } else {
                  user.label = user.label + " (" + user.email + ")";
                }
                user.value = user.id;
                return user;
              })}
            />

          <label className="mt-2">Firma</label>
          <Select
            options={this.props.companies.map(company => {
              company.label = company.title;
              company.value = company.id;
              return company;
            })}
            isMulti
            style={{ width: "100%" }}
          />

          <label className="mt-2">Riesi</label>
            <Select
              isMulti
              options={this.props.users.map(user => {
                user.label =
                  (user.name ? user.name : "") +
                  " " +
                  (user.surname ? user.surname : "");
                if (user.label === " ") {
                  user.label = user.email;
                } else {
                  user.label = user.label + " (" + user.email + ")";
                }
                user.value = user.id;
                return user;
              })}
            />

          <label className="mt-2">Vytvoril</label>
              <Select
                isMulti
                options={this.props.users.map(user => {
                  user.label =
                    (user.name ? user.name : "") +
                    " " +
                    (user.surname ? user.surname : "");
                  if (user.label === " ") {
                    user.label = user.email;
                  } else {
                    user.label = user.label + " (" + user.email + ")";
                  }
                  user.value = user.id;
                  return user;
                })}
              />

          <label className="mt-2">Projekt</label>
            <Select
              options={this.props.projects.map(project => {
                project.label = project.title;
                project.value = project.id;
                return project;
              })}
              isMulti
              style={{ width: "100%" }}
            />
          <label className="mt-1">Follower</label>
            <Select
              isMulti
              options={this.props.users.map(user => {
                user.label =
                  (user.name ? user.name : "") +
                  " " +
                  (user.surname ? user.surname : "");
                if (user.label === " ") {
                  user.label = user.email;
                } else {
                  user.label = user.label + " (" + user.email + ")";
                }
                user.value = user.id;
                return user;
              })}
            />
          <label className="mt-2">Tags</label>
            <Select
              options={this.props.tags.map(tag => {
                tag.label = tag.title;
                tag.value = tag.id;
                return tag;
              })}
              isMulti
              style={{ width: "100%" }}
            />

            <label className="mt-2">Created</label>

            <div className="d-flex flex-row justify-content-between fromToDates">
              <DatePicker
                onChange={e => {
                  this.setState({createdFrom:e});
                }}
                locale="en-gb"
                placeholderText="From"
                selected={this.state.createdFrom}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="DD.MM.YYYY HH:mm"
              />
              <DatePicker
                onChange={e => {
                  this.setState({createdTo:e});
                }}
                style={{marginLeft:'10%'}}
                locale="en-gb"
                placeholderText="To"
                selected={this.state.createdTo}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="DD.MM.YYYY HH:mm"
              />
            </div>

            <label className="mt-2">Started</label>

            <div className="d-flex flex-row justify-content-between fromToDates">
              <DatePicker
                onChange={e => {
                  this.setState({startedFrom:e});
                }}
                locale="en-gb"
                placeholderText="From"
                selected={this.state.startedFrom}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="DD.MM.YYYY HH:mm"
              />
              <DatePicker
                onChange={e => {
                  this.setState({startedTo:e});
                }}
                style={{marginLeft:'10%'}}
                locale="en-gb"
                placeholderText="To"
                selected={this.state.startedTo}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="DD.MM.YYYY HH:mm"
              />
            </div>


          <label className="mt-2">Deadline</label>
            <div className="d-flex flex-row justify-content-between fromToDates">
              <DatePicker
                onChange={e => {
                  this.setState({deadlineFrom:e});
                }}
                locale="en-gb"
                placeholderText="From"
                selected={this.state.deadlineFrom}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="DD.MM.YYYY HH:mm"
              />
              <DatePicker
                onChange={e => {
                  this.setState({deadlineTo:e});
                }}
                style={{marginLeft:'10%'}}
                locale="en-gb"
                placeholderText="To"
                selected={this.state.deadlineTo}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="DD.MM.YYYY HH:mm"
              />
            </div>


          <label className="mt-2">Closed</label>
            <div className="d-flex flex-row justify-content-between fromToDates">
              <DatePicker
                onChange={e => {
                  this.setState({closedFrom:e});
                }}
                locale="en-gb"
                placeholderText="From"
                selected={this.state.closedFrom}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="DD.MM.YYYY HH:mm"
              />
              <DatePicker
                onChange={e => {
                  this.setState({closedTo:e});
                }}
                style={{marginLeft:'10%'}}
                locale="en-gb"
                placeholderText="To"
                selected={this.state.closedTo}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="DD.MM.YYYY HH:mm"
              />
            </div>
            <div className="form-check" style={{marginTop:10}}>
              <label className="form-check-label">
                <input
                  type="checkbox"
                  checked={this.state.archived}
                  onChange={() => {
                    this.setState({ archived: !this.state.archived });
                  }}
                  className="form-check-input"
                />
              Archived
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  checked={this.state.important}
                  onChange={() => {
                    this.setState({ important: !this.state.important });
                  }}
                  className="form-check-input"
                />
              Important
              </label>
            </div>

        </div>
      </div>
    );
  }
}
const mapStateToProps = ({tasksReducer,statusesReducer,usersReducer,companiesReducer, tagsReducer }) => {
  const { taskProjects } = tasksReducer;
  const {taskStatuses} = statusesReducer;
  const {users} = usersReducer;
  const { taskCompanies } = companiesReducer;
  const { tags } = tagsReducer;
  return {statuses:taskStatuses,companies:taskCompanies,projects:taskProjects, users,tags};
};


export default connect(mapStateToProps, {})(Filter);
