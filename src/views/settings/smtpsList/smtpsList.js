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

class SMTPsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <button className="btn btn-link" onClick={this.props.history.goBack}>
            <i className="fa fa-angle-left" /> {i18n.t('goBack')}
          </button>
          {/*
          <button
            type="button"
            className="btn btn-link"
            onClick={() => this.props.history.push("/smtp/add")}
          >
            <i className="fa fa-plus" /> SMTP
          </button>
          */}
        </CardHeader>
        <div className="table-div-panel">
          <h2 className="mb-3">{i18n.t('smtpsList')}</h2>

          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th style={{ borderTop: "0px" }}>{i18n.t('email')}</th>
                <th style={{ borderTop: "0px" }}>{i18n.t('serverAddress')}</th>
              </tr>
            </thead>
            <tbody>
              {this.props.SMTPs.map(smtp => (
                <tr
                  key={smtp.id}
                  onClick={() =>
                    this.props.history.push("/smtp/edit/" + smtp.id)
                  }
                >
                  <td>{smtp.email}</td>
                  <td>{smtp.host}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = ({ SMTPsReducer }) => {
  const { SMTPs } = SMTPsReducer;
  return { SMTPs };
};

export default connect(mapStateToProps, {})(SMTPsList);
