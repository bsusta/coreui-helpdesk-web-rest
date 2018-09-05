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
import i18n from 'i18next';

export default class Tasks extends Component {
	render() {
		return (
			<div className="row tasksDiv">
				<div className="col-3" style={{ padding: '0' }}>
					<Filter history={this.props.history} match={this.props.match} />
				</div>

				<div className='col-9' style={{ padding: '0' }}>
				<TaskList  history={this.props.history} match={this.props.match} />
				</div>
			</div>
		);
	}
}
