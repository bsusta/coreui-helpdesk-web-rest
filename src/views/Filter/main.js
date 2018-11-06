import React, { Component } from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import TaskList from './taskList';
import {
	Card,
	CardHeader
} from 'reactstrap';
import Pagination from '../../components/pagination';
import { timestampToString } from '../../helperFunctions';
import {setTripod,setShowFilter, setFilterBody} from '../../redux/actions';
import i18n from 'i18next';
import FourColumn from './fourColumn';
import Columns from './columns';

const currentUser= [{ label: 'Current user', id: 'CURRENT-USER', value: 'CURRENT-USER' }];

class Tasks extends Component {
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
					header = i18n.t('newFilter'),
					icon = 'fa fa-filter'
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
			<CardHeader className="card-header-ubold">
				<i className={icon} onClick={()=>{
						if(this.props.body.tagID){
							if(this.props.user.user_role.acl.includes('share_tags')||tag.public){
								let tag=this.props.tags.find((item)=>parseInt(item.id)===parseInt(this.props.body.tagID));
								this.props.history.push('/tag/edit/' + this.props.body.tagID);
							}
						}
					}} />
				<span>{header}</span>
		</CardHeader>
	<div className="page-menu row">
		<button className="btn btn-success waves-effect waves-light btn-sm" type="button" onClick={() => this.props.setShowFilter(!this.props.showFilter)}>
			{i18n.t('filter')}
		</button>
		<span className="form-check center-hor checkbox">
			<input
				type="checkbox"
				id='statusCheckbox-myTasks'
				checked={myTasksActive}
				onChange={() =>{
					if(myTasksActive){
						let body = {...this.props.body.body,requesters:[],assignedTos:[]};
						this.props.setFilterBody({body});
					}else{
						let body = {...this.props.body.body,requesters:currentUser,assignedTos:currentUser};
						this.props.setFilterBody({body});
					}
				}}
				className="form-check-input"
				/>
			<label className="form-check-label" htmlFor='statusCheckbox-myTasks'>
				{i18n.t('myTasks')}
			</label>
		</span>
		<span className="form-check center-hor checkbox">
			<input
				type="checkbox"
				id="statusCheckbox-all"
				checked={selectedStatusesIDs.length===0}
				onChange={() =>{
					console.log('aha');
					if(selectedStatusesIDs.length!==0){
						let body = {...this.props.body.body,statuses:[]};
						this.props.setFilterBody({body});
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
				}
			}
			className="form-check-input"
			/>
		<label className="form-check-label" htmlFor={'statusCheckbox-'+item.id}>
			{item.title}
		</label>
	</span>
)
}
</div>
		<div style={{width:'100%'}} className="row">
				<div className="col-3" style={{ display: this.props.showFilter ? 'block' : 'none', padding: '0' }}>
					<Filter history={this.props.history} match={this.props.match} />
				</div>

				<div className={this.props.showFilter ? 'col-9' : 'col-12'} style={{ padding: '0' }}>

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

const mapStateToProps = ({ filtersReducer, tasksReducer, sidebarReducer, statusesReducer }) => {
	const { showFilter, body } = filtersReducer;
	const { tripod , columns } = tasksReducer;
	const { taskStatuses } = statusesReducer;
	const { sidebar } = sidebarReducer;
	let projectsOnly = sidebar?sidebar.projects.children:[];
	let archived = sidebar?sidebar.archived.children:[];
	let tags = sidebar?sidebar.tags.children:[];
	let filters = sidebar?sidebar.filters.children:[];
	return {
		showFilter,
		taskStatuses,
		body,
		columns,
		tripod,
		projectsOnly,
		archived,
		projects:[...projectsOnly,...archived],
		tags,
		filters
	};
};

export default connect(mapStateToProps,{setTripod,setShowFilter,setFilterBody})(Tasks);
