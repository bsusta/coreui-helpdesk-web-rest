import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editImap, deleteImap } from '../../../redux/actions';
import { isEmail, isIP, areObjectsSame } from '../../../helperFunctions';
import i18n from 'i18next';

class ImapEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			is_active: this.props.imap.is_active ? true : false,
			description: this.props.imap.description ? this.props.imap.description : '',
			inbox_email: this.props.imap.inbox_email ? this.props.imap.inbox_email : '',
			move_email: this.props.imap.move_email ? this.props.imap.move_email : '',
			host: this.props.imap.host ? this.props.imap.host : '',
			port: this.props.imap.port ? this.props.imap.port.toString() : '',
			name: this.props.imap.name ? this.props.imap.name : '',
			password: this.props.imap.password ? this.props.imap.password : '',
			project: this.props.imap.project
				? this.props.imap.project.id.toString()
				: this.props.projects.length > 0
					? this.props.projects[0].id
					: null,
			ignore_certificate: this.props.imap.ignore_certificate ? this.props.imap.ignore_certificate : false,
			ssl: this.props.imap.ssl ? this.props.imap.ssl : false,
			submitError: false,
			changed: false,
		};
		this.compareChanges.bind(this);
	}

	compareChanges(change, val) {
		var newState = { ...this.state };
		newState[change] = val;
		newState.changed = undefined;
		newState.submitError = undefined;

		var originalState = {
			is_active: this.props.imap.is_active ? true : false,
			description: this.props.imap.description ? this.props.imap.description : '',
			inbox_email: this.props.imap.inbox_email ? this.props.imap.inbox_email : '',
			move_email: this.props.imap.move_email ? this.props.imap.move_email : '',
			host: this.props.imap.host ? this.props.imap.host : '',
			port: this.props.imap.port ? this.props.imap.port.toString() : '',
			name: this.props.imap.name ? this.props.imap.name : '',
			password: this.props.imap.password ? this.props.imap.password : '',
			project: this.props.imap.project
				? this.props.imap.project.id.toString()
				: this.props.projects.length > 0
					? this.props.projects[0].id
					: null,
			ignore_certificate: this.props.imap.ignore_certificate ? this.props.imap.ignore_certificate : false,
			ssl: this.props.imap.ssl ? this.props.imap.ssl : false,
		};
		this.setState({ changed: !areObjectsSame(newState, originalState) });
	}

	submit(e) {
		e.preventDefault();
		this.setState({ submitError: true });
		let body = {
			inbox_email: this.state.inbox_email,
			move_email: this.state.move_email,
			host: this.state.host,
			port: parseInt(this.state.port),
			name: this.state.name,
			password: this.state.password,
			ignore_certificate: this.state.ignore_certificate,
			description: this.state.description === '' ? 'null' : this.state.description,
			ssl: this.state.ssl,
		};
		if (
			body.inbox_email === '' ||
			body.move_email === '' ||
			body.host === '' ||
			body.name === '' ||
			body.password === '' ||
			!isEmail(body.inbox_email) ||
			!isEmail(body.move_email) ||
			isNaN(body.port)
		) {
			return;
		}
		this.props.editImap(body, this.state.project, this.props.imap.id, this.state.is_active, this.props.token);
		this.props.history.goBack();
	}

	delete(e) {
		e.preventDefault();
		if (confirm(i18n.t('deleteConfirmation') + ' ' + i18n.t('imap') + '?')) {
			this.props.deleteImap(this.props.imap.id, this.props.token);
		} else {
			return;
		}
		this.props.history.goBack();
	}

	render() {
		return (
			<div className="card">
				<div className="card-header" />
				<div className="card-body" style={{ border: this.state.changed ? '1px solid red' : null }}>
					<h2 className="h2" className="h2-setting-form">{i18n.t('editImap')}</h2>
					{this.state.project === null && (
						<h5 className="card-header" style={{ color: 'red' }}>
							{i18n.t('restrictionMustHaveProjectImap')}
						</h5>
					)}
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
									onChange={target => {
										this.compareChanges('is_active', !this.state.is_active);
										this.setState({ is_active: !this.state.is_active });
									}}
								/>
								{i18n.t('activated')}
							</label>
						</div>

						<div className="form-group">
							<label className= "input-label" htmlFor="inbox_email" className="req input-label">
								{i18n.t('inboxEmail')}
							</label>
							<input
								className="form-control"
								id="inbox_email"
								type="email"
								value={this.state.inbox_email}
								onChange={target => {
									this.compareChanges('inbox_email', target.target.value);
									this.setState({ inbox_email: target.target.value });
								}}
								placeholder={i18n.t('enterInboxEmail')}
							/>
						</div>
						{this.state.inbox_email !== '' &&
							!isEmail(this.state.inbox_email) && (
								<label className= "input-label" htmlFor="inbox_email" style={{ color: 'red' }}>
									{i18n.t('restrictionEmailNotValid')}
								</label>
							)}
						{this.state.submitError &&
							this.state.inbox_email === '' && (
								<label className= "input-label" htmlFor="inbox_email" style={{ color: 'red' }}>
									{i18n.t('restrictionMustEnterEmailAddress')}
								</label>
							)}

						<div className="form-group">
							<label className= "input-label" htmlFor="move_email" className="req input-label">
								{i18n.t('moveEmail')}
							</label>
							<input
								className="form-control"
								id="move_email"
								type="email"
								value={this.state.move_email}
								onChange={target => {
									this.compareChanges('move_email', target.target.value);
									this.setState({ move_email: target.target.value });
								}}
								placeholder={i18n.t('enterMoveEmail')}
							/>
						</div>
						{this.state.move_email !== '' &&
							!isEmail(this.state.move_email) && (
								<label className= "input-label" htmlFor="move_email" style={{ color: 'red' }}>
									{i18n.t('restrictionEmailNotValid')}
								</label>
							)}
						{this.state.submitError &&
							this.state.move_email === '' && (
								<label className= "input-label" htmlFor="move_email" style={{ color: 'red' }}>
									{i18n.t('restrictionMustEnterEmailAddress')}
								</label>
							)}

						<div className="form-group">
							<label className= "input-label" htmlFor="server" className="req input-label">
								{i18n.t('serverAddress')}
							</label>
							<input
								className="form-control"
								id="server"
								value={this.state.host}
								onChange={target => {
									this.compareChanges('host', target.target.value);
									this.setState({ host: target.target.value });
								}}
								placeholder={i18n.t('enterServerAddress')}
							/>
						</div>
						{this.state.submitError &&
							this.state.host === '' && (
								<label className= "input-label" htmlFor="server" style={{ color: 'red' }}>
									{i18n.t('restrictionMustEnterServerAddress')}
								</label>
							)}

						<div className="form-group">
							<label className= "input-label" htmlFor="port" className="req input-label">
								{i18n.t('port')}
							</label>
							<input
								className="form-control"
								id="port"
								type="number"
								value={this.state.port}
								onChange={target => {
									this.compareChanges('port', target.target.value);
									this.setState({ port: target.target.value });
								}}
								placeholder={i18n.t('enterPort')}
							/>
						</div>
						{this.state.port !== '' &&
							isNaN(parseInt(this.state.port)) && (
								<label className= "input-label" htmlFor="port" style={{ color: 'red' }}>
									{i18n.t('restrictionPortNotValid')}
								</label>
							)}
						{this.state.submitError &&
							this.state.port === '' && (
								<label className= "input-label" htmlFor="port" style={{ color: 'red' }}>
									{i18n.t('restrictionMustEnterPort')}
								</label>
							)}

						<div className="form-group">
							<label className= "input-label" htmlFor="log" className="req input-label">
								{i18n.t('login')}
							</label>
							<input
								className="form-control"
								id="log"
								value={this.state.name}
								onChange={target => {
									this.compareChanges('name', target.target.value);
									this.setState({ name: target.target.value });
								}}
								placeholder={i18n.t('enterLogin')}
							/>
						</div>
						{this.state.submitError &&
							this.state.name === '' && (
								<label className= "input-label" htmlFor="log" style={{ color: 'red' }}>
									{i18n.t('mustHaveLogin')}
								</label>
							)}

						<div className="form-group">
							<label className= "input-label" htmlFor="pass" className="req input-label">
								{i18n.t('password')}
							</label>
							<input
								className="form-control"
								id="pass"
								value={this.state.password}
								onChange={target => {
									this.compareChanges('password', target.target.value);
									this.setState({ password: target.target.value });
								}}
								placeholder={i18n.t('enterPassword')}
							/>
						</div>
						{this.state.submitError &&
							this.state.password === '' && (
								<label className= "input-label" htmlFor="pass" style={{ color: 'red' }}>
									{i18n.t('mustEnterPassword')}
								</label>
							)}

						<div className="form-group">
							<label className= "input-label" htmlFor="descr">{i18n.t('description')}</label>
							<textarea
								className="form-control"
								id="descr"
								value={this.state.description}
								onChange={target => {
									this.compareChanges('description', target.target.value);
									this.setState({ description: target.target.value });
								}}
								placeholder={i18n.t('enterDescription')}
							/>
						</div>
						<select
							value={this.state.project}
							id="project"
							onChange={target => {
								this.compareChanges('project', target.target.value);
								this.setState({ project: target.target.value });
							}}
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
									onChange={target => {
										this.compareChanges('ignore_certificate', !this.state.ignore_certificate);
										this.setState({ ignore_certificate: !this.state.ignore_certificate });
									}}
								/>
								{i18n.t('ignoreCertificate')}
							</label>
						</div>

						<div className="form-check">
							<label className="form-check-label">
								<input
									type="checkbox"
									className="form-check-input"
									checked={this.state.ssl}
									onChange={target => {
										this.compareChanges('ssl', !this.state.ssl);
										this.setState({ ssl: !this.state.ssl });
									}}
								/>
								{i18n.t('ssl')}
							</label>
						</div>
						<div className="form-group">
							<button type="submit" disabled={this.state.project === null} className="btn btn-secondary">
								{i18n.t('testConnection')}
							</button>
							<button
								type="submit"
								className="btn btn-primary"
								disabled={this.state.project === null}
								onClick={this.submit.bind(this)}
							>
								{i18n.t('submit')}
							</button>
							<button type="delete" className="btn btn-danger" onClick={this.delete.bind(this)}>
								{i18n.t('delete')}
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

const mapStateToProps = ({ imapsReducer, login, projectsReducer }) => {
	const { imap } = imapsReducer;
	const { projects } = projectsReducer;
	const { token } = login;
	return { imap, token, projects };
};

export default connect(
	mapStateToProps,
	{ editImap, deleteImap }
)(ImapEdit);
