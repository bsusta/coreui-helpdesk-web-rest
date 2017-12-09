import React, { Component } from "react";

class Dashboard extends Component {
  render() {
    return (
      <div class="card">
        <table class="table table-striped table-hover">
          <thead class="thead-inverse">
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Názov</th>
              <th>Zadal</th>
              <th>Firma</th>
              <th>Rieši</th>
              <th>Projekt</th>
              <th>Created</th>
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
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Dashboard;
