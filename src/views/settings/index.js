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
        <h2 className="mb-3" style={{ marginTop: 20 }}>
          Settings
        </h2>
        <Table hover striped responsive>
          <tbody>
            <tr style={{cursor:'pointer'}}>
              <td>Users</td>
            </tr>
            <tr style={{cursor:'pointer'}}>
              <td>Companies</td>
            </tr>
            <tr style={{cursor:'pointer'}}>
              <td>Statuses</td>
            </tr>
            <tr style={{cursor:'pointer'}}>
              <td onClick={() => this.props.history.push("./unitsList")}>
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
