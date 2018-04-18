import React, { Component } from "react";
import { connect } from "react-redux";
import { addSMTP } from "../../../redux/actions";
import {isEmail} from "../../../helperFunctions";

class SMTPAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      host: "",
      name: "",
      password: "",
      port: "",
      ssl: true,
      tls: false,
      addError:false
    };
  }
  submit(e) {
    e.preventDefault();
    this.props.addSMTP(
      {
        email: this.state.email,
        host: this.state.host,
        name: this.state.name,
        password: this.state.password,
        port: this.state.port,
        ssl: this.state.ssl,
        tls: this.state.tls
      },
      this.props.token
    );
    this.props.history.goBack();
  }
  render() {
    return (
      <div className="card">
        <h4 className="card-header">Add SMTP</h4>
        <div className="card-body">
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
          >
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                className="form-control"
                value={this.state.email}
                onChange={e => this.setState({ email: event.target.value })}
                id="email"
                type="email"
                placeholder="Enter email"
              />
              { this.state.email!==''&&!isEmail(this.state.email)&&<label htmlFor="email" style={{color:'red'}}>Your e-mail address is not valid</label>}
              {this.state.addError && this.state.email===''&&<label htmlFor="email" style={{color:'red'}}>You must enter e-mail address</label>}
            </div>

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

            <div className="form-group">
              <label htmlFor="port">Port</label>
              <input
                className="form-control"
                id="port"
                value={this.state.port}
                onChange={e => this.setState({ port: e.target.value })}
                placeholder="Enter port number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="login">Login</label>
              <input
                className="form-control"
                id="login"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                placeholder="Enter login"
              />
            </div>

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

            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={this.state.tls}
                  onChange={() => this.setState({ tls: !this.state.tls })}
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
                  onChange={() => this.setState({ ssl: !this.state.ssl })}
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

const mapStateToProps = ({ login }) => {
  const { token } = login;
  return { token };
};

export default connect(mapStateToProps, { addSMTP })(SMTPAdd);
