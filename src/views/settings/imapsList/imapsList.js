import { Link } from "react-router-dom";
import { connect } from "react-redux";
import i18n from 'i18next';
import React, { Component } from "react";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Card,
  CardHeader
} from "reactstrap";

class ImapsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_active: "",
      email: "",
      project: "",
      description: ""
    };
    this.getFilteredData.bind(this);
  }

  getFilteredData() {
    return this.props.imaps
      .filter(item =>
        item.inbox_email.toLowerCase().includes(this.state.email.toLowerCase())
      )
      .filter(item =>
        item.project.title
          .toLowerCase()
          .includes(this.state.project.toLowerCase())
      )
      .filter(
        item =>
          !item.description ||
          item.description
            .toLowerCase()
            .includes(this.state.description.toLowerCase())
      )
      .filter(
        item =>
          item.is_active ==
          (this.state.active.toLowerCase().includes("y") ||
          this.state.active.toLowerCase().includes("an") ||
          this.state.active.toLowerCase().includes("á") ||
          this.state.active.toLowerCase().includes("t") ||
          this.state.active.toLowerCase().includes("c")) ||
          this.state.is_active == ""
      )
      .sort((item, item2) => item.inbox_email > item2.inbox_email?1:-1);
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
            onClick={() => this.props.history.push("/imap/add")}
          >
            <i className="fa fa-plus" /> {i18n.t('imap')}
          </button>
        </CardHeader>
        <div className="table-div-panel">
          <h2 className="h2" className="mb-3">{i18n.t('imapList')}</h2>

          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th style={{ borderTop: "0px" }}>{i18n.t('email')}</th>
                <th style={{ borderTop: "0px" }}>{i18n.t('project')}</th>
                <th style={{ borderTop: "0px" }}>{i18n.t('description')}</th>
                <th style={{ borderTop: "0px" }}>{i18n.t('activated')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <Input
                    type="text"
                    id="input1-group1"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                    name="input1-group1"
                  />
                </th>
                <th>
                  <Input
                    type="text"
                    id="input1-group1"
                    value={this.state.project}
                    onChange={e => this.setState({ project: e.target.value })}
                    name="input1-group1"
                  />
                </th>
                <th>
                  <Input
                    type="text"
                    id="input1-group1"
                    value={this.state.description}
                    onChange={e =>
                      this.setState({ description: e.target.value })
                    }
                    name="input1-group1"
                  />
                </th>
                <th>
                  <Input
                    type="text"
                    id="input1-group1"
                    value={this.state.is_active}
                    onChange={e => this.setState({ is_active: e.target.value })}
                    name="input1-group1"
                  />
                </th>
              </tr>
              {this.getFilteredData().map(imap => (
                <tr
                  key={imap.id}
                  onClick={() =>
                    this.props.history.push("/imap/edit/" + imap.id)
                  }
                >
                  <td>{imap.inbox_email}</td>
                  <td>{imap.project.title}</td>
                  <td>{imap.description}</td>
                  <td>
                    {imap.is_active ? (
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

const mapStateToProps = ({ imapsReducer, login }) => {
  const { imaps } = imapsReducer;
  const { token } = login;
  return { imaps, token };
};

export default connect(mapStateToProps, {})(ImapsList);
