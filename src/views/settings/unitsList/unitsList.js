import { Link } from "react-router-dom";
import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import { connect } from "react-redux";

class UnitsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      shortcut: "",
      activated: ""
    };
    this.getFilteredData.bind(this);
  }

  //filters all available data according to the inputs over the table (local filter)
  getFilteredData() {
    return this.props.units
      .filter(item =>
        item.title.toLowerCase().includes(this.state.title.toLowerCase())
      )
      .filter(item =>
        item.shortcut.toLowerCase().includes(this.state.shortcut.toLowerCase())
      )
      .filter(
        item =>
          item.is_active ==
            (this.state.activated.toLowerCase().includes("y") ||
              this.state.activated.toLowerCase().includes("t") ||
              this.state.activated.toLowerCase().includes("c")) ||
          this.state.activated == ""
      )
      .sort((item, item2) => item.title > item2.title);
  }

  render() {
    return (
      <div className="table-div">
        <h2 className="mb-3">Unit list</h2>

        <button
          type="button"
          className="btn btn-success"
          onClick={() => this.props.history.push("/unit/add")}
        >
          Add new unit
        </button>

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ borderTop: "0px" }}>Title</th>
              <th style={{ borderTop: "0px" }}>Shortcut</th>
              <th style={{ borderTop: "0px" }}>Activated</th>
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
                <Input
                  type="text"
                  id="input1-group1"
                  value={this.state.shortcut}
                  name="input1-group1"
                  onChange={e => this.setState({ shortcut: e.target.value })}
                />
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
            {this.getFilteredData().map(unit => (
              <tr
                key={unit.id}
                onClick={() => this.props.history.push("/unit/edit/" + unit.id)}
              >
                <td>{unit.title}</td>
                <td>{unit.shortcut}</td>
                <td>
                  {unit.is_active ? (
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
    );
  }
}

//all below is just redux storage

const mapStateToProps = ({ unitsReducer }) => {
  const { units } = unitsReducer;
  return { units };
};

export default connect(mapStateToProps, {})(UnitsList);
