import { Link } from "react-router-dom";
import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import { connect } from "react-redux";

class CompanyAttributesList extends Component {
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
    return this.props.companyAttributes
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
      ).sort((item, item2) => item.title > item2.title).sort((item, item2) => item2.is_active - item.is_active);
  }

  render() {
    return (
      <div className="table-div">
        <h2 className="mb-3">
          <i className="fa fa-angle-left" style={{fontSize:'1.75rem', paddingRight:15, cursor:'pointer'}} onClick={()=>this.props.history.goBack()} />
        Company attributes list</h2>

        <button
          type="button"
          className="btn btn-success"
          onClick={() => this.props.history.push("/companyAttribute/add")}
        >
          Add new company attribute
        </button>

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ borderTop: "0px" }}>Custom field name</th>
              <th style={{ borderTop: "0px" }}>Type</th>
              <th style={{ borderTop: "0px" }}>Active</th>
              <th style={{ borderTop: "0px" }}>Required</th>
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
            {this.getFilteredData().map(companyAttribute => (
              <tr
                key={companyAttribute.id}
                onClick={() =>
                  this.props.history.push(
                    "/companyAttribute/edit/" + companyAttribute.id
                  )
                }
              >
                <td>{companyAttribute.title}</td>
                <td>{companyAttribute.type}</td>
                <td>
                  {companyAttribute.is_active ? (
                    <span className="badge badge-success">Yes</span>
                  ) : (
                    <span className="badge badge-danger">No</span>
                  )}
                </td>
                <td>
                  {companyAttribute.required ? (
                    <span className="badge badge-success">Yes</span>
                  ) : (
                    <span className="badge badge-danger">No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = ({ companyAttributesReducer, login }) => {
  const { companyAttributes } = companyAttributesReducer;
  return { companyAttributes };
};

export default connect(mapStateToProps, {})(CompanyAttributesList);
