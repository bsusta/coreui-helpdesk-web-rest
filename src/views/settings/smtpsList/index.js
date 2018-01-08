import { Link } from "react-router-dom";
import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
const mockData = [
  { id: 1, active: true, name: 'Lansystems' },
  { id: 2, active: false, name: 'Preston' },
  { id: 4, active: true, name: 'Microsoft'},
];
class CompaniesList extends Component {
  constructor(props){
    super(props);
    this.state={
      active:'',
      name:''
    }
    this.getFilteredData.bind(this);
  }

  getFilteredData(){
    return mockData.filter((item)=>item.name.toLowerCase().includes(this.state.name.toLowerCase()))
    .filter((item)=>item.active == (this.state.active.toLowerCase().includes('y')||
    this.state.active.toLowerCase().includes('t')||
    this.state.active.toLowerCase().includes('c'))||
    this.state.active=='')
    .sort((item,item2)=>item.name>item2.name);
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
          Add new company
        </button>

        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ borderTop: "0px" }}>Name</th>
              <th style={{ borderTop: "0px" }}>Active</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Input type="text" id="input1-group1" value={this.state.name} name="input1-group1" onChange={(e)=>this.setState({name:e.target.value})} />
              </th>
              <th>
                <Input type="text" id="input1-group1" value={this.state.active} name="input1-group1" onChange={(e)=>this.setState({active:e.target.value})} />
              </th>
            </tr>
            {this.getFilteredData().map(company => (
              <tr
                key={company.id}
                onClick={() => this.props.history.push("/company/edit/" + company.id)}
                >
                <td>{company.name}</td>
                <td>
                  {company.active ? (
                    <span class="badge badge-success">Yes</span>
                  ) : (
                    <span class="badge badge-danger">No</span>
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

export default CompaniesList;
