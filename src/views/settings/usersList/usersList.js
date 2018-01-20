import { Link } from "react-router-dom";
import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input, Pagination,PaginationItem, PaginationLink } from "reactstrap";
import { connect } from 'react-redux';
import {getUsers } from '../../../redux/actions';

const mockOptions=[{title:20,value:20},{title:50,value:50},{title:100,value:100},{title:'all',value:999}]
class UsersList extends Component {
  constructor(props){
    super(props);
    this.state={
      active:'',
      name:'',
      email:'',
      company:'',
      pagination:this.props.match.params.nop?parseInt(this.props.match.params.nop, 10):20,
      pageNumber:this.props.match.params.p?this.props.match.params.p:1
    }
    console.log(props);
    this.getFilteredData.bind(this);
  }

  getFilteredData(){
    return this.props.users.filter((item)=>(item.detailData.name+' '+item.detailData.surname).toLowerCase().includes(this.state.name.toLowerCase()))
    .filter((item)=>item.email.toLowerCase().includes(this.state.email.toLowerCase()))
    .filter((item)=>item.company.title.toLowerCase().includes(this.state.company.toLowerCase()))
    .filter((item)=>item.is_active == (this.state.active.toLowerCase().includes('y')||
    this.state.active.toLowerCase().includes('t')||
    this.state.active.toLowerCase().includes('c'))||
    this.state.active=='')
    .sort((item,item2)=>item.detailData.surname>item2.detailData.surname);
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
              <th style={{ borderTop: "0px" }}>Activated</th>
              <th style={{ borderTop: "0px" }}>Name</th>
              <th style={{ borderTop: "0px" }}>E-mail</th>
              <th style={{ borderTop: "0px" }}>Company</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Input type="text" id="input1-group1" value={this.state.active} name="input1-group1" onChange={(e)=>this.setState({active:e.target.value})} />
              </th>
              <th>
                <Input type="text" id="input1-group1" value={this.state.name} name="input1-group1" onChange={(e)=>this.setState({name:e.target.value})} />
              </th>
              <th>
                <Input type="text" id="input1-group1" value={this.state.email} name="input1-group1" onChange={(e)=>this.setState({email:e.target.value})} />
              </th>
              <th>
                <Input type="text" id="input1-group1" value={this.state.company} name="input1-group1" onChange={(e)=>this.setState({company:e.target.value})} />
              </th>
            </tr>
            {this.getFilteredData().map(user => (
              <tr
                key={user.id}
                onClick={() => this.props.history.push("/user/edit/" + user.id)}
                >
                <td>
                  {user.is_active ? (
                    <span class="badge badge-success">Yes</span>
                  ) : (
                    <span class="badge badge-danger">No</span>
                  )}
                </td>
                <td>{user.detailData.surname} {user.detailData.name}</td>
                <td>{user.email}</td>
                <td>{user.company.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div class="row">
          <div class="col">
            <Pagination>
              <PaginationItem style={{ margin: 5 }}>
                Page {this.state.pageNumber} of {this.props.usersLinks.numberOfPages}
              </PaginationItem>
            </Pagination>
          </div>
          <div className="col">
            <Pagination className="justify-content-center">
              <PaginationItem disabled={this.state.pageNumber==1}>
                <PaginationLink previous href="#">
                  Prev
                </PaginationLink>
              </PaginationItem>
              {
                this.props.usersLinks.numberOfPages<10 &&
                Array.from({length:this.props.usersLinks.numberOfPages},(v,k)=>k+1).map((pageNumber)=>
                <PaginationItem active={pageNumber==this.state.pageNumber}>
                  <PaginationLink href={"#/usersList/"+pageNumber+","+this.state.pagination}>{pageNumber}</PaginationLink>
                </PaginationItem>
                )
              }
              <PaginationItem>
                <PaginationLink next href={"#/usersList/"+this.state.pageNumber+1+","+this.state.pagination} disabled={this.state.pageNumber==this.props.usersLinks.numberOfPages}>
                  Next
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
          <div className="col">
            <Pagination className="float-right">
              <PaginationItem style={{ margin: 5 }}>
                Items per page
              </PaginationItem>
              <PaginationItem style={{ marginRight: 10 }}>
                <select
                  class="form-control"
                  id="project"
                  value={this.state.pagination}
                  onChange={(value)=>{
                    this.props.history.push("#/usersList/"+this.state.pageNumber+","+value.target.value);
                    this.setState({pagination:value.target.value});
                    this.props.getUsers(this.state.pagination,this.props.match.params.p?parseInt(this.props.match.params.p, 10):1,this.props.token);
                    this.forceUpdate();
              }}
                  style={{ maxWidth: 70 }}

                >
                  {mockOptions.map(opt => (
                    <option key={opt.title} value={opt.value}>
                      {opt.title}
                    </option>
                  ))}
                </select>
              </PaginationItem>
            </Pagination>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ usersReducer, login }) => {
  const { users, usersLinks } = usersReducer;
  const { token } = login;
  return { users, usersLinks, token };
};


export default connect(mapStateToProps, {getUsers})(UsersList);
