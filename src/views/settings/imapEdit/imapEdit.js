import React, { Component } from "react";
import { connect } from "react-redux";
import { editImap, deleteImap } from "../../../redux/actions";
import {isEmail, isIP} from "../../../helperFunctions";

class ImapEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_active: this.props.imap.is_active ? true : false,
      description: this.props.imap.description
        ? this.props.imap.description
        : "",
      inbox_email: this.props.imap.inbox_email
        ? this.props.imap.inbox_email
        : "",
      move_email: this.props.imap.move_email ? this.props.imap.move_email : "",
      host: this.props.imap.host ? this.props.imap.host : "",
      port: this.props.imap.port ? this.props.imap.port : "",
      name: this.props.imap.name ? this.props.imap.name : "",
      password: this.props.imap.password ? this.props.imap.password : "",
      project: this.props.imap.project
        ? this.props.imap.project.id
        : (this.props.projects.length>0?this.props.projects[0].id:null),
      ignore_certificate: this.props.imap.ignore_certificate
        ? this.props.imap.ignore_certificate
        : false,
      ssl: this.props.imap.ssl ? this.props.imap.ssl : false,
      submitError:false
    };
  }

  submit(e) {
    e.preventDefault();
    this.setState({submitError:true});
    let body={
      inbox_email: this.state.inbox_email,
      move_email: this.state.move_email,
      host: this.state.host,
      port: parseInt(this.state.port),
      name: this.state.name,
      password: this.state.password,
      ignore_certificate: this.state.ignore_certificate,
      description: this.state.description === "" ? "null" : this.state.description,
      ssl: this.state.ssl
    }
    if(body.inbox_email===''||
      body.move_email===''||
      body.host===''||
      body.name===''||
      body.password===''||
      !isEmail(body.inbox_email)||
      !isEmail(body.move_email)||
      isNaN(body.port)){
      return
    }
    this.props.editImap(
      body,
      this.state.project,
      this.props.imap.id,
      this.state.is_active,
      this.props.token
    );
    this.props.history.goBack();
  }

  delete(e) {
    e.preventDefault();
    if (confirm("Are you sure you wish to delete this imap?")) {
      this.props.deleteImap(this.props.imap.id, this.props.token);
    } else {
      return;
    }
    this.props.history.goBack();
  }

  render() {
    return (
      <div class="card">
        <h4 class="card-header">Edit IMap</h4>
        <div class="card-body">
          {this.state.project===null&&<h5 class="card-header" style={{color:'red'}}>You can't edit IMaps without having any projects!</h5>}
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
          >
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  checked={this.state.is_active}
                  onChange={() =>
                    this.setState({ is_active: !this.state.is_active })
                  }
                />
                Active
              </label>
            </div>

            <div class="form-group">
              <label for="inbox_email">Inbox e-mail</label>
              <input
                class="form-control"
                id="inbox_email"
                type="email"
                value={this.state.inbox_email}
                onChange={e => this.setState({ inbox_email: e.target.value })}
                placeholder="Enter inbox email"
              />
            </div>
            { this.state.inbox_email!==''&&!isEmail(this.state.inbox_email)&&<label for="inbox_email" style={{color:'red'}}>Entered e-mail address is not valid</label>}
            { this.state.submitError && this.state.inbox_email===''&&<label for="inbox_email" style={{color:'red'}}>You must enter e-mail address</label>}

            <div class="form-group">
              <label for="move_email">Move e-mail</label>
              <input
                class="form-control"
                id="move_email"
                type="email"
                value={this.state.move_email}
                onChange={e => this.setState({ move_email: e.target.value })}
                placeholder="Enter move email"
              />
            </div>
            { this.state.move_email!==''&&!isEmail(this.state.move_email)&&<label for="move_email" style={{color:'red'}}>Entered e-mail address is not valid</label>}
            { this.state.submitError && this.state.move_email===''&&<label for="move_email" style={{color:'red'}}>You must enter e-mail address</label>}

            <div class="form-group">
              <label for="server">Server IP</label>
              <input
                class="form-control"
                id="server"
                value={this.state.host}
                onChange={e => this.setState({ host: e.target.value })}
                placeholder="Enter server"
              />
            </div>
            { this.state.submitError && this.state.host===''&&<label for="server" style={{color:'red'}}>You must enter IP address</label>}

            <div class="form-group">
              <label for="port">Port</label>
              <input
                class="form-control"
                id="port"
                type="number"
                value={this.state.port}
                onChange={e => this.setState({ port: e.target.value })}
                placeholder="Enter port number"
              />
            </div>
            { this.state.port!==''&&isNaN(parseInt(this.state.port))&&<label for="port" style={{color:'red'}}>Your port number is not valid</label>}
            { this.state.submitError && this.state.port===''&&<label for="port" style={{color:'red'}}>You must enter port number</label>}

            <div class="form-group">
              <label for="log">Login</label>
              <input
                class="form-control"
                id="log"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                placeholder="Enter login"
              />
            </div>
            {this.state.submitError && this.state.name===''&&<label for="log" style={{color:'red'}}>You must enter login</label>}

            <div class="form-group">
              <label for="pass">Password</label>
              <input
                class="form-control"
                id="pass"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                placeholder="Enter password"
              />
            </div>
            {this.state.submitError && this.state.password===''&&<label for="pass" style={{color:'red'}}>You must enter password</label>}

            <div class="form-group">
              <label for="descr">Description</label>
              <textarea
                class="form-control"
                id="descr"
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
                placeholder="Enter description"
              />
            </div>
            <select
              value={this.state.project}
              id="project"
              onChange={value => this.setState({ project: value.target.value })}
              class="form-control"
            >
              {this.props.projects.map(opt => (
                <option key={opt.id} value={opt.id}>
                  {opt.title}
                </option>
              ))}
            </select>

            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  checked={this.state.ignore_certificate}
                  onChange={() =>
                    this.setState({
                      ignore_certificate: !this.state.ignore_certificate
                    })
                  }
                />
                Ignore certificate
              </label>
            </div>

            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  checked={this.state.ssl}
                  onChange={() => this.setState({ ssl: !this.state.ssl })}
                />
                SSL
              </label>
            </div>

            <button
              type="submit"
              disabled={this.state.project===null}
              class="btn btn-secondary">
              Test connection
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              disabled={this.state.project===null}
              onClick={this.submit.bind(this)}
            >
              Submit
            </button>
            <button
              type="delete"
              class="btn btn-danger"
              onClick={this.delete.bind(this)}
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ imapsReducer, login, projectsReducer }) => {
  const { imap } = imapsReducer;
  const { projects } = projectsReducer;
  const { token } = login;
  return { imap, token, projects };
};

export default connect(mapStateToProps, { editImap, deleteImap })(ImapEdit);
