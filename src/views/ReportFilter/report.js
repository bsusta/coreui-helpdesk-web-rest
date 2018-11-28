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

class Report extends Component {
	constructor(props){
		super(props);
	}
	usersToString(users) {
		if (users.length === 0) {
			return i18n.t('none');
		}
		let text = '';
		Object.values(users).map(solver => (text = text + (solver.user.username + ' ')));
		return text;
	}

	render(){
		let allItems=[];
		this.props.tasks.map((task)=>{
			allItems=[...allItems,...(task.invoiceableItems.map((item)=>{return {
				...item, taskName:task.title, totalPrice:parseFloat(item.amount)*parseFloat(item.unit_price)
			}}))];
		});
		let allItemsSum = 0;
		allItems.map((item)=>allItemsSum+=item.totalPrice);
		return(<div className="table-div">
			<h2>
				<span>{i18n.t('report')}</span>
			</h2>
			<table className="table table-striped table-hover table-sm">
				<thead className="thead-inverse">
					<tr>
						<th style={{ width: '3%', borderTop: '0px' }}>{i18n.t('id')}</th>
						<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('taskName')}</th>
						<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('description')}</th>
						<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('requestedBy')}</th>
						<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('company')}</th>
						<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('assignedTo')}</th>
						<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('workType')}</th>
						<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('statusDate')}</th>
						<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('workHours')}</th>
					</tr>
				</thead>
				<tbody>
					{this.props.tasks.map(item => (
						<tr style={{ cursor: 'pointer' }} key={item.id}>
							<td style={{ verticalAlign: 'center' }}>{item.id}</td>
							<td style={{ verticalAlign: 'center' }}>{item.title}</td>
							<td style={{ verticalAlign: 'center' }}>{item.description}</td>
							<td style={{ verticalAlign: 'center' }}>{item.requestedBy.username}</td>
							<td style={{ verticalAlign: 'center' }}>{item.company.title}</td>
							<td style={{ verticalAlign: 'center' }}>{this.usersToString(item.taskHasAssignedUsers)}</td>
							<td style={{ verticalAlign: 'center' }}>{item.work_type}</td>
							<td style={{ verticalAlign: 'center' }}>{timestampToString(item.statusChange)}</td>
							<td style={{ verticalAlign: 'center' }}>"NOT PROVIDED"</td>
						</tr>
					))}
					<tr className="table-info">
						<td style={{ textAlign: "right", paddingRight: 50 }} colSpan="100">
							{i18n.t('totalWorkTime')}
							<span style={{ fontWeight: "bold" }}>
								TODO
							</span>
						</td>
					</tr>
				</tbody>
			</table>

			<table className="table table-striped table-hover table-sm">
				<thead className="thead-inverse">
					<tr>
						<th style={{ width: '3%', borderTop: '0px' }}>{i18n.t('taskName')}</th>
						<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('itemName')}</th>
						<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('amount')}</th>
						<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('price')}</th>
						<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('unit')}</th>
						<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('totalPrice')}</th>
					</tr>
				</thead>
				<tbody>
					{allItems.map(item => (
						<tr style={{ cursor: 'pointer' }} key={item.id}>
							<td style={{ verticalAlign: 'center' }}>{item.taskName}</td>
							<td style={{ verticalAlign: 'center' }}>{item.title}</td>
							<td style={{ verticalAlign: 'center' }}>{item.amount}</td>
							<td style={{ verticalAlign: 'center' }}>{item.unit_price}</td>
							<td style={{ verticalAlign: 'center' }}>{item.unit.shortcut}</td>
							<td style={{ verticalAlign: 'center' }}>{item.totalPrice}</td>
						</tr>
					))}
					<tr className="table-info">
						<td style={{ textAlign: "right", paddingRight: 50 }} colSpan="100">
							{i18n.t('priceWithoutVAT')}
							<span style={{ fontWeight: "bold" }}>
								{allItemsSum*0.8}
							</span>
						</td>
					</tr>
					<tr className="table-info">
						<td
							style={{ borderTop: 0, textAlign: "right", paddingRight: 50 }}
							colSpan="100"
						>
							{i18n.t('priceWithVAT')}
							<span style={{ fontWeight: "bold" }}>
								{allItemsSum}
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>)
	}
}

const mapStateToProps = ({ reportsReducer }) => {
	const { tasks } = reportsReducer;

	return {
		tasks,
	};
};

export default connect(
	mapStateToProps,
	{}
)(Report);
