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

class SMTPsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <button className="btn btn-link" onClick={this.props.history.goBack}>
            <i className="fa fa-angle-left" /> Back
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
        <div className="table-div">
          <h2 className="mb-3">SMTPs list</h2>

          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th style={{ borderTop: "0px" }}>E-mail</th>
                <th style={{ borderTop: "0px" }}>IP</th>
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
