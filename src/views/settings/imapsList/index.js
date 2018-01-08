import { Link } from "react-router-dom";
import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
const mockData = [
  { id: 1, active: true, email: 'fustrana@gmail.com', project:'Project 1',description:'preco je tu popis' },
  { id: 2, active: false, email: 'kiri@karacorp.com', project:'Project 1',description:'bude priliz dlhy' },
  { id: 4, active: true, email: 'senitra@gmail.com', project:'Project 4',description:'pravdepodobne' },
];
class IMapsList extends Component {
  constructor(props){
    super(props);
    this.state={
      active:''
    }
    this.getFilteredData.bind(this);
  }

  getFilteredData(){
    return mockData.filter((item)=>item.active == (this.state.active.toLowerCase().includes('y')||
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
          onClick={() => this.props.history.push("/imap/add")}
          >
          Add new IMap
        </button>

        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ borderTop: "0px" }}>E-mail</th>
              <th style={{ borderTop: "0px" }}>Project</th>
              <th style={{ borderTop: "0px" }}>Description</th>
              <th style={{ borderTop: "0px" }}>Active</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Input type="text" id="input1-group1" name="input1-group1"/>
              </th>
              <th>
                <Input type="text" id="input1-group1" name="input1-group1"/>
              </th>
              <th>
                <Input type="text" id="input1-group1" name="input1-group1"/>
              </th>
              <th>
                <Input type="text" id="input1-group1" name="input1-group1"/>
              </th>
            </tr>
            {this.getFilteredData().map(imap => (
              <tr
                key={imap.id}
                onClick={() => this.props.history.push("/imap/edit/" + imap.id)}
                >
                <td>{imap.email}</td>
                <td>{imap.project}</td>
                <td>{imap.description}</td>
                <td>
                  {imap.active ? (
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

export default IMapsList;
