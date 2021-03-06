import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Badge,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton
} from "reactstrap";
import classnames from "classnames";
import { connect } from "react-redux";
import colors from '../../../scss/colors';
import {
  addComment,
  addCommentsComment,
  uploadCommentFile,
  removeCommentFile,
  removeAllCommentFiles
} from "../../redux/actions";
import i18n from 'i18next';

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      message: this.props.body,
      to: this.props.emails ? this.props.emails : [],
      newTo: "",
      cc: [],
      newCC: "",
      bcc: [],
      newBCC: "",
      subject: "",
      internal: false,
      id:this.props.commentParent,
      displayUploadError:false
    };
    this.getSlug.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  getSlug() {
    return JSON.stringify(this.props.commentAttachments.map(attachment => attachment.id));
  }

  stringifyArray(array) {
    let result = "";
    if (array.length === 0) {
      return "";
    }
    array.map(item => (result = result + item + ", "));
    return result.substring(0, result.length - 2);
  }

  componentWillReceiveProps(props){
    if(this.props.body!==props.body){
      this.setState({message:props.body})
    }
    if(this.props.commentParent!==props.commentParent){
      this.setState({id:props.commentParent})
    }
  }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={this.state.activeTab === "1"?"active fontBold":""}
              onClick={() => {
                this.toggle("1");
              }}
            >
              {i18n.t('addComment')}
            </NavLink>
          </NavItem>
          { (this.props.task.loggedUserIsAdmin||this.props.task.loggedUserProjectAcl.includes('resolve_task'))&& this.props.task.loggedUserRoleAcl.includes('sent_emails_from_comments') &&
            <NavItem>
              <NavLink
                className={this.state.activeTab === "2"?"active fontBold":""}
                onClick={() => {
                  this.toggle("2");
                }}
                >
                {i18n.t('addEmail')}
              </NavLink>
            </NavItem>
          }
        </Nav>
        <TabContent
          style={{
            borderLeft: 0,
            borderRight: 0,
            borderBottom: 0,
            }}
          activeTab={this.state.activeTab}
          className="card-background"
        >
          <TabPane tabId="1" style={{ paddingLeft: 0, paddingRight: 0 }}>
            <div className="form-group">
              <textarea
                className="form-control"
                id="message"
                rows="4"
                value={this.state.message}
                onChange={e => this.setState({ message: e.target.value })}
                placeholder="Write message here"
              />
            </div>
            <div className="form-group">
              <input
                type="file"
                id={
                  this.props.commentID
                    ? "addAttachment" + this.props.commentID
                    : "addAttachment"
                }
                style={{ display: "none" }}
                onChange={e => {
                  this.setState({displayUploadError:false});
                  let file = e.target.files[0];
                  if(file.size>10000000){
                    this.setState({displayUploadError:true});
                    return;
                  }
                  this.props.uploadCommentFile(file, this.props.token);
                }}
              />
              <label
                className="text-info comment-text"
                size="sm"
                htmlFor={
                  this.props.commentID
                    ? "addAttachment" + this.props.commentID
                    : "addAttachment"
                }
                style={{ cursor: "pointer", color: colors.textBlue}}
              >
                <i style={{ color: colors.textBlue }} className="fa fa-paperclip" /><span style={{ color: colors.textBlue }}> {i18n.t('addAttachment')} </span>
              </label>
              {(this.props.task.loggedUserIsAdmin||this.props.task.loggedUserProjectAcl.includes('edit_internal_note'))&&<Label
                check
                htmlFor={
                  this.props.commentID
                    ? "internal" + this.props.commentID
                    : "internal"
                }
                style={{ marginLeft: 5 }}
                className="align-middle comment-text"
              >
                <Input
                  type="checkbox"
                  id={
                    this.props.commentID
                      ? "internal" + this.props.commentID
                      : "internal"
                  }
                  checked={this.state.internal}
                  onChange={() =>
                    this.setState({ internal: !this.state.internal })
                  }
                />
                {i18n.t('internal')}
              </Label>}
              <button
                className="btn btn-sm btn-success mr-2 ml-2 float-right greenButton"
                onClick={() => {
                  if (this.props.commentID) {
                    this.props.addCommentsComment(
                      {
                        body: this.state.message,
                        internal: this.state.internal,
                        slug: this.getSlug()
                      },
                      this.props.commentID,
                      this.props.token
                    );
                  } else {
                    this.props.addComment(
                      {
                        body: this.state.message,
                        internal: this.state.internal,
                        slug: this.getSlug()
                      },
                      this.props.taskID,
                      this.props.token
                    );
                  }
                  this.props.removeAllCommentFiles();
                  this.setState({
                    message: this.props.message
                      ? "\n\n------Original Message------\n" +
                        this.props.message
                      : "",
                    to: this.props.emails ? this.props.emails : [],
                    newTo: "",
                    cc: [],
                    newCC: "",
                    bcc: [],
                    newBCC: "",
                    subject: ""
                  });
                }}
              >
                Send
              </button>
              <button
                className="btn btn-sm btn-danger float-right redButton"
                onClick={() =>
                  this.setState({
                    message: "",
                    to: [],
                    newTo: "",
                    cc: [],
                    newCC: "",
                    bcc: [],
                    newBCC: "",
                    subject: "",
                    internal: false
                  })
                }
              >
                {i18n.t('clear')}
              </button>
            </div>

            <div
              className="form-group"
              style={{
                display: this.props.displayAttachments ? "block" : "none"
              }}
            >
            {this.state.displayUploadError && <div style={{color:'red'}}>File is too big!</div>}
              <div style={{ paddingTop: 5, paddingRight: 10 }}>
                {this.props.commentAttachments.map(item => (
                  <span
                    className="badge"
                    style={{
                      backgroundColor: "#d3eef6",
                      color: "black",
                      paddingLeft: 10,
                      paddingRight: 10,
                      paddingTop: 5,
                      paddingBottom: 5,
                      marginLeft: 5,
                      marginTop: 1
                    }}
                  >
                    <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                      {item.file.name}
                    </div>
                    <div style={{ flex: 1 }} />
                    <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                      {item.file.size}kb
                    </div>
                    <div>
                      <button
                        type="button"
                        className="close center-block text-center m-*-auto"
                        style={{ width: "100%" }}
                        aria-label="Close"
                        onClick={() => {
                          this.props.removeCommentFile(
                            item.id,
                            this.props.token
                          );
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            color: "black",
                            marginRight: "auto",
                            marginLeft: "auto",
                            padding: 5
                          }}
                        >
                          &times;
                        </span>
                      </button>
                    </div>
                  </span>
                ))}
              </div>
            </div>
          </TabPane>
          <TabPane
            tabId="2"
            style={{
              paddingLeft: 0,
              paddingRight: 0,
            
            }}
          >
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="to">{i18n.t('to')}:</Label>
              </Col>
              <Col xs="12" md="10">
                <div>
                  {this.stringifyArray(this.state.to)}
                  {this.state.to.length !== 0 && (
                    <button
                      className="btn btn-sm btn-danger mr-1 redButton"
                      style={{ padding: 0, marginLeft: 5, marginBottom: 2 }}
                      onClick={() => this.setState({ to: [] })}
                    >
                      {i18n.t('clear')}
                    </button>
                  )}
                </div>
                <Input
                  onKeyPress={(e)=>{
                    if(e.key==='Enter'){
                      this.setState({
                        newTo: "",
                        to: [...this.state.to, this.state.newTo]
                      });
                  }}}
                  type="text"
                  id="to"
                  value={this.state.newTo}
                  onChange={e =>
                    this.setState({ newTo: e.target.value })
                  }
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="cc">CC:</Label>
              </Col>
              <Col xs="12" md="10">
                <div>
                  {this.stringifyArray(this.state.cc)}
                  {this.state.cc.length !== 0 && (
                    <button
                      className="btn btn-sm btn-danger mr-1 redButton"
                      style={{ padding: 0, marginLeft: 5, marginBottom: 2 }}
                      onClick={() => this.setState({ cc: [] })}
                    >
                      {i18n.t('clear')}
                    </button>
                  )}
                </div>
                  <Input
                    type="text"
                    id="cc"
                    value={this.state.newCC}
                    onKeyPress={(e)=>{
                      if(e.key==='Enter'){
                        this.setState({
                          newCC: "",
                          cc: [...this.state.cc, this.state.newCC]
                        });
                    }}}

                    onChange={e =>
                      this.setState({ newCC: e.target.value })
                    }
                  />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="2">
                <Label htmlFor="bcc">BCC:</Label>
              </Col>
              <Col xs="12" md="10">
                <div>
                  {this.stringifyArray(this.state.bcc)}
                  {this.state.bcc.length !== 0 && (
                    <button
                      className="btn btn-sm btn-danger mr-1 redButton"
                      style={{ padding: 0, marginLeft: 5, marginBottom: 2 }}
                      onClick={() => this.setState({ bcc: [] })}
                    >
                      {i18n.t('clear')}
                    </button>
                  )}
                </div>
                <Input
                  onKeyPress={(e)=>{
                    if(e.key==='Enter'){
                      this.setState({
                        newBCC: "",
                        bcc: [...this.state.bcc, this.state.newBCC]
                      });
                  }}}
                  type="text"
                  id="bcc"
                  value={this.state.newBCC}
                  onChange={e =>
                    this.setState({ newBCC: e.target.value })
                  }
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="2">
                <Label htmlFor="subject">{i18n.t('subject')}:</Label>
              </Col>
              <Col xs="12" md="10">
                <Input
                  type="email"
                  id="subject"
                  value={this.state.subject}
                  onChange={e => this.setState({ subject: e.target.value })}
                />
              </Col>
            </FormGroup>
            <div className="form-group">
              <textarea
                className="form-control"
                id="message"
                value={this.state.message}
                onChange={e => this.setState({ message: e.target.value })}
                placeholder={i18n.t('enterMessage')}
              />
            </div>
            <div className="form-group">
              <label
                className="text-info comment-text"
                size="sm"
                htmlFor={
                  this.props.commentID
                    ? "addAttachment" + this.props.commentID
                    : "addAttachment"
                }
                style={{ cursor: "pointer", color: colors.textBlue}}
              >
                <i style={{ color: colors.textBlue }} className="fa fa-paperclip" /><span style={{ color: colors.textBlue, paddingRight:5 }}> {i18n.t('addAttachment')}</span>
              </label>
              {(this.props.task.loggedUserIsAdmin||this.props.task.loggedUserProjectAcl.includes('edit_internal_note'))&&<Label
                check
                htmlFor={
                  this.props.commentID
                    ? "internal" + this.props.commentID
                    : "internal"
                }
                className="align-middle comment-text"
              >
                <Input
                  type="checkbox"
                  id={
                    this.props.commentID
                      ? "internal" + this.props.commentID
                      : "internal"
                  }
                  checked={this.state.internal}
                  onChange={() =>
                    this.setState({ internal: !this.state.internal })
                  }
                />
                {i18n.t('internal')}
              </Label>}
              <button
                type="submit"
                className="btn btn-sm btn-success mr-2 ml-2 float-right greenButton"
                onClick={() => {
                  if (this.props.commentID) {
                    this.props.addCommentsComment(
                      {
                        title: this.state.subject,
                        body: this.state.message,
                        internal: this.state.internal,
                        email: true,
                        email_to: JSON.stringify(this.state.to),
                        email_cc: JSON.stringify(this.state.cc),
                        email_bcc: JSON.stringify(this.state.bcc),
                        slug: this.getSlug()
                      },
                      this.props.commentID,
                      this.props.token
                    );
                  } else {
                    this.props.addComment(
                      {
                        title: this.state.subject,
                        body: this.state.message,
                        internal: this.state.internal,
                        email: true,
                        email_to: JSON.stringify(this.state.to),
                        email_cc: JSON.stringify(this.state.cc),
                        email_bcc: JSON.stringify(this.state.bcc),
                        slug: this.getSlug()
                      },
                      this.props.taskID,
                      this.props.token
                    );
                  }
                  this.props.removeAllCommentFiles();
                  this.setState({
                    message: this.props.message
                      ? "\n\n------Original Message------\n" +
                        this.props.message
                      : "",
                    to: this.props.emails ? this.props.emails : [],
                    newTo: "",
                    cc: [],
                    newCC: "",
                    bcc: [],
                    newBCC: "",
                    subject: ""
                  });
                }}
              >
                Send
              </button>
              <button
                onClick={() =>
                  this.setState({
                    message: "",
                    to: [],
                    newTo: "",
                    cc: [],
                    newCC: "",
                    bcc: [],
                    newBCC: "",
                    subject: "",
                    internal: false,
                    id: null,
                  })
                }
                className="btn btn-sm btn-danger float-right redButton"
              >
                {i18n.t('clear')}
              </button>
            </div>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

const mapStateToProps = ({
  login,
  usersReducer,
  commentAttachmentsReducer,
  tasksReducer
}) => {
  const { users } = usersReducer;
    const { task } = tasksReducer;
  const { commentAttachments } = commentAttachmentsReducer;
  const { token } = login;
  return { token, users,task, commentAttachments };
};

export default connect(mapStateToProps, {
  addComment,
  addCommentsComment,
  uploadCommentFile,
  removeCommentFile,
  removeAllCommentFiles
})(AddComment);
