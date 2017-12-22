import { Link } from "react-router-dom";
import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
const mockData = [
  { id: 1, active: true, title: "Centimeter", shortcut: "cm" },
  { id: 2, active: false, title: "Kilometer", shortcut: "km" },
  { id: 3, active: true, title: "Kilogram", shortcut: "kg" },
  { id: 4, active: true, title: "Kus", shortcut: "ks" },
  { id: 5, active: false, title: "Piece", shortcut: "pcs" },
  { id: 6, active: true, title: "Gram", shortcut: "g" }
];
class UnitsList extends Component {
  render() {
    return (
      <div>
        <h2 style={{ marginTop: 20 }} className="mb-3">
          Unit list
        </h2>

        <button
          type="button"
          class="btn btn-success"
          onClick={() => this.props.history.push("/unit/add")}
        >
          Add new unit
        </button>

        <table class="table table-striped table-hover">
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
                <Input type="text" id="input1-group1" name="input1-group1" />
              </th>
              <th>
                <Input type="text" id="input1-group1" name="input1-group1" />
              </th>
              <th>
                <Input type="text" id="input1-group1" name="input1-group1" />
              </th>
            </tr>
            {mockData.map(unit => (
              <tr
                key={unit.id}
                onClick={() => this.props.history.push("/unit/edit/" + unit.id)}
              >
                <td>{unit.title}</td>
                <td>{unit.shortcut}</td>
                <td>
                  {unit.active ? (
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

export default UnitsList;
