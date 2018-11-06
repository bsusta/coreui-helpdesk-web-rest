import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUserRole } from '../../../redux/actions';
import i18n from 'i18next';

const ACLs = [
	{ value: 'login_to_system', title: 'aclLogIntoSystem' },
	{ value: 'share_filters', title: 'aclShareFilters' },
	{ value: 'project_shared_filters', title: 'aclProjectSharedFilters' },
	{ value: 'report_filters', title: 'aclReportFilters' },
	{ value: 'share_tags', title: 'aclSharedTags' },
	{ value: 'create_projects', title: 'aclCreateProjects' },
	{ value: 'sent_emails_from_comments', title: 'aclSendEmailsFromComments' },
	{ value: 'create_tasks', title: 'aclCreateTasks' },
	{
		value: 'create_tasks_in_all_projects',
		title: 'aclCreateTasksInAllProjects',
	},
	{ value: 'update_all_tasks', title: 'aclUpdateAllTasks' },
	{ value: 'user_settings', title: 'aclUserSettings' },
	{ value: 'user_role_settings', title: 'aclUserRoleSettings' },
	{ value: 'company_attribute_settings', title: 'aclCompanyAttributeSettings' },
	{ value: 'company_settings', title: 'aclCompanySettings' },
	{ value: 'status_settings', title: 'aclStatusSettings' },
	{ value: 'task_attribute_settings', title: 'aclTaskAttributeSettings' },
	{ value: 'unit_settings', title: 'aclUnitSettings' },
	{ value: 'system_settings', title: 'aclSystemSettings' },
	{ value: 'imap_settings', title: 'aclImapSettings' },
	{ value: 'smtp_settings', title: 'aclSMTPSettings' },
];

class RoleAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			homepage: '',
			order: '',
			acl: [],
			submitError: false,
		};
		this.aclChange.bind(this);
	}

	aclChange(value) {
		if (!this.state.acl.includes(value)) {
			this.setState({ acl: [...this.state.acl, value] });
		} else {
			let newACL = [...this.state.acl];
			newACL.splice(newACL.indexOf(value), 1);
			this.setState({ acl: newACL });
		}
	}

	submit(e) {
		e.preventDefault();
		this.setState({ submitError: true });
		let body = {
			title: this.state.title,
			description: this.state.description,
			homepage: this.state.homepage,
			order: parseInt(this.state.order),
		};
		if (this.state.acl.length > 0) {
			body['acl'] = JSON.stringify(this.state.acl);
		} else {
			body['acl'] = 'null';
		}
		if (body.homepage === '' || body.title === '' || isNaN(body.order)) {
			return;
		}
		this.props.addUserRole(body, this.props.token);
		this.props.history.goBack();
	}

	render() {
		return (
			<div className="card">
				<div className="card-body">
					<h2 className="h2" className="h2-setting-form">{i18n.t('addRole')}</h2>
					<form
						onSubmit={(event, value) => {
							event.preventDefault();
							this.props.history.goBack();
						}}
					>
						<div className="form-group">
							<label className= "input-label" htmlFor="title" className="req input-label">
								{i18n.t('roleName')}
							</label>
							<input
								className="form-control"
								id="title"
								value={this.state.title}
								onChange={e => this.setState({ title: e.target.value })}
								placeholder={i18n.t('enterRoleName')}
							/>
						</div>
						{this.state.submitError &&
							this.state.title === '' && (
								<label className= "input-label" htmlFor="title" style={{ color: 'red' }}>
									{i18n.t('restrictionMustEnterTitle')}
								</label>
							)}

						<div className="form-group">
							<label className= "input-label" htmlFor="description">{i18n.t('description')}</label>
							<textarea
								className="form-control"
								id="description"
								placeholder={i18n.t('enterDescription')}
								value={this.state.description}
								onChange={e => this.setState({ description: e.target.value })}
							/>
						</div>

						<div className="form-group">
							<label className= "input-label" htmlFor="homepage" className="req input-label">
								{i18n.t('homepage')}
							</label>
							<input
								className="form-control"
								id="homepage"
								value={this.state.homepage}
								onChange={e => this.setState({ homepage: e.target.value })}
								placeholder={i18n.t('enterHomepage')}
							/>
						</div>
						{this.state.submitError &&
							this.state.homepage === '' && (
								<label className= "input-label" htmlFor="homepage" style={{ color: 'red' }}>
									{i18n.t('restrictionMustEnterRolesHomepage')}
								</label>
							)}

						<div className="form-group">
							<label className= "input-label" htmlFor="order" className="req input-label">
								{i18n.t('order')}
							</label>
							<input
								className="form-control"
								id="order"
								type="number"
								value={this.state.order}
								onChange={e => this.setState({ order: e.target.value })}
								placeholder={i18n.t('enterRoleOrder')}
							/>
						</div>
						{this.state.order !== '' &&
							isNaN(parseInt(this.state.order)) && (
								<label className= "input-label" htmlFor="order" style={{ color: 'red' }}>
									{i18n.t('restrictionOrderNumberIsNotValid')}
								</label>
							)}
						{this.state.submitError &&
							this.state.order === '' && (
								<label className= "input-label" htmlFor="order" style={{ color: 'red' }}>
									{i18n.t('restrictionMustEnterOrderNumber')}
								</label>
							)}

						<h3>{i18n.t('acls')}</h3>
						{ACLs.map(acl => (
							<div className="form-group form-check checkbox" key={acl.value}>
							    <input
							      type="checkbox"
							      id={"acl-"+acl.value}
							      className="form-check-input"
							      checked={this.state.acl.includes(acl.value)}
										onChange={() => this.aclChange(acl.value)}
							      />
									<label className="form-check-label" htmlFor={"acl-"+acl.value}>
									{i18n.t(acl.title)}
							  </label>
							</div>))
						}

						<div className="form-group">
							<button type="submit" className="btn btn-primary mr-2" onClick={this.submit.bind(this)}>
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

export default connect(
	mapStateToProps,
	{ addUserRole }
)(RoleAdd);
