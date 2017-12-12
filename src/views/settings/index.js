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
      <div className="list-group">
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
    );
  }
}

export default Settings;
