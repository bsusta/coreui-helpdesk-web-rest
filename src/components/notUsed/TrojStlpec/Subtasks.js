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
        <table class="table table-striped table-hover table-sm">
          <thead className="thead-inverse">
            <tr>
              <th style={{ width: "3%", borderTop: "0px" }}>#</th>

              <th style={{ borderTop: "0px" }}>Práce</th>
              <th style={{ width: "20%", borderTop: "0px" }}>Riesi</th>
              <th style={{ width: "10%", borderTop: "0px" }}>Hodin</th>
              <th style={{ width: "13%", borderTop: "0px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  placeholder="instalacia klavesnice"
                />
              </td>
              <td>
                <select class="form-control" id="project">
                  {mockOptions.map(opt => (
                    <option key={opt.id} value={opt.id}>
                      {opt.title}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  placeholder="1"
                />
              </td>
              <td>
                <div className="row">
                  <button className="btn btn-sm btn-danger mr-1 ml-3">
                    <i className="fa fa-remove" />
                  </button>
                  <button className="btn  btn-sm btn-primary">
                    <i className="fa fa-arrows" />
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
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
                <button className="btn btn-sm btn-primary mr-1">
                  <i className="fa fa-plus " />
                </button>
              </td>
            </tr>
            <tr className="table-info">
              <td colSpan="5">Hodin spolu: 1</td>
            </tr>
          </tbody>
        </table>

        <table class="table table-striped table-hover table-sm">
          <thead className="thead-inverse">
            <tr>
              <th style={{ borderTop: "0px" }}>Material</th>
              <th style={{ width: "10%", borderTop: "0px" }}>Pocet</th>
              <th style={{ width: "10%", borderTop: "0px" }}>Cena/ks</th>
              <th style={{ width: "10%", borderTop: "0px" }}>Spolu</th>
              <th style={{ width: "10%", borderTop: "0px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  placeholder="Klavesnica"
                />
              </td>
              <td>
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  placeholder="1"
                />
              </td>
              <td>
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  placeholder="5"
                />
              </td>
              <td>5</td>
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
              <td />
              <td>
                <button className=" btn-sm btn btn-primary mr-1">
                  <i className="fa fa-plus" />
                </button>
              </td>
            </tr>
            <tr className="table-info">
              <td colSpan="5">Cena spolu bez DPH: 10</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Subtasks;
