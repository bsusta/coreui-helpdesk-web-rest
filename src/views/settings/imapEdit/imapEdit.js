import React, { Component } from "react";
import { connect } from "react-redux";
import { editImap, deleteImap } from "../../../redux/actions";
import {isEmail, isIP,areObjectsSame} from "../../../helperFunctions";

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
      port: this.props.imap.port ? this.props.imap.port.toString() : "",
      name: this.props.imap.name ? this.props.imap.name : "",
      password: this.props.imap.password ? this.props.imap.password : "",
      project: this.props.imap.project
        ? this.props.imap.project.id.toString()
        : (this.props.projects.length>0?this.props.projects[0].id:null),
      ignore_certificate: this.props.imap.ignore_certificate
        ? this.props.imap.ignore_certificate
        : false,
      ssl: this.props.imap.ssl ? this.props.imap.ssl : false,
      submitError:false,
      changed:false
    };
    this.compareChanges.bind(this);
  }

  compareChanges(change,val){
    var newState = {...this.state};
    newState[change]=val;
    newState.changed=undefined;
    newState.submitError=undefined;

    var originalState = {
      is_active: this.props.imap.is_active ? true : false,
      description: this.props.imap.description
        ? this.props.imap.description
        : "",
      inbox_email: this.props.imap.inbox_email
        ? this.props.imap.inbox_email
        : "",
      move_email: this.props.imap.move_email ? this.props.imap.move_email : "",
      host: this.props.imap.host ? this.props.imap.host : "",
      port: this.props.imap.port ? this.props.imap.port.toString() : "",
      name: this.props.imap.name ? this.props.imap.name : "",
      password: this.props.imap.password ? this.props.imap.password : "",
      project: this.props.imap.project
        ? this.props.imap.project.id.toString()
        : (this.props.projects.length>0?this.props.projects[0].id:null),
      ignore_certificate: this.props.imap.ignore_certificate
        ? this.props.imap.ignore_certificate
        : false,
      ssl: this.props.imap.ssl ? this.props.imap.ssl : false
    }
    this.setState({changed:!areObjectsSame(newState,originalState)})
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
      <div className="card">
        <h4 className="card-header">Edit IMap</h4>
        <div className="card-body" style={{border:this.state.changed?'1px solid red':null}}>
          {this.state.project===null&&<h5 className="card-header" style={{color:'red'}}>You can't edit IMaps without having any projects!</h5>}
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
          >
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={this.state.is_active}
                  onChange={target =>{
                    this.compareChanges('is_active', !this.state.is_active);
                    this.setState({ is_active: !this.state.is_active })}
                  }
                />
                Active
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="inbox_email">Inbox e-mail</label>
              <input
                className="form-control"
                id="inbox_email"
                type="email"
                value={this.state.inbox_email}
                onChange={target =>{
                  this.compareChanges('inbox_email', target.target.value);
                  this.setState({ inbox_email: target.target.value })}
                }
                placeholder="Enter inbox email"
              />
            </div>
            { this.state.inbox_email!==''&&!isEmail(this.state.inbox_email)&&<label htmlFor="inbox_email" style={{color:'red'}}>Entered e-mail address is not valid</label>}
            { this.state.submitError && this.state.inbox_email===''&&<label htmlFor="inbox_email" style={{color:'red'}}>You must enter e-mail address</label>}

            <div className="form-group">
              <label htmlFor="move_email">Move e-mail</label>
              <input
                className="form-control"
                id="move_email"
                type="email"
                value={this.state.move_email}
                onChange={target =>{
                  this.compareChanges('move_email', target.target.value);
                  this.setState({ move_email: target.target.value })}
                }
                placeholder="Enter move email"
              />
            </div>
            { this.state.move_email!==''&&!isEmail(this.state.move_email)&&<label htmlFor="move_email" style={{color:'red'}}>Entered e-mail address is not valid</label>}
            { this.state.submitError && this.state.move_email===''&&<label htmlFor="move_email" style={{color:'red'}}>You must enter e-mail address</label>}

            <div className="form-group">
              <label htmlFor="server">Server IP</label>
              <input
                className="form-control"
                id="server"
                value={this.state.host}
                onChange={target =>{
                  this.compareChanges('host', target.target.value);
                  this.setState({ host: target.target.value })}
                }
                placeholder="Enter server"
              />
            </div>
            { this.state.submitError && this.state.host===''&&<label htmlFor="server" style={{color:'red'}}>You must enter IP address</label>}

            <div className="form-group">
              <label htmlFor="port">Port</label>
              <input
                className="form-control"
                id="port"
                type="number"
                value={this.state.port}
                onChange={target =>{
                  this.compareChanges('port', target.target.value);
                  this.setState({ port: target.target.value })}
                }
                placeholder="Enter port number"
              />
            </div>
            { this.state.port!==''&&isNaN(parseInt(this.state.port))&&<label htmlFor="port" style={{color:'red'}}>Your port number is not valid</label>}
            { this.state.submitError && this.state.port===''&&<label htmlFor="port" style={{color:'red'}}>You must enter port number</label>}

            <div className="form-group">
              <label htmlFor="log">Login</label>
              <input
                className="form-control"
                id="log"
                value={this.state.name}
                onChange={target =>{
                  this.compareChanges('name', target.target.value);
                  this.setState({ name: target.target.value })}
                }
                placeholder="Enter login"
              />
            </div>
            {this.state.submitError && this.state.name===''&&<label htmlFor="log" style={{color:'red'}}>You must enter login</label>}

            <div className="form-group">
              <label htmlFor="pass">Password</label>
              <input
                className="form-control"
                id="pass"
                value={this.state.password}
                onChange={target =>{
                  this.compareChanges('password', target.target.value);
                  this.setState({ password: target.target.value })}
                }
                placeholder="Enter password"
              />
            </div>
            {this.state.submitError && this.state.password===''&&<label htmlFor="pass" style={{color:'red'}}>You must enter password</label>}

            <div className="form-group">
              <label htmlFor="descr">Description</label>
              <textarea
                className="form-control"
                id="descr"
                value={this.state.description}
                onChange={target =>{
                  this.compareChanges('description', target.target.value);
                  this.setState({ description: target.target.value })}
                }
                placeholder="Enter description"
              />
            </div>
            <select
              value={this.state.project}
              id="project"
              onChange={target =>{
                this.compareChanges('project', target.target.value);
                this.setState({ project: target.target.value })}
              }
              className="form-control"
            >
              {this.props.projects.map(opt => (
                <option key={opt.id} value={opt.id}>
                  {opt.title}
                </option>
              ))}
            </select>

            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={this.state.ignore_certificate}
                  onChange={target =>{
                    this.compareChanges('ignore_certificate', !this.state.ignore_certificate);
                    this.setState({ ignore_certificate: !this.state.ignore_certificate })}
                  }
                />
                Ignore certificate
              </label>
            </div>

            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={this.state.ssl}
                  onChange={target =>{
                    this.compareChanges('ssl', !this.state.ssl);
                    this.setState({ ssl: !this.state.ssl })}
                  }
                />
                SSL
              </label>
            </div>
            <div className="form-group">
              <button
                type="submit"
                disabled={this.state.project===null}
                className="btn btn-secondary">
                Test connection
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={this.state.project===null}
                onClick={this.submit.bind(this)}
                >
                Submit
              </button>
              <button
                type="delete"
                className="btn btn-danger"
                onClick={this.delete.bind(this)}
                >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => this.props.history.goBack()}
                >
                Cancel
              </button>
            </div>
            
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
