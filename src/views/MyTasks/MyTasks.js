import React, { Component } from "react";
import Aside from "../../components/newAside";

import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

let mockOptions = [
  { id: 0, title: "20" },
  { id: 1, title: "50" },
  { id: 2, title: "100" },
  { id: 3, title: "all" }
];
class MyTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asideOpen: false
    };
  }

  render() {
    return (
      <div>
        {this.state.asideOpen && (
          <div className="filterDiv">
            <Aside />
          </div>
        )}
        <div style={{ marginLeft: this.state.asideOpen ? 275 : 0 }}>
          <h2 style={{ marginTop: 20 }}>Filter</h2>

          <button
            type="button"
            class="btn btn-link pl-0"
            onClick={() => this.setState({ asideOpen: !this.state.asideOpen })}
          >
            <i className="fa fa-filter" />
          </button>

          <button type="button" class="btn btn-link float-right pr-0">
            <i className="fa fa-columns" />
          </button>

          <div className="card" style={{ border: "0px" }}>
            <table className="table table-striped table-hover table-sm">
              <thead className="thead-inverse">
                <tr>
                  <th style={{ width: "3%", borderTop: "0px" }}>#</th>
                  <th style={{ width: "5%", borderTop: "0px" }}>Status</th>
                  <th style={{ borderTop: "0px" }}>Názov</th>
                  <th style={{ width: "10%", borderTop: "0px" }}>Zadal</th>
                  <th style={{ width: "10%", borderTop: "0px" }}>Firma</th>
                  <th style={{ width: "10%", borderTop: "0px" }}>Rieši</th>
                  <th style={{ width: "10%", borderTop: "0px" }}>Projekt</th>
                  <th style={{ width: "10%", borderTop: "0px" }}>Created</th>
                  <th style={{ width: "10%", borderTop: "0px" }}>Due Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ verticalAlign: "center" }}>1</td>
                  <td>
                    <span class="badge badge-success">NEW</span>
                  </td>
                  <td onClick={() => this.props.history.push("/editTask")}>
                    Oprava PC
                    <p>
                      <span class="badge badge-primary mr-1">Primary</span>
                      <span class="badge badge-secondary mr-1">Secondary</span>
                      <span class="badge badge-success mr-1">Success</span>
                      <span class="badge badge-danger mr-1">Danger</span>
                    </p>
                  </td>
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
                  <td>
                    Oprava PC
                    <p>
                      <span class="badge badge-primary mr-1">Primary</span>
                      <span class="badge badge-secondary mr-1">Secondary</span>
                      <span class="badge badge-success mr-1">Success</span>
                      <span class="badge badge-danger mr-1">Danger</span>
                    </p>
                  </td>
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
                  <td>
                    Oprava PC
                    <p>
                      <span class="badge badge-primary mr-1">Primary</span>
                      <span class="badge badge-secondary mr-1">Secondary</span>
                      <span class="badge badge-success mr-1">Success</span>
                      <span class="badge badge-danger mr-1">Danger</span>
                    </p>
                  </td>
                  <td>bsusta</td>
                  <td>LAN Systems</td>
                  <td>amichalica</td>
                  <td>Hotline</td>
                  <td>15:37 9.12.2017</td>
                  <td>15:37 9.12.2017</td>
                </tr>
              </tbody>
            </table>

            <div class="row">
              <div class="col">
                <Pagination>
                  <PaginationItem style={{ margin: 5 }}>
                    Page 1 of 5
                  </PaginationItem>
                </Pagination>
              </div>
              <div className="col">
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous href="#">
                      Prev
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="page-item">
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next href="#">
                      Next
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </div>
              <div className="col">
                <Pagination className="float-right">
                  <PaginationItem style={{ margin: 5 }}>
                    Items per page
                  </PaginationItem>
                  <PaginationItem style={{ marginRight: 10 }}>
                    <select
                      class="form-control"
                      id="project"
                      style={{ maxWidth: 70 }}
                    >
                      {mockOptions.map(opt => (
                        <option key={opt.id} value={opt.id}>
                          {opt.title}
                        </option>
                      ))}
                    </select>
                  </PaginationItem>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyTasks;
