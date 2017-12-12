import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import Comments from "./Comments";
import AddComment from "./AddComment";

let mockOptions = [
  { id: 0, title: "Moznost 1", color: "#57b141" },
  { id: 1, title: "Moznost 2", color: "#8ebfbe" },
  { id: 2, title: "Moznost 3", color: "#a8bbbc" },
  { id: 3, title: "Moznost 4", color: "#0eb2ac" },
  { id: 4, title: "Moznost 5", color: "#7329b1" }
];

class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }
  render() {
    return (
      <div style={{ marginTop: 30 }}>
        <Card style={{ maxWidth: 1380, margin: "auto" }}>
          <CardHeader>
            <button class="btn btn-primary mr-1">
              <i class="fa fa-save" /> Save
            </button>
            <button class="btn btn-primary mr-1">
              <i class="fa fa-print" /> Print
            </button>
            <button class="btn btn-danger mr-1">
              <i class="fa fa-ban" /> Cancel
            </button>
          </CardHeader>
          <CardBody>
            <div className="row">
              <div className="col-8" style={{ borderRight: "1px solid #eee" }}>
                <form>
                  <div class="form-group">
                    <label for="title">Task Name</label>
                    <input
                      class="form-control"
                      id="title"
                      placeholder="Oprava PC"
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
                      {mockOptions.map(opt => (
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
                    <label for="worktime">Add work time</label>
                    <input
                      class="form-control"
                      id="worktime"
                      placeholder="Enter work time"
                    />
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

export default EditTask;
