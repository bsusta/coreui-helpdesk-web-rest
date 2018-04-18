import React, { Component } from "react";
import { connect } from "react-redux";
import { addImap } from "../../../redux/actions";
import {isEmail} from '../../../helperFunctions';


class ImapAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inbox_email: "",
      move_email: "",
      host: "",
      port: "",
      name: "",
      password: "",
      description: "",
      project: this.props.projects.length>0?this.props.projects[0].id:null,
      ignore_certificate: false,
      ssl: false,
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
    this.props.addImap(
      body,
      this.state.project,
      this.props.token
    );
    this.props.history.goBack();
  }
  render() {
    //PROJECT,host, port, name, password, inbox_email, move_email, ssl, ignore_certificate
    return (
      <div className="card">
        <h4 className="card-header">Add IMap</h4>
        <div className="card-body">
          {this.state.project===null&&<h5 className="card-header" style={{color:'red'}}>You can't edit IMaps without having any projects!</h5>}
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
            >
            <div className="form-group">
              <label htmlFor="inbox_email">Inbox e-mail</label>
              <input
                className="form-control"
                id="inbox_email"
                type="email"
                value={this.state.inbox_email}
                onChange={e => this.setState({ inbox_email: e.target.value })}
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
                onChange={e => this.setState({ move_email: e.target.value })}
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
                onChange={e => this.setState({ host: e.target.value })}
                placeholder="Enter server"
                />
            </div>
            {this.state.submitError && this.state.host===''&&<label htmlFor="server" style={{color:'red'}}>You must enter IP address</label>}

            <div className="form-group">
              <label htmlFor="port">Port</label>
              <input
                className="form-control"
                id="port"
                type="number"
                value={this.state.port}
                onChange={e => this.setState({ port: e.target.value })}
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
                onChange={e => this.setState({ name: e.target.value })}
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
                onChange={e => this.setState({ password: e.target.value })}
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
                onChange={e => this.setState({ description: e.target.value })}
                placeholder="Enter description"
                />
            </div>
            <select
              value={this.state.project}
              id="project"
              onChange={value => this.setState({ project: value.target.value })}
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
                  onChange={() =>
                    this.setState({
                      ignore_certificate: !this.state.ignore_certificate
                    })
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
                  onChange={() => this.setState({ ssl: !this.state.ssl })}
                  />
                SSL
              </label>
            </div>
            <div className="form-group">
              <button
                disabled={this.state.project===null}
                type="submit"
                className="btn btn-secondary">
                Test connection
              </button>
              <button
                disabled={this.state.project===null}
                type="submit"
                className="btn btn-primary"
                onClick={this.submit.bind(this)}
                >
                Submit
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

const mapStateToProps = ({ projectsReducer, login }) => {
  const { projects } = projectsReducer;
  const { token } = login;
  return { token, projects };
};

export default connect(mapStateToProps, { addImap })(ImapAdd);
