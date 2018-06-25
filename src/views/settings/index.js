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
import { connect } from 'react-redux';

class Settings extends Component {
  render() {
    let ACL = this.props.user.user_role.acl;

    return (
      <div className="table-div">
        <h2 className="h2" className="mb-3">{i18n.t('settings')}</h2>
        <Table hover striped responsive>
          <tbody>
            {false && <tr style={{ cursor: "pointer" }}>
              <td
                onClick={() => this.props.history.push("./automaticTasksList")}
              >
                {i18n.t('automaticTasks')}
              </td>
            </tr>}
            {ACL.includes('company_settings')&&
            <tr style={{ cursor: "pointer" }}>
              <td onClick={() => this.props.history.push("./companiesList")}>
                {i18n.t('companies')}
              </td>
            </tr>}
            {ACL.includes('company_attribute_settings')&&
            <tr style={{ cursor: "pointer" }}>
              <td
                onClick={() =>
                  this.props.history.push("./companyAttributesList")
                }
              >
                {i18n.t('companiesCustomFields')}
              </td>
            </tr>}
            {ACL.includes('user_settings')&&
              <tr style={{ cursor: "pointer" }}>
                <td onClick={() => this.props.history.push("./usersList")}>
                  {i18n.t('users')}
                </td>
              </tr>
            }
            {ACL.includes('user_role_settings')&&
              <tr style={{ cursor: "pointer" }}>
                <td onClick={() => this.props.history.push("./rolesList")}>
                  {i18n.t('roles')}
                </td>
              </tr>
            }
            {ACL.includes('imap_settings')&&
              <tr style={{ cursor: "pointer" }}>
                <td onClick={() => this.props.history.push("./imapsList")}>
                  {i18n.t('imaps')}
                </td>
              </tr>}
            {ACL.includes('smtp_settings')&&
            <tr style={{ cursor: "pointer" }}>
              <td onClick={() => this.props.history.push("./smtpsList")}>
                {i18n.t('smtp')}
              </td>
            </tr>}
            {ACL.includes('status_settings')&&
              <tr style={{ cursor: "pointer" }}>
                <td onClick={() => this.props.history.push("./statusesList")}>
                  {i18n.t('statuses')}
                </td>
              </tr>}
              {ACL.includes('task_attribute_settings')&&
                <tr style={{ cursor: "pointer" }}>
                  <td
                    onClick={() => this.props.history.push("./taskAttributesList")}
                    >
                    {i18n.t('tasksCustomFields')}
                  </td>
                </tr>}
            {false && <tr style={{ cursor: "pointer" }}>
              <td onClick={() => this.props.history.push("./triggersList")}>
                {i18n.t('triggers')}
              </td>
            </tr>}
            {ACL.includes('unit_settings')&&
            <tr style={{ cursor: "pointer" }}>
              <td onClick={() => this.props.history.push("./unitsList")}>
                {i18n.t('units')}
              </td>
            </tr>}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = ({ login}) => {
  const {user} = login;
  return { user };
};


export default connect(mapStateToProps, {})(Settings);
