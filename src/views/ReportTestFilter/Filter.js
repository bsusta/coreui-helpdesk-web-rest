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
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const fakeData=[{value:'opt1',label:'opt1'},{value:'opt2',label:'opt2'},{value:'opt3',label:'opt3'},{value:'opt4',label:'opt4'},{value:'opt5',label:'opt5'},{value:'opt6',label:'opt6'},{value:'opt7',label:'opt7'},{value:'opt8',label:'opt8'},{value:'opt9',label:'opt9'},{value:'opt10',label:'opt10'},{value:'opt11',label:'opt11'}];

const colourStyles = {
	control: styles => ({
		...styles,
		backgroundColor: 'white',
		borderRadius: '0',
		border: '1px solid #c2cfd6',
	}),
};

export default class Filter extends Component {
	constructor(props) {
		super(props);
		this.createState.bind(this);
		this.state = this.createState(false);
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
		return state;
	}

	render() {
		return (
			<div className="filterDivInside">
				<div>
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
						</ModalBody>
						<ModalFooter className="justify-content-between">
							<button className="btn btn-danger mr-1" onClick={() => this.setState({ saveOpen: false })}>
								{i18n.t('cancel')}
							</button>

							{this.props.filter &&
								this.props.match.params.id &&
								this.props.filter.id === parseInt(this.props.match.params.id) && (
									<button className="btn btn-primary mr-1" onClick={() => this.setState({ saveOpen: false })}>
										{i18n.t('saveFilter')}
									</button>
								)}

							<button className="btn btn-primary mr-1" onClick={() => this.setState({ saveOpen: false })}>
								{i18n.t('addNew')}
							</button>
						</ModalFooter>
					</Modal>

					<div className="card-header">
						<button
							type="button"
							className="btn btn-link"
							style={{ paddingLeft: 0 }}
						>
							{i18n.t('apply')}
						</button>
						<button
							type="button"
							className="btn btn-link"
							onClick={() => this.setState({ saveOpen: true })}
						>
							{i18n.t('save')}
						</button>
							<button type="button" className="btn btn-link">
								{i18n.t('delete') + ' ' + i18n.t('report')}
							</button>
						<button
							type="button"
							className="btn btn-link"
							onClick={() => {
								this.setState(this.createState(true));
							}}
						>
							{i18n.t('reset')}
						</button>
					</div>

					<div style={{ padding: 20 }}>
						<div className="row" style={{ marginBottom: 25 }}>
							<h2>{i18n.t('report')}</h2>
						</div>

						<FormGroup>
							<label htmlFor="title" className="input-label">
								{i18n.t('filterByName')}
							</label>
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
								options={fakeData}
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
							options={fakeData}
							onChange={e => this.setState({ requesters: e })}
						/>

						<label className="mt-2 input-label">{i18n.t('company')}</label>
						<Select
							options={fakeData}
							isMulti
							styles={colourStyles}
							onChange={e => this.setState({ companies: e })}
							value={this.state.companies}
						/>

						<label className="mt-2 input-label">{i18n.t('assigned')}</label>
						<Select
							styles={colourStyles}
							isMulti
							options={fakeData}
							onChange={e => this.setState({ assignedTos: e })}
							value={this.state.assignedTos}
						/>

						<label className="mt-2 input-label">{i18n.t('createdBy')}</label>
						<Select
							styles={colourStyles}
							isMulti
							options={fakeData}
							onChange={e => this.setState({ creators: e })}
							value={this.state.creators}
						/>
						<label className="mt-1">{i18n.t('follower')}</label>
						<Select
							isMulti
							styles={colourStyles}
							options={fakeData}
							onChange={e => this.setState({ followers: e })}
							value={this.state.followers}
						/>
						<label className="mt-2 input-label">{i18n.t('tag')}</label>
						<Select
							options={fakeData}
							isMulti
							styles={colourStyles}
							style={{ width: '100%' }}
							onChange={e => this.setState({ tags: e })}
							value={this.state.tags}
						/>

						<div className="form-check" style={{ marginTop: 10 }}>
							<label className="form-check-label input-label">
								<input
									type="checkbox"
									checked={this.state.archived}
									onChange={() => {
										this.setState({ archived: !this.state.archived });
									}}
									className="form-check-input"
								/>
								{i18n.t('archived')}
							</label>
						</div>
						<div className="form-check">
							<label className="form-check-label input-label">
								<input
									type="checkbox"
									checked={this.state.important}
									onChange={() => {
										this.setState({ important: !this.state.important });
									}}
									className="form-check-input"
								/>
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
								<div className="form-group">
									<label className="form-check-label input-label">
										<input
											type="checkbox"
											className="form-check-input"
											checked={this.state.createdToNow}
											onChange={() => this.setState({ createdToNow: !this.state.createdToNow })}
										/>
										{i18n.t('now')}
									</label>
								</div>
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
									<label className="form-check-label input-label">
										<input
											type="checkbox"
											className="form-check-input"
											checked={this.state.startedToNow}
											onChange={() => this.setState({ startedToNow: !this.state.startedToNow })}
										/>
										{i18n.t('now')}
									</label>
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
									<label className="form-check-label input-label">
										<input
											type="checkbox"
											className="form-check-input"
											checked={this.state.deadlineToNow}
											onChange={() => this.setState({ deadlineToNow: !this.state.deadlineToNow })}
										/>
										{i18n.t('now')}
									</label>
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
									<label className="form-check-label input-label">
										<input
											type="checkbox"
											className="form-check-input"
											checked={this.state.closedToNow}
											onChange={() => this.setState({ closedToNow: !this.state.closedToNow })}
										/>
										{i18n.t('now')}
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
