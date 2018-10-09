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
		return (
			<div className="row tasksDiv">
				<div className="col-3" style={{ display: this.props.showFilter ? 'block' : 'none', padding: '0' }}>
					<Filter history={this.props.history} match={this.props.match} />
				</div>

				<div className={this.props.showFilter ? 'col-9' : 'col-12'} style={{ padding: '0' }}>
					<Card>
						{this.props.tripod &&
							<FourColumn history={this.props.history} match={this.props.match} />
						}
						{this.props.columns &&
							<Columns  history={this.props.history} match={this.props.match} />
						}
						{!this.props.tripod && !this.props.columns &&
							<TaskList  history={this.props.history} match={this.props.match} />
						}
					</Card>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ filtersReducer, tasksReducer }) => {
	const { showFilter } = filtersReducer;
	const { tripod , columns } = tasksReducer;
	return {
		showFilter,
		columns,
		tripod
	};
};

export default connect(mapStateToProps,{setTripod,setShowFilter})(Tasks);
