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

const fakeData=[{id:1,company:'Aston Esquire',workHours:Math.ceil(Math.random()*100)},{id:2,company:'Aston Esquire',workHours:Math.ceil(Math.random()*100)},
{id:3,company:'Aston Esquire',workHours:Math.ceil(Math.random()*100)},
{id:4,company:'LanSystems',workHours:Math.ceil(Math.random()*100)},{id:5,company:'Aston Esquire',workHours:Math.ceil(Math.random()*100)},
{id:6,company:'LanSystems',workHours:Math.ceil(Math.random()*100)},{id:7,company:'LanSystems',workHours:Math.ceil(Math.random()*100)},
{id:8,company:'Aston Esquire',workHours:Math.ceil(Math.random()*100)},{id:9,company:'Aston Esquire',workHours:Math.ceil(Math.random()*100)}];
export default class TaskList extends Component {
	sumItems(){
		let val=0;
		fakeData.map((item)=>val+=item.workHours);
		return val;
	}
	render(){
		return(<div className="table-div">
			<h2>
				<span>{i18n.t('report')}</span>
			</h2>
			<table className="table table-striped table-hover table-sm">
				<thead className="thead-inverse">
					<tr>
						<th style={{ width: '3%', borderTop: '0px' }}>{i18n.t('company')}</th>
						<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('workHours')}</th>
					</tr>
				</thead>
				<tbody>
					{fakeData.map(item => (
						<tr style={{ cursor: 'pointer' }} key={item.id}>
							<td style={{ verticalAlign: 'center' }}>{item.company}</td>
							<td style={{ verticalAlign: 'center' }}>{item.workHours}</td>
						</tr>
					))}
					<tr className="table-info">
						<td style={{ textAlign: "right", paddingRight: 50 }} colSpan="5">
							{i18n.t('totalWorkTime')}
							<span style={{ fontWeight: "bold" }}>
								{this.sumItems()}
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>)
	}
}
