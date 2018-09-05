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

class Tasks extends Component {
	render() {
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
								{i18n.t('filter')}
							</label>
							<i
								className="fa fa-columns"
								style={{
									cursor: 'pointer',
									border: 'none',
									float:'right',
									color: this.props.tripod?'#20a8d8':'grey',
									fontSize: '2em',
								}}
								onClick={() => this.props.setTripod(!this.props.tripod)}
							/>
						</CardHeader>
						{this.props.tripod &&
							<FourColumn history={this.props.history} match={this.props.match} />
						}
						{!this.props.tripod &&
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
	const { tripod } = tasksReducer;
	return {
		showFilter,
		tripod
	};
};

export default connect(mapStateToProps,{setTripod,setShowFilter})(Tasks);
