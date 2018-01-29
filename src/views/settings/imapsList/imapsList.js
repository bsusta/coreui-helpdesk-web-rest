import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";

class ImapsList extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      project:'',
    }
    console.log(this.props.imaps);
    this.getFilteredData.bind(this);
  }

  getFilteredData(){
    return this.props.imaps
    .filter((item)=>item.inbox_email.toLowerCase().includes(this.state.email.toLowerCase()))
    .filter((item)=>item.project.title.toLowerCase().includes(this.state.project.toLowerCase()))
    .sort((item,item2)=>item.inbox_email>item2.inbox_email);
  }

  render() {
    return (
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <h2 style={{ marginTop: 20 }} className="mb-3">
          IMAPs list
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
                <Input type="text" id="input1-group1" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} name="input1-group1"/>
              </th>
              <th>
                <Input type="text" id="input1-group1" value={this.state.project} onChange={(e)=>this.setState({project:e.target.value})} name="input1-group1"/>
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
                <td>{imap.inbox_email}</td>
                <td>{imap.project.title}</td>
                <td>{imap.description}</td>
                <td>
                  {imap.is_active ? (
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

const mapStateToProps = ({imapsReducer, login }) => {
  const {imaps} = imapsReducer;
  const {token} = login;
  return {imaps,token};
};


export default connect(mapStateToProps, {})(ImapsList);
