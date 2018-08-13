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
	constructor(props){
		super(props);
		this.createArrow.bind(this);
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

	createArrow(type){
		if(this.props.order==='order='+type+'=>asc'){
			return <span className="tableArrow">
				<i className="fa fa-arrow-up colorLightBlue" onClick={()=>this.props.setFilterOrder('order='+type+'=>desc')}/>
			</span>
		}
		return <span className="tableArrow">
		<i className={this.props.order==='order='+type+'=>desc'?"fa fa-arrow-down colorLightBlue":"fa fa-arrow-down"}
		onClick={()=>this.props.setFilterOrder((this.props.order===('order='+type+'=>desc'))?('order='+type+'=>asc'):('order='+type+'=>desc'))}/>
	</span>
}

	render() {
		console.log('did it');
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
				header = this.props.tags[index].name
				icon = this.props.user.user_role.acl.includes('share_tags')||!this.props.tags[index].public ?'fa fa-cog clickableIcon':'fa fa-cog';
			}
		}else if (this.props.match.params.projectID) {
			let index = this.props.projects.findIndex(project => project.id && project.id.toString() === this.props.match.params.projectID);
			if (index !== -1) {
				header = this.props.projects[index].name;
				icon = 'fa fa-info-circle clickableIcon';
			}
		}else if (this.props.match.params.id==='add') {
			header = i18n.t('filter');
			icon = 'fa fa-plus';
		}
		else if (this.props.body && this.props.body.includes('search')) {
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
						<CardHeader>
							<label className="switch switch-text switch-primary">
								<input
									type="checkbox"
									className="switch-input"
									checked={this.props.showFilter}
									onChange={() => this.props.setShowFilter(!this.props.showFilter)}
								/>
								<span className="switch-label" data-on="On" data-off="Off" />
								<span className="switch-handle" />
							</label>
							<label style={{ paddingLeft: 10 }}>
								{this.props.showFilter ? i18n.t('Filter') : i18n.t('Filter')}
							</label>
						</CardHeader>

						<div className="table-div">
							<h2 className="h2">
								<i className={icon} onClick={()=>{
										if(this.props.match.params.projectID){
											this.props.history.push((
												(this.props.project && this.props.project.id.toString()===this.props.match.params.projectID.toString() && this.props.project.canEdit) ?
												'/project/edit/' : '/project/info/') + this.props.match.params.projectID);
										}else if(this.props.match.params.tagID && (this.props.user.user_role.acl.includes('share_tags')||!this.props.tags[index].public)){
											this.props.history.push('/tag/edit/' + this.props.match.params.tagID);
										}
									}} />
								<span>{header}</span>
							</h2>
							<table className="table table-striped table-hover table-sm">
								<thead className="thead-inverse">
									<tr>
										<th style={{ width: '3%', borderTop: '0px' }}>
											{i18n.t('id')}
											{this.createArrow('id')}
										</th>
										<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('status')}
											{this.createArrow('status')}
										</th>
										<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('title')}
											{this.createArrow('title')}
										</th>
										<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('requester')}
											{this.createArrow('requester')}
										</th>
										<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('company')}
											{this.createArrow('taskCompany')}
										</th>
										<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('assigned')}
											{this.createArrow('assigned')}
										</th>
										<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('project')}
											{this.createArrow('project')}
										</th>
										<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('createdAt')}
											{this.createArrow('createdTime')}
										</th>
										<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('deadline')}
											{this.createArrow('deadlineTime')}
										</th>
									</tr>
								</thead>
								<tbody>
									{this.props.tasks.map(task => (
										<tr style={{ cursor: 'pointer' }} key={task.id}
											onClick={() => {
												if(this.props.match.params.id){
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
												}else if(this.props.match.params.projectID){
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
												}else if(this.props.match.params.tagID){
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
												}else{
													if (task.canEdit) {
														this.props.history.push(
															'/filter/add/task/edit/'+
															task.id
														);
													} else {
														this.props.history.push(
															'/filter/add/task/view/'+
															task.id
														);
													}
												}
											}}>
											<td style={{ verticalAlign: 'center' }}>{task.id}</td>
											<td>
												<span
													className="badge badge-success"
													style={{ backgroundColor: task.status.color }}
												>
													{task.status.title}
												</span>
											</td>
											<td style={{width:'14%'}}>
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
								link={this.props.match.params.projectID?"project":'filter'}
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

const mapStateToProps = ({ filtersReducer,tasksReducer, sidebarReducer, projectsReducer, login }) => {
	const { tasks, numberOfPages, body, filterState, showFilter, page, order } = filtersReducer;
	const { taskProjects } = tasksReducer;
	const { sidebar } = sidebarReducer;
	const { project } = projectsReducer;
	const { token,user } = login;
	let projectsOnly = sidebar?sidebar.projects.children:[];
	let archived = sidebar?sidebar.archived.children:[];
	let tags = sidebar?sidebar.tags.children:[];
	let filters = sidebar?sidebar.filters.children:[];

	return {
		tasks,
		order,
		projects:projectsOnly.concat(archived),
		tags,
		numberOfPages,
		body,
		page,
		user,
		filterState,
		showFilter,
		project,
		filters,
		token,
	};
};

export default connect(
	mapStateToProps,
	{ setFilterPage, setShowFilter, loadUnsavedFilter, setFilterOrder }
)(Tasks);
