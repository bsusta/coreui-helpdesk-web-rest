import React, { Component } from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import Report from './report';
import {
	Card,
	CardHeader
} from 'reactstrap';
import Pagination from '../../components/pagination';
import { timestampToString } from '../../helperFunctions';
import {setShowReport, setReportBody, setReportForceUpdate} from '../../redux/actions';
import i18n from 'i18next';

const currentUser= [{ label: 'Current user', id: 'CURRENT-USER', value: 'CURRENT-USER' }];

class Tasks extends Component {
	render() {
		let selectedStatusesIDs=this.props.body.body.statuses.map((item2)=>item2.id);
		let myTasksActive = JSON.stringify(this.props.body.body.requesters)===JSON.stringify(currentUser)&&JSON.stringify(this.props.body.body.assignedTos)===JSON.stringify(currentUser);
		let header = i18n.t('search');
		let icon = 'fa fa-search';
			if(this.props.body.reportID !== 'add'){
				let index = this.props.filters.findIndex(filter => filter.url.includes(this.props.body.reportID));
				if (index !== -1) {
					header = this.props.filters[index].name;
					icon = this.props.filters[index].icon;
				}
			}
		return (
			<div className="row" style={{margin:10}}>
			<CardHeader className="card-header-ubold">
				<i className={icon} />
				<span>{header}</span>
		</CardHeader>
	<div className="page-menu row">
		<button className="btn btn-success waves-effect waves-light btn-sm" type="button" onClick={() => this.props.setShowReport(!this.props.showFilter)}>
			{i18n.t('filter')}
		</button>
		<span className="form-check center-hor checkbox">
			<input
				type="checkbox"
				id="statusCheckbox-all"
				checked={selectedStatusesIDs.length===this.props.taskStatuses.length}
				onChange={() =>{
					if(selectedStatusesIDs.length!==0){
						let body = {...this.props.body.body,statuses:[...this.props.taskStatuses]};
						this.props.setReportBody({body});
						this.props.setReportForceUpdate(true);
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
					this.props.setReportBody({ body });
					this.props.setReportForceUpdate(true);
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
			<div className={this.props.showFilter ? 'col-9' : 'col-12'} style={{ padding: 0, paddingTop:10 }}>

				<Card>
					<Report history={this.props.history} match={this.props.match}/>
				</Card>
			</div>
		</div>
		</div>
		);
	}
}

const mapStateToProps = ({ reportsReducer, tasksReducer, sidebarReducer, statusesReducer, login }) => {
	const { showFilter, body } = reportsReducer;
	const { tripod , columns } = tasksReducer;
	const { taskStatuses } = statusesReducer;
	const { user } = login;
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
		filters,
		user
	};
};

export default connect(mapStateToProps,{setShowReport,setReportBody, setReportForceUpdate})(Tasks);
