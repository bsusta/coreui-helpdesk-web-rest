import { Link } from "react-router-dom";
import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import { connect } from "react-redux";

class StatusesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "",
      name: "",
      description: ""
    };
    console.log(this.props.statuses);
    this.getFilteredData.bind(this);
  }

  getFilteredData() {
    return this.props.statuses
      .filter(item =>
        item.title.toLowerCase().includes(this.state.name.toLowerCase())
      )
      .filter(
        item =>
          !item.description ||
          item.description
            .toLowerCase()
            .includes(this.state.description.toLowerCase())
      )
      .filter(
        item =>
          item.is_active ==
            (this.state.active.toLowerCase().includes("y") ||
              this.state.active.toLowerCase().includes("t") ||
              this.state.active.toLowerCase().includes("c")) ||
          this.state.active == ""
      )
      .sort((item, item2) => item.order > item2.order);
  }

  render() {
    return (
      <div className="table-div">
        <h2 className="mb-3">Statuses list</h2>

        <button
          type="button"
          className="btn btn-success"
          onClick={() => this.props.history.push("/status/add")}
        >
          Add new status
        </button>

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ borderTop: "0px" }}>Name</th>
              <th style={{ borderTop: "0px" }}>Description</th>
              <th style={{ borderTop: "0px" }}>Color</th>
              <th style={{ borderTop: "0px" }}>Active</th>
              <th style={{ borderTop: "0px" }}>Order</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Input
                  type="text"
                  id="input1-group1"
                  value={this.state.name}
                  name="input1-group1"
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </th>
              <th>
                <Input
                  type="text"
                  id="input1-group1"
                  value={this.state.description}
                  name="input1-group1"
                  onChange={e => this.setState({ description: e.target.value })}
                />
              </th>
              <th>
                <Input
                  type="text"
                  id="input1-group1"
                  name="input1-group1"
                  disabled={true}
                  style={{ display: "none" }}
                />
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
              <th>
                <Input
                  type="text"
                  id="input1-group1"
                  name="input1-group1"
                  disabled={true}
                  style={{ display: "none" }}
                />
              </th>
            </tr>
            {this.getFilteredData().map(status => (
              <tr
                key={status.id}
                onClick={() =>
                  this.props.history.push("/status/edit/" + status.id)
                }
              >
                <td>{status.title}</td>
                <td>{status.description}</td>
                <td>
                  <span
                    className="badge"
                    style={{
                      color: "white",
                      backgroundColor: status.color,
                      padding: 10,
                      fontSize: 15
                    }}
                  >
                    {status.title}
                  </span>
                </td>
                <td>
                  {status.is_active ? (
                    <span className="badge badge-success">Yes</span>
                  ) : (
                    <span className="badge badge-danger">No</span>
                  )}
                </td>
                <td>{status.order}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = ({ statusesReducer }) => {
  const { statuses } = statusesReducer;
  return { statuses };
};

export default connect(mapStateToProps, {})(StatusesList);
