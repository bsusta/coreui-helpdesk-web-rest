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
      <div className="filterDivInside">
        <div>
          <button type="button" class="btn btn-link" style={{ paddingLeft: 0 }}>
            Apply
          </button>
          <button type="button" class="btn btn-link">
            Save
          </button>
          <button type="button" class="btn btn-link">
            Reset
          </button>

          <p>Status</p>
          <FormGroup check>
            <div className="checkbox">
              <Label check htmlFor="New">
                <Input
                  type="checkbox"
                  id="checkbox1"
                  name="checkbox1"
                  value="option1"
                />
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
                />
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
                />
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
                />
                Closed
              </Label>
            </div>
          </FormGroup>

          <label className="mt-1">Zadal</label>
          <Select
            name="form-field-name2"
            value={this.state.value}
            options={options}
            onChange={this.saveChanges}
            multi
            style={{ width: "100%" }}
          />

          <label className="mt-2">Firma</label>
          <Select
            name="form-field-name2"
            value={this.state.value}
            options={options}
            onChange={this.saveChanges}
            multi
            style={{ width: "100%" }}
          />

          <label className="mt-2">Riesi</label>
          <Select
            name="form-field-name2"
            value={this.state.value}
            options={options}
            onChange={this.saveChanges}
            multi
            style={{ width: "100%" }}
          />

          <label className="mt-2">Projekt</label>
          <Select
            name="form-field-name2"
            value={this.state.value}
            options={options}
            onChange={this.saveChanges}
            multi
            style={{ width: "100%" }}
          />

          <label className="mt-2">Tags</label>
          <Select
            name="form-field-name2"
            value={this.state.value}
            options={options}
            onChange={this.saveChanges}
            multi
            style={{ width: "100%" }}
          />

          <label className="mt-2">Created</label>

          <div class="d-flex flex-row justify-content-between">
            <input
              type="text"
              id="name"
              class="form-control mr-2"
              placeholder="From"
            />
            <input
              type="text"
              id="name"
              class="form-control ml-2"
              placeholder="To"
            />
          </div>

          <label className="mt-2">Due Date</label>
          <div class="d-flex flex-row justify-content-between">
            <input
              type="text"
              id="name"
              class="form-control mr-2"
              placeholder="From"
            />
            <input
              type="text"
              id="name"
              class="form-control ml-2"
              placeholder="To"
            />
          </div>

          <label className="mt-2">Closed</label>
          <div class="d-flex flex-row justify-content-between">
            <input
              type="text"
              id="name"
              class="form-control mr-2"
              placeholder="From"
            />
            <input
              type="text"
              id="name"
              class="form-control ml-2"
              placeholder="To"
            />
          </div>

          {/*Aside Menu*/}
        </div>
      </div>
    );
  }
}

export default Aside;
