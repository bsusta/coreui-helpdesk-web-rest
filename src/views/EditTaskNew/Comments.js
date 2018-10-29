import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import { connect } from "react-redux";

import AddComment from "./AddComment";
import { removeAllCommentFiles } from "../../redux/actions";
import { timestampToString } from "../../helperFunctions";
import i18n from 'i18next';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: null,
      newBody:'',
    };
  }

  stringifyArray(array) {
    let result = "";
    if (array.length === 0) {
      return "";
    }
    array.map(item => (result = result + item + ", "));
    return result.substring(0, result.length - 2);
  }

  getDisplayUsername(user){
    let name="";
    if(user.name){
      name += user.name+" ";
    }
    if(user.surname){
      name += user.surname+" ";
    }
    if(name.length===0){
      name = user.email
    }
    else{
      name+="("+user.email+")"
    }
    name+=" ";
    return name;
  }

  render() {
    let comments = [...this.props.comments];
    comments.sort((message1, message2) => {
      if (message1.createdAt > message2.createdAt) {
        return 1;
      }
      return -1;
    });
    comments = comments.reverse();

    if(comments.length===0&& this.props.disabled){
      return(
        <label style={{ fontWeight: 'bold',padding:4.8}}>{i18n.t('comments')+ ' - '+i18n.t('none2')}</label>
      )
    }

    return (
      <div>
        {
          this.props.disabled &&           
          <label style={{ fontWeight: 'bold',padding:4.8}}>{i18n.t('comments')}</label>
        }
        <div
        >
          {!this.props.disabled && <AddComment
            taskID={this.props.taskID}
            displayAttachments={true}
            body={this.state.newBody}
            commentParent={this.state.comment}
          />}
        </div>
        <div className="animated fadeIn">
          <div className="email-app mb-4" style={{ border: 0 }}>
            <main
              className="inbox card-background"
              style={{ padding: 0 }}
            >
              <ul className="messages">
                {comments.map(comment => (
                  <li className="message" key={comment.id} style={{ paddingLeft: 5 }}>
                    <div>
                      <div className="header">
                        <img
                          src={
                            comment.url
                              ? comment.url
                              : "img/avatars/none.jpg"
                          }
                          className="img-avatar"
                          alt={comment.createdBy.email}
                          style={{ height: 30, marginRight: 10 }}
                        />
                        <span className="from">
                          {!comment.hasParent &&
                            !comment.email &&<span><span className="fontBold">{this.getDisplayUsername(comment.createdBy)}</span>{i18n.t('wroteComment')}</span>}
                          {!comment.hasParent &&
                            comment.email &&<span><span className="fontBold">{this.getDisplayUsername(comment.createdBy)}</span>{i18n.t('sentEmailTo')+": " +
                              this.stringifyArray(comment.email_to)}</span>}
                          {comment.hasParent &&
                            !comment.email &&
                            <span><span className="fontBold">{this.getDisplayUsername(comment.createdBy)}</span>{i18n.t('respondedToComment')+" " +
                              timestampToString(
                                comments[
                                  comments.findIndex(
                                    i1 => i1.id === comment.parentId
                                  )
                                ].createdAt
                              ) +
                              " "+i18n.t('madeBy')+" " +
                              this.getDisplayUsername(comments[
                                comments.findIndex(
                                  i1 => i1.id === comment.parentId
                                )
                              ].createdBy)
                              }</span>}
                          {comment.hasParent &&
                            comment.email &&<span><span className="fontBold">{this.getDisplayUsername(comment.createdBy)}</span>{i18n.t('respondedByEmailTo')+":" +
                              this.stringifyArray(comment.email_to)}</span>}
                        </span>
                        <span className="date">
                          <span className="fa fa-paper-clip" />
                          <span style={{ backgroundColor: "yellow" }}>
                            {comment.internal ? (" "+i18n.t('internal')) : ""}
                          </span>{" "}
                        <span>{timestampToString(comment.createdAt)}
                        <div><span style={{float:'right'}}>
                          {!this.props.disabled && <button
                            onClick={()=>{this.setState({newBody:"\n\n------Original Message------\n" + comment.body, comment:comment.id})}}
                            className="btn btn-sm btn-primary float-right blueButton"
                          >
                            {i18n.t('reply')}
                          </button>}
                        </span></div>
                        </span>
                      </span>
                      </div>

                      {comment.email && (
                        <div className="title">
                          <span style={{ fontWeight: "bold" }}>{i18n.t('subject')}:</span>{" "}
                          {comment.title}
                        </div>
                      )}
                      <div
                        className="description"
                        style={{
                          display: "flex",
                          paddingLeft: 23,
                          whiteSpace: "pre-line"
                        }}
                      >
                        <div
                          className="actions"
                          style={{ marginTop: "auto", marginBottom: "auto" }}
                        >
                          <span className="action">
                            <i
                              className={
                                comment.hasParent
                                  ? "fa fa-mail-forward"
                                  : comment.email
                                    ? "fa fa-envelope-o"
                                    : "fa fa-comment"
                              }
                            />
                          </span>
                        </div>
                        {comment.body}
                      </div>
                    </div>
                    <div>
                      {
                        comment.commentHasAttachments.length>0 && <i className="fa fa-paperclip" style={{color:'black', paddingRight:5}} />
                      }
                      {
                        comment.commentHasAttachments.map(attachment=> attachment.url?(<a className="badge mr-1" key={attachment.url} style={{borderRadius: '3px',border: '1px solid #000'}} href={attachment.url}>{attachment.name}</a>):(<span className="badge mr-1" key={attachment.name} style={{borderRadius: '3px',border: '1px solid #000'}}>{attachment.name}</span>)
                    )
                  }
                  </div>
                  </li>
                ))}
              </ul>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ commentsReducer, login }) => {
  const { comments } = commentsReducer;
  const { token } = login;
  return { comments, token };
};

export default connect(mapStateToProps, { removeAllCommentFiles })(Comments);
