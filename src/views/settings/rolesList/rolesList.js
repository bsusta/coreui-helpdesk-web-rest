import { Link } from "react-router-dom";
import React, { Component } from "react";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Card,
  CardHeader
} from "reactstrap";
import { connect } from "react-redux";
import i18n from 'i18next';

class RolesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "",
      name: ""
    };
    this.getFilteredData.bind(this);
  }

  getFilteredData() {
    return this.props.userRoles
      .filter(item =>
        item.title.toLowerCase().includes(this.state.name.toLowerCase())
      )
      .filter(
        item =>
          item.is_active ==
            (this.state.active.toLowerCase().includes("y") ||
              this.state.active.toLowerCase().includes("t") ||
              this.state.active.toLowerCase().includes("c")) ||
          this.state.active == ""
      )
      .sort((item, item2) => item.order > item2.order);
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <button className="btn btn-link" onClick={this.props.history.goBack}>
            <i className="fa fa-angle-left" /> {i18n.t('goBack')}
          </button>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => this.props.history.push("/role/add")}
          >
            <i className="fa fa-plus" /> {i18n.t('usersRole')}
          </button>
        </CardHeader>
        <div className="table-div-panel">
          <h2 className="h2" className="mb-3">{i18n.t('userRolesList')}</h2>

          <table className="table table-striped table-hover">
            <thead>
              <tr>
              <th className="td-small" style={{ borderTop: "0px" }}>{i18n.t('order')}</th>
                <th style={{ borderTop: "0px" }}>{i18n.t('title')}</th>
                <th style={{ borderTop: "0px" }}>{i18n.t('activated')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <th>
                  <Input
                    type="text"
                    id="input1-group1"
                    name="input1-group1"
                    disabled={true}
                    style={{ display: "none" }}
                  />
                </th>
                <th>
                  <Input
                    type="text"
                    id="input1-group1"
                    value={this.state.name}
                    name="input1-group1"
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                </th>
                <th>
                  <Input
                    type="text"
                    id="input1-group1"
                    value={this.state.active}
                    name="input1-group1"
                    onChange={e => this.setState({ active: e.target.value })}
                  />
                </th>
               </tr>
              {this.getFilteredData().map(role => (
                <tr
                  key={role.id}
                  onClick={() =>
                    this.props.history.push("/role/edit/" + role.id)
                  }
                >
                     <td>{role.order}</td>
                  <td>{role.title}</td>
                  <td>
                    {role.is_active ? (
                      <span className="badge badge-success">{i18n.t('yes')}</span>
                    ) : (
                      <span className="badge badge-danger">{i18n.t('no')}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = ({ userRolesReducer, login }) => {
  const { userRoles } = userRolesReducer;
  const { token } = login;
  return { userRoles, token };
};

export default connect(mapStateToProps, {})(RolesList);
