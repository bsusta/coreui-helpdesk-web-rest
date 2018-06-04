import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonGroup
} from "reactstrap";
import Comments from "./Comments";
import AddComment from "./AddComment";
import Subtask from "./Subtasks";

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

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      selected: 0,
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  render() {
    return (
      <div>
        <Card style={{ maxWidth: 1380, margin: "auto", borderTop: "0",border:'none'}}>
          <CardHeader>
          <button class="btn btn-success mr-1" onClick={this.props.toggle}>
          <i class="fa fa-save" /> Pridať
          </button>
          <button class="btn btn-danger mr-1" onClick={this.props.toggle}>
          <i class="fa fa-ban" /> Zrušiť
          </button>
          </CardHeader>
          <CardBody style={{border:'none'}}>
            <div className="row">
              <div className="col-8" style={{ borderRight: "1px solid #eee" }}>
                <form>
                  <div class="form-group">
                    <label for="title">Task Name</label>
                    <input
                      class="form-control"
                      id="title"
                      placeholder="Zadajte názov úlohy"
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
                    />
                  </div>
                </form>
                <Subtask />
                <AddComment />
                <Comments />
              </div>

              <div className="col-4">
                <form>
                  <div class="form-group">
                    <label for="status">Status</label>
                    <select
                      class="form-control"
                      style={{
                        color: "white",
                        backgroundColor: mockOptions[this.state.selected].color
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
                          style={{ color: "white", backgroundColor: opt.color }}
                          value={opt.id}
                        >
                          {opt.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="title">Due date</label>
                    <input class="form-control" id="title" />
                  </div>

                  <div class="form-group">
                    <label for="project">Project</label>
                    <select class="form-control" id="project">
                      {mockOptions.map(opt => (
                        <option key={opt.id} value={opt.id}>
                          {opt.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="requester">Requester</label>
                    <select class="form-control" id="requester">
                      {mockOptions.map(opt => (
                        <option key={opt.id} value={opt.id}>
                          {opt.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="company">Company</label>
                    <select class="form-control" id="company">
                      {mockOptions.map(opt => (
                        <option key={opt.id} value={opt.id}>
                          {opt.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="assigned">Assigned</label>
                    <select class="form-control" id="assigned">
                      {mockOptions.map(opt => (
                        <option key={opt.id} value={opt.id}>
                          {opt.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="title">Odpracované hodiny</label>
                    <input class="form-control" id="title" />
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
                  <div class="form-group">
                    <label for="assigned">Opakovanie</label>

                    <Dropdown
                      isOpen={this.state.dropdownOpen}
                      toggle={this.toggle}
                    >
                      <DropdownToggle caret>no repeat</DropdownToggle>
                      <DropdownMenu>
                        <form class="px-4 py-3">
                          <div class="form-group">
                            <label for="exampleDropdownFormEmail1">
                              Repeat every
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              id="exampleDropdownFormEmail1"
                            />
                          </div>
                          <div class="form-group">
                            <select class="form-control" id="assigned">
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
                            />
                          </div>
                          <button type="submit" class="btn btn-primary">
                            Save
                          </button>
                        </form>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div class="form-group">
                    <label for="assigned">Prílohy</label>
                    <button class="btn btn-primary btn-block" type="submit">
                      Add prílohu
                    </button>
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

export default AddTask;
