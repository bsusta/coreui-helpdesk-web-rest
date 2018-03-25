import { Link } from "react-router-dom";
import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import { connect } from 'react-redux';
import Pagination from '../../../components/pagination';
class CompaniesList extends Component {
  constructor(props){
    super(props);
    this.state={
      active:'',
      title:'',
      id:''
    }
  }

  render() {
    return (
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <h2 style={{ marginTop: 20 }} className="mb-3">
          Companies list
        </h2>

        <button
          type="button"
          class="btn btn-success"
          onClick={() => this.props.history.push("/company/add")}
          >
          Add new companies
        </button>


        <div style={{display:'flex', marginTop:20}}>
      </div>

        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ borderTop: "0px" }}>ID</th>
              <th style={{ borderTop: "0px" }}>Activated</th>
              <th style={{ borderTop: "0px" }}>Title</th>
            </tr>
          </thead>
          <tbody>
            {this.props.companies.map(company => (
              <tr
                key={company.id}
                onClick={() => this.props.history.push("/company/edit/" + company.id)}
                >
                <td>{company.id}</td>
                <td>
                  {company.is_active ? (
                    <span class="badge badge-success">Yes</span>
                  ) : (
                    <span class="badge badge-danger">No</span>
                  )}
                </td>
                <td>{company.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ companiesReducer, login }) => {
  const { companies } = companiesReducer;
  const { token } = login;
  return { companies, token };
};

export default connect(mapStateToProps, {})(CompaniesList);
