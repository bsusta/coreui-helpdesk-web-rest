import { Link } from "react-router-dom";
import React, { Component } from "react";
import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input
} from "reactstrap";

let mockOptions = [
  { id: 0, title: "20" },
  { id: 1, title: "50" },
  { id: 2, title: "100" },
  { id: 3, title: "all" }
];
const mockData=[
  {id:0,date:'12.11.2018',taskName:'Vymena Klavesnic',message:'Marian Sint pridal komentar k ulohe',comment:true},
  {id:1,date:'11.11.2018',taskName:'Vymena PC',message:'Potreba vymenit PC na 14 poschodi',comment:false},
  {id:2,date:'10.10.2018',taskName:'Vymena Klavesnic',message:'Potreba vymenit klavesnice na 4 poschodi',comment:false},
  {id:3,date:'10.7.2018',taskName:'Opravit server',message:'Nutne opravte PC na 1 poschodi',comment:false},
  {id:4,date:'10.4.2018',taskName:'Implementovat popup',message:'Bez implementovaneho popupu sa nevieme pohnut dalej, vyriešte tento problém čím skor.',comment:false},
  {id:5,date:'22.2.2018',taskName:'Zmenit tasklist',message:'Zmente vzhlad tasklistu, nie je vobec predladny neda sa prepnut z nastaveni priamo d tasku...',comment:false},
]

class Messages extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="card">
        <h4 class="card-header">Messages</h4>
        <div class="card-body">
          <div>
            <input type="checkbox" />
            <button type="button" class="btn btn-danger" style={{color:'white',marginLeft:5}}>Delete</button>
            <button type="button" class="btn btn-primary" style={{color:'white',marginLeft:5}}>Mark as read</button>
            <button type="button" class="btn btn-info" style={{color:'white',marginLeft:5}}>Mark as unread</button>
            <input style={{border:"1px solid black",borderRadius: 5,marginLeft:5,paddingLeft:5}} placeholder="Search..." />
            <button type="button" class="fa fa-search fa-lg" style={{border:'none',backgroundColor:'white'}}></button>
          </div>

          <div style={{paddingBottom:10,marginTop:10}}>
            {
              mockData.map((message)=>
              <div class="list-group">
                <a class="list-group-item flex-column align-items-start">
                  <div class="d-flex w-100 justify-content-between">
                    <p class="mb-1">
                      <input type="checkbox" />
                      <i className={message.comment?"fa fa-comment-o fa-lg":"icon-envelope-letter fa-lg"} style={{paddingRight:5,paddingLeft:5}}></i>
                      {message.message}
                    </p>
                    <div>
                      <input type="checkbox" />
                      <a class="fa fa-remove fa-lg" style={{paddingLeft:5}}></a>
                    </div>
                  </div>
                  <div class="d-flex w-100 justify-content-between">
                    <a href="#/editTask"><small>{message.taskName}</small></a>
                    <small class="text-muted">{message.date}</small>
                  </div>
                </a>
              </div>
            )
          }
        </div>
        <div class="row">
          <div class="col">
            <Pagination>
              <PaginationItem style={{ margin: 5 }}>
                Page 1 of 5
              </PaginationItem>
            </Pagination>
          </div>
          <div className="col">
            <Pagination className="justify-content-center">
              <PaginationItem>
                <PaginationLink previous href="#">
                  Prev
                </PaginationLink>
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem className="page-item">
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next href="#">
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
                  style={{ maxWidth: 70 }}
                  >
                  {mockOptions.map(opt => (
                    <option key={opt.id} value={opt.id}>
                      {opt.title}
                    </option>
                  ))}
                </select>
              </PaginationItem>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}
}

export default Messages;
