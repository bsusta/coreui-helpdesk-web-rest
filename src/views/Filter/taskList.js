import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFilterPage, setShowFilter, loadUnsavedFilter, setFilterOrder, setFilterBody } from '../../redux/actions';
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

class TaskList extends Component {
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

	createArrow(type){
		if(this.props.body.order==='order='+type+'=>asc'){
			return (
      <span className="tableArrow">
				<i className="fa fa-arrow-up colorLightBlue" onClick={()=>this.props.setFilterOrder('order='+type+'=>desc')}/>
			</span>)
    }
		return (
    <span className="tableArrow">
  		<i className={this.props.body.order==='order='+type+'=>desc'?"fa fa-arrow-down colorLightBlue":"fa fa-arrow-down"}
  		onClick={()=>this.props.setFilterOrder((this.props.body.order===('order='+type+'=>desc'))?('order='+type+'=>asc'):('order='+type+'=>desc'))}/>
  	</span>)
  }

render(){
  return(<div>
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
			{i18n.t('filter')}
		</label>
	</CardHeader>
	<div className="table-div">
    <h2 className="h2">
      <i className={this.props.headerIcon} onClick={()=>{
          if(this.props.body.tagID){
            if(this.props.user.user_role.acl.includes('share_tags')||tag.public){
              let tag=this.props.tags.find((item)=>parseInt(item.id)===parseInt(this.props.body.tagID));
              this.props.history.push('/tag/edit/' + this.props.body.tagID);
            }
          }
        }} />
			<span>{this.props.headerText}</span>
    </h2>
    <table className="table table-hover table-sm">
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
          <tr style={{ cursor: 'pointer' }} className="taskListRowHeight" key={task.id}
            onClick={() => {
              if(this.props.body.filterID){
                if (task.canEdit) {
                  this.props.history.push(
                    '/filter/' +
                    this.props.body.filterID +
                    '/project/' +
                    this.props.match.params.projectID +
                    '/task/edit/' +
                    task.id
                  );
                } else {
                  this.props.history.push(
                    '/filter/' +
                    this.props.body.filterID +
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
                    '/project/' +
                    this.props.match.params.projectID +
                    '/task/edit/' +
                    task.id
                  );
                } else {
                  this.props.history.push(
                    '/tag/' +
                    this.props.match.params.tagID +
                    '/project/' +
                    this.props.match.params.projectID +
                    '/task/view/' +
                    task.id
                  );
                }
              }else{
                console.log('unexpected');
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
							{false &&
              <p>
                { task.tags.map(tag => (
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
              </p>}
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
      link={this.props.body.filterID?
        'filter/'+this.props.body.filterID+'/project/'+this.props.body.projectID:
        'tag/'+this.props.body.tagID+'/project/'+this.props.body.projectID}
      history={this.props.history}
      numberOfPages={this.props.numberOfPages}
      refetchData={() => {}}
      token={this.props.token}
      disabled={this.props.body === null}
      refetchParameters={[]}
      pageNumber={parseInt(this.props.body.page)}
      setPageNumber={page => {
        this.props.setFilterBody({page});
      }}
      paginationOptions={[
        { title: 20, value: 20 },
        { title: 50, value: 50 },
        { title: 100, value: 100 },
      ]}
      onPaginationChange={count => {
        this.props.setFilterBody({count});
      }}
      pagination={
        parseInt(this.props.body.count)
      }
    />
	</div>
  </div>)
  }
}

const mapStateToProps = ({ filtersReducer,tasksReducer, sidebarReducer, projectsReducer, login }) => {
	const { tasks, numberOfPages, body, showFilter } = filtersReducer;
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
		projects:projectsOnly.concat(archived),
		tags,
		numberOfPages,
		body,
		user,
		showFilter,
		project,
		filters,
		token,
	};
};

export default connect(
	mapStateToProps,
	{ setFilterPage, setShowFilter, loadUnsavedFilter, setFilterOrder,setFilterBody }
)(TaskList);
