import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  Input,
  FormGroup
} from "reactstrap";
import CommentsLoader from "./Comments";
import AddComment from "./AddComment";
import SubtasksLoader from "./Subtasks";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import RichTextEditor from "react-rte";
import Select from "react-select";
import {
  getTaskSolvers,
  deleteTaskSolvers,
  editTask,
  deleteTask,
  uploadFile,
  removeFile,
  addFollower,
  deleteFollower
} from "../../redux/actions";
import {
  timestampToString,
  initialiseCustomAttributes,
  processCustomAttributes,
  importExistingCustomAttributesForTask,
  containsNullRequiredAttribute
} from "../../helperFunctions";
import MultiSelect from "../../components/multiSelect";
import i18n from "i18next";

class ViewTask extends Component {

  render() {
    return (
      <div className="fontRegular">
        <Card>
          <CardHeader className="row justify-content-between" >
            <div>
              <button
                className="btn btn-link"
                onClick={this.props.history.goBack}
                >
                <i className="fa fa-close" /> {i18n.t("close")}
                </button>
                <button
                  className="btn btn-link"
                  onClick={this.props.history.goBack}
                  >
                  <i className="fa fa-ban" /> {i18n.t("cancel")}
                  </button>
                  <button className="btn btn-link">
                    <i className="fa fa-print" /> {i18n.t("print")}
                    </button>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div
                      className="row"
                      style={{ borderBottom: "1px solid #eee", marginBottom: 17 }}
                      >
                      <div className="col-8">
                        <div className="form-group">
                          <InputGroup>
                            <InputGroupAddon
                              style={{ backgroundColor: "white", border: "none" }}
                              >
                              <span className="float">
                                <i
                                  className={"fa fa-star icon-star"}
                                  style={{ fontSize: "1.97em", float: "left" }}
                                  />
                                {this.props.important && (
                                  <i
                                    className={
                                      "fa fa-star " +
                                      (this.state.important
                                        ? "icon-star-empty"
                                        : "icon-star")
                                      }
                                      style={{
                                        color: !this.state.important ? "black" : "yellow",
                                        fontSize: "1.74em",
                                        marginLeft: "-1.02em",
                                        marginTop: "0.115em",
                                        float: "left"
                                      }}
                                      />
                                  )}
                                </span>
                              </InputGroupAddon>

                              {/*<label htmlFor ="title">Task Name</label>*/}
                              <input
                                className="form-control"
                                id="title"
                                disabled={true}
                                placeholder={i18n.t("enterTitle")}
                                value={this.props.task.title}
                                style={{ fontSize: 24, border: "none" }}
                                />
                            </InputGroup>
                          </div>
                        </div>
                        <div
                          className="col-4"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end"
                          }}
                          >
                          <label className="float-right">
                            Vytvoril: {this.props.task.createdBy.username} ({
                              this.props.task.createdBy.email
                            }) {timestampToString(this.props.task.createdAt)}
                          </label>
                        </div>
                      </div>
                      <div>

                        <div className="row">
                          <div
                            className="col-8"
                            style={{ borderRight: "1px solid #eee" }}
                            >
                            <div className="form-group">
                              <span
                                className="badge"
                                style={{
                                  margin: "auto",
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                  paddingTop: 5,
                                  paddingBottom: 5,
                                  marginLeft: 5,
                                  fontSize: 15
                                }}
                                > Tags:
                              </span>
                              {this.props.task.tags.map((tag)=>(
                                <span
                                  key={tag.id}
                                  className="badge"
                                  style={{
                                    margin: "auto",
                                    borderRadius: "3px",
                                    color: "white",
                                    backgroundColor:
                                    (tag.color.includes("#") ? "" : "#") +
                                    tag.color,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                    marginLeft: 5
                                  }}
                                  >
                                  {tag.title}
                                </span>
                              ))}
                            </div>

                            <FormGroup>
                              <label htmlFor="description">{i18n.t("description")}</label>
                              <InputGroup>
                                <textarea
                                  className="form-control"
                                  disabled={true}
                                  id="description"
                                  rows={4}
                                  value={this.props.task.description}
                                  placeholder={i18n.t("enterDescription")}
                                  />
                              </InputGroup>
                            </FormGroup>

                            <SubtasksLoader
                              taskID={this.props.task.id}
                              units={[]}
                              />
                            <CommentsLoader taskID={this.props.task.id} />
                          </div>

                          <div className="col-4">
                            <FormGroup>
                              <label htmlFor="status">{i18n.t("status")}</label>
                              {this.props.task.closedAt &&
                                this.props.task.status.id.toString() === "4" && (
                                  <span style={{ float: "right" }}>
                                    {i18n.t("closedAt")}:{" "}
                                    {timestampToString(this.props.task.closedAt)}
                                  </span>
                                )}
                                <InputGroup>
                                  <InputGroupAddon>
                                    <i className="fa fa-list" />
                                  </InputGroupAddon>
                                  {this.props.task.status &&
                                      <span className="coloredSelect"
                                        style={{
                                          color:this.props.task.status.color}}
                                        ><i className="fa fa-circle" style={{paddingTop:10}}/></span>
                                  }
                                  <select
                                    className="form-control"
                                    disabled={true}
                                    style={{
                                      borderLeft:'none',
                                      paddingLeft:3,
                                      color: this.props.task.status.color
                                    }}
                                    value={this.props.task.status.id}
                                    id="status"
                                    >
                                    <option
                                      key={this.props.task.status.id}
                                      style={{
                                        color: "white",
                                        backgroundColor: this.props.task.status.color
                                      }}
                                      value={this.props.task.status.id}
                                      >
                                      {this.props.task.status.title}
                                    </option>
                                  </select>
                                </InputGroup>
                              </FormGroup>

                              <FormGroup>
                                <label htmlFor="project" className="req">
                                  {i18n.t("project")}
                                </label>
                                <InputGroup>
                                  <InputGroupAddon>
                                    <i className="fa fa-folder-o" />
                                  </InputGroupAddon>
                                  <select
                                    disabled={true}
                                    className="form-control"
                                    id="project"
                                    value={this.props.task.project.id}
                                    >
                                    <option key={this.props.task.project.id} value={this.props.task.project.id}>
                                      {this.props.task.project.title}
                                    </option>
                                  </select>
                                </InputGroup>
                              </FormGroup>

                              <FormGroup>
                                <label htmlFor="requester" className="req">{i18n.t('requester')}</label>
                                <InputGroup>
                                  <InputGroupAddon>
                                    <i className="fa fa-user-o" />
                                  </InputGroupAddon>
                                  <Select
                                    className="fullWidth"
                                    disabled={true}
                                    options={
                                      this.props.task.requestedBy===undefined?[]:
                                      [{
                                      label:(this.props.task.requestedBy.name ? this.props.task.requestedBy.name : "") +
                                      " " + (this.props.task.requestedBy.surname ? this.props.task.requestedBy.surname : "") + " "+ this.props.task.requestedBy.email,
                                      value: this.props.task.requestedBy.id}]
                                    }
                                    value={
                                      this.props.task.requestedBy===undefined?null:
                                      {
                                      label:
                                      (this.props.task.requestedBy.name ? this.props.task.requestedBy.name : "") +
                                      " " +
                                      (this.props.task.requestedBy.surname ? this.props.task.requestedBy.surname : "") + " "+ this.props.task.requestedBy.email
                                      ,value: this.props.task.requestedBy.id}
                                    }
                                    />
                                </InputGroup>
                              </FormGroup>

                              <FormGroup>
                                <label htmlFor="company" className="req">{i18n.t('company')}</label>
                                <InputGroup>
                                  <InputGroupAddon>
                                    <i className="fa fa-building-o" />
                                  </InputGroupAddon>
                                  <Select
                                    className="fullWidth"
                                    options={[{
                                      label: this.props.task.company.title,
                                      value: this.props.task.company.id
                                    }]}
                                    value={{
                                      label: this.props.task.company.title,
                                      value: this.props.task.company.id
                                    }}
                                    />
                                </InputGroup>
                              </FormGroup>

                              <FormGroup>
                                <label htmlFor="assigned">{i18n.t("assigned")}</label>
                                <InputGroup>
                                  <InputGroupAddon>
                                    <i className="fa fa-user-plus" />
                                  </InputGroupAddon>
                                  <select
                                    className="form-control"
                                    disabled={true}
                                    id="assigned"
                                    value={this.props.task.taskHasAssignedUsers.length>0?this.props.task.taskHasAssignedUsers[0].id:"null" }
                                    >
                                    {(this.props.task.taskHasAssignedUsers.length>0?[{ id: "null", username: i18n.t("noone") },this.props.task.taskHasAssignedUsers[0]]:[{ id: "null", username: i18n.t("noone") }])
                                    .map(solver => (
                                      <option key={solver.id} value={solver.id}>
                                        {solver.username}
                                      </option>
                                    ))}
                                  </select>
                                </InputGroup>
                              </FormGroup>

                              <FormGroup>
                                <label htmlFor="deadline">{i18n.t("dueDate")}</label>
                                <InputGroup>
                                  <InputGroupAddon>
                                    <i className="fa fa-clock-o" />
                                  </InputGroupAddon>
                                  <div style={{ width: "100%" }} className="datepickerWrap">
                                    <DatePicker
                                      selected={this.props.task.deadline
                                      ? moment(this.props.task.deadline * 1000)
                                      : null}
                                      locale="en-gb"
                                      placeholderText="Deadline"
                                      showTimeSelect
                                      timeFormat="HH:mm"
                                      timeIntervals={30}
                                      dateFormat="DD.MM.YYYY HH:mm"
                                      disabled={true}
                                      />
                                  </div>
                                </InputGroup>
                              </FormGroup>

                              <FormGroup>
                                <label htmlFor="startedAt">{i18n.t("startedAt")}</label>
                                <InputGroup>
                                  <InputGroupAddon>
                                    <i className="fa fa-clock-o" />
                                  </InputGroupAddon>
                                  <div style={{ width: "100%" }} className="datepickerWrap">
                                    <DatePicker
                                      selected={this.props.task.startedAt
                                      ? moment(this.props.task.startedAt * 1000)
                                      : null}
                                      locale="en-gb"
                                      placeholderText={i18n.t("startedAt")}
                                      showTimeSelect
                                      timeFormat="HH:mm"
                                      timeIntervals={30}
                                      dateFormat="DD.MM.YYYY HH:mm"
                                      disabled={true}
                                      />
                                  </div>
                                </InputGroup>
                              </FormGroup>

                              <FormGroup>
                                <label htmlFor="workTime">{i18n.t("workTime")}</label>
                                <InputGroup>
                                  <InputGroupAddon>
                                    <i className="fa fa-hourglass-o" />
                                  </InputGroupAddon>
                                  <input
                                    className="form-control"
                                    type="number"
                                    id="workTime"
                                    disabled={true}
                                    value={this.props.task.work_time}
                                    placeholder={i18n.t("enterWorkTime")}
                                    />
                                </InputGroup>
                              </FormGroup>

                              <FormGroup>
                                <label htmlFor="work">{i18n.t("work")}</label>
                                <InputGroup>
                                  <InputGroupAddon>
                                    <i className="fa fa-list" />
                                  </InputGroupAddon>
                                  <select
                                    className="form-control"
                                    id="work"
                                    disabled={true}
                                    value={this.props.task.work_type}
                                    >
                                      <option key={this.props.task.work_type} value={this.props.task.work_type}>
                                        {this.props.task.work_type}
                                      </option>
                                  </select>
                                </InputGroup>
                              </FormGroup>

                              <div className="form-group">
                                <div style={{ paddingTop: 5, paddingRight: 10 }}>
                                  {this.props.attachments.map(item => (
                                    <span
                                      key={item.url}
                                      className="badge"
                                      style={{
                                        backgroundColor: "#d3eef6",
                                        color: "black",
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                        marginLeft: 5,
                                        marginTop: 1,
                                        width: "100%",
                                        display: "flex"
                                      }}
                                      >
                                      <div
                                        style={{ marginTop: "auto", marginBottom: "auto" }}
                                        >
                                        {!item.url && item.file.name}
                                        {item.url && (
                                          <a href={item.url}>{item.file.name}</a>
                                        )}
                                      </div>
                                      <div style={{ flex: 1 }} />
                                      {item.file.size && (
                                        <div
                                          style={{
                                            marginTop: "auto",
                                            marginBottom: "auto"
                                          }}
                                          >
                                          {item.file.size > 10000 &&
                                            Math.ceil(item.file.size / 1000) + "kb"}
                                            {item.file.size <= 10000 && item.file.size + "b"}
                                          </div>
                                        )}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div className="form-group">
                                  {this.props.task.followers.map((item)=>
                                  <div
                                    className="badge"
                                    key={item.id}
                                    style={{
                                      borderRadius: "3px",
                                      paddingLeft: 10,
                                      paddingRight: 10,
                                      paddingTop: 5,
                                      paddingBottom: 5,
                                      marginLeft: 5,
                                      width: "100%"
                                    }}
                                    >
                                    {item.email + " (" + item.username + ")"}
                                  </div>)}
                                </div>

                                {this.props.taskAttributes.filter((item)=>item.is_active).map(attribute => {
                                  switch (attribute.type) {
                                    case "input":
                                    return (
                                      <div className={"form-group"+( attribute.required && this.state.task_data[attribute.id] ==='' ?' fieldError':'')} key={attribute.id} >
                                        <label htmlFor={attribute.id} className={attribute.required?"req":""}>{attribute.title}</label>
                                        <input
                                          className="form-control"
                                          id={attribute.id}
                                          value={this.state.task_data[attribute.id]}
                                          onChange={e => {
                                            let newData = { ...this.state.task_data };
                                            newData[attribute.id] = e.target.value;
                                            this.autoSubmit("task_data", newData);
                                            this.setState({ task_data: newData });
                                          }}
                                          placeholder={i18n.t('enter')+" " + attribute.title}
                                          />
                                        {attribute.required && this.state.task_data[attribute.id] ===''&&<span><i className={"fa fa-exclamation-circle"} style={{color:'red',paddingRight:3}}/><label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionFieldRequired')}</label></span>}
                                      </div>
                                    );
                                    case "text_area":
                                    return (
                                      <div className={"form-group"+( attribute.required && this.state.task_data[attribute.id] ==='' ?' fieldError':'')} key={attribute.id}>
                                        <label htmlFor={attribute.id} className={attribute.required?"req":""}>{attribute.title}</label>
                                        <textarea
                                          className="form-control"
                                          id={attribute.id}
                                          value={this.state.task_data[attribute.id]}
                                          onChange={e => {
                                            let newData = { ...this.state.task_data };
                                            newData[attribute.id] = e.target.value;
                                            this.autoSubmit("task_data", newData);
                                            this.setState({ task_data: newData });
                                          }}
                                          placeholder={i18n.t('enter')+" " + attribute.title}
                                          />
                                        {attribute.required && this.state.task_data[attribute.id] ===''&&<span><i className={"fa fa-exclamation-circle"} style={{color:'red',paddingRight:3}}/><label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionFieldRequired')}</label></span>}
                                      </div>
                                    );
                                    case "simple_select":
                                    return (
                                      <div className="form-group" key={attribute.id}>
                                        <label
                                          htmlFor={attribute.id}
                                          className={attribute.required ? "req" : ""}
                                          >
                                          {attribute.title}
                                        </label>
                                        <select
                                          className="form-control"
                                          id={attribute.id}
                                          value={this.state.task_data[attribute.id]}
                                          onChange={e => {
                                            let newData = { ...this.state.task_data };
                                            newData[attribute.id] = e.target.value;
                                            this.autoSubmit("task_data", newData);
                                            this.setState({ task_data: newData });
                                          }}
                                          >
                                          {Array.isArray(attribute.options) &&
                                            attribute.options.map(opt => (
                                              <option key={opt} value={opt}>
                                                {opt}
                                              </option>
                                            ))}
                                            {!Array.isArray(attribute.options) &&
                                              Object.keys(attribute.options).map(key => (
                                                <option key={key} value={key}>
                                                  {key}
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                        );
                                        case "multi_select": {
                                          let opt = [];
                                          attribute.options.map(att =>
                                            opt.push({
                                              id: attribute.options.indexOf(att),
                                              title: att
                                            })
                                          );
                                          return (
                                            <div className="form-group" key={attribute.id}>
                                              <MultiSelect
                                                id={attribute.id}
                                                data={opt}
                                                displayValue="title"
                                                selectedIds={this.state.task_data[attribute.id]}
                                                idValue="id"
                                                filterBy="title"
                                                title={attribute.title}
                                                display="row"
                                                displayBoxStyle={{ width: 100 }}
                                                menuItemStyle={{
                                                  marginLeft: 7,
                                                  marginRight: 7,
                                                  marginTop: 2,
                                                  marginBottom: 2,
                                                  paddingTop: 2,
                                                  paddingBottom: 2
                                                }}
                                                renderItem={item => (
                                                  <span
                                                    className="badge"
                                                    key={item.id}
                                                    style={{
                                                      margin: "auto",
                                                      border: "1px solid black",
                                                      borderRadius: "3px",
                                                      paddingLeft: 10,
                                                      paddingRight: 10,
                                                      paddingTop: 5,
                                                      paddingBottom: 5,
                                                      marginLeft: 5
                                                    }}
                                                    >
                                                    {item.title}
                                                  </span>
                                                )}
                                                titleStyle={{
                                                  backgroundColor: "white",
                                                  color: "black",
                                                  size: 15
                                                }}
                                                toggleStyle={{
                                                  backgroundColor: "white",
                                                  border: "none",
                                                  padding: 0
                                                }}
                                                label={attribute.title}
                                                labelStyle={{ marginLeft: 10 }}
                                                searchStyle={{ margin: 5 }}
                                                onChange={(ids, items) => {
                                                  let newData = { ...this.state.task_data };
                                                  newData[attribute.id] = ids;
                                                  this.autoSubmit("task_data", newData);
                                                  this.setState({ task_data: newData });
                                                }}
                                                />
                                            </div>
                                          );
                                        }
                                        case "date":
                                        return (
                                          <div className={"form-group"+(attribute.required && this.state.task_data[attribute.id] ===null ?' fieldError':'')} key={attribute.id}>
                                            <label htmlFor={attribute.id} className={attribute.required?"req":""}>{attribute.title}</label>
                                            <DatePicker
                                              selected={this.state.task_data[attribute.id]}
                                              onChange={e => {
                                                let newData = { ...this.state.task_data };
                                                newData[attribute.id] = e;
                                                this.autoSubmit("task_data", newData);
                                                this.setState({ task_data: newData });
                                              }}
                                              locale="en-gb"
                                              placeholderText={attribute.title}
                                              showTimeSelect
                                              timeFormat="HH:mm"
                                              timeIntervals={30}
                                              dateFormat="DD.MM.YYYY HH:mm"
                                              />
                                            {attribute.required && this.state.task_data[attribute.id] ===null&&<span><i className={"fa fa-exclamation-circle"} style={{color:'red',paddingRight:3}}/><label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionFieldRequired')}</label></span>}
                                          </div>
                                        );
                                        case "decimal_number":
                                        return (
                                          <div className={"form-group"+( attribute.required && isNaN(parseFloat(this.state.task_data[attribute.id])) ?' fieldError':'')} key={attribute.id}>
                                            <label htmlFor={attribute.id} className={attribute.required?"req":""}>{attribute.title}</label>
                                            <input
                                              className="form-control"
                                              type="number"
                                              id={attribute.id}
                                              value={this.state.task_data[attribute.id]}
                                              onChange={e => {
                                                let newData = { ...this.state.task_data };
                                                newData[attribute.id] = e.target.value;
                                                this.autoSubmit("task_data", newData);
                                                this.setState({ task_data: newData });
                                              }}
                                              placeholder={i18n.t('enter')+" " + attribute.title}
                                              />
                                            {attribute.required && isNaN(parseFloat(this.state.task_data[attribute.id]))&&<span><i className={"fa fa-exclamation-circle"} style={{color:'red',paddingRight:3}}/><label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionFieldRequiredAndNotValid')}</label></span>}
                                          </div>
                                        );
                                        case "integer_number":
                                        return (
                                          <div className={"form-group"+(attribute.required && isNaN(parseFloat(this.state.task_data[attribute.id])) ?' fieldError':'')} key={attribute.id}>
                                            <label htmlFor={attribute.id} className={attribute.required?"req":""}>{attribute.title}</label>
                                            <input
                                              className="form-control"
                                              type="number"
                                              id={attribute.id}
                                              value={this.state.task_data[attribute.id]}
                                              onChange={e => {
                                                let newData = { ...this.state.task_data };
                                                newData[attribute.id] = e.target.value;
                                                this.autoSubmit("task_data", newData);
                                                this.setState({ task_data: newData });
                                              }}
                                              placeholder={i18n.t('enter')+" " + attribute.title}
                                              />
                                            {attribute.required && isNaN(parseFloat(this.state.task_data[attribute.id]))&&<span><i className={"fa fa-exclamation-circle"} style={{color:'red',paddingRight:3}}/><label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionFieldRequiredAndNotValid')}</label></span>}
                                          </div>
                                        );
                                        case "checkbox":
                                        return (
                                          <div className="form-group" key={attribute.id}>
                                            <label className="form-check-label">
                                              <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={this.state.task_data[attribute.id]}
                                                onChange={() => {
                                                  let newData = { ...this.state.task_data };
                                                  newData[attribute.id] = !newData[
                                                    attribute.id
                                                  ];
                                                  this.autoSubmit("task_data", newData);
                                                  this.setState({ task_data: newData });
                                                }}
                                                />
                                              {attribute.title}
                                            </label>
                                          </div>
                                        );

                                        default:
                                        return <div>{attribute.title}</div>;
                                        }
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </CardBody>
                            </Card>
                          </div>
                        );
                      }
                    }

                    const mapStateToProps = ({
                      tasksReducer,
                      statusesReducer,
                      companiesReducer,
                      tagsReducer,
                      unitsReducer,
                      login,
                      usersReducer,
                      attachmentsReducer,
                      followersReducer,
                      taskAttributesReducer
                    }) => {
                      const { task, taskProjects, taskSolvers } = tasksReducer;
                      const { taskAttributes } = taskAttributesReducer;
                      const { taskStatuses } = statusesReducer;
                      const { taskCompanies } = companiesReducer;
                      const { tags } = tagsReducer;
                      const { units } = unitsReducer;
                      const { users } = usersReducer;
                      const { attachments } = attachmentsReducer;
                      const { followers } = followersReducer;
                      const { token } = login;
                      return {
                        task,
                        taskProjects,
                        companies: taskCompanies,
                        taskAttributes,
                        statuses: taskStatuses,
                        tags,
                        units,
                        taskSolvers,
                        users,
                        attachments,
                        followers,
                        token
                      };
                    };

                    export default connect(mapStateToProps, {
                      getTaskSolvers,
                      deleteTaskSolvers,
                      editTask,
                      deleteTask,
                      uploadFile,
                      removeFile,
                      addFollower,
                      deleteFollower
                    })(ViewTask);
