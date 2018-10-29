import React, { Component } from 'react';
import {
	Row,
	Col,
	Button,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Card,
	CardHeader,
	CardFooter,
	CardBody,
	Form,
	FormGroup,
	FormText,
	Label,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import i18n from 'i18next';
import Select from 'react-select';
import { connect } from 'react-redux';
import {
	initialiseCustomAttributes,
	processCustomFilterAttributes,
	processRESTinput,
	filterBodyFromState,
	parseFilterDateToString,
} from '../../helperFunctions';
import { createFilter, editFilter, deleteFilter, setFilterBody, changeUpdateAt } from '../../redux/actions';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const colourStyles = {
	control: styles => ({
		...styles,
		backgroundColor: 'white',
		borderRadius: '0',
		border: '1px solid #c2cfd6',
	}),
};

class Filter extends Component {
	constructor(props) {
		super(props);
		this.createState.bind(this);
		this.state = { ...this.createState(false), ...props.body.body, lastStatusCount:0 };
	}

	componentWillReceiveProps(props) {
		if (JSON.stringify(this.props.body.body) !== JSON.stringify(props.body.body)
		||this.props.body.search!==props.body.search
		||this.state.lastStatusCount!==props.body.body.statuses.length) {
			this.setState({ ...this.createState(false), ...props.body.body, lastStatusCount: props.body.body.statuses.length });
		}
	}

	deleteFilter() {
		if (confirm('Are you sure you want to delete this filter?')) {
			this.props.deleteFilter(this.props.match.params.id, this.props.user.user_role.acl, this.props.token);
			this.props.history.push(
				'/filter/1,' + (this.props.match.params.count ? this.props.match.params.count : 20)
			);
		} else {
			return;
		}
	}

	submit(savingChanges) {
		this.setState({ submitError: true });
		if (
			this.state.filterIcon === '' ||
			this.state.filterName === '' ||
			isNaN(parseInt(this.state.filterOrder))
		) {
			return;
		}
		let filter = {
			createdTime: parseFilterDateToString(
				this.state.createdFrom,
				this.state.createdTo,
				this.state.createdFromNow,
				this.state.createdToNow
			),
			startedTime: parseFilterDateToString(
				this.state.startedFrom,
				this.state.startedTo,
				this.state.startedFromNow,
				this.state.startedToNow
			),
			deadlineTime: parseFilterDateToString(
				this.state.deadlineFrom,
				this.state.deadlineTo,
				this.state.deadlineFromNow,
				this.state.deadlineToNow
			),
			closedTime: parseFilterDateToString(
				this.state.closedFrom,
				this.state.closedTo,
				this.state.closedFromNow,
				this.state.closedToNow
			),
			search: this.state.title,
			status: this.state.statuses.map(item => item.id),
			project: this.state.projects.map(item => item.id),
			creator: this.state.creators.map(item => item.id),
			requester: this.state.requesters.map(item => item.id),
			taskCompany: this.state.companies.map(item => item.id),
			assigned: this.state.assignedTos.map(item => item.id),
			tag: this.state.tags.map(item => item.id),
			follower: this.state.followers.map(item => item.id),
			archived: this.state.archived,
			important: this.state.important,
			addedParameters: processCustomFilterAttributes({ ...this.state.task_data }, [...this.props.taskAttributes]),
		};
		if (Object.keys(filter.addedParameters).length === 0) {
			filter.addedParameters = undefined;
		} else {
			filter.addedParameters = processRESTinput(filter.addedParameters, true);
		}
		Object.keys(filter).map(item => {
			if ((Array.isArray(filter[item]) && filter[item].length === 0) || filter[item] === '') {
				filter[item] = undefined;
			}
		});

		let body = {
			title: this.state.filterName,
			public: this.state.filterPublic,
			report: this.state.filterReport,
			default: this.state.filterDefault,
			icon_class: this.state.filterIcon,
			order: this.state.filterOrder,
			filter: JSON.stringify(filter),
		};
		if (savingChanges) {
			this.props.editFilter(body, this.props.match.params.id, this.props.token);
		} else {
			this.props.createFilter(body, this.props.token);
		}
		this.setState({ saveOpen: false });
	}

	applyFilter() {
		this.props.setFilterBody({body:{...this.state, lastStatusCount:undefined }, page:1});
	}

	createState(restore) {
		let state = {
			createdFrom: null,
			createdFromNow: false,
			createdTo: null,
			createdToNow: false,
			deadlineFrom: null,
			deadlineFromNow: false,
			deadlineTo: null,
			deadlineToNow: false,
			closedFrom: null,
			closedFromNow: false,
			closedTo: null,
			closedToNow: false,
			title: '',
			startedFrom: null,
			startedFromNow: false,
			startedTo: null,
			startedToNow: false,
			archived: false,
			important: false,
			statuses: [],
			projects: [],
			creators: [],
			requesters: [],
			companies: [],
			assignedTos: [],
			tags: [],
			followers: [],
			task_data: {},
			filterName: '',
			filterPublic: false,
			filterReport: false,
			filterIcon: 'fa fa-filter',
			filterOrder: 10,
			stateeditingFilter: this.props.match.params.id ? true : false,
			statesaveOpen: false,
			statefilterDefault: false,
			statesubmitError: false,
		};
		if (this.props.filterState && this.props.match.params.id !== 'add' && restore) {
			Object.keys(this.props.filterState).map(key => (state[key] = this.props.filterState[key]));
		}
		return state;
	}

	render() {
		let ACL = this.props.user.user_role.acl;
		return (
			<div className="filter">
					<Modal isOpen={this.state.saveOpen}>
						<ModalHeader>Creating new filter</ModalHeader>
						<ModalBody>
							<FormGroup>
								<label htmlFor="filterName" className="input-label">
									{i18n.t('filterName')}
								</label>
								<input
									className="form-control"
									id="filterName"
									value={this.state.filterName}
									onChange={e => {
										this.setState({ filterName: e.target.value });
									}}
									placeholder={i18n.t('enterFilterName')}
								/>
								{this.state.submitError &&
									this.state.filterName === '' && (
										<label htmlFor="title" style={{ color: 'red' }}>
											{i18n.t('restrictionMustEnterTitle')}
										</label>
									)}
							</FormGroup>
							<FormGroup>
								<label htmlFor="filterOrder" className="input-label">
									{i18n.t('orderFilter')}
								</label>
								<input
									className="form-control"
									id="filterOrder"
									type="number"
									value={this.state.filterOrder}
									onChange={e => {
										this.setState({ filterOrder: e.target.value });
									}}
									placeholder={i18n.t('enterOrderFilter')}
								/>
								{this.state.filterOrder !== '' &&
									isNaN(parseInt(this.state.filterOrder)) && (
										<label htmlFor="order" style={{ color: 'red' }}>
											{i18n.t('restrictionOrderNumberIsNotValid')}
										</label>
									)}
								{this.state.submitError &&
									this.state.filterOrder === '' && (
										<label htmlFor="order" style={{ color: 'red' }}>
											{i18n.t('restrictionMustEnterOrderNumber')}
										</label>
									)}
							</FormGroup>
							<FormGroup>
								<label htmlFor="filterIcon" className="input-label">
									{i18n.t('filterIcon')}
								</label>
								<input
									className="form-control"
									id="filterIcon"
									value={this.state.filterIcon}
									onChange={e => {
										this.setState({ filterIcon: e.target.value });
									}}
									placeholder={i18n.t('enterFilterIcon')}
								/>
								{this.state.submitError &&
									this.state.filterIcon === '' && (
										<label htmlFor="filterIcon" style={{ color: 'red' }}>
											{i18n.t('restrictionMustEnterFilterIcon')}
										</label>
									)}
							</FormGroup>
							{ACL.includes('share_filters') && (
								<div className="form-check">
									<label className="form-check-label">
										<input
											type="checkbox"
											checked={this.state.filterPublic}
											onChange={() => {
												this.setState({ filterPublic: !this.state.filterPublic });
											}}
											className="form-check-input"
										/>
										{i18n.t('public')}
									</label>
								</div>
							)}
							{ACL.includes('report_filters') && (
								<div className="form-check">
									<label className="form-check-label">
										<input
											type="checkbox"
											checked={this.state.report}
											onChange={() => {
												this.setState({ report: !this.state.report });
											}}
											className="form-check-input"
										/>
										{i18n.t('report')}
									</label>
								</div>
							)}
							<div className="form-check">
								<label className="form-check-label">
									<input
										type="checkbox"
										checked={this.state.filterDefault}
										onChange={() => {
											this.setState({ filterDefault: !this.state.filterDefault });
										}}
										className="form-check-input"
									/>
									{i18n.t('default')}
								</label>
							</div>
						</ModalBody>
						<ModalFooter className="justify-content-between">
							<button className="btn btn-danger mr-1" onClick={() => this.setState({ saveOpen: false })}>
								{i18n.t('cancel')}
							</button>

							{this.props.filter &&
								this.props.match.params.id &&
								this.props.filter.id === parseInt(this.props.match.params.id) && (
									<button className="btn btn-primary mr-1" onClick={() => this.submit(true)}>
										{i18n.t('saveFilter')}
									</button>
								)}

							<button className="btn btn-primary mr-1" onClick={() => this.submit(false)}>
								{i18n.t('addNew')}
							</button>
						</ModalFooter>
					</Modal>

					<div className="btn-list">
						<button
							type="button"
							className="btn btn-primary waves-effect waves-light btn-sm"
							onClick={this.applyFilter.bind(this)}
						>
							{i18n.t('apply')}
						</button>
						<button
							type="button"
							className="btn btn-primary waves-effect waves-light btn-sm"
							onClick={() => this.setState({ saveOpen: true })}
						>
							{i18n.t('save')}
						</button>
						{this.props.filter &&
							this.props.match.params.id &&
							this.props.filter.id === parseInt(this.props.match.params.id) && (
								<button type="button" className="btn btn-primary waves-effect waves-light btn-sm" onClick={this.deleteFilter.bind(this)}>
									{i18n.t('delete')}
								</button>
							)}
						<button
							type="button"
							className="btn btn-primary waves-effect waves-light btn-sm"
							onClick={() => {
								this.setState(this.createState(true));
							}}
						>
							{i18n.t('reset')}
						</button>
					</div>

						<FormGroup>
							<label htmlFor="title" className="input-label">
								{i18n.t('filterByName')}
							</label>
							{this.props.total !== null && (
								<span style={{ float: 'right', color: 'red' }} className="center-hor">
									{i18n.t('taskCount')}: {this.props.total}
								</span>
							)}
							<input
								className="form-control"
								id="title"
								value={this.state.title}
								onChange={e => {
									this.setState({ title: e.target.value });
								}}
								placeholder={i18n.t('filterByName')}
							/>
						</FormGroup>

						<FormGroup>
							<label htmlFor="status" className="input-label">
								{i18n.t('status')}
							</label>
							<Select
								options={this.props.statuses.map(status => {
									status.label = status.title;
									status.value = status.id;
									return status;
								})}
								isMulti
								value={this.state.statuses}
								onChange={e => this.setState({ statuses: e })}
								styles={colourStyles}
							/>
						</FormGroup>

						<label className="mt-1 input-label">{i18n.t('requester')}</label>
						<Select
							styles={colourStyles}
							isMulti
							value={this.state.requesters}
							options={[{ label: 'Current user', id: 'CURRENT-USER', value: 'CURRENT-USER' }].concat(
								this.props.users.map(user => {
									user.label =
										(user.name ? user.name : '') + ' ' + (user.surname ? user.surname : '');
									if (user.label === ' ') {
										user.label = user.email;
									} else {
										user.label = user.label + ' (' + user.email + ')';
									}
									user.value = user.id;
									return user;
								})
							)}
							onChange={e => this.setState({ requesters: e })}
						/>

						<label className="mt-2 input-label">{i18n.t('company')}</label>
						<Select
							options={[{ label: 'Current user', id: 'CURRENT-USER', value: 'CURRENT-USER' }].concat(
								this.props.companies.map(company => {
								company.label = company.title;
								company.value = company.id;
								return company;
							}))}
							isMulti
							styles={colourStyles}
							onChange={e => this.setState({ companies: e })}
							value={this.state.companies}
						/>

						<label className="mt-2 input-label">{i18n.t('assigned')}</label>
						<Select
							styles={colourStyles}
							isMulti
							options={[
								{ label: 'NOT', id: 'NOT', value: 'NOT' },
								{ label: 'Current user', id: 'CURRENT-USER', value: 'CURRENT-USER' },
							].concat(
								this.props.users.map(user => {
									user.label =
										(user.name ? user.name : '') + ' ' + (user.surname ? user.surname : '');
									if (user.label === ' ') {
										user.label = user.email;
									} else {
										user.label = user.label + ' (' + user.email + ')';
									}
									user.value = user.id;
									return user;
								})
							)}
							onChange={e => this.setState({ assignedTos: e })}
							value={this.state.assignedTos}
						/>

						<label className="mt-2 input-label">{i18n.t('createdBy')}</label>
						<Select
							styles={colourStyles}
							isMulti
							options={[{ label: 'Current user', id: 'CURRENT-USER', value: 'CURRENT-USER' }].concat(
								this.props.users.map(user => {
									user.label =
										(user.name ? user.name : '') + ' ' + (user.surname ? user.surname : '');
									if (user.label === ' ') {
										user.label = user.email;
									} else {
										user.label = user.label + ' (' + user.email + ')';
									}
									user.value = user.id;
									return user;
								})
							)}
							onChange={e => this.setState({ creators: e })}
							value={this.state.creators}
						/>
						<label className="mt-1">{i18n.t('follower')}</label>
						<Select
							isMulti
							styles={colourStyles}
							options={[{ label: 'Current user', id: 'CURRENT-USER', value: 'CURRENT-USER' }].concat(
								this.props.users.map(user => {
									user.label =
										(user.name ? user.name : '') + ' ' + (user.surname ? user.surname : '');
									if (user.label === ' ') {
										user.label = user.email;
									} else {
										user.label = user.label + ' (' + user.email + ')';
									}
									user.value = user.id;
									return user;
								})
							)}
							onChange={e => this.setState({ followers: e })}
							value={this.state.followers}
						/>
						<label className="mt-2 input-label">{i18n.t('tag')}</label>
						<Select
							options={this.props.tags.map(tag => {
								tag.label = tag.title;
								tag.value = tag.id;
								return tag;
							})}
							isMulti
							styles={colourStyles}
							style={{ width: '100%' }}
							onChange={e => this.setState({ tags: e })}
							value={this.state.tags}
						/>

						<div className="form-check" style={{ marginTop: 10 }}>
								<input
									id="archived"
									type="checkbox"
									checked={this.state.archived}
									onChange={() => {
										this.setState({ archived: !this.state.archived });
									}}
									className="form-check-input"
								/>
							<label className="form-check-label input-label" htmlFor="archived">
								{i18n.t('archived')}
							</label>
						</div>
						<div className="form-check">
								<input
									type="checkbox"
									id="important"
									checked={this.state.important}
									onChange={() => {
										this.setState({ important: !this.state.important });
									}}
									className="form-check-input"
								/>
							<label className="form-check-label input-label" htmlFor="important">
								{i18n.t('important')}
							</label>
						</div>
						<label className="mt-2 input-label">{i18n.t('createdDate')}</label>
						<div className="d-flex flex-row justify-content-between fromToDates">
							<div>
								<DatePicker
									onChange={e => {
										this.setState({ createdFrom: e });
									}}
									locale="en-gb"
									placeholderText={i18n.t('dateFrom')}
									selected={this.state.createdFrom}
									showTimeSelect
									timeFormat="HH:mm"
									timeIntervals={30}
									dateFormat="DD.MM.YYYY HH:mm"
								/>
							</div>
							<div>
								<DatePicker
									onChange={e => {
										this.setState({ createdTo: e });
									}}
									style={{ marginLeft: '10%' }}
									locale="en-gb"
									placeholderText={i18n.t('dateTo')}
									selected={this.state.createdTo}
									showTimeSelect
									timeFormat="HH:mm"
									timeIntervals={30}
									dateFormat="DD.MM.YYYY HH:mm"
								/>
									<span className="form-check">
										<input
											type="checkbox"
											id="createdToNow"
											className="form-check-input"
											checked={this.state.createdToNow}
											onChange={() => this.setState({ createdToNow: !this.state.createdToNow })}
										/>
									<label htmlFor="createdToNow" className="form-check-label input-label">
										{i18n.t('now')}
									</label>
								</span>
							</div>
						</div>

						<label className="mt-2 input-label">{i18n.t('startedAt')}</label>

						<div className="d-flex flex-row justify-content-between fromToDates">
							<div>
								<DatePicker
									onChange={e => {
										this.setState({ startedFrom: e });
									}}
									locale="en-gb"
									placeholderText={i18n.t('dateFrom')}
									selected={this.state.startedFrom}
									showTimeSelect
									timeFormat="HH:mm"
									timeIntervals={30}
									dateFormat="DD.MM.YYYY HH:mm"
								/>
							</div>
							<div>
								<DatePicker
									onChange={e => {
										this.setState({ startedTo: e });
									}}
									style={{ marginLeft: '10%' }}
									locale="en-gb"
									placeholderText={i18n.t('dateTo')}
									selected={this.state.startedTo}
									showTimeSelect
									timeFormat="HH:mm"
									timeIntervals={30}
									dateFormat="DD.MM.YYYY HH:mm"
								/>
								<div className="form-group">
									<span className="form-check">
										<input
											type="checkbox"
											id="startedToNow"
											className="form-check-input"
											checked={this.state.startedToNow}
											onChange={() => this.setState({ startedToNow: !this.state.startedToNow })}
										/>
									<label htmlFor="startedToNow" className="form-check-label input-label">
										{i18n.t('now')}
									</label>
								</span>
								</div>
							</div>
						</div>

						<label className="mt-2 input-label">{i18n.t('deadline')}</label>
						<div className="d-flex flex-row justify-content-between fromToDates">
							<div>
								<DatePicker
									onChange={e => {
										this.setState({ deadlineFrom: e });
									}}
									locale="en-gb"
									placeholderText={i18n.t('dateFrom')}
									selected={this.state.deadlineFrom}
									showTimeSelect
									timeFormat="HH:mm"
									timeIntervals={30}
									dateFormat="DD.MM.YYYY HH:mm"
								/>
							</div>
							<div>
								<DatePicker
									onChange={e => {
										this.setState({ deadlineTo: e });
									}}
									style={{ marginLeft: '10%' }}
									locale="en-gb"
									placeholderText={i18n.t('dateTo')}
									selected={this.state.deadlineTo}
									showTimeSelect
									timeFormat="HH:mm"
									timeIntervals={30}
									dateFormat="DD.MM.YYYY HH:mm"
								/>
								<div className="form-group">
									<span className="form-check">
										<input
											type="checkbox"
											className="form-check-input"
											id="deadlineToNow"
											checked={this.state.deadlineToNow}
											onChange={() => this.setState({ deadlineToNow: !this.state.deadlineToNow })}
										/>
									<label htmlFor="deadlineToNow" className="form-check-label input-label">
										{i18n.t('now')}
									</label>
								</span>
								</div>
							</div>
						</div>

						<label className="mt-2 input-label">{i18n.t('closedAt')}</label>
						<div className="d-flex flex-row justify-content-between fromToDates">
							<div>
								<DatePicker
									onChange={e => {
										this.setState({ closedFrom: e });
									}}
									locale="en-gb"
									placeholderText={i18n.t('dateFrom')}
									selected={this.state.closedFrom}
									showTimeSelect
									timeFormat="HH:mm"
									timeIntervals={30}
									dateFormat="DD.MM.YYYY HH:mm"
								/>
							</div>
							<div>
								<DatePicker
									onChange={e => {
										this.setState({ closedTo: e });
									}}
									style={{ marginLeft: '10%' }}
									locale="en-gb"
									placeholderText={i18n.t('dateTo')}
									selected={this.state.closedTo}
									showTimeSelect
									timeFormat="HH:mm"
									timeIntervals={30}
									dateFormat="DD.MM.YYYY HH:mm"
								/>
								<div className="form-group">
									<span className="form-check">
										<input
											type="checkbox"
											id="closedToNow"
											className="form-check-input"
											checked={this.state.closedToNow}
											onChange={() => this.setState({ closedToNow: !this.state.closedToNow })}
										/>
									<label className="form-check-label input-label" htmlFor="closedToNow">
										{i18n.t('now')}
									</label>
								</span>
								</div>
							</div>
						</div>

						{this.props.taskAttributes.filter(item => item.is_active).map(attribute => {
							switch (attribute.type) {
								case 'input':
									return (
										<div className={'form-group'} key={attribute.id}>
											<label htmlFor={attribute.id} className="input-label">
												{attribute.title}
											</label>
											<input
												className="form-control"
												id={attribute.id}
												value={this.state.task_data[attribute.id]}
												onChange={e => {
													let newData = { ...this.state.task_data };
													newData[attribute.id] = e.target.value;

													this.setState({ task_data: newData });
												}}
												placeholder={i18n.t('enter') + ' ' + attribute.title}
											/>
										</div>
									);
								case 'text_area':
									return (
										<div className={'form-group'} key={attribute.id}>
											<label htmlFor={attribute.id} className="input-label">
												{attribute.title}
											</label>
											<textarea
												className="form-control"
												id={attribute.id}
												value={this.state.task_data[attribute.id]}
												onChange={e => {
													let newData = { ...this.state.task_data };
													newData[attribute.id] = e.target.value;

													this.setState({ task_data: newData });
												}}
												placeholder={i18n.t('enter') + ' ' + attribute.title}
											/>
										</div>
									);
								case 'simple_select':
									return (
										<div className="form-group" key={attribute.id}>
											<label className="input-label" htmlFor={attribute.id}>
												{attribute.title}
											</label>
											<Select
												id={attribute.id}
												options={attribute.options.map(option => {
													return { label: option, value: option };
												})}
												isMulti
												style={{ width: '100%' }}
												onChange={e => {
													let newData = { ...this.state.task_data };
													newData[attribute.id] = e;

													this.setState({ task_data: newData });
												}}
												value={this.state.task_data[attribute.id]}
											/>
										</div>
									);
								case 'multi_select':
									return (
										<div className="form-group" key={attribute.id}>
											<label htmlFor={attribute.id} className="input-label">
												{attribute.title}
											</label>
											<Select
												id={attribute.id}
												value={this.state.task_data[attribute.id]}
												options={attribute.options.map(option => {
													return { label: option, value: option };
												})}
												isMulti
												style={{ width: '100%' }}
												onChange={e => {
													let newData = { ...this.state.task_data };
													newData[attribute.id] = e;

													this.setState({ task_data: newData });
												}}
												value={this.state.task_data[attribute.id]}
											/>
										</div>
									);
								case 'date':
									return (
										<div className={'form-group'} key={attribute.id}>
											<label htmlFor={attribute.id} className="input-label">
												{attribute.title}
											</label>
											<DatePicker
												selected={this.state.task_data[attribute.id]}
												onChange={e => {
													let newData = { ...this.state.task_data };
													newData[attribute.id] = e;

													this.setState({ task_data: newData });
												}}
												locale="en-gb"
												placeholderText={attribute.title}
												showTimeSelect
												timeFormat="HH:mm"
												timeIntervals={30}
												dateFormat="DD.MM.YYYY HH:mm"
											/>
										</div>
									);
								case 'decimal_number':
									return (
										<div className={'form-group'} key={attribute.id}>
											<label htmlFor={attribute.id} className="input-label">
												{attribute.title}
											</label>
											<input
												className="form-control"
												type="number"
												id={attribute.id}
												value={this.state.task_data[attribute.id]}
												onChange={e => {
													let newData = { ...this.state.task_data };
													newData[attribute.id] = e.target.value;

													this.setState({ task_data: newData });
												}}
												placeholder={i18n.t('select') + attribute.title}
											/>
										</div>
									);
								case 'integer_number':
									return (
										<div className={'form-group'} key={attribute.id}>
											<label htmlFor={attribute.id} className="input-label">
												{attribute.title}
											</label>
											<input
												className="form-control"
												type="number"
												id={attribute.id}
												value={this.state.task_data[attribute.id]}
												onChange={e => {
													let newData = { ...this.state.task_data };
													newData[attribute.id] = e.target.value;

													this.setState({ task_data: newData });
												}}
												placeholder={i18n.t('select') + attribute.title}
											/>
										</div>
									);
								case 'checkbox':
									return (
										<div className="form-group" key={attribute.id}>
											<label className="form-check-label input-label">
												<input
													type="checkbox"
													className="form-check-input"
													checked={this.state.task_data[attribute.id]}
													onChange={() => {
														let newData = { ...this.state.task_data };
														newData[attribute.id] = !newData[attribute.id];

														this.setState({ task_data: newData });
													}}
												/>
												{attribute.title}
											</label>
										</div>
									);

								default:
									return <div>{attribute.title}</div>;
							}
						})}
				</div>
		);
	}
}
const mapStateToProps = ({
	tasksReducer,
	statusesReducer,
	usersReducer,
	companiesReducer,
	tagsReducer,
	taskAttributesReducer,
	login,
	filtersReducer,
	sidebarReducer,
}) => {
	const { taskProjects } = tasksReducer;
	const { taskStatuses } = statusesReducer;
	const { filter, total, body } = filtersReducer;
	const { users } = usersReducer;
	const { taskCompanies } = companiesReducer;
	const { tags } = tagsReducer;
	const { taskAttributes } = taskAttributesReducer;
	const { sidebar } = sidebarReducer;
	const { token, user } = login;
	let projectsOnly = sidebar?sidebar.projects.children:[];
	let archived = sidebar?sidebar.archived.children:[];


	return {
		statuses: taskStatuses,
		companies: taskCompanies,
		projects: (projectsOnly.concat(archived)),
		users,
		tags,
		taskAttributes,
		token,
		user,
		filter,
		body,
		total,
	};
};

export default connect(
	mapStateToProps,
	{ setFilterBody, createFilter, deleteFilter, editFilter, changeUpdateAt }
)(Filter);
