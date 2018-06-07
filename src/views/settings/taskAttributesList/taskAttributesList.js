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

class taskAttributesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      type: "",
      active: "",
      required: ""
    };
    this.getFilteredData.bind(this);
  }

  getFilteredData() {
    return this.props.taskAttributes
      .filter(item =>
        item.title.toLowerCase().includes(this.state.title.toLowerCase())
      )
      .filter(item =>
        item.type.toLowerCase().includes(this.state.type.toLowerCase())
      )
      .filter(
        item =>
          item.is_active ==
            (this.state.active.toLowerCase().includes("y") ||
              this.state.active.toLowerCase().includes("t") ||
              this.state.active.toLowerCase().includes("c")) ||
          this.state.active == ""
      )
      .filter(
        item =>
          item.required ==
            (this.state.required.toLowerCase().includes("y") ||
              this.state.required.toLowerCase().includes("t") ||
              this.state.required.toLowerCase().includes("c")) ||
          this.state.required == ""
      )
      .sort((item, item2) => item.title > item2.title);
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
            onClick={() => this.props.history.push("/taskAttribute/add")}
          >
            <i className="fa fa-plus" /> {i18n.t('taskAttribute')}
          </button>
        </CardHeader>
        <div className="table-div-panel">
          <h2 className="mb-3">{i18n.t('taskAttributesList')}</h2>

          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th style={{ borderTop: "0px" }}>{i18n.t('title')}</th>
                <th style={{ borderTop: "0px" }}>{i18n.t('type')}</th>
                <th style={{ borderTop: "0px" }}>{i18n.t('activated')}</th>
                <th style={{ borderTop: "0px" }}>{i18n.t('required')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <Input
                    type="text"
                    id="input1-group1"
                    value={this.state.title}
                    name="input1-group1"
                    onChange={e => this.setState({ title: e.target.value })}
                  />
                </th>
                <th>
                  <Input
                    type="text"
                    id="input1-group1"
                    value={this.state.type}
                    name="input1-group1"
                    onChange={e => this.setState({ type: e.target.value })}
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
                <th>
                  <Input
                    type="text"
                    id="input1-group1"
                    value={this.state.required}
                    name="input1-group1"
                    onChange={e => this.setState({ required: e.target.value })}
                  />
                </th>
              </tr>
              {this.getFilteredData().map(taskAttribute => (
                <tr
                  key={taskAttribute.id}
                  onClick={() =>
                    this.props.history.push(
                      "/taskAttribute/edit/" + taskAttribute.id
                    )
                  }
                >
                  <td>{taskAttribute.title}</td>
                  <td>{taskAttribute.type}</td>
                  <td>
                    {taskAttribute.is_active ? (
                      <span className="badge badge-success">{i18n.t('yes')}</span>
                    ) : (
                      <span className="badge badge-danger">{i18n.t('no')}</span>
                    )}
                  </td>
                  <td>
                    {taskAttribute.required ? (
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
const mapStateToProps = ({ taskAttributesReducer, login }) => {
  const { taskAttributes } = taskAttributesReducer;
  return { taskAttributes };
};

export default connect(mapStateToProps, {})(taskAttributesList);
