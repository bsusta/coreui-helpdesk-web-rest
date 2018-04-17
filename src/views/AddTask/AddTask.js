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
import Comments from "./Comments";
import AddComment from "./AddComment";
import SubtasksLoader from "./SubtasksLoader";
import Subtasks from "./Subtasks";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import RichTextEditor from "react-rte";
import Select from "react-select";
import {
  getTaskSolvers,
  deleteTaskSolvers,
  addTask,
  deleteTask,
  uploadFile,
  removeFile,
  addFollower,
  deleteFollower
} from "../../redux/actions";
import { timestampToString } from "../../helperFunctions";
import MultiSelect from "../../components/multiSelect";
class AddTask extends Component {
  constructor(props) {
    super(props);
    let task_data = {};
    this.props.taskAttributes.map(attribute => {
      let value = "";
      switch (attribute.type) {
        case "input":
          value = "";
          break;
        case "text_area":
          value = "";
          break;
        case "simple_select":
          value = attribute.options[0];
          break;
        case "multi_select":
          value = [];
          break;
        case "date":
          value = "";
          break;
        case "decimal_number":
          value = "";
          break;
        case "integer_number":
          value = "";
          break;
        case "checkbox":
          value = false;
          break;
        default:
          value = "null";
      }
      task_data[attribute.id] = value;
    });
    this.state = {
      company: null,
      deadline: "",
      startedAt: "",
      closedAt: "",
      description: (RichTextEditor.createValueFromString("","html")),
      important: false,
      project: (this.props.taskProjects.length>0?this.props.taskProjects[0].id:null),
      requestedBy:null,
      status: (this.props.statuses.length>0?this.props.statuses[0].id:null),
      tags: [],
      title: "Task",
      workTime: "",
      work: "",
      newTags: [],
      newTag: "",
      ///////
      taskSolver:"null",
      attachements: [],
      task_data,
      followers: [],
      created:false,
    };
    this.autoSubmit.bind(this);
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

  componentDidMount() {
    if(this.state.project){
      this.titleInput.focus();
    }
  }


  autoSubmit(name, value, id) {
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <button class="btn btn-link" onClick={this.props.history.goBack}>
              <i class="fa fa-close" /> Close
            </button>
            <button class="btn btn-link" onClick={this.props.history.goBack}>
              <i class="fa fa-ban" /> Cancel
            </button>

            <button class="btn btn-link">
              <i class="fa fa-print" /> Print
            </button>
            <button class="btn btn-link" onClick={this.delete.bind(this)}>
              <i class="fa fa-trash" /> Vymazať
            </button>
          </CardHeader>
          <CardBody>
            <div
              className="row"
              style={{ borderBottom: "1px solid #eee", marginBottom: 17 }}
            >
              <div className="col-8">
                <form>
                  <div class="form-group">
                    {!this.state.project && <h5 style={{color:'red'}}>You can't create task without project!</h5>}
                    {this.state.project &&
                    <input
                      class="form-control"
                      id="title"
                      ref={(input) => { this.titleInput = input; }}
                      placeholder="Enter title"
                      value={this.state.title}
                      style={{ fontSize: 24, border: "none" }}
                      onBlur={()=>{
                        if(!this.state.created){
                          this.setState({ created: true })
                          this.props.addTask(this.state.title,this.state.project,this.state.status,this.props.token);
                        }
                      }}
                      onChange={e => {
                        if(!this.state.created){
                          this.setState({ title: e.target.value });
                        }
                        else{
                          this.autoSubmit("title", e.target.value);
                          this.setState({ title: e.target.value });
                        }
                      }}
                    />
                  }
                  </div>
                </form>
              </div>
              <div
                className="col-4"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
              >
                {this.props.task&&<label className="float-right">
                  Vytvoril: {this.props.task.createdBy.username} ({
                    this.props.task.createdBy.email
                  }) {timestampToString(this.props.task.createdAt)}
                </label>}
              </div>
            </div>
            <div className="row">
              <div className="col-8" style={{ borderRight: "1px solid #eee" }}>
                <form>
                  <div class="form-group">
                    <MultiSelect
                      id="tags"
                      data={this.state.newTags.concat(this.props.tags)}
                      displayValue="title"
                      selectedIds={this.state.tags}
                      idValue="id"
                      filterBy="title"
                      display="row"
                      disabled={!this.state.created||!this.props.task}
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
                          class="badge"
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
                    disabled={!this.state.created||!this.props.task}
                    value={this.state.description}
                    onChange={e => {
                      this.autoSubmit("description", e);
                      this.setState({ description: e });
                    }}
                    placeholder="Enter description"
                    toolbarClassName="demo-toolbar"
                    editorClassName="demo-editor"
                  />
                </form>

                {(!this.props.task || !this.props.subtasksLoaded) &&
                  <Subtasks
                    units={this.props.units.filter(unit => unit.is_active)}
                  />
                }
                { !this.props.task &&
                  <Comments />
                }


              {this.props.task &&
                <SubtasksLoader
                  taskID={this.props.task.id}
                  units={this.props.units.filter(unit => unit.is_active)}
                />
              }
              { this.props.task &&
                <CommentsLoader taskID={this.props.task.id} />
              }
             </div>

              <div className="col-4">
                <form>
                  <FormGroup>
                    <label class="form-check-label">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        disabled={this.state.created||!this.props.task}
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
                    <label for="status">Status</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-list" />
                      </InputGroupAddon>
                      <select
                        class="form-control"
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
                    <label for="deadline">Due date</label>
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
                    <label for="startedAt">Started at</label>
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
                    <label for="closedAt">Closed at</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-clock-o" />
                      </InputGroupAddon>
                      <div style={{ width: "100%" }} className="datepickerWrap">
                        <DatePicker
                          selected={this.state.closedAt}
                          onChange={e => {
                            this.autoSubmit("closedAt", e);
                            this.setState({ closedAt: e });
                          }}
                          locale="en-gb"
                          placeholderText="Closed at"
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          dateFormat="DD.MM.YYYY HH:mm"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <label for="project">Project</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-folder-o" />
                      </InputGroupAddon>
                      <select
                        class="form-control"
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
                    <label for="assigned">Assigned</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-user-plus" />
                      </InputGroupAddon>
                      <select
                        class="form-control"
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
                    <label for="requester">Requester</label>
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
                    <label for="company">Company</label>
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
                    <label for="workTime">Odpracované hodiny</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-hourglass-o" />
                      </InputGroupAddon>
                      <input
                        class="form-control"
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
                    <label for="work">Práca</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-list" />
                      </InputGroupAddon>
                      <input
                        class="form-control"
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

                  <FormGroup>
                    <label for="assigned">Opakovanie</label>
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
                          <form class="px-4 py-3" style={{ width: "100%" }}>
                            <div class="form-group" style={{ width: "100%" }}>
                              <label for="exampleDropdownFormEmail1">
                                Repeat every
                              </label>
                              <input
                                type="email"
                                class="form-control"
                                id="exampleDropdownFormEmail1"
                                style={{ width: "100%" }}
                              />
                            </div>
                            <div class="form-group">
                              <label for="exampleDropdownFormEmail1">
                                Start date
                              </label>
                              <input
                                type="email"
                                class="form-control"
                                id="exampleDropdownFormEmail1"
                                style={{ width: "100%" }}
                              />
                            </div>
                            <button type="submit" class="btn btn-primary">
                              Save
                            </button>
                          </form>
                        </DropdownMenu>
                      </Dropdown>
                    </InputGroup>
                  </FormGroup>

                  <div class="form-group" style={{ marginBottom: 0 }}>
                    <label for="fileUpload">Prílohy</label>
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
                    <label class="btn btn-primary btn-block" for="fileUpload">
                      Add attachement
                    </label>
                  </div>

                  <div class="form-group">
                    <div style={{ paddingTop: 5, paddingRight: 10 }}>
                      {this.props.attachements.map(item => (
                        <span
                          class="badge"
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
                            class="close"
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

                  <div class="form-group">
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
                          class="badge"
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
                          <div class="form-group">
                            <label for={attribute.id}>{attribute.title}</label>
                            <input
                              class="form-control"
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
                          <div class="form-group">
                            <label for={attribute.id}>{attribute.title}</label>
                            <textarea
                              class="form-control"
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
                          <div class="form-group">
                            <label for={attribute.id}>{attribute.title}</label>
                            <select
                              class="form-control"
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
                          <div class="form-group">
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
                                  class="badge"
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
                          <div class="form-group">
                            <label for={attribute.id}>{attribute.title}</label>
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
                          <div class="form-group">
                            <label for={attribute.id}>{attribute.title}</label>
                            <input
                              class="form-control"
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
                          <div class="form-group">
                            <label for={attribute.id}>{attribute.title}</label>
                            <input
                              class="form-control"
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
                          <div class="form-check">
                            <label class="form-check-label">
                              <input
                                type="checkbox"
                                class="form-check-input"
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
                </form>
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
  subtasksReducer
}) => {
  const { task, taskProjects, taskAttributes, taskSolvers } = tasksReducer;
  const { statuses } = statusesReducer;
  const { companies } = companiesReducer;
  const { tags } = tagsReducer;
  const { units } = unitsReducer;
  const { users } = usersReducer;
  const { attachements } = attachementsReducer;
  const { followers } = followersReducer;
  const { subtasksLoaded } = subtasksReducer;
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
    subtasksLoaded,
    token
  };
};

export default connect(mapStateToProps, {
  getTaskSolvers,
  deleteTaskSolvers,
  addTask,
  deleteTask,
  uploadFile,
  removeFile,
  addFollower,
  deleteFollower
})(AddTask);
