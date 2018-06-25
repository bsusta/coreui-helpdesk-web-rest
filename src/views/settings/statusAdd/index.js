import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addStatus } from '../../../redux/actions';
import { SketchPicker } from 'react-color';
import i18n from 'i18next';

const funcOptions = [
	{ value: 'null', title: 'none' },
	{ value: 'new_task', title: 'newTask' },
	{ value: 'in_progress_task', title: 'taskInProgress' },
	{ value: 'completed_task', title: 'completedTask' },
	{ value: 'closed_task', title: 'closedTask' },
];

class StatusAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			order: 5,
			func: 'null',
			color: '#156EEB',
			submitError: false,
		};
	}

	submit(e) {
		e.preventDefault();
		this.setState({ submitError: true });
		let body = {
			title: this.state.title,
			description: this.state.description,
			order: parseInt(this.state.order),
			color: this.state.color,
		};
		if (this.state.func !== 'null') {
			body['function'] = this.state.func;
		}
		if (body.title === '' || isNaN(body.order)) {
			return;
		}

		this.props.addStatus(body, this.props.token);
		this.props.history.goBack();
	}

  
	render() {
		return (
			<div className="card">
				<div className="card-header" />
				<div className="card-body">
					<h2 className="h2" className="h2-setting-list">{i18n.t('addStatus')}</h2>
					<form
						onSubmit={(event, value) => {
							event.preventDefault();
							this.props.history.goBack();
						}}
					>
						<div className="form-group">
							<label className= "input-label" htmlFor="title" className="req input-label">
								{i18n.t('statusName')}
							</label>
							<input
								className="form-control"
								id="title"
								value={this.state.title}
								onChange={e => this.setState({ title: e.target.value })}
								placeholder={i18n.t('enterStatusName')}
							/>
						</div>
						{this.state.submitError &&
							this.state.title === '' && (
								<label className= "input-label" htmlFor="title" style={{ color: 'red' }}>
									{i18n.t('restrictionMustEnterStatusName')}
								</label>
							)}

						<div className="form-group">
							<label className= "input-label" htmlFor="order" className="req input-label">
								{i18n.t('order')}
							</label>
							<input
								className="form-control"
								id="order"
								type="number"
								value={this.state.order}
								onChange={e => this.setState({ order: e.target.value })}
								placeholder={i18n.t('enterStatusOrder')}
							/>
							{this.state.order !== '' &&
								isNaN(parseInt(this.state.order)) && (
									<label className= "input-label" htmlFor="order" style={{ color: 'red' }}>
										{i18n.t('restrictionOrderNumberIsNotValid')}
									</label>
								)}
							{this.state.submitError &&
								this.state.order === '' && (
									<label className= "input-label" htmlFor="order" style={{ color: 'red' }}>
										{i18n.t('restrictionMustEnterOrderNumber')}
									</label>
								)}
							{this.state.order !== '' &&
								parseInt(this.state.order) < 5 && (
									<label className= "input-label" htmlFor="order" style={{ color: 'orange' }}>
										{i18n.t('reccomendationOrderMoreThanFour')}
									</label>
								)}
						</div>

						<div className="form-group">
							<label className= "input-label" htmlFor="description">{i18n.t('description')}</label>
							<textarea
								className="form-control"
								id="description"
								value={this.state.description}
								onChange={e => this.setState({ description: e.target.value })}
								placeholder={i18n.t('enterDescription')}
							/>
						</div>

						<div className="form-group">
							<label className= "input-label" htmlFor="func">{i18n.t('func')}</label>
							<select
								value={this.state.func}
								id="func"
								onChange={value => this.setState({ func: value.target.value })}
								className="form-control"
							>
								{funcOptions.map(opt => (
									<option key={opt.value} value={opt.value}>
										{i18n.t(opt.title)}
									</option>
								))}
							</select>
						</div>
						<div className="form-group">
							<label className= "input-label" htmlFor="color" className="req input-label">
								{i18n.t('color')}
							</label>
							<SketchPicker
								id="color"
								color={this.state.color}
								onChangeComplete={value => this.setState({ color: value.hex })}
							/>
						</div>
						<div className="form-group">
							<button type="submit" className="btn btn-primary mr-2" onClick={this.submit.bind(this)}>
								{i18n.t('submit')}
							</button>
							<button
								type="button"
								className="btn btn-danger"
								onClick={() => this.props.history.goBack()}
							>
								{i18n.t('cancel')}
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ login }) => {
	const { token } = login;
	return { token };
};

export default connect(
	mapStateToProps,
	{ addStatus }
)(StatusAdd);
