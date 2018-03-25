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
import Comments from "./Comments";
import AddComment from "./AddComment";
import Subtask from "./Subtasks";
import { connect } from 'react-redux';
import {getTaskSolvers,deleteTaskSolvers } from '../../redux/actions';

let mockOptions = [
  { id: 0, title: "Moznost 1", color: "#57b141" },
  { id: 1, title: "Moznost 2", color: "#8ebfbe" },
  { id: 2, title: "Moznost 3", color: "#a8bbbc" },
  { id: 3, title: "Moznost 4", color: "#0eb2ac" },
  { id: 4, title: "Moznost 5", color: "#7329b1" }
];

let mockStatus = [
  { id: 0, title: "Novy", color: "#6495ed" },
  { id: 1, title: "Riesit", color: "#458b74" },
  { id: 2, title: "Odložené", color: "#d68a00" },
  { id: 3, title: "Zavreté", color: "#7b7e8b" }
];

let mockPausal = [
  { id: 0, title: "Ano", color: "#57b141" },
  { id: 1, title: "Nie", color: "#8ebfbe" }
];

let mockRepeat = [
  { id: 0, title: "day", color: "#57b141" },
  { id: 1, title: "week", color: "#8ebfbe" },
  { id: 2, title: "month", color: "#d68a00" },
  { id: 3, title: "year", color: "#7b7e8b" }
];

let mockTypPrace = [
  { id: 0, title: "Servis IT", color: "#57b141" },
  { id: 1, title: "Programovanie", color: "#8ebfbe" }
];

class EditTask extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      company:this.props.task.company.id,
      deadline:this.props.task.deadline?this.props.task.deadline*1000:null,
      description:this.props.task.description,
      important:this.props.task.important,
      project:this.props.task.project.id,
      requestedBy:this.props.task.requestedBy.id,
      startedAt:this.props.task.startedAt?this.props.task.startedAt*1000:null,
      status:this.props.task.status.id,
      tags:this.props.task.tags,
      title:this.props.task.title,
      ///////
      selected: 0,
      dropdownOpen: false,
      attachements: []
    };
  }

  componentWillMount(){
    this.props.getTaskSolvers(this.props.task.project.id,this.props.token);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  render() {
    console.log(this.props.taskSolvers);
    return (
      <div>
        <Card
          style={{
            margin: "auto",
            borderTop: "0",
            minWidth: 800,
            backgroundColor: "#f0f3f5"
          }}
        >
          <CardHeader>
            <button class="btn btn-success mr-1" onClick={this.props.toggle}>
              <i class="fa fa-save" /> Ulozit
            </button>
            <button class="btn btn-warning mr-1" onClick={this.props.toggle}>
              <i class="fa fa-ban" /> Cancel
            </button>

            <button class="btn btn-primary mr-1">
              <i class="fa fa-print" /> Print
            </button>
            <button class="btn btn-danger mr-1">
              <i class="fa fa-remove" /> Vymazať
            </button>
          </CardHeader>
          <CardBody>
            <div className="row">
              <div className="col-8" style={{ borderRight: "1px solid #eee" }}>
                <form>
                  <div class="form-group">
                    <label for="title">Task Name</label>
                    <label className="float-right">
                      Vytvoril: bsusta (susta@lansystems.sk) 27.12.17 12:46
                    </label>
                    <input
                      class="form-control"
                      id="title"
                      placeholder="Enter title"
                      value={this.state.title}
                      style={{ fontSize: 18 }}
                    />
                  </div>

                  <div class="form-group">
                    <label for="tags">Tags</label>
                    <input
                      class="form-control"
                      id="tags"
                      placeholder="Enter tags"
                    />
                  </div>
                  <div class="form-group">
                    <label for="description">Description</label>
                    <textarea
                      class="form-control"
                      id="description"
                      placeholder="Enter description"
                      value={this.state.description}
                    />
                  </div>
                </form>
                <Subtask />
                <AddComment />
                <Comments />
              </div>

              <div className="col-4">
                <form>
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
                          backgroundColor:
                            mockOptions[this.state.selected].color
                        }}
                        selected={this.state}
                        id="status"
                        onChange={(event, value) => {
                          this.setState({ selected: event.target.value });
                        }}
                      >
                        {mockStatus.map(opt => (
                          <option
                            key={opt.id}
                            style={{
                              color: "white",
                              backgroundColor: opt.color
                            }}
                            value={opt.id}
                          >
                            {opt.title}
                          </option>
                        ))}
                      </select>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <label for="title">Due date</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-clock-o" />
                      </InputGroupAddon>
                      <input class="form-control" id="title" />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <label for="project">Project</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-folder-o" />
                      </InputGroupAddon>
                      <select class="form-control" id="project">
                        {mockOptions.map(opt => (
                          <option key={opt.id} value={opt.id}>
                            {opt.title}
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
                      <select class="form-control" id="requester">
                        {mockOptions.map(opt => (
                          <option key={opt.id} value={opt.id}>
                            {opt.title}
                          </option>
                        ))}
                      </select>
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <label for="company">Company</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-building-o" />
                      </InputGroupAddon>
                      <select class="form-control" id="company">
                        {mockOptions.map(opt => (
                          <option key={opt.id} value={opt.id}>
                            {opt.title}
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
                      <select class="form-control" id="assigned">
                        {mockOptions.map(opt => (
                          <option key={opt.id} value={opt.id}>
                            {opt.title}
                          </option>
                        ))}
                      </select>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <label for="title">Odpracované hodiny</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-hourglass-o" />
                      </InputGroupAddon>
                      <input class="form-control" id="title" />
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
                              <select
                                class="form-control"
                                id="assigned"
                                style={{ width: "100%" }}
                              >
                                {mockRepeat.map(opt => (
                                  <option key={opt.id} value={opt.id}>
                                    {opt.title}
                                  </option>
                                ))}
                              </select>
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

                  <div class="form-group">
                    <label for="assigned">Prílohy</label>
                    <button
                      class="btn btn-primary btn-block"
                      type="submit"
                      onClick={e => {
                        e.preventDefault();
                        this.setState({
                          attachements: [
                            {
                              name: "priloha " + this.state.attachements.length,
                              size: "" + Math.floor(Math.random() * 700 + 1)
                            },
                            ...this.state.attachements
                          ]
                        });
                      }}
                    >
                      Add prílohu
                    </button>
                    <div style={{ paddingTop: 5, paddingRight: 10 }}>
                      {this.state.attachements.map(item => (
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
                            {item.name}
                          </div>
                          <div style={{ flex: 1 }} />
                          <div
                            style={{ marginTop: "auto", marginBottom: "auto" }}
                          >
                            {item.size}kb
                          </div>
                          <button
                            type="button"
                            class="close"
                            aria-label="Close"
                            style={{ marginTop: "auto", marginBottom: "auto" }}
                            onClick={() => {
                              let newItems = [...this.state.attachements];
                              newItems.splice(
                                newItems.findIndex(at => at.name == item.name),
                                1
                              );
                              this.setState({ attachements: newItems });
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
                    <label for="assigned">Typ práce</label>
                    <select class="form-control" id="assigned">
                      {mockTypPrace.map(opt => (
                        <option key={opt.id} value={opt.id}>
                          {opt.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="assigned">Pausal</label>
                    <select class="form-control" id="assigned">
                      {mockPausal.map(opt => (
                        <option key={opt.id} value={opt.id}>
                          {opt.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({tasksReducer,statusesReducer, companiesReducer, tagsReducer, unitsReducer, login}) => {
  const {task, taskProjects, taskAttributes, taskSolvers} = tasksReducer;
  const {statuses} = statusesReducer;
  const {companies} = companiesReducer;
  const {tags} = tagsReducer;
  const {units} = unitsReducer;
  const {token} = login;
  return {task,taskProjects,companies,taskAttributes,statuses, tags, units, taskSolvers, token};
};


export default connect(mapStateToProps, {getTaskSolvers,deleteTaskSolvers})(EditTask);
