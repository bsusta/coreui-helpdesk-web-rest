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

class UnitsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      shortcut: "",
      activated: ""
    };
    this.getFilteredData.bind(this);
  }

  //filters all available data according to the inputs over the table (local filter)
  getFilteredData() {
    return this.props.units
      .filter(item =>
        item.title.toLowerCase().includes(this.state.title.toLowerCase())
      )
      .filter(item =>
        item.shortcut.toLowerCase().includes(this.state.shortcut.toLowerCase())
      )
      .filter(
        item =>
          item.is_active ==
            (this.state.activated.toLowerCase().includes("y") ||
              this.state.activated.toLowerCase().includes("t") ||
              this.state.activated.toLowerCase().includes("c")) ||
          this.state.activated == ""
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
            onClick={() => this.props.history.push("/unit/add")}
          >
            <i className="fa fa-plus" /> {i18n.t('unit')}
          </button>
        </CardHeader>
        <div className="table-div-panel">
          <h2 className="h2" className="mb-3">{i18n.t('unitList')}</h2>

          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th style={{ borderTop: "0px" }}>{i18n.t('title')}</th>
                <th style={{ borderTop: "0px" }}>{i18n.t('shortcut')}</th>
                <th style={{ borderTop: "0px" }}>{i18n.t('activated')}</th>
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
                    value={this.state.shortcut}
                    name="input1-group1"
                    onChange={e => this.setState({ shortcut: e.target.value })}
                  />
                </th>
                <th>
                  <Input
                    type="text"
                    id="input1-group1"
                    value={this.state.activated}
                    name="input1-group1"
                    onChange={e => this.setState({ activated: e.target.value })}
                  />
                </th>
              </tr>
              {this.getFilteredData().map(unit => (
                <tr
                  key={unit.id}
                  onClick={() =>
                    this.props.history.push("/unit/edit/" + unit.id)
                  }
                >
                  <td>{unit.title}</td>
                  <td>{unit.shortcut}</td>
                  <td>
                    {unit.is_active ? (
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

//all below is just redux storage

const mapStateToProps = ({ unitsReducer }) => {
  const { units } = unitsReducer;
  return { units };
};

export default connect(mapStateToProps, {})(UnitsList);
