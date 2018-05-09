import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input, Pagination,PaginationItem, PaginationLink } from "reactstrap";

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
      <div>
      <div className="row">
        { !this.props.small && (
        <div className="col">
             <Pagination>
              <PaginationItem style={{ margin: 5 }}>
                Page {this.props.pageNumber} of {this.props.numberOfPages}
              </PaginationItem>
            </Pagination>
        </div>
      )}
        <div className="col">
          <Pagination className="justify-content-center">
            <PaginationItem className="paginationItem">
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
            { this.props.pageNumber>0 &&
              <PaginationItem className="paginationItem" active={1===this.props.pageNumber}>
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
            }

            {
              this.props.pageNumber>4 &&
              <PaginationItem className="paginationItem">
                ...
              </PaginationItem>
            }

            {
              this.props.pageNumber>3 &&
              <PaginationItem className="paginationItem">
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
              <PaginationItem className="paginationItem">
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
              <PaginationItem active={true} className="paginationItem">
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
              <PaginationItem className="paginationItem">
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
              <PaginationItem className="paginationItem">
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
              <PaginationItem className="paginationItem">
                ...
              </PaginationItem>
            }
            {
              (this.props.pageNumber!=1||this.props.numberOfPages!=this.props.pageNumber) &&
              <PaginationItem active={this.props.numberOfPages==this.props.pageNumber} className="paginationItem">
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

            <PaginationItem className="paginationItem">
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

        {!this.props.small && <div className="col">
          <Pagination className="float-left">
            <PaginationItem style={{ margin: 5 }}>
              Items per page
            </PaginationItem>
            <PaginationItem style={{ marginRight: 10 }}>
              <select
                className="form-control"
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
                {this.props.paginationOptions.map(opt => (
                  <option key={opt.title} value={opt.value}>
                    {opt.title}
                  </option>
                ))}
              </select>
            </PaginationItem>
          </Pagination>
        </div>}
      </div>
      <div className="row justify-content-between" style={{margin:0,padding:0}}>
        { this.props.small && (
             <Pagination>
              <PaginationItem style={{ margin: 5 }}>
                Page {this.props.pageNumber} of {this.props.numberOfPages}
              </PaginationItem>
            </Pagination>
      )}
      {this.props.small &&
        <Pagination className="float-right">
          <PaginationItem style={{ margin: 5 }}>
            Items per page
          </PaginationItem>
          <PaginationItem style={{ marginRight: 10 }}>
            <select
              className="form-control"
              id="project"
              value={this.state.pagination}
              onChange={(value)=>{
                this.setState({pagination:value.target.value});
                this.props.setPageNumber(this.props.numberOfPages>0?1:0);
                this.refetch(value.target.value,1);
                this.props.history.push("/"+this.props.link+"/"+1+","+value.target.value);
          }}
              style={{ maxWidth: 70 }}

            >
              {this.props.paginationOptions.map(opt => (
                <option key={opt.title} value={opt.value}>
                  {opt.title}
                </option>
              ))}
            </select>
          </PaginationItem>
        </Pagination>}

      </div>
    </div>)
  }
}
