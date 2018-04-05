import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import { connect } from 'react-redux';

import AddComment from "./AddComment";
import {timestampToString} from '../../helperFunctions';
class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment:null,
    };
    console.log(this.props);
  }

  stringifyArray(array){
    let result="";
    if(array.length===0){
      return ""
    }
    array.map((item)=>result=result+item+", ");
    return result.substring(0,result.length-2);
  }

  render() {
    let data = [...this.props.comments];
    data.sort((message1,message2)=>{
      if(message1.createdAt>message2.createdAt){
        return 1;
      }
      return -1;
    });
    let comments = [];
    data.map((item)=>{
      if(!item.hasParent){
        comments.push(item);
      }
      else{
        comments.splice(comments.findIndex((comment)=>comment.id===item.parentId),0,item);
      }
    });
    comments=comments.reverse();

    return (
      <div className="animated fadeIn">
        <div className="email-app mb-4" style={{ border: 0 }}>
          <main
            className="inbox"
            style={{ padding: 0, backgroundColor: "#f0f3f5" }}
          >
            <ul className="messages">
              {
                comments.map((comment)=><li className="message"
                  style={{ paddingLeft:5 }}>
                  <div
                    style={comment.hasParent?{paddingLeft:20}:{}}
                    onClick={()=>{
                      if(comment.id===this.state.comment){
                        this.setState({comment:null});
                      } else {
                        this.setState({comment:comment.id});
                        }
                      }}>
                    <div className="header">
                      <img src={comment.avatar?comment.avatar:'img/avatars/none.jpg'} className="img-avatar" alt={comment.createdBy.email} style={{height:30,marginRight:10}}/>


                      <span className="from">
                        {!comment.hasParent&&!comment.email && comment.createdBy.name+' '+comment.createdBy.surname+' wrote comment'}
                        {!comment.hasParent&&comment.email && comment.createdBy.name+' '+comment.createdBy.surname+' send email to:'+this.stringifyArray(comment.email_to)}
                        {comment.hasParent&&!comment.email && comment.createdBy.name+' '+comment.createdBy.surname+' responded to post '+ timestampToString((comments[comments.findIndex((i1)=>i1.id===comment.parentId)]).createdAt)+" made by "+comments[comments.findIndex((i1)=>i1.id===comment.parentId)].createdBy.email}
                        {comment.hasParent&&comment.email && comment.createdBy.name+' '+comment.createdBy.surname+' responded by email to:'+this.stringifyArray(comment.email_to)}
                      </span>
                      <span className="date">
                        <span className="fa fa-paper-clip" /><span style={{backgroundColor:'yellow'}}>{comment.internal?" internal":""}</span> {timestampToString(comment.createdAt)}
                      </span>
                    </div>

                    { comment.email && <div className="title">
                        <span style={{fontWeight:'bold'}}>Predmet:</span> {comment.title}
                      </div>
                    }
                    <div className="description" style={{display:'flex',paddingLeft:23}}>
                      <div className="actions" style={{marginTop:'auto',marginBottom:'auto'}}>
                        <span className="action">
                          <i style={comment.hasParent?{paddingLeft:20}:{}} className={comment.hasParent?"fa fa-mail-forward":(comment.email?"fa fa-envelope-o":"fa fa-comment")} />
                        </span>
                      </div>
                      {comment.body}
                    </div>
                  </div>
                    {
                      comment.id===this.state.comment && <AddComment taskID={this.props.taskID} emails={comment.email_to} commentID={comment.id} />
                    }
                </li>
              )}
            {/*
              <li
                className="message"
                style={{ borderTop: "1px solid #c2cfd6", paddingLeft:5 }}
              >
                  <div className="header">
                    <img src={'img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" style={{height:35,marginRight:10}} onClick={(e)=>e.preventDefault()}/>
                    <span className="from">Lukasz Holeczek wrote comment</span>
                    <span className="date">
                      <span className="fa fa-paper-clip" /> Today, 3:47 PM
                    </span>
                  </div>
                  <div className="description" style={{display:'flex',paddingLeft:23}}>
                    <div className="actions" style={{marginTop:'auto',marginBottom:'auto'}}>
                      <span className="action">
                        <i className="fa fa-comment" />
                      </span>
                    </div>

                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </div>
              </li>
              <li className="message"
                style={{ paddingLeft:5 }}>
                  <div className="header">
                    <img src={'img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" style={{height:30,marginRight:10}} onClick={(e)=>e.preventDefault()}/>
                    <span className="from">
                      Lukasz Holeczek send email to:susta@lansystems.sk
                    </span>
                    <span className="date">
                      <span className="fa fa-paper-clip" /> Today, 3:47 PM
                    </span>
                  </div>
                  <div className="title">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </div>
                  <div className="description" style={{display:'flex',paddingLeft:23}}>
                    <div className="actions" style={{marginTop:'auto',marginBottom:'auto'}}>
                      <span className="action">
                        <i className="fa fa-mail-forward" />
                      </span>
                    </div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </div>
              </li>
              <li className="message" style={{ paddingLeft:5 }}>
                  <div className="header">
                    <img src={'img/avatars/none.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" style={{height:25,marginRight:10}} onClick={(e)=>e.preventDefault()}/>
                    <span className="from">
                      email from branislav.susta@gmail.com
                    </span>
                    <span className="date">Today, 3:47 PM</span>
                  </div>
                  <div className="title">Lorem ipsum dolor sit amet.</div>
                    <div className="description" style={{display:'flex',paddingLeft:23}}>
                      <div className="actions" style={{marginTop:'auto',marginBottom:'auto'}}>
                        <span className="action">
                          <i className="fa fa-envelope-o" />
                        </span>
                      </div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </div>
              </li>*/}
            </ul>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({commentsReducer, login }) => {
  const {comments } = commentsReducer;
  const {token} = login;
  return {comments, token};
};


export default connect(mapStateToProps, {})(Comments);
