import { Link } from "react-router-dom";
import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
const mockData = [
  {
    id: 1,
    active: true,
    name: "Task overdue",
    startTime: "every one hour",
    description: "change status pending to solved when is task start overdue"
  }
];
class AutomaticTasksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      activated: ""
    };
    this.getFilteredData.bind(this);
  }

  getFilteredData() {
    return mockData
      .filter(item =>
        item.name.toLowerCase().includes(this.state.title.toLowerCase())
      )
      .filter(
        item =>
          item.active ==
            (this.state.activated.toLowerCase().includes("y") ||
              this.state.activated.toLowerCase().includes("t") ||
              this.state.activated.toLowerCase().includes("c")) ||
          this.state.activated == ""
      )
      .sort((item, item2) => item.title > item2.title);
  }

  render() {
    return (
      <div class="table-div">
        <h2 className="mb-3">Automatic tasks list</h2>

        <button
          type="button"
          class="btn btn-success"
          onClick={() => this.props.history.push("/automaticTask/add")}
        >
          Add new automatic task
        </button>

        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ borderTop: "0px" }}>Name</th>
              <th style={{ borderTop: "0px" }}>Start time</th>
              <th style={{ borderTop: "0px" }}>Description</th>
              <th style={{ borderTop: "0px" }}>Active</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Input
                  type="text"
                  id="input1-group1"
                  value={this.state.title}
                  name="input1-group1"
                  onChange={e => this.setState({ title: e.target.value })}
                />
              </th>
              <th>
                <Input type="text" id="input1-group1" name="input1-group1" />
              </th>
              <th>
                <Input type="text" id="input1-group1" name="input1-group1" />
              </th>
              <th>
                <Input
                  type="text"
                  id="input1-group1"
                  value={this.state.activated}
                  name="input1-group1"
                  onChange={e => this.setState({ activated: e.target.value })}
                />
              </th>
            </tr>
            {this.getFilteredData().map(task => (
              <tr
                key={task.id}
                onClick={() =>
                  this.props.history.push("/automaticTask/edit/" + task.id)
                }
              >
                <td>{task.name}</td>
                <td>{task.startTime}</td>
                <td>{task.description}</td>
                <td>
                  {task.active ? (
                    <span class="badge badge-success">Yes</span>
                  ) : (
                    <span class="badge badge-danger">No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AutomaticTasksList;
