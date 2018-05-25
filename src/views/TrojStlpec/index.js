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

class TrojStlpec extends Component {
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
        <div className="row ml-0 mr-0">
          <div className="col-4" style={{ padding: 0 }}>
            <Card
              style={{
                borderTop: 0,
                borderRight: 0,
                borderBottom: 0
              }}
            >
              <CardHeader
                style={{
                  borderRight: 0,
                  paddingLeft: 0,
                  paddingRight: 0
                }}
              >
                <div class="d-flex justify-content-end">
                  <div class="mr-auto">
                    <button class="btn btn-link active">
                      <i class="fa fa-filter " /> Active
                    </button>
                  </div>
                  <div class="">
                    <i class="fa fa-sort text-primary" />
                    <button class="btn btn-link active">Podla: Status</button>
                  </div>
                </div>
              </CardHeader>

              <CardBody
                style={{
                  borderBottom: 0,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingBottom: 0,
                  paddingTop: 0
                }}
              >
                <div
                  class="pt-3 pb-3"
                  style={{ borderBottom: "1px solid #c2cfd6" }}
                >
                  <div class="d-flex justify-content-end ">
                    <div class="mr-auto">
                      <h6 className="m-0">
                        9482: Odtestovať email round-trip monitoring
                      </h6>
                    </div>
                    <div class="p-1" />
                  </div>
                  <div class="d-flex justify-content-end">
                    <div class="mr-auto text-muted">Zadal: bsusta</div>
                    <div class="">
                      <span class="badge badge-success">NEW</span>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end">
                    <div class="mr-auto text-muted">Riesi: bsusta</div>
                    <div class="">
                      <i class="fa fa-asterisk text-muted" /> 14:00 22.12.2017
                    </div>
                  </div>
                  <div class="d-flex justify-content-end">
                    <div class="mr-auto text-muted">Projekt: Projekt 1</div>
                    <div class="">
                      <i class="fa fa-clock-o text-muted" /> 14:00 22.12.2017
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="col-8" style={{ padding: 0 }}>
            <Card style={{ borderTop: "0" }}>
              <CardHeader
                style={{
                  borderLeft: 0,
                  paddingLeft: 0,
                  paddingRight: 0
                }}
              >
                <button class="btn btn-link active">
                  <i class="fa fa-save" /> Ulozit
                </button>
                <button class="btn btn-link active">
                  <i class="fa fa-ban" /> Cancel
                </button>

                <button class="btn btn-link active">
                  <i class="fa fa-print" /> Print
                </button>
                <button class="btn btn-link active">
                  <i class="fa fa-remove" /> Vymazať
                </button>
              </CardHeader>
              <CardBody>
                <form>
                  <div class="form-group">
                    <label for="title">Task Name</label>
                    <input
                      class="form-control"
                      id="title"
                      placeholder="Oprava PC"
                    />
                  </div>
                </form>

                <div className="row">
                  <div className="col">
                    <div class="form-group">
                      <label for="status">Status</label>
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
                    </div>
                  </div>
                  <div className="col">
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
                  </div>
                  <div className="col">
                    <div class="form-group">
                      <label for="title">Due date</label>
                      <input class="form-control" id="title" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
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
                  </div>
                  <div className="col">
                    {" "}
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
                  </div>
                  <div className="col">
                    {" "}
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
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    {" "}
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
                  </div>
                  <div className="col">
                    {" "}
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
                  </div>
                  <div className="col">
                    {" "}
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
                  </div>
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <textarea
                    class="form-control"
                    id="description"
                    placeholder="Enter description"
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

                <Subtask />
                <AddComment />
                <Comments />

                <form>
                  <div class="form-group">
                    <label for="assigned">Prílohy</label>
                    <button class="btn btn-primary btn-block" type="submit">
                      Add prílohu
                    </button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default TrojStlpec;
