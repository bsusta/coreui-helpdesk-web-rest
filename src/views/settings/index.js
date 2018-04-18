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
      <div className="table-div">
        <h2 className="mb-3">Settings</h2>
        <Table hover striped responsive>
          <tbody>
            <tr style={{ cursor: "pointer" }}>
              <td
                onClick={() => this.props.history.push("./automaticTasksList")}
              >
                Automatic tasks
              </td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td onClick={() => this.props.history.push("./companiesList")}>
                Companies
              </td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td
                onClick={() =>
                  this.props.history.push("./companyAttributesList")
                }
              >
                Companies custom fields
              </td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td onClick={() => this.props.history.push("./imapsList")}>
                Imap
              </td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td onClick={() => this.props.history.push("./rolesList")}>
                Roles
              </td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td onClick={() => this.props.history.push("./smtpsList")}>
                SMTP
              </td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td onClick={() => this.props.history.push("./statusesList")}>
                Statuses
              </td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td
                onClick={() => this.props.history.push("./taskAttributesList")}
              >
                Task custom fields
              </td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td onClick={() => this.props.history.push("./triggersList")}>
                Triggers
              </td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td onClick={() => this.props.history.push("./unitsList")}>
                Units
              </td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td onClick={() => this.props.history.push("./usersList")}>
                Users
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Settings;
