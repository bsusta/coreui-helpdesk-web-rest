import React, { Component } from "react";
import Filter from "../../../views/Filter";
import ModalTask from "./ModalTask";
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
  PaginationLink,
  Input
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
      asideOpen: false,
      modalTaskOpen: false
    };
    this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ modalTaskOpen: !this.state.modalTaskOpen });
  }

  render() {
    return (
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <h2 className="h2" style={{ paddingTop: 20 }}> Add Filter</h2>
        <div style={{ minHeight: 920 }}>
          <ModalTask
            open={this.state.modalTaskOpen}
            toggle={this.toggleModal.bind(this)}
          />
          {this.state.asideOpen && (
            <div className="filterDiv">
              <Filter />
            </div>
          )}
          <div style={{ marginLeft: this.state.asideOpen ? 275 : 0 }}>
            <button
              type="button"
              class="btn btn-link pl-0"
              onClick={() =>
                this.setState({ asideOpen: !this.state.asideOpen })
              }
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
                    <th>
                      <Input
                        type="text"
                        id="input1-group1"
                        name="input1-group1"
                      />
                    </th>
                    <th>
                      <Input
                        type="text"
                        id="input1-group1"
                        name="input1-group1"
                      />
                    </th>
                    <th>
                      <Input
                        type="text"
                        id="input1-group1"
                        name="input1-group1"
                      />
                    </th>
                    <th>
                      <Input
                        type="text"
                        id="input1-group1"
                        name="input1-group1"
                      />
                    </th>
                    <th>
                      <Input
                        type="text"
                        id="input1-group1"
                        name="input1-group1"
                      />
                    </th>
                    <th>
                      <Input
                        type="text"
                        id="input1-group1"
                        name="input1-group1"
                      />
                    </th>
                    <th>
                      <Input
                        type="text"
                        id="input1-group1"
                        name="input1-group1"
                      />
                    </th>
                    <th>
                      <Input
                        type="text"
                        id="input1-group1"
                        name="input1-group1"
                      />
                    </th>
                    <th>
                      <Input
                        type="text"
                        id="input1-group1"
                        name="input1-group1"
                      />
                    </th>
                  </tr>
                  <tr
                    onClick={() => this.props.history.push("/editTask")}
                    style={{ cursor: "pointer" }}
                  >
                    <td style={{ verticalAlign: "center" }}>1</td>
                    <td>
                      <span class="badge badge-success">NEW</span>
                    </td>
                    <td>
                      Oprava PC - normal
                      <p>
                        <span class="badge badge-primary mr-1">Primary</span>
                        <span class="badge badge-secondary mr-1">
                          Secondary
                        </span>
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
                  <tr
                    onClick={this.toggleModal.bind(this)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>2</td>
                    <td>
                      <span class="badge badge-success">NEW</span>
                    </td>
                    <td>
                      Oprava PC - modal
                      <p>
                        <span class="badge badge-primary mr-1">Primary</span>
                        <span class="badge badge-secondary mr-1">
                          Secondary
                        </span>
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
                  <tr
                    onClick={() => this.props.history.push("/secondEditTask")}
                    style={{ cursor: "pointer" }}
                  >
                    <td>3</td>
                    <td>
                      <span class="badge badge-success">NEW</span>
                    </td>
                    <td>
                      Oprava PC - second
                      <p>
                        <span class="badge badge-primary mr-1">Primary</span>
                        <span class="badge badge-secondary mr-1">
                          Secondary
                        </span>
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
                  <Pagination className="justify-content-center">
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
      </div>
    );
  }
}

export default MyTasks;
