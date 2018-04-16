import React, { Component } from "react";
import { connect } from "react-redux";
import { editSMTP } from "../../../redux/actions";
import {isEmail} from "../../../helperFunctions";

class SMTPEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.SMTP.email ? this.props.SMTP.email : "",
      host: this.props.SMTP.host ? this.props.SMTP.host : "",
      name: this.props.SMTP.name ? this.props.SMTP.name : "",
      password: this.props.SMTP.password ? this.props.SMTP.password : "",
      port: this.props.SMTP.port ? this.props.SMTP.port : "",
      ssl: this.props.SMTP.ssl ? this.props.SMTP.ssl : false,
      tls: this.props.SMTP.tls ? this.props.SMTP.tls : false,
      submitError:false
    };
  }
  submit(e) {
    e.preventDefault();
    this.setState({submitError:true});
    let body={
      email: this.state.email,
      host: this.state.host,
      name: this.state.name,
      password: this.state.password,
      port: parseInt(this.state.port),
      ssl: this.state.ssl,
      tls: this.state.tls
    }
    if(!isEmail(body.email)||
    body.email===''||
    body.host===''||
    body.name===''||
    body.password===''||
    isNaN(body.port)){
      return;
    }
    this.props.editSMTP(
      body,
      this.props.SMTP.id,
      this.props.token
    );
    this.props.history.goBack();
  }
  render() {
    return (
      <div class="card">
        <h4 class="card-header">Edit SMTP</h4>
        <div class="card-body">
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
          >
            <div class="form-group">
              <label for="email">*E-mail</label>
              <input
                class="form-control"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                id="email"
                type="email"
                placeholder="Enter email"
              />
            </div>
            { this.state.email!==''&&!isEmail(this.state.email)&&<label for="email" style={{color:'red'}}>Your e-mail address is not valid</label>}
            {this.state.submitError && this.state.email===''&&<label for="email" style={{color:'red'}}>You must enter e-mail address</label>}

            <div class="form-group">
              <label for="server">*Server IP</label>
              <input
                class="form-control"
                id="server"
                value={this.state.host}
                onChange={e => this.setState({ host: e.target.value })}
                placeholder="Enter server"
              />
            </div>
            {this.state.submitError && this.state.host===''&&<label for="server" style={{color:'red'}}>You must enter host IP address</label>}
            <div class="form-group">
              <label for="port">*Port</label>
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
            {this.state.submitError && this.state.port===''&&<label for="port" style={{color:'red'}}>You must enter port number</label>}

            <div class="form-group">
              <label for="login">*Login</label>
              <input
                class="form-control"
                id="login"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                placeholder="Enter login"
              />
            {this.state.submitError && this.state.name===''&&<label for="login" style={{color:'red'}}>You must enter login</label>}
            </div>

            <div class="form-group">
              <label for="pass">*Password</label>
              <input
                class="form-control"
                id="pass"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                placeholder="Enter password"
              />
            {this.state.submitError && this.state.password===''&&<label for="password" style={{color:'red'}}>You must enter password</label>}
            </div>

            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  checked={this.state.tls}
                  onChange={() => this.setState({ tls: !this.state.tls })}
                />
                TLS
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
              class="btn btn-primary"
              onClick={this.submit.bind(this)}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ SMTPsReducer, login }) => {
  const { SMTP } = SMTPsReducer;
  const { token } = login;
  return { SMTP, token };
};

export default connect(mapStateToProps, { editSMTP })(SMTPEdit);
