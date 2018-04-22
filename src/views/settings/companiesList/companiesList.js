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
import Pagination from "../../../components/pagination";
import i18n from 'i18next';

class CompaniesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "",
      title: "",
      id: ""
    };
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
        <div className="table-div">
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
              {this.props.companies.map(company => (
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
