import React, { Component } from "react";
import { connect } from "react-redux";
import { editSMTP } from "../../../redux/actions";
import {isEmail} from "../../../helperFunctions";
import { areObjectsSame } from "../../../helperFunctions";
import i18n from 'i18next';

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
      tsl: this.props.SMTP.tls ? this.props.SMTP.tls : false,
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
        <div className="card-body" style={{border:this.state.changed?'1px solid red':null}}>
        <h2 className="h2" className="h2-setting-form">{i18n.t('editSMTP')}</h2>
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
          >
            <div className="form-group">
            <label className= "input-label" htmlFor="email" className="req input-label">{i18n.t('email')}</label>
              <input
                className="form-control"
                value={this.state.email}
                onChange={target =>{
                  this.compareChanges('email', target.target.value);
                  this.setState({ email: target.target.value })}
                }
                id="email"
                type="email"
                placeholder={i18n.t('email')}
              />
            </div>
            { this.state.email!==''&&!isEmail(this.state.email)&&<label className= "input-label" htmlFor="email" style={{color:'red'}}>{i18n.t('restrictionEmailNotValid')}</label>}
            {this.state.addError && this.state.email===''&&<label className= "input-label" htmlFor="email" style={{color:'red'}}>{i18n.t('restrictionMustEnterEmailAddress')}</label>}

            <div className="form-group">
              <label className= "input-label" htmlFor="server" className="req input-label">{i18n.t('serverAddress')}</label>
              <input
                className="form-control"
                id="server"
                value={this.state.host}
                onChange={target =>{
                  this.compareChanges('host', target.target.value);
                  this.setState({ host: target.target.value })}
                }
                placeholder={i18n.t('enterServerAddress')}
              />
            </div>
            {this.state.submitError && this.state.host===''&&<label className= "input-label" htmlFor="server" style={{color:'red'}}>{i18n.t('restrictionMustEnterServerAddress')}</label>}
            <div className="form-group">
              <label className= "input-label" htmlFor="port" className="req input-label">{i18n.t('port')}</label>
              <input
                className="form-control"
                id="port"
                type="number"
                value={this.state.port}
                onChange={target =>{
                  this.compareChanges('port', target.target.value);
                  this.setState({ port: target.target.value })}
                }
                placeholder={i18n.t('enterPort')}
              />
            </div>
            { this.state.port!==''&&isNaN(parseInt(this.state.port))&&<label className= "input-label" htmlFor="port" style={{color:'red'}}>{i18n.t('restrictionPortNotValid')}</label>}
            {this.state.submitError && this.state.port===''&&<label className= "input-label" htmlFor="port" style={{color:'red'}}>{i18n.t('restrictionMustEnterPort')}</label>}

            <div className="form-group">
              <label className= "input-label" htmlFor="login" className="req input-label">{i18n.t('login')}</label>
              <input
                className="form-control"
                id="login"
                value={this.state.name}
                onChange={target =>{
                  this.compareChanges('name', target.target.value);
                  this.setState({ name: target.target.value })}
                }
                placeholder={i18n.t('enterLogin')}
              />
            {this.state.submitError && this.state.name===''&&<label className= "input-label" htmlFor="login" style={{color:'red'}}>{i18n.t('mustHaveLogin')}</label>}
            </div>

            <div className="form-group">
              <label className= "input-label" htmlFor="pass" className="req input-label">{i18n.t('password')}</label>
              <input
                className="form-control"
                id="pass"
                value={this.state.password}
                onChange={target =>{
                  this.compareChanges('password', target.target.value);
                  this.setState({ password: target.target.value })}
                }
                placeholder={i18n.t('enterPassword')}
              />
            {this.state.submitError && this.state.password===''&&<label className= "input-label" htmlFor="password" style={{color:'red'}}>{i18n.t('mustEnterPassword')}</label>}
            </div>

            <div className="form-group form-check checkbox">
                <input
                  type="checkbox"
                  id="tsl"
                  className="form-check-input"
                  checked={this.state.tsl}
                  onChange={() => {
                    this.setState({ tsl: !this.state.tsl })
                  }}
                  />
                <label className="form-check-label req" htmlFor="tsl">
                  {i18n.t('tsl')}
              </label>
            </div>

            <div className="form-group form-check checkbox">
                <input
                  type="checkbox"
                  id="ssl"
                  className="form-check-input"
                  checked={this.state.ssl}
                  onChange={() => {
                    this.setState({ ssl: !this.state.ssl })
                  }}
                  />
                <label className="form-check-label req" htmlFor="ssl">
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

const mapStateToProps = ({ SMTPsReducer, login }) => {
  const { SMTP } = SMTPsReducer;
  const { token } = login;
  return { SMTP, token };
};

export default connect(mapStateToProps, { editSMTP })(SMTPEdit);
