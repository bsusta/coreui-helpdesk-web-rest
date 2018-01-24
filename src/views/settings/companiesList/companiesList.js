import { Link } from "react-router-dom";
import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input, Pagination,PaginationItem, PaginationLink } from "reactstrap";
import { connect } from 'react-redux';
import {getCompanies } from '../../../redux/actions';

const mockOptions=[{title:20,value:20},{title:50,value:50},{title:100,value:100},{title:'all',value:999}]
class CompaniesList extends Component {
  constructor(props){
    super(props);
    this.state={
      active:'',
      title:'',
      id:'',
      pagination:this.props.match.params.nop?parseInt(this.props.match.params.nop, 10):20,
      pageNumber:this.props.match.params.p?parseInt(this.props.match.params.p, 10):1
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
                    this.props.history.push("/companiesList/"+(this.state.pageNumber-1)+","+this.state.pagination);
                    this.props.getCompanies(this.state.pagination,this.state.pageNumber-1,this.props.token);
                    this.setState({pageNumber:this.state.pageNumber-1});
                    }
                  }
                  href={1>=this.state.pageNumber?null:("/companiesList/"+(this.state.pageNumber-1)+","+this.state.pagination)}
                  >
                  Prev
                </PaginationLink>
              </PaginationItem>
              <PaginationItem active={1==this.state.pageNumber}>
                <PaginationLink href={"/companiesList/1,"+this.state.pagination}
                  onClick={(e)=>{
                    e.preventDefault();
                    this.props.history.push("/companiesList/1,"+this.state.pagination);
                    this.props.getCompanies(this.state.pagination,1,this.props.token);
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
                  <PaginationLink href={"/companiesList/"+(this.state.pageNumber-2)+","+this.state.pagination}
                    onClick={(e)=>{
                      e.preventDefault();
                      this.props.history.push("/companiesList/"+(this.state.pageNumber-2)+","+this.state.pagination);
                      this.props.getCompanies(this.state.pagination,this.state.pageNumber-2,this.props.token);
                      this.setState({pageNumber:this.state.pageNumber-2});
                    }
                  }>{this.state.pageNumber-2}
                </PaginationLink>
              </PaginationItem>
              }

              {
                this.state.pageNumber>2 &&
                <PaginationItem>
                  <PaginationLink href={"/companiesList/"+(this.state.pageNumber-1)+","+this.state.pagination}
                    onClick={(e)=>{
                      e.preventDefault();
                      this.props.history.push("/companiesList/"+(this.state.pageNumber-1)+","+this.state.pagination);
                      this.props.getCompanies(this.state.pagination,this.state.pageNumber-1,this.props.token);
                      this.setState({pageNumber:this.state.pageNumber-1});
                    }
                  }>{this.state.pageNumber-1}
                </PaginationLink>
              </PaginationItem>
              }


              {
                this.state.pageNumber!=1 && this.state.pageNumber!=this.props.numberOfPages &&
                <PaginationItem active={true}>
                  <PaginationLink href={"/companiesList/"+this.state.pageNumber+","+this.state.pagination}
                    onClick={(e)=>{
                      e.preventDefault();
                      this.props.history.push("/companiesList/"+this.state.pageNumber+","+this.state.pagination);
                      this.props.getCompanies(this.state.pagination,this.state.pageNumber,this.props.token);
                    }
                  }>{this.state.pageNumber}
                </PaginationLink>
              </PaginationItem>
              }

              {
                this.props.numberOfPages-this.state.pageNumber>1 &&
                <PaginationItem>
                  <PaginationLink href={"/companiesList/"+(this.state.pageNumber+1)+","+this.state.pagination}
                    onClick={(e)=>{
                      e.preventDefault();
                      this.props.history.push("/companiesList/"+(this.state.pageNumber+1)+","+this.state.pagination);
                      this.props.getCompanies(this.state.pagination,this.state.pageNumber+1,this.props.token);
                      this.setState({pageNumber:this.state.pageNumber+1});
                    }
                  }>{this.state.pageNumber+1}
                </PaginationLink>
              </PaginationItem>
              }

              {
                this.props.numberOfPages-this.state.pageNumber>2 &&
                <PaginationItem>
                  <PaginationLink href={"/companiesList/"+(this.state.pageNumber+2)+","+this.state.pagination}
                    onClick={(e)=>{
                      e.preventDefault();
                      this.props.history.push("/companiesList/"+(this.state.pageNumber+2)+","+this.state.pagination);
                      this.props.getCompanies(this.state.pagination,this.state.pageNumber+2,this.props.token);
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
                <PaginationLink href={"/companiesList/"+this.props.numberOfPages+","+this.state.pagination}
                  onClick={(e)=>{
                    e.preventDefault();
                    this.props.history.push("/companiesList/"+this.props.numberOfPages+","+this.state.pagination);
                    this.props.getCompanies(this.state.pagination,this.props.numberOfPages,this.props.token);
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
                    this.props.history.push("/companiesList/"+(this.state.pageNumber+1)+","+this.state.pagination);
                    this.props.getCompanies(this.state.pagination,this.state.pageNumber+1,this.props.token);
                    this.setState({pageNumber:this.state.pageNumber+1});
                    }
                  }
                  href={this.state.pageNumber>=this.props.numberOfPages?null:("/companiesList/"+(this.state.pageNumber+1)+","+this.state.pagination)}
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
                      this.props.history.push("/companiesList/"+1+","+value.target.value);
                    }
                    else{
                      this.props.getCompanies(value.target.value,this.props.match.params.p?parseInt(this.props.match.params.p, 10):1,this.props.token);
                      this.props.history.push("/companiesList/"+this.state.pageNumber+","+value.target.value);
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

const mapStateToProps = ({ companiesReducer, login }) => {
  const { companies, companiesLinks } = companiesReducer;
  const { token } = login;
  return { companies, numberOfPages:companiesLinks.numberOfPages, token };
};

export default connect(mapStateToProps, {getCompanies})(CompaniesList);
