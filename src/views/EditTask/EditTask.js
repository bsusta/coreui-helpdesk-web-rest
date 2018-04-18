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
import CommentsLoader from "./CommentsLoader";
import AddComment from "./AddComment";
import SubtasksLoader from "./SubtasksLoader";
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
import { timestampToString, initialiseCustomAttributes, processCustomAttributes,importExistingCustomAttributesForTask } from "../../helperFunctions";
import MultiSelect from "../../components/multiSelect";
class EditTask extends Component {
  constructor(props) {
    super(props);
    let task_data = importExistingCustomAttributesForTask(initialiseCustomAttributes(this.props.taskAttributes),this.props.task.taskData,this.props.taskAttributes);
    task_data=this.fillCustomAttributesNulls(task_data,this.props.taskAttributes);
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
    this.state = {
      company,
      deadline: this.props.task.deadline
        ? moment(this.props.task.deadline * 1000)
        : null,
      startedAt: this.props.task.startedAt
        ? moment(this.props.task.startedAt * 1000)
        : null,
      description: RichTextEditor.createValueFromString(
        this.props.task.description,
        "html"
      ),
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
      workTime: this.props.task.workTime ? this.props.task.workTime : "",
      work: this.props.task.work ? this.props.task.work : "",
      newTags: [],
      newTag: "",
      ///////
      taskSolver:
        this.props.task.taskHasAssignedUsers.length == 0
          ? "null"
          : Object.values(this.props.task.taskHasAssignedUsers)[0].user.id,
      attachements: [],
      task_data,
      followers: this.props.followers.map((follower)=>follower.id)
    };
    this.autoSubmit.bind(this);
  }

  fillCustomAttributesNulls(attributes,originalAttributes){
    for (let key in attributes) {
      if(attributes[key]===null){
        switch (originalAttributes[originalAttributes.findIndex(item => item.id == key)].type) {
          case 'checkbox':
            attributes[key]=false;
          case 'date':
            attributes[key]=moment();
            break;
          default:{
            attributes[key]=10;
          }
        }
      }
    }
    return attributes;
  }

  delete(e) {
    e.preventDefault();
    if (confirm("Are you sure you wish to delete this task?")) {
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
    } else if(name ==="newTag"){
      state.tags=value.tags;
      state.newTags=value.newTags;
      state.newTag=value.newTag;
    }
     else if (name) {
      state[name] = value;
    }
    let task_data = processCustomAttributes({...state.task_data},[...this.props.taskAttributes]);
    let tags = [];
    state.tags.map(addTag =>
      tags.push(
        this.props.tags.concat(state.newTags).find(tag => tag.id == addTag)
          .title
      )
    );
    this.props.editTask(
      {
        title: state.title,
        description: state.description.toString("html"),
        deadline:
          state.deadline !== null ? state.deadline.valueOf() / 1000 : 'null',
        startedAt:
          state.startedAt !== null ? state.startedAt.valueOf() / 1000 : 'null',
        important: state.important,
        work: state.work,
        workTime: state.workTime.length == 0 ? undefined : state.workTime,
        tag: JSON.stringify(tags),
        assigned:
          state.taskSolver != "null"
            ? JSON.stringify([{ userId: parseInt(state.taskSolver) }])
            : null,
        attachment:
          this.props.attachements.length === 0
            ? undefined
            : JSON.stringify(
                this.props.attachements.map(attachement => attachement.id)
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
      <div>
        <Card>
          <CardHeader>
            <button className="btn btn-link" onClick={this.props.history.goBack}>
              <i className="fa fa-close" /> Close
            </button>
            <button className="btn btn-link" onClick={this.props.history.goBack}>
              <i className="fa fa-ban" /> Cancel
            </button>

            <button className="btn btn-link">
              <i className="fa fa-print" /> Print
            </button>
            <button className="btn btn-link" onClick={this.delete.bind(this)}>
              <i className="fa fa-trash" /> Vymazať
            </button>
          </CardHeader>
          <CardBody>
            <div
              className="row"
              style={{ borderBottom: "1px solid #eee", marginBottom: 17 }}
            >
              <div className="col-8">
                  <div className="form-group">
                    {/*<label htmlFor ="title">Task Name</label>*/}

                    <input
                      className="form-control"
                      id="title"
                      placeholder="Enter title"
                      value={this.state.title}
                      style={{ fontSize: 24, border: "none" }}
                      onChange={e => {
                        this.autoSubmit("title", e.target.value);
                        this.setState({ title: e.target.value });
                      }}
                    />
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
            <div className="row">
              <input
                className="form-control"
                id="newTag"
                placeholder="Add new tag"
                value={this.state.newTag}
                style={{ width:200, marginLeft:15 }}
                onChange={(e)=>this.setState({newTag:e.target.value})}
              />

              <button className="btn btn-success mr-1" onClick={()=>{
                this.autoSubmit("newTag", {
                    tags:this.state.tags.concat(((-1)*this.state.newTags.length-1)),
                    newTags:this.state.newTags.concat({
                      title:this.state.newTag,
                      color:'7f7f7f',
                      id:(-1)*this.state.newTags.length-1}),
                    newTag:'',
                  });
                this.setState({
                  tags:this.state.tags.concat(((-1)*this.state.newTags.length-1)),
                  newTags:this.state.newTags.concat({
                    title:this.state.newTag,
                    color:'7f7f7f',
                    id:(-1)*this.state.newTags.length-1}),
                  newTag:'',
                });
              }}>
                <i className="fa fa-plus" />
              </button>
            </div>
            <div className="row">
              <div className="col-8" style={{ borderRight: "1px solid #eee" }}>
                  <div className="form-group">
                    <MultiSelect
                      id="tags"
                      data={this.state.newTags.concat(this.props.tags)}
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
                            backgroundColor: "#" + item.color,
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
                      label="Select tags"
                      labelStyle={{ marginLeft: 10 }}
                      searchStyle={{ margin: 5 }}
                      onChange={(ids, items) => {
                        this.autoSubmit("tags", ids);
                        this.setState({ tags: ids });
                      }}
                    />
                  </div>

                  <RichTextEditor
                    value={this.state.description}
                    onChange={e => {
                      this.autoSubmit("description", e);
                      this.setState({ description: e });
                    }}
                    placeholder="Enter description"
                    toolbarClassName="demo-toolbar"
                    editorClassName="demo-editor"
                  />
                <SubtasksLoader
                  taskID={this.props.task.id}
                  units={this.props.units.filter(unit => unit.is_active)}
                />
                <CommentsLoader taskID={this.props.task.id} />
              </div>

              <div className="col-4">
                  <FormGroup>
                    <label className="form-check-label">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={this.state.important}
                        onChange={e => {
                          this.autoSubmit("important", !this.state.important);
                          this.setState({ important: !this.state.important });
                        }}
                      />
                      Important
                    </label>
                  </FormGroup>

                  <FormGroup>
                      <label htmlFor="status">Status</label>
                      {this.props.task.closedAt && this.state.status.toString()==='4' && <span style={{float:'right'}}>Closed at: {timestampToString(this.props.task.closedAt)}</span>}
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-list" />
                      </InputGroupAddon>
                      <select
                        className="form-control"
                        style={{
                          color: "white",
                          backgroundColor: this.props.statuses.find(
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
                    <label htmlFor="deadline">Due date</label>
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
                    <label htmlFor="startedAt">Started at</label>
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
                          placeholderText="Started at"
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          dateFormat="DD.MM.YYYY HH:mm"
                        />
                      </div>
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="project">Project</label>
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
                    <label htmlFor="assigned">Assigned</label>
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
                        {[{ id: "null", username: "Nikto" }]
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
                    <label htmlFor="requester">Requester</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-user-o" />
                      </InputGroupAddon>
                      <Select
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
                        value={this.state.requestedBy}
                        onChange={e => {
                          this.autoSubmit("requestedBy", e);
                          this.setState({ requestedBy: e });
                        }}
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="company">Company</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-building-o" />
                      </InputGroupAddon>
                      <Select
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
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="workTime">Odpracované hodiny</label>
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
                        placeholder={"Input work time"}
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="work">Práca</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-list" />
                      </InputGroupAddon>
                      <input
                        className="form-control"
                        id="work"
                        value={this.state.work}
                        onChange={e => {
                          this.autoSubmit("work", e.target.value);
                          this.setState({ work: e.target.value });
                        }}
                        placeholder={"Work to do"}
                      />
                    </InputGroup>
                  </FormGroup>

                  {false &&<FormGroup>
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
                            <div className="form-group" style={{ width: "100%" }}>
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
                  </FormGroup>}

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label htmlFor="fileUpload">Prílohy</label>
                    <input
                      type="file"
                      id="fileUpload"
                      style={{ display: "none" }}
                      onChange={e => {
                        let file = e.target.files[0];
                        let self=this;
                        this.props.uploadFile(file, this.props.token);
                        setTimeout(function() {
                          self.autoSubmit();
                        }, 4000);
                      }}
                    />
                    <label className="btn btn-primary btn-block" htmlFor="fileUpload">
                      Add attachement
                    </label>
                  </div>

                  <div className="form-group">
                    <div style={{ paddingTop: 5, paddingRight: 10 }}>
                      {this.props.attachements.map(item => (
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
                              let self=this;
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
                      selectedIds={this.props.followers.map((follower)=>follower.id)}
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
                      label="Select followers"
                      labelStyle={{ marginLeft: 10 }}
                      searchStyle={{ margin: 5 }}
                      onChange={(ids, items, item) => {
                        if ((ids.map((id)=>id.toString())).includes(item.toString())) {
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

                  {this.props.taskAttributes.map(attribute => {
                    switch (attribute.type) {
                      case "input":
                        return (
                          <div className="form-group" key={attribute.id}>
                            <label htmlFor={attribute.id}>{attribute.title}</label>
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
                              placeholder={"Enter " + attribute.title}
                            />
                          </div>
                        );
                      case "text_area":
                        return (
                          <div className="form-group" key={attribute.id}>
                            <label htmlFor={attribute.id}>{attribute.title}</label>
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
                              placeholder={"Enter " + attribute.title}
                            />
                          </div>
                        );
                      case "simple_select":
                        return (
                          <div className="form-group" key={attribute.id}>
                            <label htmlFor={attribute.id}>{attribute.title}</label>
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
                          <div className="form-group" key={attribute.id}>
                            <label htmlFor={attribute.id}>{attribute.title}</label>
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
                          </div>
                        );
                      case "decimal_number":
                        return (
                          <div className="form-group" key={attribute.id}>
                            <label htmlFor={attribute.id}>{attribute.title}</label>
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
                              placeholder={"Select " + attribute.title}
                            />
                          </div>
                        );
                      case "integer_number":
                        return (
                          <div className="form-group" key={attribute.id}>
                            <label htmlFor={attribute.id}>{attribute.title}</label>
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
                              placeholder={"Select " + attribute.title}
                            />
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
  attachementsReducer,
  followersReducer,
  taskAttributesReducer
}) => {
  const { task, taskProjects, taskSolvers } = tasksReducer;
  const {taskAttributes} = taskAttributesReducer;
  const { statuses } = statusesReducer;
  const { companies } = companiesReducer;
  const { tags } = tagsReducer;
  const { units } = unitsReducer;
  const { users } = usersReducer;
  const { attachements } = attachementsReducer;
  const { followers } = followersReducer;
  const { token } = login;
  return {
    task,
    taskProjects,
    companies,
    taskAttributes,
    statuses,
    tags,
    units,
    taskSolvers,
    users,
    attachements,
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
