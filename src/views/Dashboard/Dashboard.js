import React, { Component } from "react";

class Dashboard extends Component {
  render() {
    return (
      <div class="card">
        <table class="table table-striped table-hover table-sm">
          <thead class="thead-inverse">
            <tr>
              <th style={{ width: "3%" }}>#</th>
              <th style={{ width: "5%" }}>Status</th>
              <th>Názov</th>
              <th style={{ width: "10%" }}>Zadal</th>
              <th style={{ width: "10%" }}>Firma</th>
              <th style={{ width: "10%" }}>Rieši</th>
              <th style={{ width: "10%" }}>Projekt</th>
              <th style={{ width: "10%" }}>Created</th>
              <th style={{ width: "10%" }}>Due Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <span class="badge badge-success">NEW</span>
              </td>
              <td>Oprava PC</td>
              <td>bsusta</td>
              <td>LAN Systems</td>
              <td>amichalica</td>
              <td>Hotline</td>
              <td>15:37 9.12.2017</td>
              <td>15:37 9.12.2017</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <span class="badge badge-success">NEW</span>
              </td>
              <td>Oprava PC</td>
              <td>bsusta</td>
              <td>LAN Systems</td>
              <td>amichalica</td>
              <td>Hotline</td>
              <td>15:37 9.12.2017</td>
              <td>15:37 9.12.2017</td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                <span class="badge badge-success">NEW</span>
              </td>
              <td>Oprava PC</td>
              <td>bsusta</td>
              <td>LAN Systems</td>
              <td>amichalica</td>
              <td>Hotline</td>
              <td>15:37 9.12.2017</td>
              <td>15:37 9.12.2017</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Dashboard;
