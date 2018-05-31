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

const workTypes=['vzdialena podpora','servis IT','servis serverov','programovanie www','instalacie klientskeho os','bug reklamacia','navrh','material','cenova ponuka','administrativa','konzultacia','refakturacia','testovanie'];

class EditTask extends Component {
  constructor(props) {
    super(props);
    let task_data = importExistingCustomAttributesForTask(
      initialiseCustomAttributes([...this.props.taskAttributes]),
      [...this.props.task.taskData],
      [...this.props.taskAttributes]
    );
    //task_data=this.fillCustomAttributesNulls(task_data,this.props.taskAttributes);
    let requestedBy;
    if (this.props.task.requestedBy) {
      requestedBy = { ...this.props.task.requestedBy };
      requestedBy.label =
      (requestedBy.name ? requestedBy.name : "") +
      " " +
      (requestedBy.surname ? requestedBy.surname : "");
      if (requestedBy.label === " ") {
        requestedBy.label = requestedBy.email;
      } else {
        requestedBy.label = requestedBy.label + " (" + requestedBy.email + ")";
      }
      requestedBy.value = requestedBy.id;
    } else {
      requestedBy = null;
    }

    let company;
    if (this.props.task.company) {
      company = { ...this.props.task.company };
      company.value = company.id;
      company.label = company.title;
    } else {
      company = null;
    }
    let submitError = containsNullRequiredAttribute(
      processCustomAttributes({ ...task_data }, [...this.props.taskAttributes]),
      [...this.props.taskAttributes]
    );
    this.state = {
      company,
      deadline: this.props.task.deadline
      ? moment(this.props.task.deadline * 1000)
      : null,
      startedAt: this.props.task.startedAt
      ? moment(this.props.task.startedAt * 1000)
      : null,
      description: this.props.task.description?this.props.task.description:'',
      important: this.props.task.important,
      project: this.props.task.project.id,
      requestedBy,
      status: this.props.task.status.id,
      tags: this.props.task.tags
      .filter(
        tag => this.props.tags.findIndex(item => item.id === tag.id) != -1
      )
      .map(tag => tag.id),
      title: this.props.task.title,
      workTime: this.props.task.work_time ? this.props.task.work_time : "",
      work_type: this.props.task.work_type ? this.props.task.work_type : "vzdialena podpora",
      newTags: [],
      newTag: "",
      ///////
      taskSolver:
      this.props.task.taskHasAssignedUsers.length == 0
      ? "null"
      : Object.values(this.props.task.taskHasAssignedUsers)[0].user.id,
      attachments: [],
      task_data,
      followers: this.props.followers.map(follower => follower.id),
      submitError
    };
    this.autoSubmit.bind(this);
  }

  fillCustomAttributesNulls(attributes, originalAttributes) {
    for (let key in attributes) {
      if (attributes[key] === null) {
        switch (
          originalAttributes[
            originalAttributes.findIndex(item => item.id == key)
          ].type
        ) {
          case "checkbox":
          attributes[key] = false;
          break;
          case "date":
          attributes[key] = moment();
          break;
          default: {
            attributes[key] = 10;
          }
        }
      }
    }
    return attributes;
  }

  delete(e) {
    e.preventDefault();
    if (confirm(i18n.t("deleteTaskMessage"))) {
      this.props.deleteTask(this.props.task.id, this.props.token);
    } else {
      return;
    }
    this.props.history.goBack();
  }

  componentWillMount() {
    this.props.getTaskSolvers(this.props.task.project.id, this.props.token);
  }

  autoSubmit(name, value, id) {
    let state = { ...this.state };
    if (name === "project") {
      state["project"] = value.project;
      state["taskSolver"] = "null";
    } else if(name==='requestedBy'){
      state['requestedBy'] = value;
      state['company'] = this.props.companies[this.props.companies.findIndex((item)=>item.id===value.company.id)];
    } else if (name) {
      state[name] = value;
    }
    let task_data = processCustomAttributes({...state.task_data},[...this.props.taskAttributes]);
    if(containsNullRequiredAttribute(task_data,[...this.props.taskAttributes])||
    state.title===''||state.requestedBy.id===undefined||state.company.id===undefined){
      this.setState({submitError:true});
      return;
    }
    this.setState({ submitError: false });
    let tags = [];
    state.tags.map(addTag =>
      tags.push(
        this.props.tags.concat(state.newTags).find(tag => tag.id == addTag)
        .title
      )
    );
    //ak je task uzvrety nastavi mu closedAt, ak nema startedAt tak ten tiez
    let closedAt = this.state.closedAt ? this.state.closedAt : "null";
    if (state.status.toString() === "4") {
      closedAt = Math.ceil(moment().valueOf() / 1000);
      if (state.startedAt === null) {
        state.startedAt = closedAt * 1000;
      }
    }
    this.props.editTask(
      {
        title: state.title,
        closedAt,
        description: state.description === ''?'null':state.description,
        deadline:
        state.deadline !== null ? state.deadline.valueOf() / 1000 : "null",
        startedAt:
        state.startedAt !== null ? state.startedAt.valueOf() / 1000 : "null",
        important: state.important,
        workType: state.work_type===''?'null':state.work_type,
        workTime: state.workTime.length == 0 ? undefined : state.workTime,
        tag: JSON.stringify(tags),
        assigned:
        state.taskSolver != "null"
        ? JSON.stringify([{ userId: parseInt(state.taskSolver) }])
        : null,
        attachment:
        this.props.attachments.length === 0
        ? undefined
        : JSON.stringify(
          this.props.attachments.map(attachment => attachment.id)
        ),
        taskData: JSON.stringify(task_data)
      },
      this.props.task.id,
      state.project,
      state.status,
      state.requestedBy.id,
      state.company.id,
      this.props.token
    );
  }

  render() {
    return (
      <div className="fontRegular">
        <Card>
          <CardHeader className="row justify-content-between" style={{margin:0,width:'inherit',position:'static',zIndex:1}}>
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
                    <button className="btn btn-link" onClick={this.delete.bind(this)}>
                      <i className="fa fa-trash" /> {i18n.t("delete")}
                      </button>
                    </div>
                    {this.state.submitError && <span><h5 style={{color:'red'}}> {i18n.t('restrictionTaskWontSave')}</h5></span>}
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
                                  onClick={() => {
                                    if (!this.state.important) {
                                      this.autoSubmit("important", true);
                                      this.setState({ important: true });
                                    }
                                  }}
                                  />
                                {this.state.important && (
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
                                      onClick={() => {
                                        this.autoSubmit("important", false);
                                        this.setState({ important: false });
                                      }}
                                      />
                                  )}
                                </span>
                              </InputGroupAddon>

                              {/*<label htmlFor ="title">Task Name</label>*/}
                              <input
                                className="form-control"
                                id="title"
                                placeholder={i18n.t("enterTitle")}
                                value={this.state.title}
                                style={{ fontSize: 24, border: "none" }}
                                onChange={e => {
                                  this.autoSubmit("title", e.target.value);
                                  this.setState({ title: e.target.value });
                                }}
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
                        {/*this.state.submitError && this.state.title===''&&<label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionMustEnterTaskTitle')}</label>*/}
                      </div>
                      <div>

                        <div className="row">
                          <div
                            className="col-8"
                            style={{ borderRight: "1px solid #eee" }}
                            >
                            <div className="form-group">
                              <MultiSelect
                                id="tags"
                                data={this.props.tags}
                                displayValue="title"
                                selectedIds={this.state.tags}
                                idValue="id"
                                filterBy="title"
                                display="row"
                                colored={true}
                                displayBoxStyle={{ overflowX: "auto" }}
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
                                    key={item.id}
                                    className="badge"
                                    style={{
                                      margin: "auto",
                                      borderRadius: "3px",
                                      color: "white",
                                      backgroundColor:
                                      (item.color.includes("#") ? "" : "#") +
                                      item.color,
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
                                  size: "0.875rem"
                                }}
                                toggleStyle={{
                                  backgroundColor: "white",
                                  border: "none",
                                  padding: 0,
                                  fontSize: "0.875rem"
                                }}
                                label={i18n.t("selectTags")}
                                labelStyle={{ marginLeft: 10 }}
                                searchStyle={{ margin: 5 }}
                                onChange={(ids, items) => {
                                  this.autoSubmit("tags", ids);
                                  this.setState({ tags: ids });
                                }}
                                />
                            </div>

                            <FormGroup>
                              <label htmlFor="description">{i18n.t("description")}</label>
                              <InputGroup>
                                <textarea
                                  className="form-control"
                                  id="description"
                                  rows={4}
                                  value={this.state.description}
                                  onChange={e => {
                                    this.autoSubmit("description", e.target.value);
                                    this.setState({ description: e.target.value });
                                  }}
                                  placeholder={i18n.t("enterDescription")}
                                  />
                              </InputGroup>
                            </FormGroup>

                            <SubtasksLoader
                              taskID={this.props.task.id}
                              units={this.props.units.filter(unit => unit.is_active)}
                              />
                            <CommentsLoader taskID={this.props.task.id} />
                          </div>

                          <div className="col-4">
                            <FormGroup>
                              <label htmlFor="status">{i18n.t("status")}</label>
                              {this.props.task.closedAt &&
                                this.state.status.toString() === "4" && (
                                  <span style={{ float: "right" }}>
                                    {i18n.t("closedAt")}:{" "}
                                    {timestampToString(this.props.task.closedAt)}
                                  </span>
                                )}
                                <InputGroup>
                                  <InputGroupAddon>
                                    <i className="fa fa-list" />
                                  </InputGroupAddon>
                                  {this.state.status &&
                                      <span className="coloredSelect"
                                        style={{
                                          color:this.props.statuses.find(
                                          status => status.id == this.state.status
                                        ).color}}
                                        ><i className="fa fa-circle" style={{paddingTop:10}}/></span>
                                  }
                                  <select
                                    className="form-control"
                                    style={{
                                      borderLeft:'none',
                                      paddingLeft:3,
                                      color: this.props.statuses.find(
                                        status => status.id == this.state.status
                                      ).color
                                    }}
                                    value={this.state.status}
                                    id="status"
                                    onChange={e => {
                                      this.autoSubmit("status", e.target.value);
                                      this.setState({ status: e.target.value });
                                    }}

                                    >
                                    {this.props.statuses.map(status => (
                                      <option
                                        key={status.id}
                                        style={{
                                          color: "white",
                                          backgroundColor: status.color
                                        }}
                                        value={status.id}
                                        >
                                        {status.title}
                                      </option>
                                    ))}
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
                                    className="form-control"
                                    id="project"
                                    value={this.state.project}
                                    onChange={e => {
                                      this.autoSubmit("project", {
                                        project: e.target.value,
                                        taskSolver: "null"
                                      });
                                      this.setState({
                                        project: e.target.value,
                                        taskSolver: "null"
                                      });
                                      this.setState({
                                        project: e.target.value,
                                        taskSolver: "null"
                                      });
                                      this.props.deleteTaskSolvers();
                                      this.props.getTaskSolvers(
                                        e.target.value,
                                        this.props.token
                                      );
                                    }}
                                    >
                                    {this.props.taskProjects.map(project => (
                                      <option key={project.id} value={project.id}>
                                        {project.title}
                                      </option>
                                    ))}
                                  </select>
                                </InputGroup>
                              </FormGroup>

                              <FormGroup>
                                <label htmlFor="requester" className="req">{i18n.t('requester')}</label>
                                <InputGroup className={this.state.requestedBy.id===undefined?"fieldError":""}>
                                  <InputGroupAddon>
                                    <i className="fa fa-user-o" />
                                  </InputGroupAddon>
                                  <Select
                                    className="fullWidth"
                                    options={this.props.users.map(user => {
                                      user.label =
                                      (user.name ? user.name : "") +
                                      " " +
                                      (user.surname ? user.surname : "");
                                      if (user.label === " ") {
                                        user.label = user.email;
                                      } else {
                                        user.label = user.label ;
                                      }
                                      user.value = user.id;
                                      return user;
                                    })}
                                    value={this.state.requestedBy}
                                    onChange={e => {
                                      this.autoSubmit("requestedBy", e);
                                      this.setState({ requestedBy: e, company:this.props.companies[this.props.companies.findIndex((item)=>item.id===e.company.id)] });
                                    }}
                                    />
                                </InputGroup>
                                {this.state.requestedBy.id===undefined &&<label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionMustSelectRequester')}</label>}
                              </FormGroup>

                              <FormGroup>
                                <label htmlFor="company" className="req">{i18n.t('company')}</label>
                                <InputGroup className={this.state.company.id===undefined?"fieldError":""}>
                                  <InputGroupAddon>
                                    <i className="fa fa-building-o" />
                                  </InputGroupAddon>
                                  <Select
                                    className="fullWidth"
                                    options={this.props.companies.map(company => {
                                      company.label = company.title;
                                      company.value = company.id;
                                      return company;
                                    })}
                                    value={this.state.company}
                                    onChange={e => {
                                      this.autoSubmit("company", e);
                                      this.setState({ company: e });
                                    }}
                                    />
                                </InputGroup>
                                {this.state.company.id===undefined &&<label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionMustSelectCompany')}</label>}
                              </FormGroup>

                              <FormGroup>
                                <label htmlFor="assigned">{i18n.t("assigned")}</label>
                                <InputGroup>
                                  <InputGroupAddon>
                                    <i className="fa fa-user-plus" />
                                  </InputGroupAddon>
                                  <select
                                    className="form-control"
                                    id="assigned"
                                    value={this.state.taskSolver}
                                    onChange={e => {
                                      this.autoSubmit("taskSolver", e.target.value);
                                      this.setState({ taskSolver: e.target.value });
                                    }}
                                    >
                                    {[{ id: "null", username: i18n.t("noone") }]
                                    .concat(this.props.taskSolvers)
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
                                      selected={this.state.deadline}
                                      onChange={e => {
                                        this.autoSubmit("deadline", e);
                                        this.setState({ deadline: e });
                                      }}
                                      locale="en-gb"
                                      placeholderText="Deadline"
                                      showTimeSelect
                                      timeFormat="HH:mm"
                                      timeIntervals={30}
                                      dateFormat="DD.MM.YYYY HH:mm"
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
                                      selected={this.state.startedAt}
                                      onChange={e => {
                                        this.autoSubmit("startedAt", e);
                                        this.setState({ startedAt: e });
                                      }}
                                      locale="en-gb"
                                      placeholderText={i18n.t("startedAt")}
                                      showTimeSelect
                                      timeFormat="HH:mm"
                                      timeIntervals={30}
                                      dateFormat="DD.MM.YYYY HH:mm"
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
                                    value={this.state.workTime}
                                    onChange={e => {
                                      this.autoSubmit("workTime", e.target.value);
                                      this.setState({ workTime: e.target.value });
                                    }}
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
                                    value={this.state.work_type}
                                    onChange={e => {
                                      this.autoSubmit("work_type", e.target.value);
                                      this.setState({ work_type: e.target.value });
                                    }}
                                    >
                                    {workTypes.map(type => (
                                      <option key={type} value={type}>
                                        {type}
                                      </option>
                                    ))}
                                  </select>
                                </InputGroup>
                              </FormGroup>

                              {false && (
                                <FormGroup>
                                  <label htmlFor="assigned">Opakovanie</label>
                                  <InputGroup>
                                    <InputGroupAddon>
                                      <i className="fa fa-repeat" />
                                    </InputGroupAddon>
                                    <Dropdown
                                      isOpen={this.state.dropdownOpen}
                                      toggle={this.toggle}
                                      style={{ width: "100%" }}
                                      >
                                      <DropdownToggle
                                        style={{
                                          width: "100%",
                                          textAlign: "left",
                                          backgroundColor: "white"
                                        }}
                                        caret
                                        >
                                        no repeat
                                      </DropdownToggle>
                                      <DropdownMenu style={{ width: "100%" }}>
                                        <div
                                          className="form-group"
                                          style={{ width: "100%" }}
                                          >
                                          <label htmlFor="exampleDropdownFormEmail1">
                                            Repeat every
                                          </label>
                                          <input
                                            type="email"
                                            className="form-control"
                                            id="exampleDropdownFormEmail1"
                                            style={{ width: "100%" }}
                                            />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="exampleDropdownFormEmail1">
                                            Start date
                                          </label>
                                          <input
                                            type="email"
                                            className="form-control"
                                            id="exampleDropdownFormEmail1"
                                            style={{ width: "100%" }}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                          Save
                                        </button>
                                      </DropdownMenu>
                                    </Dropdown>
                                  </InputGroup>
                                </FormGroup>
                              )}

                              <div className="form-group" style={{ marginBottom: 0 }}>
                                <label htmlFor="fileUpload">{i18n.t("attachments")}</label>
                                <input
                                  type="file"
                                  id="fileUpload"
                                  style={{ display: "none" }}
                                  onChange={e => {
                                    let file = e.target.files[0];
                                    let self = this;
                                    this.props.uploadFile(file, this.props.token);
                                    setTimeout(function() {
                                      self.autoSubmit();
                                    }, 4000);
                                  }}
                                  />
                                <div>
                                <label
                                  htmlFor="fileUpload"
                                  className="btn btn-primary btn-block uploadButton"
                                  >
                                    {i18n.t("addAttachment")}
                                </label>
                              </div>
                              </div>

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

                                        <button
                                          type="button"
                                          className="close"
                                          aria-label="Close"
                                          style={{ marginTop: "auto", marginBottom: "auto" }}
                                          onClick={() => {
                                            this.props.removeFile(item.id, this.props.token);
                                            let self = this;
                                            setTimeout(function() {
                                              self.autoSubmit();
                                            }, 3000);
                                          }}
                                          >
                                          <span
                                            aria-hidden="true"
                                            style={{
                                              color: "black",
                                              padding: 5,
                                              paddingBottom: 10,
                                              margin: 0
                                            }}
                                            >
                                            &times;
                                          </span>
                                        </button>
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div className="form-group">
                                  <MultiSelect
                                    data={this.props.users}
                                    displayValue="email"
                                    selectedIds={this.props.followers.map(
                                      follower => follower.id
                                    )}
                                    limit={true}
                                    idValue="id"
                                    filterBy="email"
                                    display="column"
                                    colored={false}
                                    menuItemStyle={{
                                      marginLeft: 7,
                                      marginRight: 7,
                                      marginTop: 2,
                                      marginBottom: 2,
                                      paddingTop: 2,
                                      paddingBottom: 2
                                    }}
                                    renderItem={item => (
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
                                      </div>
                                    )}
                                    titleStyle={{
                                      backgroundColor: "white",
                                      color: "black",
                                      size: "0.875rem"
                                    }}
                                    toggleStyle={{
                                      backgroundColor: "white",
                                      border: "none",
                                      padding: 0,
                                      fontSize: "0.875rem"
                                    }}
                                    label={i18n.t("selectFollowers")}
                                    labelStyle={{ marginLeft: 10 }}
                                    searchStyle={{ margin: 5 }}
                                    onChange={(ids, items, item) => {
                                      if (
                                        ids.map(id => id.toString()).includes(item.toString())
                                      ) {
                                        this.props.addFollower(
                                          item,
                                          this.props.task.id,
                                          this.props.token
                                        );
                                      } else {
                                        this.props.deleteFollower(
                                          item,
                                          this.props.task.id,
                                          this.props.token
                                        );
                                      }
                                    }}
                                    />
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
                    })(EditTask);
