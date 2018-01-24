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
      pageNumber:this.props.match.params.p?parseInt(this.props.match.params.p, 10):1,
      id:'',
    }
    this.getFilteredData.bind(this);
  }

  getFilteredData(){
    return this.props.users.filter((item)=>(item.detailData.name+' '+item.detailData.surname).toLowerCase().includes(this.state.name.toLowerCase()))
    .filter((item)=>item.email.toLowerCase().includes(this.state.email.toLowerCase()))
    .filter((item)=>item.id.toString().toLowerCase().includes(this.state.id.toLowerCase()))
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
              <th style={{ borderTop: "0px" }}>ID</th>
              <th style={{ borderTop: "0px" }}>Activated</th>
              <th style={{ borderTop: "0px" }}>Name</th>
              <th style={{ borderTop: "0px" }}>E-mail</th>
              <th style={{ borderTop: "0px" }}>Company</th>
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
              <th>
                <Input type="text" id="input1-group1" value={this.state.company} name="input1-group1" onChange={(e)=>this.setState({company:e.target.value})} />
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
                Page {this.state.pageNumber} of {this.props.numberOfPages}
              </PaginationItem>
            </Pagination>
          </div>
          <div className="col">
            <Pagination className="justify-content-center">
              <PaginationItem>
                <PaginationLink previous
                  onClick={(e)=>{
                    e.preventDefault();
                    if(this.state.pageNumber<=1){
                      return;
                    }
                    this.props.history.push("/usersList/"+(this.state.pageNumber-1)+","+this.state.pagination);
                    this.props.getUsers(this.state.pagination,this.state.pageNumber-1,this.props.token);
                    this.setState({pageNumber:this.state.pageNumber-1});
                    }
                  }
                  href={1>=this.state.pageNumber?null:("/usersList/"+(this.state.pageNumber-1)+","+this.state.pagination)}
                  >
                  Prev
                </PaginationLink>
              </PaginationItem>
              <PaginationItem active={1==this.state.pageNumber}>
                <PaginationLink href={"/usersList/1,"+this.state.pagination}
                  onClick={(e)=>{
                    e.preventDefault();
                    this.props.history.push("/usersList/1,"+this.state.pagination);
                    this.props.getUsers(this.state.pagination,1,this.props.token);
                    this.setState({pageNumber:1});
                    }
                  }>{1}
                </PaginationLink>
              </PaginationItem>

              {
                this.state.pageNumber>4 &&
                <PaginationItem>
                  ...
                </PaginationItem>
              }

              {
                this.state.pageNumber>3 &&
                <PaginationItem>
                  <PaginationLink href={"/usersList/"+(this.state.pageNumber-2)+","+this.state.pagination}
                    onClick={(e)=>{
                      e.preventDefault();
                      this.props.history.push("/usersList/"+(this.state.pageNumber-2)+","+this.state.pagination);
                      this.props.getUsers(this.state.pagination,this.state.pageNumber-2,this.props.token);
                      this.setState({pageNumber:this.state.pageNumber-2});
                    }
                  }>{this.state.pageNumber-2}
                </PaginationLink>
              </PaginationItem>
              }
              {
                this.state.pageNumber>2 &&
                <PaginationItem>
                  <PaginationLink href={"/usersList/"+(this.state.pageNumber-1)+","+this.state.pagination}
                    onClick={(e)=>{
                      e.preventDefault();
                      this.props.history.push("/usersList/"+(this.state.pageNumber-1)+","+this.state.pagination);
                      this.props.getUsers(this.state.pagination,this.state.pageNumber-1,this.props.token);
                      this.setState({pageNumber:this.state.pageNumber-1});
                    }
                  }>{this.state.pageNumber-1}
                </PaginationLink>
              </PaginationItem>
              }
              {
                this.state.pageNumber!=1 && this.state.pageNumber!=this.props.numberOfPages &&
                <PaginationItem active={true}>
                  <PaginationLink href={"/usersList/"+this.state.pageNumber+","+this.state.pagination}
                    onClick={(e)=>{
                      e.preventDefault();
                      this.props.history.push("/usersList/"+this.state.pageNumber+","+this.state.pagination);
                      this.props.getUsers(this.state.pagination,this.state.pageNumber,this.props.token);
                    }
                  }>{this.state.pageNumber}
                </PaginationLink>
              </PaginationItem>
              }
              {
                this.props.numberOfPages-this.state.pageNumber>1 &&
                <PaginationItem>
                  <PaginationLink href={"/usersList/"+(this.state.pageNumber+1)+","+this.state.pagination}
                    onClick={(e)=>{
                      e.preventDefault();
                      this.props.history.push("/usersList/"+(this.state.pageNumber+1)+","+this.state.pagination);
                      this.props.getUsers(this.state.pagination,this.state.pageNumber+1,this.props.token);
                      this.setState({pageNumber:this.state.pageNumber+1});
                    }
                  }>{this.state.pageNumber+1}
                </PaginationLink>
              </PaginationItem>
              }
              {
                this.props.numberOfPages-this.state.pageNumber>2 &&
                <PaginationItem>
                  <PaginationLink href={"/usersList/"+(this.state.pageNumber+2)+","+this.state.pagination}
                    onClick={(e)=>{
                      e.preventDefault();
                      this.props.history.push("/usersList/"+(this.state.pageNumber+2)+","+this.state.pagination);
                      this.props.getUsers(this.state.pagination,this.state.pageNumber+2,this.props.token);
                      this.setState({pageNumber:this.state.pageNumber+2});
                    }
                  }>{this.state.pageNumber+2}
                </PaginationLink>
              </PaginationItem>
              }
              {
                this.props.numberOfPages-this.state.pageNumber>3 &&
                <PaginationItem>
                  ...
                </PaginationItem>
              }
              <PaginationItem active={this.props.numberOfPages==this.state.pageNumber}>
                <PaginationLink href={"/usersList/"+this.props.numberOfPages+","+this.state.pagination}
                  onClick={(e)=>{
                    e.preventDefault();
                    this.props.history.push("/usersList/"+this.props.numberOfPages+","+this.state.pagination);
                    this.props.getUsers(this.state.pagination,this.props.numberOfPages,this.props.token);
                    this.setState({pageNumber:this.props.numberOfPages});
                    }
                  }>{this.props.numberOfPages}
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink next
                  onClick={(e)=>{
                    e.preventDefault();
                    if(this.state.pageNumber>=this.props.numberOfPages){
                      return;
                    }
                    this.props.history.push("/usersList/"+(this.state.pageNumber+1)+","+this.state.pagination);
                    this.props.getUsers(this.state.pagination,this.state.pageNumber+1,this.props.token);
                    this.setState({pageNumber:this.state.pageNumber+1});
                    }
                  }
                  href={this.state.pageNumber>=this.props.numberOfPages?null:("/usersList/"+(this.state.pageNumber+1)+","+this.state.pagination)}
                  >
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
                    this.setState({pagination:value.target.value});
                    if(value.target.value==999){
                      this.setState({pageNumber:1});
                      this.props.getCompanies(value.target.value,1,this.props.token);
                      this.props.history.push("/usersList/"+1+","+value.target.value);
                    }
                    else{
                      this.props.getCompanies(value.target.value,this.props.match.params.p?parseInt(this.props.match.params.p, 10):1,this.props.token);
                      this.props.history.push("/usersList/"+this.state.pageNumber+","+value.target.value);
                    }
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
  return { users, numberOfPages:usersLinks.numberOfPages, token };
};


export default connect(mapStateToProps, {getUsers})(UsersList);
