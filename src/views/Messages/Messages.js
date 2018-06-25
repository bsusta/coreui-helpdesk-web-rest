import { Link } from "react-router-dom";
import React, { Component } from "react";
import {
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import { connect } from 'react-redux';
import {getMessages, deleteMessage, setMessageStatus} from '../../redux/actions';
import {timestampToString, messageBodyToString, hightlightText} from '../../helperFunctions';
import Pagination from '../../components/pagination';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state={
      filter:'',
      selected:[],
      pageNumber: (this.props.match.params.page && this.props.messages.length>0)
        ? parseInt(this.props.match.params.page, 10)
        : (this.props.messages.length>0?1:0),
    }
    this.deleteMessage.bind(this);
    this.deleteMultipleMessages.bind(this)
  }

  deleteMultipleMessages(){
    if(this.state.selected.length===0){
      return;
    }
    if (
      confirm(
        "Are you sure you want to delete "+this.state.selected.length+(this.state.selected.length===1?" message ?":" messages ?")
      )
    ) {
      this.setState({selected:[]});
      this.props.deleteMessage(this.props.match.params.count?this.props.match.params.count:20,this.props.match.params.page?this.props.match.params.page:1,this.state.selected,this.props.token);
    } else {
      return;
    }

  }

  deleteMessage(name,id){
    if (
      confirm(
        "Are you sure you want to delete message "+name+"?"
      )
    ) {
      this.props.deleteMessage(this.props.match.params.count?this.props.match.params.count:20,this.props.match.params.page?this.props.match.params.page:1,[id],this.props.token);
      let index = this.state.selected.findIndex((item)=>item===id);
      if(index!==-1){
        let newSelected=this.state.selected.splice(1,index);
        this.setState({selected:newSelected});
      }
    } else {
      return;
    }
  }


  getFilteredData(){
    return this.props.messages
      .filter(item =>messageBodyToString(item.body).toLowerCase().includes(this.state.filter.toLowerCase())
      ||item.task.title.toLowerCase().includes(this.state.filter.toLowerCase())
      ||item.title && item.title.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  }

  setPage(number) {
    this.setState({ pageNumber: number });
  }

  render() {
    return (
      <div className="table-div">
        <h2 className="h2"> Messages</h2>
        <div className="d-flex flex-row"
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            border: "0"
          }}>
          <input style={{marginTop:'auto',marginBottom:'auto'}} type="checkbox" checked={this.props.messages.length===this.state.selected.length && this.props.messages.length!==0 } onChange={()=>{
              if(this.props.messages.length===this.state.selected.length){
                this.setState({selected:[]});
              }
              else{
                this.setState({selected:this.props.messages.map((item)=>item.id)});
              }
            }} />
          <button
            type="button"
            className="btn btn-danger btn-sm"
            style={{ color: "white", marginLeft: 5 }}
            onClick={this.deleteMultipleMessages.bind(this)}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            style={{ color: "white", marginLeft: 5 }}
            onClick={()=>this.props.setMessageStatus(this.state.selected,true,this.props.token)}
          >
            Mark as read
          </button>
          <button
            type="button"
            className="btn btn-info btn-sm"
            style={{ color: "white", marginLeft: 5 }}
            onClick={()=>this.props.setMessageStatus(this.state.selected,false,this.props.token)}
          >
            Mark as unread
          </button>
          <InputGroup style={{ marginLeft: 5 }}>
            <input
              className="form-control"
              id="filter"
              placeholder="Search message"
              value={this.state.filter}
              onChange={(e)=>this.setState({filter:e.target.value})}
              style={{ borderRight: "0" }}
            />
            <InputGroupAddon
              style={{ background: "white", borderLeft: "" }}
            >
              <i className="fa fa-search" />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="list-group" style={{marginTop:5}}>
        {this.getFilteredData().map((message,index) => (
          <div
            className="list-group-item flex-column align-items-start"
            style={{
              border:'none',
              borderTop: index===0?'none':"1px solid rgba(0, 0, 0, 0.125)",
              fontWeight:(message.read?'none':'bold')
            }}
            key={JSON.stringify(message)}>
            <div className="d-flex w-100 justify-content-between">
              <p className="mb-1"
                style={{cursor:'pointer'}}
                onClick={()=>{
                  if(this.state.selected.includes(message.id)){
                    let newSelected = [...this.state.selected];
                    newSelected.splice(newSelected.findIndex((id)=>id===message.id),1);
                    this.setState({selected:newSelected});
                  }
                else{
                  this.setState({selected:[message.id,...this.state.selected]});
                }
                }}>
                <input type="checkbox" checked={this.state.selected.includes(message.id)}
                  onChange={()=>{
                    if(this.state.selected.includes(message.id)){
                      let newSelected = [...this.state.selected];
                      newSelected.splice(newSelected.findIndex((id)=>id===message.id),1);
                      this.setState({selected:newSelected});
                    }
                  else{
                    this.setState({selected:[message.id,...this.state.selected]});
                  }
                  }}/>
                <i
                  className={
                    message.comment
                      ? "fa fa-comment-o fa-lg"
                      : "icon-envelope-letter fa-lg"
                  }
                  style={{ paddingRight: 5, paddingLeft: 5, marginTop:'auto',marginBottom:'auto' }}
                />
              <span style={{fontSize:'1.4em'}}>{hightlightText(message.title,this.state.filter)}</span>
              </p>
              <span>
              <small className="text-muted"
                style={{cursor:'pointer'}}
                onClick={()=>{
                  if(this.state.selected.includes(message.id)){
                    let newSelected = [...this.state.selected];
                    newSelected.splice(newSelected.findIndex((id)=>id===message.id),1);
                    this.setState({selected:newSelected});
                  }
                  else{
                    this.setState({selected:[message.id,...this.state.selected]});
                  }
                }}>{timestampToString(message.createdAt)}</small>
              <i className="fa fa-remove fa-lg"
                style={{ paddingLeft: 5, cursor:'pointer' }}
                onClick={()=>{this.deleteMessage(message.title,message.id)}}
                />
            </span>
            </div>
            <div
              style={{cursor:'pointer'}}
              onClick={()=>{
                if(this.state.selected.includes(message.id)){
                  let newSelected = [...this.state.selected];
                  newSelected.splice(newSelected.findIndex((id)=>id===message.id),1);
                  this.setState({selected:newSelected});
                }
                else{
                  this.setState({selected:[message.id,...this.state.selected]});
                }
              }}>{hightlightText(messageBodyToString(message.body),this.state.filter)}
              { message.task &&
                <span className="float-right">
                  <a href={"#/task/edit/"+message.task.id}>{hightlightText(message.task.title,this.state.filter)}</a>
                </span>
              }
            </div>
          </div>
        ))}
      </div>
      <Pagination
        link={"messages"}
        history={this.props.history}
        numberOfPages={this.props.numberOfPages}
        refetchData={this.props.getMessages}
        token={this.props.token}
        disabled={false}
        refetchParameters={[]}
        pageNumber={this.state.pageNumber}
        setPageNumber={this.setPage.bind(this)}
        paginationOptions={[
          { title: 20, value: 20 },
          { title: 50, value: 50 },
          { title: 100, value: 100 },
          { title: 'all', value: 999 }
        ]}
        pagination={
          this.props.match.params.count
            ? parseInt(this.props.match.params.count, 10)
            : 20
        }
      />
    </div>);
  }
}

const mapStateToProps = ({messagesReducer, login }) => {
  const {messages,numberOfPages} = messagesReducer;
  const {token} = login;
  return {messages,numberOfPages, token};
};

export default connect(mapStateToProps, {getMessages, deleteMessage, setMessageStatus})(Messages);
