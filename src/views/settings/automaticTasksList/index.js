import { Link } from "react-router-dom";
import React, { Component } from "react";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Card,
  CardHeader
} from "reactstrap";
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
      active: ""
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
            (this.state.active.toLowerCase().includes("y") ||
            this.state.active.toLowerCase().includes("an") ||
            this.state.active.toLowerCase().includes("á") ||
            this.state.active.toLowerCase().includes("t") ||
              this.state.active.toLowerCase().includes("c")) ||
          this.state.active == ""
      )
      .sort((item, item2) => item.title > item2.title?1:-1);
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <button className="btn btn-link" onClick={this.props.history.goBack}>
            <i className="fa fa-angle-left" /> Back
          </button>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => this.props.history.push("/automaticTask/add")}
          >
            <i className="fa fa-plus" /> Automatic Task
          </button>
        </CardHeader>
        <div className="table-div-panel">
          <h2 className="h2" className="mb-3">Automatic tasks list</h2>

          <table className="table table-striped table-hover">
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
                    value={this.state.active}
                    name="input1-group1"
                    onChange={e => this.setState({ active: e.target.value })}
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
                      <span className="badge badge-success">Yes</span>
                    ) : (
                      <span className="badge badge-danger">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    );
  }
}

export default AutomaticTasksList;
