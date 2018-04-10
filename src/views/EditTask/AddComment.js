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
import {
  addComment,
  addCommentsComment,
  uploadCommentFile,
  removeCommentFile,
  removeAllCommentFiles
} from "../../redux/actions";
{
}
class AddComment extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      message: this.props.message
        ? "\n\n------Original Message------\n" + this.props.message
        : "",
      to: this.props.emails ? this.props.emails : [],
      newTo: "",
      cc: [],
      newCC: "",
      bcc: [],
      newBCC: "",
      subject: "",
      internal: false
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
    return JSON.stringify(this.props.commentAttachements.map(attachement => attachement.id));
  }

  stringifyArray(array) {
    let result = "";
    if (array.length === 0) {
      return "";
    }
    array.map(item => (result = result + item + ", "));
    return result.substring(0, result.length - 2);
  }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Add Comment
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Add Email
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent
          style={{
            borderLeft: 0,
            borderRight: 0,
            borderBottom: 0,
            backgroundColor: "white"
          }}
          activeTab={this.state.activeTab}
        >
          <TabPane tabId="1" style={{ paddingLeft: 0, paddingRight: 0 }}>
            <div class="form-group">
              <textarea
                class="form-control"
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
                    ? "addAttachement" + this.props.commentID
                    : "addAttachement"
                }
                style={{ display: "none" }}
                onChange={e => {
                  let file = e.target.files[0];
                  this.props.uploadCommentFile(file, this.props.token);
                }}
              />
              <label
                className="text-info"
                size="sm"
                htmlFor={
                  this.props.commentID
                    ? "addAttachement" + this.props.commentID
                    : "addAttachement"
                }
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                <i className="fa fa-paperclip" />&nbsp;Add atachments
              </label>
              <Label
                check
                htmlFor={
                  this.props.commentID
                    ? "internal" + this.props.commentID
                    : "internal"
                }
                style={{ marginLeft: 5 }}
                className="align-middle"
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
                Internal note
              </Label>
              <button
                className="btn btn-sm btn-success mr-2 ml-2 float-right"
                onClick={() => {
                  if (this.props.commentID) {
                    this.props.addCommentsComment(
                      {
                        body: this.state.message,
                        internal: this.state.internal,
                        title: "Comment",
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
                        title: "Comment",
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
                className="btn btn-sm btn-danger float-right"
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
                Discard
              </button>
            </div>

            <div
              class="form-group"
              style={{
                display: this.props.displayAttachements ? "block" : "none"
              }}
            >
              <div style={{ paddingTop: 5, paddingRight: 10 }}>
                {this.props.commentAttachements.map(item => (
                  <span
                    class="badge"
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
                        class="close center-block text-center m-*-auto"
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
              backgroundColor: "white"
            }}
          >
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="to">To:</Label>
              </Col>
              <Col xs="12" md="10">
                <div>
                  {this.stringifyArray(this.state.to)}
                  {this.state.to.length !== 0 && (
                    <button
                      className="btn btn-sm btn-danger mr-1"
                      style={{ padding: 0, marginLeft: 5, marginBottom: 2 }}
                      onClick={() => this.setState({ to: [] })}
                    >
                      clear
                    </button>
                  )}
                </div>
                <table>
                  <tbody>
                    <tr>
                      <td style={{ borderTop: "0px", width: "100%" }}>
                        <Input
                          type="text"
                          id="to"
                          value={this.state.newTo}
                          onChange={e =>
                            this.setState({ newTo: e.target.value })
                          }
                        />
                      </td>
                      <td
                        style={{
                          width: "40px",
                          borderTop: "0px",
                          textAlign: "right"
                        }}
                      >
                        <button
                          style={{ float: "right" }}
                          className="btn btn-sm btn-primary mr-1"
                          onClick={() =>
                            this.setState({
                              newTo: "",
                              to: [...this.state.to, this.state.newTo]
                            })
                          }
                        >
                          <i className="fa fa-plus " />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                      className="btn btn-sm btn-danger mr-1"
                      style={{ padding: 0, marginLeft: 5, marginBottom: 2 }}
                      onClick={() => this.setState({ cc: [] })}
                    >
                      clear
                    </button>
                  )}
                </div>
                <table>
                  <tbody>
                    <tr>
                      <td style={{ borderTop: "0px", width: "100%" }}>
                        <Input
                          type="text"
                          id="cc"
                          value={this.state.newCC}
                          onChange={e =>
                            this.setState({ newCC: e.target.value })
                          }
                        />
                      </td>
                      <td
                        style={{
                          width: "40px",
                          borderTop: "0px",
                          textAlign: "right"
                        }}
                      >
                        <button
                          style={{ float: "right" }}
                          className="btn btn-sm btn-primary mr-1"
                          onClick={() =>
                            this.setState({
                              newCC: "",
                              cc: [...this.state.cc, this.state.newCC]
                            })
                          }
                        >
                          <i className="fa fa-plus " />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                      className="btn btn-sm btn-danger mr-1"
                      style={{ padding: 0, marginLeft: 5, marginBottom: 2 }}
                      onClick={() => this.setState({ bcc: [] })}
                    >
                      clear
                    </button>
                  )}
                </div>
                <table>
                  <tbody>
                    <tr>
                      <td style={{ borderTop: "0px", width: "100%" }}>
                        <Input
                          type="text"
                          id="bcc"
                          value={this.state.newBCC}
                          onChange={e =>
                            this.setState({ newBCC: e.target.value })
                          }
                        />
                      </td>
                      <td
                        style={{
                          width: "40px",
                          borderTop: "0px",
                          textAlign: "right"
                        }}
                      >
                        <button
                          style={{ float: "right" }}
                          className="btn btn-sm btn-primary mr-1"
                          onClick={() =>
                            this.setState({
                              newBCC: "",
                              bcc: [...this.state.bcc, this.state.newBCC]
                            })
                          }
                        >
                          <i className="fa fa-plus " />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="2">
                <Label htmlFor="subject">Predmet:</Label>
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
            <div class="form-group">
              <textarea
                class="form-control"
                id="message"
                value={this.state.message}
                onChange={e => this.setState({ message: e.target.value })}
                placeholder="Write message here"
              />
            </div>
            <div className="form-group">
              <Button color="link" size="sm">
                <i className="fa fa-paperclip" />&nbsp;Add attachments
              </Button>
              <Label
                check
                htmlFor={
                  this.props.commentID
                    ? "internal" + this.props.commentID
                    : "internal"
                }
                className="align-middle"
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
                Internal note
              </Label>
              <button
                type="submit"
                className="btn btn-sm btn-success mr-2 ml-2 float-right"
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
                    internal: false
                  })
                }
                className="btn btn-sm btn-danger float-right"
              >
                Discard
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
  commentAttachementsReducer
}) => {
  const { users } = usersReducer;
  const { commentAttachements } = commentAttachementsReducer;
  const { token } = login;
  return { token, users, commentAttachements };
};

export default connect(mapStateToProps, {
  addComment,
  addCommentsComment,
  uploadCommentFile,
  removeCommentFile,
  removeAllCommentFiles
})(AddComment);
