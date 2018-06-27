import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTagTasks } from '../../redux/actions';
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

class Tag extends Component {
	usersToString(users) {
		if (users.length === 0) {
			return i18n.t('none');
		}
		let text = '';
		Object.values(users).map(solver => (text = text + (solver.user.username + ' ')));
		return text;
	}

	render() {
		return (
			<div>
				<CardHeader />
				<div className="table-div">
					<h2 className="h2">
						<a
						href={'#/tag/edit/' + parseInt(this.props.match.params.id, 10)}
						className="fa fa-cog tag-settings-icon"
						/>
						{
							this.props.tags[
								this.props.tags.findIndex(tag => tag.url.includes(this.props.match.params.id))
							].name
						}{' '}
					</h2>

					<div>
						<table className="table table-striped table-hover table-sm">
							<thead className="thead-inverse">
								<tr>
									<th style={{ width: '3%', borderTop: '0px' }}>{i18n.t('id')}</th>
									<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('status')}</th>
									<th style={{ borderTop: '0px' }}>{i18n.t('title')}</th>
									<th style={{ width: '10%', borderTop: '0px' }}>{i18n.t('requester')}</th>
									<th style={{ width: '10%', borderTop: '0px' }}>{i18n.t('company')}</th>
									<th style={{ width: '10%', borderTop: '0px' }}>{i18n.t('assigned')}</th>
									<th style={{ width: '10%', borderTop: '0px' }}>{i18n.t('project')}</th>
									<th style={{ width: '10%', borderTop: '0px' }}>{i18n.t('createdAt')}</th>
									<th style={{ width: '10%', borderTop: '0px' }}>{i18n.t('dueDate')}</th>
								</tr>
							</thead>
							<tbody>
								{this.props.tasks.map(task => (
									<tr style={{ cursor: 'pointer' }} key={task.id}>
										<td style={{ verticalAlign: 'center' }}>{task.id}</td>
										<td>
											<span
												className="badge badge-success"
												style={{ backgroundColor: task.status.color }}
											>
												{task.status.title}
											</span>
										</td>
										<td
											onClick={() => {
												if (task.canEdit) {
													this.props.history.push(
														'/tag/' + this.props.tagID + '/task/edit/' + task.id
													);
												} else {
													this.props.history.push(
														'/tag/' + this.props.tagID + '/task/view/' + task.id
													);
												}
											}}
										>
											{task.title}
											<p>
												{task.tags.map(tag => (
													<span
														className="badge mr-1"
														key={tag.id}
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
										<td>{task.project ? task.project.title : 'No project'}</td>
										<td>{timestampToString(task.createdAt)}</td>
										<td>{task.deadline ? timestampToString(task.deadline) : i18n.t('none')}</td>
									</tr>
								))}
							</tbody>
						</table>
						<Pagination
							link={'tag/' + this.props.match.params.id}
							disabled={false}
							history={this.props.history}
							numberOfPages={this.props.numberOfPages}
							refetchData={() => {}}
							token={this.props.token}
							refetchParameters={[parseInt(this.props.match.params.id, 10)]}
							pageNumber={this.props.page}
							setPageNumber={this.props.setPage}
							paginationOptions={[
								{ title: 20, value: 20 },
								{ title: 50, value: 50 },
								{ title: 100, value: 100 },
							]}
							pagination={
								this.props.match.params.count ? parseInt(this.props.match.params.count, 10) : 20
							}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ tasksReducer, sidebarReducer, login }) => {
	const { tasks, tagLinks } = tasksReducer;
	const { sidebar } = sidebarReducer;
	const { token } = login;
	return {
		tasks,
		tags: sidebar[sidebar.findIndex(item => item.name === 'tags')].children,
		numberOfPages: tagLinks.numberOfPages,
		tagID: tagLinks.id,
		token,
	};
};

export default connect(
	mapStateToProps,
	{ getTagTasks }
)(Tag);
