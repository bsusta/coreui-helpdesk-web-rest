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
import i18n from 'i18next';

class Settings extends Component {
  render() {
    return (
      <div className="table-div">
        <h2 className="mb-3">{i18n.t('settings')}</h2>
        <Table hover striped responsive>
          <tbody>
            <tr style={{ cursor: "pointer" }}>
              <td
                onClick={() => this.props.history.push("./automaticTasksList")}
              >
                {i18n.t('automaticTasks')}
              </td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td onClick={() => this.props.history.push("./companiesList")}>
                {i18n.t('companies')}
              </td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td
                onClick={() =>
                  this.props.history.push("./companyAttributesList")
                }
              >
                {i18n.t('companiesCustomFields')}
              </td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td onClick={() => this.props.history.push("./imapsList")}>
                {i18n.t('imaps')}
              </td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td onClick={() => this.props.history.push("./rolesList")}>
                {i18n.t('roles')}
              </td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td onClick={() => this.props.history.push("./smtpsList")}>
                {i18n.t('smtp')}
              </td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td onClick={() => this.props.history.push("./statusesList")}>
                {i18n.t('statuses')}
              </td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td
                onClick={() => this.props.history.push("./taskAttributesList")}
              >
                {i18n.t('tasksCustomFields')}
              </td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td onClick={() => this.props.history.push("./triggersList")}>
                {i18n.t('triggers')}
              </td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td onClick={() => this.props.history.push("./unitsList")}>
                {i18n.t('units')}
              </td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td onClick={() => this.props.history.push("./usersList")}>
                {i18n.t('users')}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Settings;
