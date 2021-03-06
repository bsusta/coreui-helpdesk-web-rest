import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	ButtonGroup,
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	Input,
	FormGroup,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from 'reactstrap';
import Subtasks from './Subtasks';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Select from 'react-select';
import CompanyAdd from '../settings/companyAdd';
import UserAdd from '../settings/userAdd';
import { getTaskSolvers, deleteTaskSolvers, addTask, uploadFile, removeFile } from '../../redux/actions';
import {
	timestampToString,
	initialiseCustomAttributes,
	processCustomAttributes,
	importExistingCustomAttributesForTask,
	containsNullRequiredAttribute,
} from '../../helperFunctions';
import MultiSelect from '../../components/multiSelect';
import i18n from 'i18next';

const workTypes = [
	'vzdialena podpora',
	'servis IT',
	'servis serverov',
	'programovanie www',
	'instalacie klientskeho os',
	'bug reklamacia',
	'navrh',
	'material',
	'cenova ponuka',
	'administrativa',
	'konzultacia',
	'refakturacia',
	'testovanie',
];

const colourStyles = {
	control: styles => ({
		...styles,
		backgroundColor: 'white',
		borderRadius: '0',
		border: '1px solid #c2cfd6',
	}),
};

class AddTask extends Component {
	constructor(props) {
		super(props);
		//we initialize all tasks aditional attributes
		let task_data = initialiseCustomAttributes([...this.props.taskAttributes]);
		let id =this.props.filterState&&this.props.filterState.projects&&this.props.filterState.projects.length>0?this.props.filterState.projects[0].id:null;
		let project = "null";
		if(id!==null && this.props.taskProjects.some((item)=>item.id===id)){
			project = id;
		}
		this.state = {
			company: this.props.companies[
				this.props.companies.findIndex(company => company.id === this.props.user.company.id)
			],
			deadline: null,
			startedAt: null,
			description: '',
			important: false,
			project,
			requestedBy: this.props.users[this.props.users.findIndex(user => user.id === this.props.user.id)],
			status: this.props.statuses.length > 0 ? this.props.statuses[0].id : null,
			tags: [],
			title: '',
			workTime: '',
			work: 'vzdialena podpora',
			newTags: [],
			newTag: '',
			submitError: false,
			task_data,
			taskSolver: 'null',
			subtasks: [],
			materials: [],
			followers: [],
			openAddUser: false,
			openAddCompany: false,
		};
		this.submit.bind(this);
	}

	/**
	 * Adds new task
	 * @return {null}
	 */
	submit() {
		this.setState({ submitError: true });
		//we create copy of the state so we can transform data
		let state = { ...this.state };
		let task_data = processCustomAttributes({ ...state.task_data }, [...this.props.taskAttributes]);
		//checks if all requirements for creating were met
		if (
			containsNullRequiredAttribute(task_data, [...this.props.taskAttributes]) ||
			this.state.title === '' ||
			this.state.requestedBy === undefined ||
			this.state.project === 'null' ||
			this.state.company === undefined
		) {
			return;
		}

		//as a tags we send titles not ids
		let tags = [];
		state.tags.map(addTag => tags.push(this.props.tags.concat(state.newTags).find(tag => tag.id == addTag).title));

		//ak je task uzvrety nastavi mu closedAt, ak nema startedAt tak ten tiez
		let closedAt = this.state.closedAt ? this.state.closedAt : 'null';
		if (state.status.toString() === '4') {
			closedAt = Math.ceil(moment().valueOf() / 1000);
			if (state.startedAt === null) {
				state.startedAt = closedAt * 1000;
			}
		}

		this.props.addTask(
			{
				title: state.title,
				closedAt,
				description: state.description === '' ? 'null' : state.description,
				deadline: state.deadline !== null ? state.deadline.valueOf() / 1000 : 'null',
				startedAt: state.startedAt !== null ? state.startedAt.valueOf() / 1000 : 'null',
				important: state.important,
				workType: state.work,
				workTime: state.workTime.length == 0 ? undefined : state.workTime,
				tag: JSON.stringify(tags),
				assigned: state.taskSolver != 'null' ? JSON.stringify([{ userId: parseInt(state.taskSolver) }]) : null,
				attachment:
					this.props.attachments.length === 0
						? undefined
						: JSON.stringify(this.props.attachments.map(attachment => attachment.id)),
				taskData: JSON.stringify(task_data),
			},
			this.state.subtasks,
			this.state.materials,
			this.state.followers.map((user)=>user.id),
			state.project,
			state.status,
			state.requestedBy.id,
			state.company.id,
			this.props.token
		);
		this.props.history.goBack();
	}

	render() {
		//cant create task without project
		if (this.props.taskProjects.length===0) {
			return (
				<div>
					<Card>
						<CardHeader>
							<h5 style={{ color: 'red' }}>{i18n.t('restrictionCantCreateTaskWithoutProject')}</h5>
						</CardHeader>
					</Card>
				</div>
			);
		}
		return (
			<div>
				<Modal isOpen={this.state.openAddCompany} className="lg">
					<ModalBody style={{ padding: 0 }}>
						<CompanyAdd
							history={this.props.history}
							modal={() => {
								this.setState({ openAddCompany: false });
								this.props.getTaskCompanies(this.props.companiesUpdateDate, this.props.token);
							}}
						/>
					</ModalBody>
				</Modal>

				<Modal isOpen={this.state.openAddUser} className="lg">
					<ModalBody style={{ padding: 0 }}>
						<UserAdd
							history={this.props.history}
							modal={() => {
								this.setState({ openAddUser: false });
								this.props.getUsers('', this.props.token);
							}}
						/>
					</ModalBody>
				</Modal>

				<Card>
					<CardHeader>
						<button className="btn btn-link" onClick={this.props.history.goBack}>
							<i className="fa fa-ban" /> {i18n.t('cancel')}
						</button>
						<button className="btn btn-link" onClick={this.submit.bind(this)}>
							<i className="fa fa-save" /> {i18n.t('create')}
						</button>
					</CardHeader>
					<CardBody>
						<div className="task-header">
							<div className="col-8">
								<div className="form-group">
									<InputGroup>
										<InputGroupAddon className="task-header-input">
											<span className="float">
												<i
													className={'fa fa-star icon-star'}
													style={{ fontSize: '1.97em', float: 'left' }}
													onClick={() => {
														if (!this.state.important) {
															this.setState({ important: true });
														}
													}}
												/>
												{this.state.important && (
													<i
														className={
															'fa fa-star ' +
															(this.state.important ? 'icon-star-empty' : 'icon-star')
														}
														style={{
															color: !this.state.important ? 'black' : 'yellow',
															fontSize: '1.74em',
															marginLeft: '-1.02em',
															marginTop: '0.115em',
															float: 'left',
														}}
														onClick={() => {
															this.setState({ important: false });
														}}
													/>
												)}
											</span>
										</InputGroupAddon>

										<input
											className="form-control task-header-input"
											id="title"
											placeholder={i18n.t('enterTitle')}
											value={this.state.title}
											style={{ fontSize: 24 }}
											onChange={e => {
												this.setState({ title: e.target.value });
											}}
										/>
									</InputGroup>
								</div>
							</div>
							{this.state.submitError &&
								this.state.title === '' && (
									<label htmlFor="title" className="input-label" style={{ color: 'red' }}>
										{i18n.t('restrictionMustEnterTaskTitle')}
									</label>
								)}
						</div>
						<div>
							<div className="row">
								<div className="col-8 task-edit-col-1">
									<div className="form-group">
										<MultiSelect
											id="tags"
											data={this.props.tags}
											displayValue="title"
											selectedIds={this.state.tags}
											idValue="id"
											filterBy="title"
											display="row"
											colored={true}
											displayBoxStyle={{ overflowX: 'auto' }}
											menuItemStyle={{
												marginLeft: 7,
												marginRight: 7,
												marginTop: 2,
												marginBottom: 2,
												paddingTop: 2,
												paddingBottom: 2,
											}}
											renderItem={item => (
												<span
													key={item.id}
													className="badge"
													style={{
														margin: 'auto',
														borderRadius: '3px',
														color: 'white',
														backgroundColor:
															(item.color.includes('#') ? '' : '#') + item.color,
														paddingLeft: 10,
														paddingRight: 10,
														paddingTop: 5,
														paddingBottom: 5,
														marginLeft: 5,
													}}
												>
													{item.title}
												</span>
											)}
											titleStyle={{
												color: 'black',
												size: '0.875rem',
											}}
											toggleStyle={{
												border: 'none',
												padding: 0,
												fontSize: '0.875rem',
											}}
											label={i18n.t('selectTags')}
											labelStyle={{ marginLeft: 10 }}
											searchStyle={{ margin: 5 }}
											onChange={(ids, items) => {
												this.setState({ tags: ids });
											}}
										/>
									</div>

									<FormGroup>
										<label htmlFor="description" className="input-label">
											{i18n.t('description')}
										</label>
										<InputGroup>
											<textarea
												className="form-control"
												id="description"
												rows={4}
												value={this.state.description}
												onChange={e => {
													this.setState({ description: e.target.value });
												}}
												placeholder={i18n.t('enterDescription')}
											/>
										</InputGroup>
									</FormGroup>

									<Subtasks
										units={this.props.units}
										subtasks={this.state.subtasks}
										materials={this.state.materials}
										onChangeSubtasks={subtasks => {
											this.setState({ subtasks });
										}}
										onChangeMaterials={materials => {
											this.setState({ materials });
										}}
									/>
								</div>

								<div className="col-4 task-edit-col-2">
									<FormGroup>
										<label htmlFor="status" className="input-label">
											{i18n.t('status')}
										</label>
										<InputGroup>
											<InputGroupAddon>
												<i className="fa fa-list" />
											</InputGroupAddon>
											<select
												className="form-control"
												style={{
													color: 'white',
													backgroundColor: this.props.statuses.find(
														status => status.id == this.state.status
													).color,
												}}
												value={this.state.status}
												id="status"
												onChange={e => {
													this.setState({ status: e.target.value });
												}}
											>
												{this.props.statuses.map(status => (
													<option
														key={status.id}
														style={{
															color: 'white',
															backgroundColor: status.color,
														}}
														value={status.id}
													>
														{status.title}
													</option>
												))}
											</select>
										</InputGroup>
									</FormGroup>

									<FormGroup>
										<label htmlFor="project" className="req input-label">
											{i18n.t('project')}
										</label>
										<InputGroup>
											<InputGroupAddon>
												<i className="fa fa-folder-o" />
											</InputGroupAddon>
											<select
												className="form-control"
												id="project"
												value={this.state.project}
												onChange={e => {
													this.setState({
														project: e.target.value,
														taskSolver: 'null',
													});
													this.props.deleteTaskSolvers();
													if(e.target.value!=='null'){
														this.props.getTaskSolvers(e.target.value, this.props.token);
													}
												}}
											>
												{[{id:"null",title:''}].concat(this.props.taskProjects).map(project => (
													<option key={project.id} value={project.id}>
														{project.title}
													</option>
												))}
											</select>
										</InputGroup>
										{this.state.submitError &&
											this.state.project === "null" && (
												<label htmlFor="title" className="input-label" style={{ color: 'red' }}>
													{i18n.t('restrictionMustSelectProject')}
												</label>
											)}
									</FormGroup>

									<FormGroup>
										<label htmlFor="requester" className="req input-label">
											{i18n.t('requester')}
										</label>
										{this.props.user.user_role.acl.includes('user_settings') && (
											<span style={{ float: 'right' }}>
												<button
													style={{
														float: 'right',
														paddingTop: 0,
														paddingBottom: 0,
														paddingLeft: 5,
														paddingRight: 5,
													}}
													className="btn btn-sm btn-primary mr-1"
													onClick={() => this.setState({ openAddUser: true })}
												>
													<i className="fa fa-plus " />
												</button>
											</span>
										)}
										<InputGroup>
											<InputGroupAddon>
												<i className="fa fa-user-o" />
											</InputGroupAddon>
											<Select
												styles={colourStyles}
												className="fullWidth"
												options={this.props.users.map(user => {
													user.label =
														(user.name ? user.name : '') +
														' ' +
														(user.surname ? user.surname : '');
													if (user.label === ' ') {
														user.label = user.email;
													} else {
														user.label = user.label + ' (' + user.email + ')';
													}
													user.value = user.id;
													return user;
												})}
												value={this.state.requestedBy}
												onChange={e => {
													this.setState({
														requestedBy: e,
														company: this.props.companies[
															this.props.companies.findIndex(
																item => item.id === e.company.id
															)
														],
													});
												}}
											/>
										</InputGroup>
										{this.state.submitError &&
											this.state.requestedBy.id === undefined && (
												<label htmlFor="title" className="input-label" style={{ color: 'red' }}>
													{i18n.t('restrictionMustSelectRequester')}
												</label>
											)}
									</FormGroup>

									<FormGroup>
										<label htmlFor="company" className="req input-label">
											{i18n.t('company')}
										</label>
										{this.props.user.user_role.acl.includes('company_settings') && (
											<span style={{ float: 'right' }}>
												<button
													style={{
														float: 'right',
														paddingTop: 0,
														paddingBottom: 0,
														paddingLeft: 5,
														paddingRight: 5,
													}}
													className="btn btn-sm btn-primary mr-1"
													onClick={() => this.setState({ openAddCompany: true })}
												>
													<i className="fa fa-plus " />
												</button>
											</span>
										)}

										<InputGroup>
											<InputGroupAddon>
												<i className="fa fa-building-o" />
											</InputGroupAddon>
											<Select
												styles={colourStyles}
												className="fullWidth"
												options={this.props.companies.map(company => {
													company.label = company.title;
													company.value = company.id;
													return company;
												})}
												value={this.state.company}
												onChange={e => {
													this.setState({ company: e });
												}}
											/>
										</InputGroup>
										{this.state.submitError &&
											this.state.company === undefined && (
												<label htmlFor="title" className="input-label" style={{ color: 'red' }}>
													{i18n.t('restrictionMustSelectCompany')}
												</label>
											)}
									</FormGroup>
									<FormGroup>
										<label htmlFor="assigned" className="input-label">
											{i18n.t('assigned')}
										</label>
										<InputGroup>
											<InputGroupAddon>
												<i className="fa fa-user-plus" />
											</InputGroupAddon>
											<select
												className="form-control"
												id="assigned"
												value={this.state.taskSolver}
												onChange={e => {
													this.setState({ taskSolver: e.target.value });
												}}
											>
												{[{ id: 'null', username: i18n.t('noone') }]
													.concat(this.props.taskSolvers)
													.map(solver => (
														<option key={solver.id} value={solver.id}>
															{solver.username}
														</option>
													))}
											</select>
										</InputGroup>
									</FormGroup>

	                <FormGroup>
	                  <label htmlFor="followers" className="input-label">
	                    {i18n.t('followers')}
	                  </label>
	                  <InputGroup>
	                    <InputGroupAddon>
	                      <i className="fa fa-user-plus" />
	                    </InputGroupAddon>
	                  <Select
	                   styles={colourStyles}
	                   className="fullWidth"
	                    options={this.props.users.map(user => {
	                      user.label = user.email;
	                      user.value = user.id;
	                      return user;
	                    })}
	                    isMulti
	                    value={this.state.followers}
	                    onChange={(e) => {
	                      this.setState({followers:e});
	                    }}
	                  />
	                </InputGroup>
	                </FormGroup>


									<FormGroup>
										<label htmlFor="work" className="input-label">
											{i18n.t('work')}
										</label>
										<InputGroup>
											<InputGroupAddon>
												<i className="fa fa-list" />
											</InputGroupAddon>
											<select
												className="form-control"
												id="work"
												value={this.state.work}
												onChange={e => {
													this.setState({ work: e.target.value });
												}}
											>
												{workTypes.map(type => (
													<option key={type} value={type}>
														{type}
													</option>
												))}
											</select>
										</InputGroup>
									</FormGroup>

									<FormGroup>
										<label htmlFor="workTime" className="input-label">
											{i18n.t('workTime')}
										</label>
										<InputGroup>
											<InputGroupAddon>
												<i className="fa fa-hourglass-o" />
											</InputGroupAddon>
											<input
												className="form-control"
												type="number"
												id="workTime"
												value={this.state.workTime}
												onChange={e => {
													this.setState({ workTime: e.target.value });
												}}
												placeholder={i18n.t('enterWorkTime')}
											/>
										</InputGroup>
									</FormGroup>

									<FormGroup>
										<label htmlFor="startedAt" className="input-label">
											{i18n.t('startedAt')}
										</label>
										<InputGroup>
											<InputGroupAddon>
												<i className="fa fa-clock-o" />
											</InputGroupAddon>
											<div style={{ width: '100%' }} className="datepickerWrap">
												<DatePicker
													selected={this.state.startedAt}
													onChange={e => {
														this.setState({ startedAt: e });
													}}
													locale="en-gb"
													placeholderText="Started at"
													showTimeSelect
													timeFormat="HH:mm"
													timeIntervals={30}
													dateFormat="DD.MM.YYYY HH:mm"
												/>
											</div>
										</InputGroup>
									</FormGroup>

									<FormGroup>
										<label htmlFor="deadline" className="input-label">
											{i18n.t('dueDate')}
										</label>
										<InputGroup>
											<InputGroupAddon>
												<i className="fa fa-clock-o" />
											</InputGroupAddon>
											<div style={{ width: '100%' }} className="datepickerWrap">
												<DatePicker
													selected={this.state.deadline}
													onChange={e => {
														this.setState({ deadline: e });
													}}
													locale="en-gb"
													placeholderText={i18n.t('deadline')}
													showTimeSelect
													timeFormat="HH:mm"
													timeIntervals={30}
													dateFormat="DD.MM.YYYY HH:mm"
												/>
											</div>
										</InputGroup>
									</FormGroup>

									{false && ( //this is not implemented yet
										<FormGroup>
											<label htmlFor="assigned" className="input-label">
												Opakovanie
											</label>
											<InputGroup>
												<InputGroupAddon>
													<i className="fa fa-repeat" />
												</InputGroupAddon>
												<Dropdown
													isOpen={this.state.dropdownOpen}
													toggle={this.toggle}
													style={{ width: '100%' }}
												>
													<DropdownToggle
														style={{
															width: '100%',
															textAlign: 'left',
															backgroundColor: 'white',
														}}
														caret
													>
														no repeat
													</DropdownToggle>
													<DropdownMenu style={{ width: '100%' }}>
														<div className="form-group" style={{ width: '100%' }}>
															<label
																htmlFor="exampleDropdownFormEmail1"
																className="input-label"
															>
																Repeat every
															</label>
															<input
																type="email"
																className="form-control"
																id="exampleDropdownFormEmail1"
																style={{ width: '100%' }}
															/>
														</div>
														<div className="form-group">
															<label
																htmlFor="exampleDropdownFormEmail1"
																className="input-label"
															>
																Start date
															</label>
															<input
																type="email"
																className="form-control"
																id="exampleDropdownFormEmail1"
																style={{ width: '100%' }}
															/>
														</div>
														<button type="submit" className="btn btn-primary">
															Save
														</button>
													</DropdownMenu>
												</Dropdown>
											</InputGroup>
										</FormGroup>
									)}

									<div className="form-group" style={{ marginBottom: 0 }}>
										<label htmlFor="fileUpload" className="input-label">
											{i18n.t('attachments')}
										</label>
										<input
											type="file"
											id="fileUpload"
											style={{ display: 'none' }}
											onChange={e => {
												this.setState({ showUploadError: false });
												let file = e.target.files[0];
												if (file === undefined) {
													return;
												}
												if (file.size > 10000000) {
													this.setState({ showUploadError: true });
													return;
												}
												let self = this;
												this.props.uploadFile(file, this.props.token);
											}}
										/>
										<label className="btn btn-primary btn-block" htmlFor="fileUpload">
											{i18n.t('addAttachment')}
										</label>
									</div>
									{this.state.showUploadError && (
										<span style={{ color: 'red' }}>This file is too big!</span>
									)}

									<div className="form-group">
										<div style={{ paddingTop: 5, paddingRight: 10 }}>
											{this.props.attachments.map(item => (
												<span
													key={item.id}
													className="badge"
													style={{
														backgroundColor: '#d3eef6',
														color: 'black',
														paddingLeft: 10,
														paddingRight: 10,
														paddingTop: 5,
														paddingBottom: 5,
														marginLeft: 5,
														marginTop: 1,
														width: '100%',
														display: 'flex',
													}}
												>
													<div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
														{!item.url && item.file.name}
														{item.url && <a href={item.url}>{item.file.name}</a>}
													</div>
													<div style={{ flex: 1 }} />
													{item.file.size && (
														<div
															style={{
																marginTop: 'auto',
																marginBottom: 'auto',
															}}
														>
															{item.file.size > 10000 &&
																Math.ceil(item.file.size / 1000) + 'kb'}
															{item.file.size <= 10000 && item.file.size + 'b'}
														</div>
													)}

													<button
														type="button"
														className="close"
														aria-label="Close"
														style={{ marginTop: 'auto', marginBottom: 'auto' }}
														onClick={() => {
															this.props.removeFile(item.id, this.props.token);
															let self = this;
														}}
													>
														<span
															aria-hidden="true"
															style={{
																color: 'black',
																padding: 5,
																paddingBottom: 10,
																margin: 0,
															}}
														>
															&times;
														</span>
													</button>
												</span>
											))}
										</div>
									</div>

									{this.props.taskAttributes.filter(item => item.is_active).map(attribute => {
										//Here we load in all custom attributes
										switch (attribute.type) {
											case 'input':
												return (
													<div className="form-group" key={attribute.id}>
														<label
															htmlFor={attribute.id}
															className={
																attribute.required ? 'req input-label' : ' input-label'
															}
														>
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
														{attribute.required &&
															this.state.task_data[attribute.id] === '' && (
																<label htmlFor="title" style={{ color: 'red' }}>
																	{i18n.t('restrictionFieldRequired')}
																</label>
															)}
													</div>
												);
											case 'text_area':
												return (
													<div className="form-group" key={attribute.id}>
														<label
															htmlFor={attribute.id}
															className={
																attribute.required ? 'req input-label' : 'input-label'
															}
														>
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
														{attribute.required &&
															this.state.task_data[attribute.id] === '' && (
																<label htmlFor="title" style={{ color: 'red' }}>
																	{i18n.t('restrictionFieldRequired')}
																</label>
															)}
													</div>
												);
											case 'simple_select':
												return (
													<div className="form-group" key={attribute.id}>
														<label
															htmlFor={attribute.id}
															className={
																attribute.required ? 'req input-label' : 'input-label'
															}
														>
															{attribute.title}
														</label>
														<select
															className="form-control"
															id={attribute.id}
															value={this.state.task_data[attribute.id]}
															onChange={e => {
																let newData = { ...this.state.task_data };
																newData[attribute.id] = e.target.value;
																this.setState({ task_data: newData });
															}}
														>
															{Array.isArray(attribute.options) &&
																attribute.options.map(opt => (
																	<option key={opt} value={opt}>
																		{opt}
																	</option>
																))}
															{!Array.isArray(attribute.options) &&
																Object.keys(attribute.options).map(key => (
																	<option key={key} value={key}>
																		{key}
																	</option>
																))}
														</select>
													</div>
												);
											case 'multi_select': {
												let opt = [];
												attribute.options.map(att =>
													opt.push({
														id: attribute.options.indexOf(att),
														title: att,
													})
												);
												return (
													<div className="form-group" key={attribute.id}>
														<MultiSelect
															id={attribute.id}
															data={opt}
															displayValue="title"
															selectedIds={this.state.task_data[attribute.id]}
															idValue="id"
															filterBy="title"
															title={attribute.title}
															display="row"
															displayBoxStyle={{ width: 100 }}
															menuItemStyle={{
																marginLeft: 7,
																marginRight: 7,
																marginTop: 2,
																marginBottom: 2,
																paddingTop: 2,
																paddingBottom: 2,
															}}
															renderItem={item => (
																<span
																	className="badge"
																	key={item.id}
																	style={{
																		margin: 'auto',
																		border: '1px solid black',
																		borderRadius: '3px',
																		paddingLeft: 10,
																		paddingRight: 10,
																		paddingTop: 5,
																		paddingBottom: 5,
																		marginLeft: 5,
																	}}
																>
																	{item.title}
																</span>
															)}
															titleStyle={{
																backgroundColor: 'white',
																color: 'black',
																size: 15,
															}}
															toggleStyle={{
																backgroundColor: 'white',
																border: 'none',
																padding: 0,
															}}
															label={attribute.title}
															labelStyle={{ marginLeft: 10 }}
															searchStyle={{ margin: 5 }}
															onChange={(ids, items) => {
																let newData = { ...this.state.task_data };
																newData[attribute.id] = ids;
																this.setState({ task_data: newData });
															}}
														/>
													</div>
												);
											}
											case 'date':
												return (
													<div className="form-group" key={attribute.id}>
														<label
															htmlFor={attribute.id}
															className={
																attribute.required ? 'req input-label' : 'input-label'
															}
														>
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
														{attribute.required &&
															this.state.task_data[attribute.id] === null && (
																<label htmlFor="title" style={{ color: 'red' }}>
																	{i18n.t('restrictionFieldRequired')}
																</label>
															)}
													</div>
												);
											case 'decimal_number':
												return (
													<div className="form-group" key={attribute.id}>
														<label
															htmlFor={attribute.id}
															className={
																attribute.required ? 'req input-label' : 'input-label'
															}
														>
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
														{attribute.required &&
															isNaN(parseFloat(this.state.task_data[attribute.id])) && (
																<label htmlFor="title" style={{ color: 'red' }}>
																	{i18n.t('restrictionFieldRequired')}
																</label>
															)}
													</div>
												);
											case 'integer_number':
												return (
													<div className="form-group" key={attribute.id}>
														<label
															htmlFor={attribute.id}
															className={
																attribute.required ? 'req input-label' : 'input-label'
															}
														>
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
														{attribute.required &&
															isNaN(parseFloat(this.state.task_data[attribute.id])) && (
																<label htmlFor="title" style={{ color: 'red' }}>
																	{i18n.t('restrictionFieldRequired')}
																</label>
															)}
													</div>
												);
											case 'checkbox':
												return (
													<div className="form-group" key={attribute.id}>
														<label className="form-check-label">
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
							</div>
						</div>
					</CardBody>
				</Card>
			</div>
		);
	}
}

//all below is just redux storage
const mapStateToProps = ({
	tasksReducer,
	statusesReducer,
	companiesReducer,
	tagsReducer,
	unitsReducer,
	login,
	usersReducer,
	attachmentsReducer,
	followersReducer,
	taskAttributesReducer,
	filtersReducer,
}) => {
	const { task, taskProjects, taskSolvers } = tasksReducer;
	const { taskAttributes } = taskAttributesReducer;
	const { taskStatuses } = statusesReducer;
	const { taskCompanies } = companiesReducer;
	const { tags } = tagsReducer;
	const { units } = unitsReducer;
	const { users } = usersReducer;
	const { filterState } = filtersReducer;
	const { attachments } = attachmentsReducer;
	const { followers } = followersReducer;
	const { user, token } = login;
	return {
		task,
		taskProjects,
		filterState,
		companies: taskCompanies,
		taskAttributes,
		statuses: taskStatuses,
		tags,
		units,
		taskSolvers,
		users,
		attachments,
		followers,
		user,
		token,
	};
};

export default connect(
	mapStateToProps,
	{
		getTaskSolvers,
		deleteTaskSolvers,
		addTask,
		uploadFile,
		removeFile,
	}
)(AddTask);
