import { Link } from "react-router-dom";
import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import { connect } from 'react-redux';

class SMTPsList extends Component {
  constructor(props){
    super(props);
    this.state={
      email:''
    }
    this.getFilteredData.bind(this);
    console.log(this.props.SMTPs);
  }

  getFilteredData(){
    return this.props.SMTPs.filter((item)=>item.email.toLowerCase().includes(this.state.email.toLowerCase()))
    .sort((item,item2)=>item.name>item2.name);
  }

  render() {
    return (
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <h2 style={{ marginTop: 20 }} className="mb-3">
          SMTPs list
        </h2>

        <button
          type="button"
          class="btn btn-success"
          onClick={() => this.props.history.push("/smtp/add")}
          >
          Add new SMTP
        </button>

        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ borderTop: "0px" }}>E-mail</th>
              <th style={{ borderTop: "0px" }}>Description</th>
              <th style={{ borderTop: "0px" }}>Active</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Input type="text" id="input1-group1" name="input1-group1" vale={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}/>
              </th>
              <th>
                <Input type="text" id="input1-group1" name="input1-group1"/>
              </th>
              <th>
                <Input type="text" id="input1-group1" name="input1-group1"/>
              </th>
            </tr>
            {this.getFilteredData().map(smtp => (
              <tr
                key={smtp.id}
                onClick={() => this.props.history.push("/smtp/edit/" + smtp.id)}
                >
                <td>{smtp.email}</td>
                <td>NOT IMPLEMENTED</td>
                <td>
                  {true ? (
                    <span class="badge badge-success">Maybe Not</span>
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

const mapStateToProps = ({ SMTPsReducer }) => {
  const { SMTPs } = SMTPsReducer;
  return { SMTPs };
};


export default connect(mapStateToProps, {})(SMTPsList);
