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
    }
    this.getFilteredData.bind(this);
  }

  getFilteredData(){
    return this.props.companies.filter((item)=>item.title.toLowerCase().includes(this.state.title.toLowerCase()))
    .filter((item)=>item.id.toString().toLowerCase().includes(this.state.id.toLowerCase()))
    .filter((item)=>item.is_active == (this.state.active.toLowerCase().includes('y')||
    this.state.active.toLowerCase().includes('t')||
    this.state.active.toLowerCase().includes('c'))||
    this.state.active=='')
    .sort((item,item2)=>item.title>item2.title);
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

        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ borderTop: "0px" }}>ID</th>
              <th style={{ borderTop: "0px" }}>Activated</th>
              <th style={{ borderTop: "0px" }}>Title</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Input type="text" id="input1-group1" value={this.state.id} name="input1-group1" onChange={(e)=>this.setState({id:e.target.value})} />
              </th>
              <th>
                <Input type="text" id="input1-group1" value={this.state.active} name="input1-group1" onChange={(e)=>this.setState({active:e.target.value})} />
              </th>
              <th>
                <Input type="text" id="input1-group1" value={this.state.title} name="input1-group1" onChange={(e)=>this.setState({title:e.target.value})} />
              </th>
            </tr>
            {this.getFilteredData().map(company => (
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
          pageNumber={this.props.match.params.p?parseInt(this.props.match.params.p, 10):1}
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
