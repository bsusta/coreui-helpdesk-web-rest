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

class CompaniesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "",
      title: "",
      id: ""
    };
    this.getFilteredData.bind(this);
  }

  getFilteredData() {
    return this.props.companies
      .filter(item =>
        item.title.toLowerCase().includes(this.state.title.toLowerCase())
      )
      .filter(item =>
        item.id.toString().includes(this.state.id.toLowerCase())
      )
      .filter(
        item =>
          item.is_active ==
            (this.state.active.toLowerCase().includes("y") ||
              this.state.active.toLowerCase().includes("t") ||
              this.state.active.toLowerCase().includes("c")) ||
          this.state.active == ""
      )
      .sort((item, item2) => item.title > item2.title)
      .sort((item, item2) => item2.is_active - item.is_active);
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
            onClick={() => this.props.history.push("/company/add")}
          >
            <i className="fa fa-plus" /> {i18n.t('company')}
          </button>
        </CardHeader>
        <div className="table-div-panel">
          <h2 className="mb-3">{i18n.t('companiesList')}</h2>

          <div style={{ display: "flex", marginTop: 20 }} />

          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th style={{ borderTop: "0px" }}>{i18n.t('id')}</th>
                <th style={{ borderTop: "0px" }}>{i18n.t('activated')}</th>
                <th style={{ borderTop: "0px" }}>{i18n.t('title')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <Input
                    type="text"
                    id="id"
                    value={this.state.id}
                    name="id"
                    onChange={e => this.setState({ id: e.target.value })}
                  />
                </th>
                <th>
                  <Input
                    type="text"
                    id="active"
                    value={this.state.active}
                    name="active"
                    onChange={e => this.setState({ active: e.target.value })}
                  />
                </th>
                <th>
                  <Input
                    type="text"
                    id="title"
                    value={this.state.title}
                    name="title"
                    onChange={e => this.setState({ title: e.target.value })}
                  />
                </th>
              </tr>
              {this.getFilteredData().map(company => (
                <tr
                  key={company.id}
                  onClick={() =>
                    this.props.history.push("/company/edit/" + company.id)
                  }
                >
                  <td>{company.id}</td>
                  <td>
                    {company.is_active ? (
                      <span className="badge badge-success">{i18n.t('yes')}</span>
                    ) : (
                      <span className="badge badge-danger">{i18n.t('no')}</span>
                    )}
                  </td>
                  <td>{company.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = ({ companiesReducer, login }) => {
  const { companies } = companiesReducer;
  const { token } = login;
  return { companies, token };
};

export default connect(mapStateToProps, {})(CompaniesList);
