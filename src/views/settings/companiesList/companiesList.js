import { Link } from "react-router-dom";
import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import { connect } from 'react-redux';
import {getCompanies } from '../../../redux/actions';
import Pagination from '../../../components/pagination';
class CompaniesList extends Component {
  constructor(props){
    super(props);
    this.state={
      active:'',
      title:'',
      id:'',
      filter:'',
      confirmedFilter:'',
      pageNumber:this.props.match.params.p?parseInt(this.props.match.params.p, 10):1,
    }
    this.setPage.bind(this);
  }

  setPage(number){
    this.setState({pageNumber:number});
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
        <Input type="text" id="filter" value={this.state.filter} onChange={(e)=>this.setState({filter:e.target.value})} />
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => {
              this.setState({confirmedFilter:this.state.filter,pageNumber:1});
              this.props.getCompanies(this.props.match.params.nop?parseInt(this.props.match.params.nop, 10):20,1,this.state.filter,this.props.token);
              this.props.history.push(1+","+(this.props.match.params.nop?parseInt(this.props.match.params.nop, 10):20));
          }}
            >
            Filter
          </button>
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
        <Pagination
          link="companiesList"
          history={this.props.history}
          numberOfPages={this.props.numberOfPages}
          refetchData={this.props.getCompanies}
          token={this.props.token}
          filter={this.state.confirmedFilter}
          pageNumber={this.state.pageNumber}
          setPageNumber={this.setPage.bind(this)}
          pagination={this.props.match.params.nop?parseInt(this.props.match.params.nop, 10):20}
          />
      </div>
    );
  }
}

const mapStateToProps = ({ companiesReducer, login }) => {
  const { companies, companiesLinks } = companiesReducer;
  const { token } = login;
  return { companies, numberOfPages:companiesLinks.numberOfPages, token };
};

export default connect(mapStateToProps, {getCompanies})(CompaniesList);
