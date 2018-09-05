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

const fakeData=[
	{id:1,company:'Aston Esquire',workHours:Math.ceil(Math.random()*100),taskName:'Task '+Math.ceil(Math.random()*100),description:'This is the full description of this task, its ID is 1 and its company is Aston Esquire, hulla ho.',requestedBy:'admin',assignedTo:'Agent 101',statusDate:(new Date).getTime()/1000+(Math.random()>0.5 ? -1 : 1)* Math.random()*900000,workType:'material'},
	{id:2,company:'Aston Esquire',workHours:Math.ceil(Math.random()*100),taskName:'Task '+Math.ceil(Math.random()*100),description:'This is the full description of this task, its ID is 2 and its company is Aston Esquire, hulla ho.',requestedBy:'Agent 101',assignedTo:'admin',statusDate:(new Date).getTime()/1000+(Math.random()>0.5 ? -1 : 1)* Math.random()*900000,workType:'servis serverov'},
	{id:3,company:'Aston Esquire',workHours:Math.ceil(Math.random()*100),taskName:'Task '+Math.ceil(Math.random()*100),description:'This is the full description of this task, its ID is 3 and its company is Aston Esquire, hulla ho.',requestedBy:'admin',assignedTo:'Agent 101',statusDate:(new Date).getTime()/1000+(Math.random()>0.5 ? -1 : 1)* Math.random()*900000,workType:'servis IT'},
	{id:4,company:'LanSystems',workHours:Math.ceil(Math.random()*100),taskName:'Task '+Math.ceil(Math.random()*100),description:'This is the full description of this task, its ID is 4 and its company is LanSystems, hulla ho.',requestedBy:'admin',assignedTo:'Agent 101',statusDate:(new Date).getTime()/1000+(Math.random()>0.5 ? -1 : 1)* Math.random()*900000,workType:'servis IT'},
	{id:5,company:'Aston Esquire',workHours:Math.ceil(Math.random()*100),taskName:'Task '+Math.ceil(Math.random()*100),description:'This is the full description of this task, its ID is 5 and its company is Aston Esquire, hulla ho.',requestedBy:'Agent 101',assignedTo:'admin',statusDate:(new Date).getTime()/1000+(Math.random()>0.5 ? -1 : 1)* Math.random()*900000,workType:'material'},
	{id:6,company:'LanSystems',workHours:Math.ceil(Math.random()*100),taskName:'Task '+Math.ceil(Math.random()*100),description:'This is the full description of this task, its ID is 6 and its company is LanSystems, hulla ho.',requestedBy:'admin',assignedTo:'Agent 101',statusDate:(new Date).getTime()/1000+(Math.random()>0.5 ? -1 : 1)* Math.random()*900000,workType:'navrh'},
	{id:7,company:'LanSystems',workHours:Math.ceil(Math.random()*100),taskName:'Task '+Math.ceil(Math.random()*100),description:'This is the full description of this task, its ID is 7 and its company is LanSystems, hulla ho.',requestedBy:'admin',assignedTo:'Agent 101',statusDate:(new Date).getTime()/1000+(Math.random()>0.5 ? -1 : 1)* Math.random()*900000,workType:'servis IT'},
	{id:8,company:'Aston Esquire',workHours:Math.ceil(Math.random()*100),taskName:'Task '+Math.ceil(Math.random()*100),description:'This is the full description of this task, its ID is 8 and its company is Aston Esquire, hulla ho.',requestedBy:'Agent 101',assignedTo:'admin',statusDate:(new Date).getTime()/1000+(Math.random()>0.5 ? -1 : 1)* Math.random()*900000,workType:'navrh'},
	{id:9,company:'Aston Esquire',workHours:Math.ceil(Math.random()*100),taskName:'Task '+Math.ceil(Math.random()*100),description:'This is the full description of this task, its ID is 9 and its company is Aston Esquire, hulla ho.',requestedBy:'admin',assignedTo:'Agent 101',statusDate:(new Date).getTime()/1000+(Math.random()>0.5 ? -1 : 1)* Math.random()*900000,workType:'servis serverov'},
];

const fakeUnits=[
	{id:1,unit:'ks'},
	{id:2,unit:'kg'},
	{id:3,unit:'g'},
	{id:4,unit:'mg'},
	{id:5,unit:'cm'},
	{id:6,unit:'m'}
]


let fakeMaterials=[
	{id:1,taskName:'Task '+Math.ceil(Math.random()*100),itemName:'Item number 1',quantity:Math.ceil(Math.random()*30),price:Math.ceil(Math.random()*100),unit:Math.ceil(Math.random()*5+1)},
	{id:2,taskName:'Task '+Math.ceil(Math.random()*100),itemName:'Item number 2',quantity:Math.ceil(Math.random()*30),price:Math.ceil(Math.random()*100),unit:Math.ceil(Math.random()*5+1)},
	{id:3,taskName:'Task '+Math.ceil(Math.random()*100),itemName:'Item number 3',quantity:Math.ceil(Math.random()*30),price:Math.ceil(Math.random()*100),unit:Math.ceil(Math.random()*5+1)},
	{id:4,taskName:'Task '+Math.ceil(Math.random()*100),itemName:'Item number 4',quantity:Math.ceil(Math.random()*30),price:Math.ceil(Math.random()*100),unit:Math.ceil(Math.random()*5+1)},
	{id:5,taskName:'Task '+Math.ceil(Math.random()*100),itemName:'Item number 5',quantity:Math.ceil(Math.random()*30),price:Math.ceil(Math.random()*100),unit:Math.ceil(Math.random()*5+1)},
	{id:6,taskName:'Task '+Math.ceil(Math.random()*100),itemName:'Item number 6',quantity:Math.ceil(Math.random()*30),price:Math.ceil(Math.random()*100),unit:Math.ceil(Math.random()*5+1)},
	{id:7,taskName:'Task '+Math.ceil(Math.random()*100),itemName:'Item number 7',quantity:Math.ceil(Math.random()*30),price:Math.ceil(Math.random()*100),unit:Math.ceil(Math.random()*5+1)},
	{id:8,taskName:'Task '+Math.ceil(Math.random()*100),itemName:'Item number 8',quantity:Math.ceil(Math.random()*30),price:Math.ceil(Math.random()*100),unit:Math.ceil(Math.random()*5+1)},
	{id:9,taskName:'Task '+Math.ceil(Math.random()*100),itemName:'Item number 9',quantity:Math.ceil(Math.random()*30),price:Math.ceil(Math.random()*100),unit:Math.ceil(Math.random()*5+1)},
	]
fakeMaterials.map((item)=>{
	item.totalPrice=item.price*item.quantity;
	return item;
})


export default class TaskList extends Component {
	sumItems(){
		let val=0;
		fakeData.map((item)=>val+=item.workHours);
		return val;
	}
	sumMaterials(){
		let val=0;
		fakeMaterials.map((item)=>val+=item.quantity*item.price);
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
					{fakeData.map(item => (
						<tr style={{ cursor: 'pointer' }} key={item.id}>
							<td style={{ verticalAlign: 'center' }}>{item.id}</td>
							<td style={{ verticalAlign: 'center' }}>{item.taskName}</td>
							<td style={{ verticalAlign: 'center' }}>{item.description}</td>
							<td style={{ verticalAlign: 'center' }}>{item.requestedBy}</td>
							<td style={{ verticalAlign: 'center' }}>{item.company}</td>
							<td style={{ verticalAlign: 'center' }}>{item.assignedTo}</td>
							<td style={{ verticalAlign: 'center' }}>{item.workType}</td>
							<td style={{ verticalAlign: 'center' }}>{timestampToString(item.statusDate)}</td>
							<td style={{ verticalAlign: 'center' }}>{item.workHours}</td>
						</tr>
					))}
					<tr className="table-info">
						<td style={{ textAlign: "right", paddingRight: 50 }} colSpan="100">
							{i18n.t('totalWorkTime')}
							<span style={{ fontWeight: "bold" }}>
								{this.sumItems()}
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
						<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('quantity')}</th>
						<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('price')}</th>
						<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('unit')}</th>
						<th style={{ width: '5%', borderTop: '0px' }}>{i18n.t('totalPrice')}</th>
					</tr>
				</thead>
				<tbody>
					{fakeMaterials.map(item => (
						<tr style={{ cursor: 'pointer' }} key={item.id}>
							<td style={{ verticalAlign: 'center' }}>{item.taskName}</td>
							<td style={{ verticalAlign: 'center' }}>{item.itemName}</td>
							<td style={{ verticalAlign: 'center' }}>{item.quantity}</td>
							<td style={{ verticalAlign: 'center' }}>{item.price}</td>
							<td style={{ verticalAlign: 'center' }}>{item.unit}</td>
							<td style={{ verticalAlign: 'center' }}>{item.totalPrice}</td>
						</tr>
					))}
					<tr className="table-info">
						<td style={{ textAlign: "right", paddingRight: 50 }} colSpan="100">
							{i18n.t('priceWithoutVAT')}
							<span style={{ fontWeight: "bold" }}>
								{(this.sumMaterials() * 0.8).toFixed(2)}
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
								{this.sumMaterials().toFixed(2)}
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>)
	}
}
