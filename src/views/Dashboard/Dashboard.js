import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton
} from "reactstrap";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <FormGroup row>
          <Col md="12">
            <FormGroup check className="form-check-inline">
              <div class="d-flex flex-row">
                <div class="p-2">
                  {" "}
                  <Label check htmlFor="inline-checkbox1">
                    <Input
                      type="checkbox"
                      id="inline-checkbox1"
                      name="inline-checkbox1"
                      value="option1"
                    />{" "}
                    New
                  </Label>
                </div>
                <div class="p-2">
                  {" "}
                  <Label check htmlFor="inline-checkbox2">
                    <Input
                      type="checkbox"
                      id="inline-checkbox2"
                      name="inline-checkbox2"
                      value="option2"
                    />{" "}
                    Open
                  </Label>
                </div>
                <div class="p-2">
                  {" "}
                  <Label check htmlFor="inline-checkbox3">
                    <Input
                      type="checkbox"
                      id="inline-checkbox3"
                      name="inline-checkbox3"
                      value="option3"
                    />{" "}
                    Pending
                  </Label>
                </div>

                <div class="p-2">
                  {" "}
                  <Label check htmlFor="inline-checkbox3">
                    <Input
                      type="checkbox"
                      id="inline-checkbox3"
                      name="inline-checkbox3"
                      value="option3"
                    />{" "}
                    Closed
                  </Label>
                </div>
              </div>
            </FormGroup>
          </Col>
        </FormGroup>

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
                <td>
                  <input type="text" class="form-control" id="name" />
                </td>
                <td>
                  <input type="text" class="form-control" id="name" />
                </td>
                <td>
                  {" "}
                  <input type="text" class="form-control" id="name" />
                </td>
                <td>
                  {" "}
                  <input type="text" class="form-control" id="name" />
                </td>
                <td>
                  {" "}
                  <input type="text" class="form-control" id="name" />
                </td>
                <td>
                  {" "}
                  <input type="text" class="form-control" id="name" />
                </td>
                <td>
                  {" "}
                  <input type="text" class="form-control" id="name" />
                </td>
                <td>
                  {" "}
                  <input type="text" class="form-control" id="name" />
                </td>
                <td>
                  {" "}
                  <input type="text" class="form-control" id="name" />
                </td>
              </tr>
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
      </div>
    );
  }
}

export default Dashboard;
