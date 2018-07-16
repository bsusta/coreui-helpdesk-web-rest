import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFilterPage, setShowFilter, loadUnsavedFilter, setFilterOrder } from '../../redux/actions';
import Filter from './Filter';
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
import Pagination from '../../components/pagination';
import { timestampToString } from '../../helperFunctions';
import i18n from 'i18next';

class Tasks extends Component {
	constructor(props) {
		super(props);
		this.createArrow.bind(this);
		this.state = {
			search: '',
		};
	}
	usersToString(users) {
		if (users.length === 0) {
			return i18n.t('none');
		}
		let text = '';
		Object.values(users).map(solver => (text = text + (solver.user.username + ' ')));
		return text;
	}

	componentWillMount() {
		return;
		if (this.props.body !== null) {
			let page = this.props.match.params ? this.props.match.params.page : 1;
			let count = this.props.match.params ? this.props.match.params.count : 20;
			this.props.loadUnsavedFilter(
				this.props.match.params.count ? this.props.match.params.count : 20,
				this.props.page,
				this.props.body,
				this.props.order,
				this.props.token
			);
		}
	}

	createArrow(type) {
		if (this.props.order === 'order=' + type + '=>asc') {
			return (
				<span className="tableArrow">
					<i
						className="fa fa-arrow-up colorLightBlue"
						onClick={() => this.props.setFilterOrder('order=' + type + '=>desc')}
					/>
				</span>
			);
		}
		return (
			<span className="tableArrow">
				<i
					className={
						this.props.order === 'order=' + type + '=>desc'
							? 'fa fa-arrow-down colorLightBlue'
							: 'fa fa-arrow-down'
					}
					onClick={() =>
						this.props.setFilterOrder(
							this.props.order === 'order=' + type + '=>desc'
								? 'order=' + type + '=>asc'
								: 'order=' + type + '=>desc'
						)
					}
				/>
			</span>
		);
	}

	render() {
		let header = i18n.t('unknownSearch');
		let icon = 'fa fa-search';
		if (this.props.match.params.id && this.props.match.params.id !== 'add') {
			let index = this.props.filters.findIndex(filter => filter.url.includes(this.props.match.params.id));
			if (index !== -1) {
				header = this.props.filters[index].name;
				icon = this.props.filters[index].icon;
			}
		} else if (this.props.match.params.tagID) {
			let index = this.props.tags.findIndex(tag => tag.id && tag.id.toString() === this.props.match.params.tagID);
			if (index !== -1) {
				header = this.props.tags[index].name;
				icon =
					this.props.user.user_role.acl.includes('share_tags') || !this.props.tags[index].public
						? 'fa fa-cog clickableIcon'
						: 'fa fa-cog';
			}
		} else if (this.props.match.params.projectID) {
			let index = this.props.projects.findIndex(
				project => project.id && project.id.toString() === this.props.match.params.projectID
			);
			if (index !== -1) {
				header = this.props.projects[index].name;
				icon = 'fa fa-info-circle clickableIcon';
			}
		} else if (this.props.match.params.id === 'add') {
			header = i18n.t('filter');
			icon = 'fa fa-plus';
		} else if (this.props.body && this.props.body.includes('search')) {
			header = i18n.t('search') + ': ' + this.props.body.split('=')[1].split('&')[0];
		} else {
			header = i18n.t('search');
		}

		return (
			<div className="row tasksDiv">
				<div className="col-3" style={{ display: this.props.showFilter ? 'block' : 'none', padding: '0' }}>
					<Filter history={this.props.history} match={this.props.match} />
				</div>

				<div className={this.props.showFilter ? 'col-9' : ''} style={{ padding: '0' }}>
					<Card>
						<div
							className="d-flex align-items-center"
							style={{ height: 50, backgroundColor: '#f4f9fd', margin: 0 }}
						>
						
								<div className="p-2 align-self-center" style={{}}>
									<button
										type="button"
										className="btn btn-link"
										style={{}}
										onClick={() => this.props.setShowFilter(!this.props.showFilter)}
									>
										<span className="mr-2">
											<i class="fa fa-filter" />
										</span>
										Filter
									</button>
								</div>
					
							<div className="p-2" style={{}}>
								<InputGroup style={{ borderRight: '1px solid #D9D9D9' }}>
									<Input
										type="text"
										id="search"
										style={{ width: 300 }}
										value={this.state.search}
										onChange={e => this.setState({ search: e.target.value })}
										placeholder="Search task name"
										className="searchInput"
										onKeyPress={e => {
											if (e.key === 'Enter') {
												this.props.setFilterBody(
													'search=' + this.state.search,
													{ title: this.state.search },
													1
												);
												this.props.history.push('/filter/1,20');
											}
										}}
									/>
									<InputGroupAddon
										className="searchButton"
										onClick={() => {
											this.props.setFilterBody(
												'search=' + this.state.search,
												{ title: this.state.search },
												1
											);
											this.props.history.push('/filter/1,20');
										}}
									>
										<i className="fa fa-search" />
									</InputGroupAddon>
								</InputGroup>
							</div>
							<div className="p-2 align-self-center" style={{}}>
								<button type="button" className="btn btn-link" style={{}}>
									Click to global search
								</button>
							</div>
							<span style={{ color: 'red' }}>Tasks number: {this.props.total}</span>
						</div>

						<div className="table-div">
							<h2 className="h2">
								<i
									className={icon}
									onClick={() => {
										if (this.props.match.params.projectID) {
											this.props.history.push(
												(this.props.project &&
												this.props.project.id.toString() ===
													this.props.match.params.projectID.toString() &&
												this.props.project.canEdit
													? '/project/edit/'
													: '/project/info/') + this.props.match.params.projectID
											);
										} else if (
											this.props.match.params.tagID &&
											(this.props.user.user_role.acl.includes('share_tags') ||
												!this.props.tags[index].public)
										) {
											this.props.history.push('/tag/edit/' + this.props.match.params.tagID);
										}
									}}
								/>
								<span>{header}</span>
							</h2>
							<table className="table table-striped table-hover table-sm">
								<thead className="thead-inverse">
									<tr>
										<th style={{ width: '3%', borderTop: '0px' }}>
											{i18n.t('id')}
											{this.createArrow('id')}
										</th>
										<th style={{ width: '5%', borderTop: '0px' }}>
											{i18n.t('status')}
											{this.createArrow('status')}
										</th>
										<th style={{ width: '5%', borderTop: '0px' }}>
											{i18n.t('title')}
											{this.createArrow('title')}
										</th>
										<th style={{ width: '5%', borderTop: '0px' }}>
											{i18n.t('requester')}
											{this.createArrow('requester')}
										</th>
										<th style={{ width: '5%', borderTop: '0px' }}>
											{i18n.t('company')}
											{this.createArrow('taskCompany')}
										</th>
										<th style={{ width: '5%', borderTop: '0px' }}>
											{i18n.t('assigned')}
											{this.createArrow('assigned')}
										</th>
										<th style={{ width: '5%', borderTop: '0px' }}>
											{i18n.t('project')}
											{this.createArrow('project')}
										</th>
										<th style={{ width: '5%', borderTop: '0px' }}>
											{i18n.t('createdAt')}
											{this.createArrow('createdTime')}
										</th>
										<th style={{ width: '5%', borderTop: '0px' }}>
											{i18n.t('deadline')}
											{this.createArrow('deadlineTime')}
										</th>
									</tr>
								</thead>
								<tbody>
									{this.props.tasks.map(task => (
										<tr
											style={{ cursor: 'pointer' }}
											key={task.id}
											onClick={() => {
												if (this.props.match.params.id) {
													if (task.canEdit) {
														this.props.history.push(
															'/filter/' +
																this.props.match.params.id +
																'/task/edit/' +
																task.id
														);
													} else {
														this.props.history.push(
															'/filter/' +
																this.props.match.params.id +
																'/task/view/' +
																task.id
														);
													}
												} else if (this.props.match.params.projectID) {
													if (task.canEdit) {
														this.props.history.push(
															'/project/' +
																this.props.match.params.projectID +
																'/task/edit/' +
																task.id
														);
													} else {
														this.props.history.push(
															'/project/' +
																this.props.match.params.projectID +
																'/task/view/' +
																task.id
														);
													}
												} else if (this.props.match.params.tagID) {
													if (task.canEdit) {
														this.props.history.push(
															'/tag/' +
																this.props.match.params.tagID +
																'/task/edit/' +
																task.id
														);
													} else {
														this.props.history.push(
															'/tag/' +
																this.props.match.params.tagID +
																'/task/view/' +
																task.id
														);
													}
												} else {
													if (task.canEdit) {
														this.props.history.push('/filter/add/task/edit/' + task.id);
													} else {
														this.props.history.push('/filter/add/task/view/' + task.id);
													}
												}
											}}
										>
											<td style={{ verticalAlign: 'center' }}>{task.id}</td>
											<td>
												<span
													className="badge badge-success"
													style={{ backgroundColor: task.status.color }}
												>
													{task.status.title}
												</span>
											</td>
											<td style={{ width: '14%' }}>
												{task.title}
												<p>
													{task.tags.map(tag => (
														<span
															key={tag.id}
															className="badge mr-1"
															style={{
																backgroundColor:
																	(tag.color.includes('#') ? '' : '#') + tag.color,
																color: 'white',
															}}
														>
															{tag.title}
														</span>
													))}
												</p>
											</td>
											<td>{task.requestedBy.username}</td>
											<td>{task.company.title}</td>
											<td>{this.usersToString(task.taskHasAssignedUsers)}</td>
											<td>{task.project.title}</td>
											<td>{timestampToString(task.createdAt)}</td>
											<td>{task.deadline ? timestampToString(task.deadline) : i18n.t('none')}</td>
										</tr>
									))}
								</tbody>
							</table>
							<Pagination
								link={this.props.match.params.projectID ? 'project' : 'filter'}
								history={{ push: () => {} }}
								numberOfPages={this.props.numberOfPages}
								refetchData={() => {}}
								token={this.props.token}
								disabled={this.props.body === null}
								refetchParameters={[]}
								pageNumber={
									this.props.match.params.page
										? this.props.tasks.length > 0
											? parseInt(this.props.match.params.page, 10)
											: 0
										: 0
								}
								setPageNumber={pageNumber => {
									this.props.setFilterPage(pageNumber);
								}}
								paginationOptions={[
									{ title: 20, value: 20 },
									{ title: 50, value: 50 },
									{ title: 100, value: 100 },
								]}
								onPaginationChange={count => {
									this.props.history.push(
										'/filter/' +
											(this.props.match.params.id
												? this.props.match.params.id + '/1,' + count
												: '1,' + count)
									);
								}}
								pagination={
									this.props.match.params.count ? parseInt(this.props.match.params.count, 10) : 20
								}
							/>
						</div>
					</Card>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ filtersReducer, tasksReducer, sidebarReducer, projectsReducer, login }) => {
	const { tasks, numberOfPages, body, filterState, showFilter, page, order } = filtersReducer;
	const { taskProjects } = tasksReducer;
	const { sidebar } = sidebarReducer;
	const { project } = projectsReducer;
	const { token, user } = login;
	let index = sidebar.findIndex(item => item.name === 'projects');
	let index2 = sidebar.findIndex(item => item.name === 'archived');
	let index3 = sidebar.findIndex(item => item.name === 'tags');

	return {
		tasks,
		order,
		projects: (index === -1 ? [] : sidebar[index].children).concat(index2 === -1 ? [] : sidebar[index2].children),
		tags: index3 === -1 ? [] : sidebar[index3].children,
		numberOfPages,
		body,
		page,
		user,
		filterState,
		showFilter,
		project,
		filters: sidebar[sidebar.findIndex(item => item.name === 'filters')].children,
		token,
	};
};

export default connect(
	mapStateToProps,
	{ setFilterPage, setShowFilter, loadUnsavedFilter, setFilterOrder }
)(Tasks);
