import React, { Component } from "react";
import { connect } from "react-redux";
import { addSMTP } from "../../../redux/actions";
import {isEmail} from "../../../helperFunctions";
import i18n from 'i18next';

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
        <h4 className="card-header">{i18n.t('addSMTP')}</h4>
        <div className="card-body">
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
          >
            <div className="form-group">
              <label htmlFor="email" className="req">{i18n.t('email')}</label>
              <input
                className="form-control"
                value={this.state.email}
                onChange={e => this.setState({ email: event.target.value })}
                id="email"
                type="email"
                placeholder={i18n.t('email')}
              />
              { this.state.email!==''&&!isEmail(this.state.email)&&<label htmlFor="email" style={{color:'red'}}>{i18n.t('restrictionEmailNotValid')}</label>}
              {this.state.addError && this.state.email===''&&<label htmlFor="email" style={{color:'red'}}>{i18n.t('restrictionMustEnterEmailAddress')}</label>}
            </div>

            <div className="form-group">
              <label htmlFor="server" className="req">{i18n.t('serverAddress')}</label>
              <input
                className="form-control"
                id="server"
                value={this.state.host}
                onChange={e => this.setState({ host: e.target.value })}
                placeholder={i18n.t('enterServerAddress')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="port" className="req">{i18n.t('port')}</label>
              <input
                className="form-control"
                id="port"
                value={this.state.port}
                onChange={e => this.setState({ port: e.target.value })}
                placeholder={i18n.t('enterPort')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="login" className="req">{i18n.t('login')}</label>
              <input
                className="form-control"
                id="login"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                placeholder={i18n.t('enterLogin')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="pass"  className="req">{i18n.t('password')}</label>
              <input
                className="form-control"
                id="pass"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                placeholder={i18n.t('enterPassword')}
              />
            </div>

            <div className="form-check">
              <label className="form-check-label req">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={this.state.tls}
                  onChange={() => this.setState({ tls: !this.state.tls })}
                />
              {i18n.t('tsl')}
              </label>
            </div>

            <div className="form-check">
              <label className="form-check-label req">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={this.state.ssl}
                  onChange={() => this.setState({ ssl: !this.state.ssl })}
                />
              {i18n.t('ssl')}
              </label>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary mr-2"
                onClick={this.submit.bind(this)}
              >
                {i18n.t('submit')}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => this.props.history.goBack()}
              >
                {i18n.t('cancel')}
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
