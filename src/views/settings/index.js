import React, { Component } from "react";
import {
  Badge,
  Row,
  Col,
  Progress,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  ButtonToolbar,
  ButtonGroup,
  ButtonDropdown,
  Label,
  Input,
  Table
} from "reactstrap";
class Settings extends Component {
  render() {
    return (
      <div>
        <h2 style={{ marginTop: 20 }}>Settings</h2>
        <div className="list-group mt-3">
          <Table hover bordered striped responsive>
            <tbody>
              <tr>
                <td>Users</td>
              </tr>
              <tr>
                <td>Companies</td>
              </tr>
              <tr>
                <td>Statuses</td>
              </tr>
              <tr>
                <td onClick={() => this.props.history.push("/unitsList")}>
                  Units
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Settings;
