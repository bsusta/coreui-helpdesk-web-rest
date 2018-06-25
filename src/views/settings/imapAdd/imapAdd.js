import React, { Component } from "react";
import { connect } from "react-redux";
import { addImap } from "../../../redux/actions";
import {isEmail} from '../../../helperFunctions';
import i18n from 'i18next';

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
        <div className="card-header"></div>
        <div className="card-body">
        <h2 className="h2" className="h2-setting-form">{i18n.t('addImap')}</h2>
          {this.state.project===null&&<h5 className="card-header" style={{color:'red'}}>{i18n.t('restrictionMustHaveProjectImap')}</h5>}
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
            >
            <div className="form-group">
              <label className= "input-label" htmlFor="inbox_email" className="req input-label">{i18n.t('inboxEmail')}</label>
              <input
                className="form-control"
                id="inbox_email"
                type="email"
                value={this.state.inbox_email}
                onChange={e => this.setState({ inbox_email: e.target.value })}
                placeholder={i18n.t('enterInboxEmail')}
                />
            </div>
            { this.state.inbox_email!==''&&!isEmail(this.state.inbox_email)&&<label className= "input-label" htmlFor="inbox_email" style={{color:'red'}}>{i18n.t('restrictionEmailNotValid')}</label>}
            { this.state.submitError && this.state.inbox_email===''&&<label className= "input-label" htmlFor="inbox_email" style={{color:'red'}}>{i18n.t('restrictionMustEnterEmailAddress')}</label>}

            <div className="form-group">
              <label className= "input-label" htmlFor="move_email" className="req input-label">{i18n.t('moveEmail')}</label>
              <input
                className="form-control"
                id="move_email"
                type="email"
                value={this.state.move_email}
                onChange={e => this.setState({ move_email: e.target.value })}
                placeholder={i18n.t('enterMoveEmail')}
                />
            </div>
            { this.state.move_email!==''&&!isEmail(this.state.move_email)&&<label className= "input-label" htmlFor="move_email" style={{color:'red'}}>{i18n.t('restrictionEmailNotValid')}</label>}
            { this.state.submitError && this.state.move_email===''&&<label className= "input-label" htmlFor="move_email" style={{color:'red'}}>{i18n.t('restrictionMustEnterEmailAddress')}</label>}

            <div className="form-group">
              <label className= "input-label" htmlFor="server" className="req input-label">{i18n.t('serverAddress')}</label>
              <input
                className="form-control"
                id="server"
                value={this.state.host}
                onChange={e => this.setState({ host: e.target.value })}
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
                onChange={e => this.setState({ port: e.target.value })}
                placeholder={i18n.t('enterPort')}
                />
            </div>
            { this.state.port!==''&&isNaN(parseInt(this.state.port))&&<label className= "input-label" htmlFor="port" style={{color:'red'}}>{i18n.t('restrictionPortNotValid')}</label>}
            { this.state.submitError && this.state.port===''&&<label className= "input-label" htmlFor="port" style={{color:'red'}}>{i18n.t('restrictionMustEnterPort')}</label>}

            <div className="form-group">
              <label className= "input-label" htmlFor="log" className="req input-label">{i18n.t('login')}</label>
              <input
                className="form-control"
                id="log"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                placeholder={i18n.t('enterLogin')}
                />
            </div>
            {this.state.submitError && this.state.name===''&&<label className= "input-label" htmlFor="log" style={{color:'red'}}>{i18n.t('mustHaveLogin')}</label>}

            <div className="form-group">
              <label className= "input-label" htmlFor="pass" className="req input-label">{i18n.t('password')}</label>
              <input
                className="form-control"
                id="pass"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                placeholder={i18n.t('enterPassword')}
                />
            </div>
            {this.state.submitError && this.state.password===''&&<label className= "input-label" htmlFor="pass" style={{color:'red'}}>{i18n.t('mustEnterPassword')}</label>}

            <div className="form-group">
              <label className= "input-label" htmlFor="descr">{i18n.t('description')}</label>
              <textarea
                className="form-control"
                id="descr"
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
                placeholder={i18n.t('enterDescription')}
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
              <label className="form-check-label req">
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
                {i18n.t('ignoreCertificate')}
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
                disabled={this.state.project===null}
                type="submit"
                className="btn btn-secondary">
                {i18n.t('testConnection')}
              </button>
              <button
                disabled={this.state.project===null}
                type="submit"
                className="btn btn-primary"
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

const mapStateToProps = ({ projectsReducer, login }) => {
  const { projects } = projectsReducer;
  const { token } = login;
  return { token, projects };
};

export default connect(mapStateToProps, { addImap })(ImapAdd);
