import React, { Component } from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import TaskList from './taskList';
import {
	Card,
	CardHeader,
	InputGroup,
InputGroupAddon
} from 'reactstrap';
import Pagination from '../../components/pagination';
import { timestampToString, createEmptyFilterBody } from '../../helperFunctions';
import {setTripod,setShowFilter, setFilterBody, setFilterForceUpdate, setColumns,
	addActiveRequests, getProject,	getFilter, setResetableFilter} from '../../redux/actions';
import i18n from 'i18next';
import FourColumn from './fourColumn';
import Columns from './columns';

const currentUser= [{ label: 'Current user', id: 'CURRENT-USER', value: 'CURRENT-USER' }];

class Tasks extends Component {

	constructor(props){
		super(props);
		this.resetFilter.bind();
	}

	getFilterItem(ID,items){
		let res=items.find((item)=>item.id&&item.id.toString()===ID);
		if(res===undefined){
			return false;
		}
		res.label=res.name;
		res.value=res.id;
		return res;
	}

	resetFilter(){
		let urlData=this.props.match.params;
		let body={...this.props.body};
		body.body=createEmptyFilterBody();
		if(urlData.id){
			body.filterID=urlData.id;
		}else{
			body.filterID=null;
		}
		if(urlData.tagID){
			body.tagID=urlData.tagID;
			let tag = this.getFilterItem(urlData.tagID,this.props.tags);
			body.body.tags=tag?[tag]:[];
		}
		if(!urlData.tagID){
			body.tagID=null;
		}
		if(urlData.projectID){
			body.projectID=urlData.projectID;
			let project = this.getFilterItem(urlData.projectID,this.props.projects);
			if(urlData.projectID!=='all'){
				this.props.addActiveRequests(1);
				this.props.getProject(urlData.projectID,this.props.history,this.props.token);
			}
			if(project){
				body.body.projects=[project];
			}
		}
		if(urlData.count){
			body.count=urlData.count;
		}
		this.props.setResetableFilter(false);
			body.page=1;
			if(urlData.id&& urlData.id!=='add'){
        this.props.addActiveRequests(2);
				this.props.getFilter(this.props.taskAttributes,this.props.statuses,this.props.projects,this.props.users,this.props.tags,this.props.companies,this.props.history,body,this.props.token);
			}else{
				this.props.setFilterBody(body);
				this.props.setFilterForceUpdate(true);
			}
	}

	render() {
		let selectedStatusesIDs=this.props.body.body.statuses.map((item2)=>item2.id);
		let myTasksActive = JSON.stringify(this.props.body.body.requesters)===JSON.stringify(currentUser)&&JSON.stringify(this.props.body.body.assignedTos)===JSON.stringify(currentUser);
		let header = i18n.t('unknownSearch');
		let icon = 'fa fa-search';
		if (this.props.body.filterID) {
			if(this.props.body.filterID !== 'add'){
				let index = this.props.filters.findIndex(filter => filter.url.includes(this.props.body.filterID));
				if (index !== -1) {
					header = this.props.filters[index].name;
					icon = this.props.filters[index].icon;
				}
			}else{
				let index = this.props.projects.findIndex(project => project.id && project.id.toString() === this.props.match.params.projectID);
				if(this.props.body.projectID!=='all' && index !== -1){
					header = this.props.projects[index].name;
					icon = 'fa fa-folder-open';
				}else{
					if(this.props.globalSearch){
						header = i18n.t('globalSearch');						
					}else{
						header = i18n.t('newFilter');
						icon = 'fa fa-filter';
					}
				}
			}
		} else if (this.props.match.params.tagID) {
			let index = this.props.tags.findIndex(tag => tag.id && tag.id.toString() === this.props.match.params.tagID);
			if (index !== -1) {
				header = this.props.tags[index].name
				icon = this.props.user.user_role.acl.includes('share_tags')||!this.props.tags[index].public ?'fa fa-cog clickableIcon':'fa fa-cog';
			}
		}
		else if (this.props.body.body.search!=='') {
			header = i18n.t('search') + ': ' + this.props.body.body.search;
		} else {
			header = i18n.t('search');
		}
		return (
			<div className="row" style={{margin:10}}>
			<CardHeader className="card-header-ubold" style={{padding:0}}>
				<div className="row d-flex flex-row justify-content-between" style={{width:'100%'}}>
					<h4 style={{fontSize:24}}>
					<i className={icon} onClick={()=>{
							if(this.props.body.tagID){
								if(this.props.user.user_role.acl.includes('share_tags')||tag.public){
									let tag=this.props.tags.find((item)=>parseInt(item.id)===parseInt(this.props.body.tagID));
									this.props.history.push('/tag/edit/' + this.props.body.tagID);
								}
							}
						}} />
					<span style={{paddingLeft:0}}>{" "+header}</span>
				</h4>
				</div>
		</CardHeader>
		<div className="row d-flex flex-row justify-content-between" style={{width:'100%', ...(this.props.showFilter?{paddingLeft:334}:{})}}>
			<div className="page-menu row">
		<button className="btn btn-primary waves-effect waves-light btn-sm" type="button" onClick={() => this.props.setShowFilter(!this.props.showFilter)}>
			<i style={{fontSize:18}} className="fa fa-filter"/>
		</button>
		<span className="form-check center-hor checkbox">
			<input
				type="checkbox"
				id="statusCheckbox-all"
				checked={selectedStatusesIDs.length===this.props.taskStatuses.length}
				onChange={() =>{
					if(selectedStatusesIDs.length!==0){
						let body = {...this.props.body.body,statuses:[...this.props.taskStatuses]};
						this.props.setFilterBody({body});
						this.props.setFilterForceUpdate(true);
					}
				}
			}
			className="form-check-input"
			/>
		<label className="form-check-label" htmlFor="statusCheckbox-all">
			{i18n.t('all')}
		</label>
	</span>
	{
		this.props.taskStatuses.map((item)=>
		<span className="form-check center-hor checkbox" key={item.id}>
			<input
				type="checkbox"
				id={'statusCheckbox-'+item.id}
				checked={selectedStatusesIDs.includes(item.id)}
				onChange={() =>{
					let newStatuses=this.props.body.body.statuses;
					if(selectedStatusesIDs.includes(item.id)){
						newStatuses.splice(newStatuses.findIndex((item2)=>item.id===item2.id),1);
					}else{
						newStatuses.push(item);
					}

					let body = {...this.props.body.body,statuses:[...newStatuses]};
					this.props.setFilterBody({ body });
					this.props.setFilterForceUpdate(true);
				}
			}
			className="form-check-input"
			/>
		<label className="form-check-label" htmlFor={'statusCheckbox-'+item.id}>
			{item.title}
		</label>
	</span>
	)}

	{this.props.resetableFilter && <button className="btn btn-primary waves-effect waves-light btn-sm" type="button"
		onClick={this.resetFilter.bind(this)}
		>
			<i className="fa fa-remove" style={{paddingRight:5}}/>
			{i18n.t('filterActive')}
	</button>}

		</div>
	<div className="btn-group" role="group" aria-label="Basic example" style={{float:'right'}}>
			<button onClick={() => {this.props.setTripod(false);this.props.setColumns(false);}} type="button" className={"btn btn-secondary"+((!this.props.columns&&!this.props.tripod)?' active':'')}>
				<i
					className="fa fa-list listSelectButton"
					/>
			</button>
			<button onClick={() => {this.props.setTripod(false);this.props.setColumns(!this.props.columns);}} type="button" className={"btn btn-secondary"+(this.props.columns?' active':'')}>
				<i
					className="fa fa-map listSelectButton"
				/>
		</button>
			<button onClick={() => {this.props.setTripod(!this.props.tripod);this.props.setColumns(false);}} type="button" className={"btn btn-secondary"+(this.props.tripod?' active':'')}>
				<i
					className="fa fa-columns listSelectButton"
				/>
			</button>
		</div>
	</div>
		<div style={{width:'100%'}} className="row">
				<div className="col-3" style={{ display: this.props.showFilter ? 'block' : 'none', padding: '0' }}>
					<Filter history={this.props.history} match={this.props.match} />
				</div>

				<div className={this.props.showFilter ? 'col-9' : 'col-12'} style={{ padding: 0, paddingTop:10 }}>

					<Card>
						{this.props.tripod &&
							<FourColumn history={this.props.history} match={this.props.match} headerText={header} headerIcon={icon}/>
						}
						{this.props.columns &&
							<Columns  history={this.props.history} match={this.props.match} headerText={header} headerIcon={icon}/>
						}
						{!this.props.tripod && !this.props.columns &&
							<TaskList  history={this.props.history} match={this.props.match} headerText={header} headerIcon={icon}/>
						}
					</Card>
				</div>
			</div>
			</div>
		);
	}
}

const mapStateToProps = ({  filtersReducer, tasksReducer,taskAttributesReducer,companiesReducer,  sidebarReducer, statusesReducer,usersReducer,  login }) => {
	const { showFilter, body, resetableFilter, globalSearch } = filtersReducer;
	const { tripod , columns } = tasksReducer;
	const { taskAttributes} = taskAttributesReducer;
	const { taskCompanies } = companiesReducer;
	const { taskStatuses } = statusesReducer;
	const { users } = usersReducer;
	const { user, token } = login;
	const { sidebar } = sidebarReducer;
	let projectsOnly = sidebar?sidebar.projects.children:[];
	let archived = sidebar?sidebar.archived.children:[];
	let tags = sidebar?sidebar.tags.children:[];
	let filters = sidebar?sidebar.filters.children:[];
	return {
		showFilter,
		resetableFilter,
		taskStatuses,
		companies: taskCompanies,
		statuses:taskStatuses,
		users,
		taskAttributes,
		body,
		columns,
		tripod,
		projectsOnly,
		globalSearch,
		archived,
		projects:[...projectsOnly,...archived],
		tags,
		filters,
		user,
		token
	};
};

export default connect(mapStateToProps,{setTripod,setShowFilter,setFilterBody, setFilterForceUpdate, setColumns, addActiveRequests, getProject,	getFilter, setResetableFilter})(Tasks);
