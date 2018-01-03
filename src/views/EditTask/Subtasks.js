import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

let mockOptions = [
  { id: 0, title: "bsusta", color: "#57b141" },
  { id: 1, title: "ppatoprsty", color: "#8ebfbe" },
  { id: 2, title: "amichalica", color: "#a8bbbc" },
  { id: 3, title: "Moznost 4", color: "#0eb2ac" },
  { id: 4, title: "Moznost 5", color: "#7329b1" }
];

class Subtasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }

  render() {
    return (
      <div>
        <table class="table table-hover table-sm">
          <thead className="thead-inverse">
            <tr>
              <th style={{ borderTop: "0px" }}>Subtasks</th>
              <th
                style={{ width: "13%", borderTop: "0px", textAlign: "right" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div style={{ display: "flex" }}>
                  <input
                    type="checkbox"
                    style={{ margin: "auto", marginRight: 10 }}
                  />
                  <input
                    type="text"
                    id="name"
                    class="form-control"
                    placeholder="instalacia klavesnice"
                    style={{ border: "none" }}
                  />
                </div>
              </td>

              <td>
                <div className="row">
                  <button className="btn btn-sm btn-danger mr-1 ml-3 ">
                    <i className="fa fa-remove" />
                  </button>
                  <button className="btn  btn-sm btn-primary ">
                    <i className="fa fa-arrows" />
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    id="name"
                    class="form-control"
                    placeholder="add subtask"
                  />
                </div>
              </td>

              <td>
                <button className="btn btn-sm btn-primary mr-1">
                  <i className="fa fa-plus " />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <table class="table table-hover table-sm">
          <thead className="thead-inverse">
            <tr>
              <th style={{ borderTop: "0px" }}>Material</th>
              <th style={{ width: "10%", borderTop: "0px" }}>Pocet</th>
              <th style={{ width: "10%", borderTop: "0px" }}>Cena/ks</th>

              <th style={{ width: "10%", borderTop: "0px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  style={{ border: "none" }}
                  type="text"
                  id="name"
                  class="form-control"
                  placeholder="Klavesnica"
                />
              </td>
              <td>
                <input
                  style={{ border: "none" }}
                  type="text"
                  id="name"
                  class="form-control"
                  placeholder="1"
                />
              </td>
              <td>
                <input
                  style={{ border: "none" }}
                  type="text"
                  id="name"
                  class="form-control"
                  placeholder="5"
                />
              </td>

              <td>
                <button className="btn  btn-sm btn-danger mr-1">
                  <i className="fa fa-remove" />
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <input type="text" id="name" class="form-control" />
              </td>
              <td>
                <input type="text" id="name" class="form-control" />
              </td>
              <td>
                <input type="text" id="name" class="form-control" />
              </td>

              <td>
                <button className=" btn-sm btn btn-primary mr-1">
                  <i className="fa fa-plus" />
                </button>
              </td>
            </tr>
            <tr className="table-info">
              <td style={{ textAlign: "right" }} colSpan="5">
                Cena spolu bez DPH: 10
              </td>
            </tr>
            <tr className="table-info">
              <td style={{ borderTop: 0, textAlign: "right" }} colSpan="5">
                Cena spolu s DPH: 12
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Subtasks;
