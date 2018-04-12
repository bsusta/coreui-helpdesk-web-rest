import { Link } from "react-router-dom";
import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
const mockData = [
  { id: 1, active: true, name: "Send mail", description: "none" }
];
class TriggersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      shortcut: "",
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
        <h2 className="mb-3">Trigger list</h2>

        <button
          type="button"
          class="btn btn-success"
          onClick={() => this.props.history.push("/trigger/add")}
        >
          Add new trigger
        </button>

        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ borderTop: "0px" }}>Name</th>
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
                <Input
                  type="text"
                  id="input1-group1"
                  value={this.state.activated}
                  name="input1-group1"
                  onChange={e => this.setState({ activated: e.target.value })}
                />
              </th>
            </tr>
            {this.getFilteredData().map(trigger => (
              <tr
                key={trigger.id}
                onClick={() =>
                  this.props.history.push("/trigger/edit/" + trigger.id)
                }
              >
                <td>{trigger.name}</td>
                <td>{trigger.description}</td>
                <td>
                  {trigger.active ? (
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

export default TriggersList;
