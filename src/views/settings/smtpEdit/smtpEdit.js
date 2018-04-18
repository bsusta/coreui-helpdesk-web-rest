import React, { Component } from "react";
import { connect } from "react-redux";
import { editSMTP } from "../../../redux/actions";
import {isEmail} from "../../../helperFunctions";
import { areObjectsSame } from "../../../helperFunctions";

class SMTPEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.SMTP.email ? this.props.SMTP.email : "",
      host: this.props.SMTP.host ? this.props.SMTP.host : "",
      name: this.props.SMTP.name ? this.props.SMTP.name : "",
      password: this.props.SMTP.password ? this.props.SMTP.password : "",
      port: this.props.SMTP.port ? this.props.SMTP.port.toString() : "",
      ssl: this.props.SMTP.ssl ? this.props.SMTP.ssl : false,
      tls: this.props.SMTP.tls ? this.props.SMTP.tls : false,
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
      email: this.props.SMTP.email ? this.props.SMTP.email : "",
      host: this.props.SMTP.host ? this.props.SMTP.host : "",
      name: this.props.SMTP.name ? this.props.SMTP.name : "",
      password: this.props.SMTP.password ? this.props.SMTP.password : "",
      port: this.props.SMTP.port ? this.props.SMTP.port.toString() : "",
      ssl: this.props.SMTP.ssl ? this.props.SMTP.ssl : false,
      tls: this.props.SMTP.tls ? this.props.SMTP.tls : false
    }
    this.setState({changed:!areObjectsSame(newState,originalState)})
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
      <div className="card">
        <h4 className="card-header">Edit SMTP</h4>
        <div className="card-body" style={{border:this.state.changed?'1px solid red':null}}>
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
          >
            <div className="form-group">
              <label htmlFor="email">*E-mail</label>
              <input
                className="form-control"
                value={this.state.email}
                onChange={target =>{
                  this.compareChanges('email', target.target.value);
                  this.setState({ email: target.target.value })}
                }
                id="email"
                type="email"
                placeholder="Enter email"
              />
            </div>
            { this.state.email!==''&&!isEmail(this.state.email)&&<label htmlFor="email" style={{color:'red'}}>Your e-mail address is not valid</label>}
            {this.state.submitError && this.state.email===''&&<label htmlFor="email" style={{color:'red'}}>You must enter e-mail address</label>}

            <div className="form-group">
              <label htmlFor="server">*Server IP</label>
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
            {this.state.submitError && this.state.host===''&&<label htmlFor="server" style={{color:'red'}}>You must enter host IP address</label>}
            <div className="form-group">
              <label htmlFor="port">*Port</label>
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
            {this.state.submitError && this.state.port===''&&<label htmlFor="port" style={{color:'red'}}>You must enter port number</label>}

            <div className="form-group">
              <label htmlFor="login">*Login</label>
              <input
                className="form-control"
                id="login"
                value={this.state.name}
                onChange={target =>{
                  this.compareChanges('name', target.target.value);
                  this.setState({ name: target.target.value })}
                }
                placeholder="Enter login"
              />
            {this.state.submitError && this.state.name===''&&<label htmlFor="login" style={{color:'red'}}>You must enter login</label>}
            </div>

            <div className="form-group">
              <label htmlFor="pass">*Password</label>
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
            {this.state.submitError && this.state.password===''&&<label htmlFor="password" style={{color:'red'}}>You must enter password</label>}
            </div>

            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={this.state.tls}
                  onChange={target =>{
                    this.compareChanges('tls', !this.state.tls);
                    this.setState({ tls: !this.state.tls })}
                  }
                />
                TLS
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
                className="btn btn-primary mr-2"
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

const mapStateToProps = ({ SMTPsReducer, login }) => {
  const { SMTP } = SMTPsReducer;
  const { token } = login;
  return { SMTP, token };
};

export default connect(mapStateToProps, { editSMTP })(SMTPEdit);
