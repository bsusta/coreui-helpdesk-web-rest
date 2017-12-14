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
import DatePicker from "react-datepicker";
import moment from "moment";

import Select from "react-select";

import "react-datepicker/dist/react-datepicker.css";
import "../../../scss/vendors/react-select/react-select.scss";

var options = [
  { value: "F1", label: "LAN Systems s.r.o." },
  { value: "F2", label: "Pozagas a.s." }
];
class Aside extends Component {
  constructor(props) {
    super(props);
    this.saveChanges = this.saveChanges.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: "UT",
      startDate: moment()
    };
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  saveChanges(value) {
    this.setState({ value });
  }
  render() {
    return (
      <aside className="aside-menu">
        <div>
          <div class="container-fluid" style={{ marginTop: 20 }}>
            <h4>Filter</h4>
          </div>
          <div
            class="container-fluid"
            style={{
              marginTop: 10
            }}
          >
            <label>Status</label>
            <FormGroup check>
              <div className="checkbox">
                <Label check htmlFor="New">
                  <Input
                    type="checkbox"
                    id="checkbox1"
                    name="checkbox1"
                    value="option1"
                  />{" "}
                  New
                </Label>
              </div>
              <div className="checkbox">
                <Label check htmlFor="Open">
                  <Input
                    type="checkbox"
                    id="checkbox2"
                    name="checkbox2"
                    value="option2"
                  />{" "}
                  Open
                </Label>
              </div>
              <div className="checkbox">
                <Label check htmlFor="Pending">
                  <Input
                    type="checkbox"
                    id="checkbox3"
                    name="checkbox3"
                    value="option3"
                  />{" "}
                  Pending
                </Label>
              </div>
              <div className="checkbox">
                <Label check htmlFor="Closed">
                  <Input
                    type="checkbox"
                    id="Closed"
                    name="Closed"
                    value="Closed"
                  />{" "}
                  Closed
                </Label>
              </div>
            </FormGroup>
          </div>
          <div
            class="container-fluid"
            style={{
              marginTop: 10
            }}
          >
            <label>Zadal</label>
            <Select
              name="form-field-name2"
              value={this.state.value}
              options={options}
              onChange={this.saveChanges}
              multi
              style={{ width: "100%" }}
            />
          </div>
          <div
            class="container-fluid"
            style={{
              marginTop: 10
            }}
          >
            <label>Firma</label>
            <Select
              name="form-field-name2"
              value={this.state.value}
              options={options}
              onChange={this.saveChanges}
              multi
              style={{ width: "100%" }}
            />
          </div>
          <div
            class="container-fluid"
            style={{
              marginTop: 10
            }}
          >
            <label>Riesi</label>
            <Select
              name="form-field-name2"
              value={this.state.value}
              options={options}
              onChange={this.saveChanges}
              multi
              style={{ width: "100%" }}
            />
          </div>
          <div
            class="container-fluid"
            style={{
              marginTop: 10
            }}
          >
            <label>Projekt</label>
            <Select
              name="form-field-name2"
              value={this.state.value}
              options={options}
              onChange={this.saveChanges}
              multi
              style={{ width: "100%" }}
            />
          </div>
          <div
            class="container-fluid"
            style={{
              marginTop: 10
            }}
          >
            <label>Created</label>

            <div class="d-flex flex-row justify-content-between">
              <label>From:</label>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
              />
            </div>
            <div class="d-flex flex-row justify-content-between">
              <label>To:</label>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div
            class="container-fluid"
            style={{
              marginTop: 10
            }}
          >
            <label>Due Date</label>
            <div class="d-flex flex-row justify-content-between">
              <label>From:</label>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
              />
            </div>
            <div class="d-flex flex-row justify-content-between">
              <label>To:</label>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div
            class="container-fluid"
            style={{
              marginTop: 10
            }}
          >
            <label>Closed</label>
            <div class="d-flex flex-row justify-content-between">
              <label>From:</label>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
              />
            </div>
            <div class="d-flex flex-row justify-content-between">
              <label>To:</label>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/*Aside Menu*/}
        </div>
      </aside>
    );
  }
}

export default Aside;
