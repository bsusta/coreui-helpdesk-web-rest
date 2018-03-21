import { Link } from "react-router-dom";
import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import { connect } from 'react-redux';
import {getUsers } from '../../../redux/actions';
import Pagination from '../../../components/pagination';

class UsersList extends Component {
  constructor(props){
    super(props);
    this.state={
      active:'',
      name:'',
      email:'',
      id:''
    }
    this.getFilteredData.bind(this);
  }

  getFilteredData(){
    return this.props.users.filter((item)=>(item.name+' '+item.surname).toLowerCase().includes(this.state.name.toLowerCase()))
    .filter((item)=>item.email.toLowerCase().includes(this.state.email.toLowerCase()))
    .filter((item)=>item.id.toString().toLowerCase().includes(this.state.id.toLowerCase()))
    .filter((item)=>item.is_active == (this.state.active.toLowerCase().includes('y')||
    this.state.active.toLowerCase().includes('t')||
    this.state.active.toLowerCase().includes('c'))||
    this.state.active=='')
    .sort((item,item2)=>item.surname>item2.surname);
  }

  render() {
    return (
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <h2 style={{ marginTop: 20 }} className="mb-3">
          Users list
        </h2>

        <button
          type="button"
          class="btn btn-success"
          onClick={() => this.props.history.push("/user/add")}
          >
          Add new user
        </button>

        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ borderTop: "0px" }}>ID</th>
              <th style={{ borderTop: "0px" }}>Activated</th>
              <th style={{ borderTop: "0px" }}>Name</th>
              <th style={{ borderTop: "0px" }}>E-mail</th>
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
                <Input type="text" id="input1-group1" value={this.state.name} name="input1-group1" onChange={(e)=>this.setState({name:e.target.value})} />
              </th>
              <th>
                <Input type="text" id="input1-group1" value={this.state.email} name="input1-group1" onChange={(e)=>this.setState({email:e.target.value})} />
              </th>
            </tr>
            {this.getFilteredData().map(user => (
              <tr
                key={user.id}
                onClick={() => this.props.history.push("/user/edit/" + user.id)}
                >
                <td>{user.id}</td>
                <td>
                  {user.is_active ? (
                    <span class="badge badge-success">Yes</span>
                  ) : (
                    <span class="badge badge-danger">No</span>
                  )}
                </td>
                <td>{user.surname} {user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {
        /*<Pagination
          link="usersList"
          history={this.props.history}
          numberOfPages={this.props.numberOfPages}
          refetchData={this.props.getUsers}
          token={this.props.token}
          filter=""
          pageNumber={this.state.pageNumber}
          setPageNumber={this.setPage.bind(this)}
          pagination={this.props.match.params.nop?parseInt(this.props.match.params.nop, 10):20}
          />*/
        }
      </div>
    );
  }
}

const mapStateToProps = ({ usersReducer, login }) => {
  const { users } = usersReducer;
  const { token } = login;
  return { users, token };
};


export default connect(mapStateToProps, {getUsers})(UsersList);
