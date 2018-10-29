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
import {setTripod,setShowFilter} from '../../redux/actions';
import i18n from 'i18next';
import FourColumn from './fourColumn';
import Columns from './columns';

class Tasks extends Component {
	render() {
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
			<div className="row">
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
		);
	}
}

const mapStateToProps = ({ filtersReducer, tasksReducer, sidebarReducer }) => {
	const { showFilter, body } = filtersReducer;
	const { tripod , columns } = tasksReducer;
	const { sidebar } = sidebarReducer;
	let projectsOnly = sidebar?sidebar.projects.children:[];
	let archived = sidebar?sidebar.archived.children:[];
	let tags = sidebar?sidebar.tags.children:[];
	let filters = sidebar?sidebar.filters.children:[];
	return {
		showFilter,
		body,
		columns,
		tripod,
		projectsOnly,
		archived,
		tags,
		filters
	};
};

export default connect(mapStateToProps,{setTripod,setShowFilter})(Tasks);
