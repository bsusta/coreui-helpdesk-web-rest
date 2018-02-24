import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input, Pagination,PaginationItem, PaginationLink } from "reactstrap";

const mockOptions=[{title:20,value:20},{title:50,value:50},{title:100,value:100},{title:'all',value:999}]

export default class Pag extends Component {
  constructor(props){
    super(props);
    this.state={
      pagination:this.props.pagination?this.props.pagination:20,
    };
    this.refetch.bind(this);
  }
  refetch(pagination,pageNumber){
      this.props.refetchData(pagination, pageNumber,this.props.token,...this.props.refetchParameters);
  }

  render() {
    return (
      <div class="row">
        <div class="col">
          <Pagination>
            <PaginationItem style={{ margin: 5 }}>
              Page {this.props.pageNumber} of {this.props.numberOfPages}
            </PaginationItem>
          </Pagination>
        </div>
        <div className="col">
          <Pagination className="justify-content-center">
            <PaginationItem>
              <PaginationLink previous
                onClick={(e)=>{
                  e.preventDefault();
                  if(this.props.pageNumber<=1){
                    return;
                  }
                  this.props.history.push("/"+this.props.link+"/"+(this.props.pageNumber-1)+","+this.state.pagination);
                  this.refetch(this.state.pagination,this.props.pageNumber-1);
                  this.props.setPageNumber(this.props.pageNumber-1);
                  }
                }
                href={1>=this.props.pageNumber?null:("/"+this.props.link+"/"+(this.props.pageNumber-1)+","+this.state.pagination)}
                >
                Prev
              </PaginationLink>
            </PaginationItem>
            <PaginationItem active={1==this.props.pageNumber}>
              <PaginationLink href={"/"+this.props.link+"/1,"+this.state.pagination}
                onClick={(e)=>{
                  e.preventDefault();
                  this.props.history.push("/"+this.props.link+"/1,"+this.state.pagination);
                  this.refetch(this.state.pagination,1);
                  this.props.setPageNumber(1);
                  }
                }>{1}
              </PaginationLink>
            </PaginationItem>

            {
              this.props.pageNumber>4 &&
              <PaginationItem>
                ...
              </PaginationItem>
            }

            {
              this.props.pageNumber>3 &&
              <PaginationItem>
                <PaginationLink href={"/"+this.props.link+"/"+(this.props.pageNumber-2)+","+this.state.pagination}
                  onClick={(e)=>{
                    e.preventDefault();
                    this.props.history.push("/"+this.props.link+"/"+(this.props.pageNumber-2)+","+this.state.pagination);
                    this.refetch(this.state.pagination,this.props.pageNumber-2);
                    this.props.setPageNumber(this.props.pageNumber-2);
                  }
                }>{this.props.pageNumber-2}
              </PaginationLink>
            </PaginationItem>
            }

            {
              this.props.pageNumber>2 &&
              <PaginationItem>
                <PaginationLink href={"/"+this.props.link+"/"+(this.props.pageNumber-1)+","+this.state.pagination}
                  onClick={(e)=>{
                    e.preventDefault();
                    this.props.history.push("/"+this.props.link+"/"+(this.props.pageNumber-1)+","+this.state.pagination);
                    this.refetch(this.state.pagination,this.props.pageNumber-1);
                    this.props.setPageNumber(this.props.pageNumber-1);
                  }
                }>{this.props.pageNumber-1}
              </PaginationLink>
            </PaginationItem>
            }


            {
              this.props.pageNumber!=1 && this.props.pageNumber!=this.props.numberOfPages &&
              <PaginationItem active={true}>
                <PaginationLink href={"/"+this.props.link+"/"+this.props.pageNumber+","+this.state.pagination}
                  onClick={(e)=>{
                    e.preventDefault();
                    this.props.history.push("/"+this.props.link+"/"+this.props.pageNumber+","+this.state.pagination);
                    this.refetch(this.state.pagination,this.props.pageNumber);
                  }
                }>{this.props.pageNumber}
              </PaginationLink>
            </PaginationItem>
            }

            {
              this.props.numberOfPages-this.props.pageNumber>1 &&
              <PaginationItem>
                <PaginationLink href={"/"+this.props.link+"/"+(this.props.pageNumber+1)+","+this.state.pagination}
                  onClick={(e)=>{
                    e.preventDefault();
                    this.props.history.push("/"+this.props.link+"/"+(this.props.pageNumber+1)+","+this.state.pagination);
                    this.refetch(this.state.pagination,this.props.pageNumber+1);
                    this.props.setPageNumber(this.props.pageNumber+1);
                  }
                }>{this.props.pageNumber+1}
              </PaginationLink>
            </PaginationItem>
            }

            {
              this.props.numberOfPages-this.props.pageNumber>2 &&
              <PaginationItem>
                <PaginationLink href={"/"+this.props.link+"/"+(this.props.pageNumber+2)+","+this.state.pagination}
                  onClick={(e)=>{
                    e.preventDefault();
                    this.props.history.push("/"+this.props.link+"/"+(this.props.pageNumber+2)+","+this.state.pagination);
                    this.refetch(this.state.pagination,this.props.pageNumber+2);
                    this.props.setPageNumber(this.props.pageNumber+2);
                  }
                }>{this.props.pageNumber+2}
              </PaginationLink>
            </PaginationItem>
            }


            {
              this.props.numberOfPages-this.props.pageNumber>3 &&
              <PaginationItem>
                ...
              </PaginationItem>
            }
            {
              (this.props.pageNumber!=1||this.props.numberOfPages!=this.props.pageNumber) &&
              <PaginationItem active={this.props.numberOfPages==this.props.pageNumber}>
                <PaginationLink href={"/"+this.props.link+"/"+this.props.numberOfPages+","+this.state.pagination}
                  onClick={(e)=>{
                    e.preventDefault();
                    this.props.history.push("/"+this.props.link+"/"+this.props.numberOfPages+","+this.state.pagination);
                    this.refetch(this.state.pagination,this.props.numberOfPages);
                    this.props.setPageNumber(this.props.numberOfPages);
                  }
                }>{this.props.numberOfPages}
              </PaginationLink>
            </PaginationItem>
            }

            <PaginationItem>
              <PaginationLink next
                onClick={(e)=>{
                  e.preventDefault();
                  if(this.props.pageNumber>=this.props.numberOfPages){
                    return;
                  }
                  this.props.history.push("/"+this.props.link+"/"+(this.props.pageNumber+1)+","+this.state.pagination);
                  this.refetch(this.state.pagination,this.props.pageNumber+1);
                  this.props.setPageNumber(this.props.pageNumber+1);
                  }
                }
                href={this.props.pageNumber>=this.props.numberOfPages?null:("/"+this.props.link+"/"+(this.props.pageNumber+1)+","+this.state.pagination)}
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
                  this.props.setPageNumber(1);
                  this.refetch(value.target.value,1);
                  this.props.history.push("/"+this.props.link+"/"+1+","+value.target.value);
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
      </div>)
  }
}
