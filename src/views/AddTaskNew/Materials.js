import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import { connect } from "react-redux";
import i18n from 'i18next';
import colors from '../../../scss/colors';

export default class Subtasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      newItemCount: 1,
      newItemUnit:
        this.props.units.length === 0 ? null : this.props.units[0].id,
      newItemPrice: 1,
      editedItem: null
    };
    this.getID.bind(this);
  }

  getID(){
    if(this.props.materials.length===0){
      return 0;
    }
    else{
      return this.props.materials.sort((item1,item2)=>item1.id < item2.id?1:-1)[0].id+1;
    }
  }

  sumItems(items) {
    let count = 0;
    items.map(item => (count = count + item.amount * item.unit_price));
    return count;
  }

  render() {
    if(this.props.disabled && this.props.materials.length===0){
      return(
        <table className="table table-hover table-sm table-noBorder table-in-form">
          <thead className="thead-inverse">
            <tr>
              <th style={{ border: "0px" }}>  {i18n.t('invoiceableItems')+' - '+i18n.t('none2')}</th>
            </tr>
          </thead>
        </table>
        );
    }
    return (
      <div>
        <table className="table table-hover table-sm table-noBorder table-in-form">
          <thead className="thead-inverse">
            <tr>
              <th style={{ border: "0px" }}>  {i18n.t('invoiceableItems')}</th>
              <th style={{ width: "10%", border: "0px" }}>  {i18n.t('amount')}</th>
              <th style={{ width: "15%", border: "0px" }}>  {i18n.t('unit')}</th>
              <th style={{ width: "10%", border: "0px" }}>  {i18n.t('pricePerUnit')}</th>
              {!this.props.disabled && <th style={{ width: "40px", border: "0px", textAlign: "right" }}/>}
            </tr>
          </thead>
          <tbody>
            {this.props.materials.map(item => (
              <tr key={item.id} className="invoiceRow">
                <td>
                  <input
                    style={{ border: "none" }}
                    type="text"
                    disabled={this.props.disabled}
                    value={
                      this.state.editedItem &&
                      item.id === this.state.editedItem.id
                        ? this.state.editedItem.title
                        : item.title
                    }
                    onBlur={() => {
                      if(this.props.disabled)return;
                      let newItems = [...this.props.materials];
                      newItems.splice(this.props.materials.findIndex(item2=>item.id===item2.id),1,
                        {
                          title: this.state.editedItem.title,
                        amount: this.state.editedItem.amount,
                        unit_price: this.state.editedItem.unit_price,
                        unit: this.state.editedItem.unit,
                        id: item.id
                        });
                        this.props.onSave(newItems);
                      this.setState({ editedItem: null });
                    }}
                    onFocus={() =>{
                      if(this.props.disabled)return;
                      this.setState({ editedItem: item })}}
                    onChange={e =>{
                      if(this.props.disabled)return;
                      this.setState({
                        editedItem: {
                          ...this.state.editedItem,
                          title: e.target.value
                        }
                      })}
                    }
                    className="form-control"
                    placeholder={i18n.t('itemName')}
                  />
                </td>
                <td>
                  <input
                    style={{ border: "none" }}
                    type="text"
                    disabled={this.props.disabled}
                    value={
                      this.state.editedItem &&
                      item.id === this.state.editedItem.id
                        ? this.state.editedItem.amount
                        : item.amount
                    }
                    onBlur={() => {
                      if(this.props.disabled)return;
                      let newItems = [...this.props.materials];
                      newItems.splice(this.props.materials.findIndex(item2=>item.id===item2.id),1,
                        {
                          title: this.state.editedItem.title,
                        amount: this.state.editedItem.amount,
                        unit_price: this.state.editedItem.unit_price,
                        unit: this.state.editedItem.unit,
                        id: item.id
                        });
                        this.props.onSave(newItems);
                      this.setState({ editedItem: null });
                    }}
                    onFocus={() => {
                      if(this.props.disabled)return;
                      this.setState({ editedItem: item })
                  }}
                    onChange={e =>{
                      if(this.props.disabled)return;
                      this.setState({
                        editedItem: {
                          ...this.state.editedItem,
                          amount: e.target.value
                        }
                      })}
                    }
                    className="form-control"
                    placeholder={i18n.t('amount')}
                  />
                </td>
                <td>
                  <select
                    className="form-control"
                    value={item.unit.id}
                    id="status"
                    disabled={this.props.disabled}
                    onChange={e => {
                      if(this.props.disabled)return;
                      let newItems = [...this.props.materials];
                      newItems.splice(this.props.materials.findIndex(item2=>item.id===item2.id),1,
                        {
                          title: item.title,
                        amount: item.amount,
                        unit_price: item.unit_price,
                        unit: e.target.value,
                        id: item.id
                        });
                        this.props.onSave(newItems);
                    }}
                  >
                  {!this.props.disabled && this.props.units.map(unit => (
                    <option key={unit.id} value={unit.id}>
                      {unit.title}
                    </option>
                  ))}
                  {this.props.disabled &&
                    <option key={item.unit.id} value={item.unit.id}>
                      {item.unit.title}
                    </option>
                  }
                  </select>
                </td>
                <td>
                  <input
                    style={{ border: "none" }}
                    type="text"
                    value={
                      this.state.editedItem &&
                      item.id === this.state.editedItem.id
                        ? this.state.editedItem.unit_price
                        : item.unit_price
                    }
                    onBlur={() => {
                      if(this.props.disabled)return;
                      let newItems = [...this.props.materials];
                      newItems.splice(this.props.materials.findIndex(item2=>item.id===item2.id),1,
                        {
                          title: this.state.editedItem.title,
                        amount: this.state.editedItem.amount,
                        unit_price: this.state.editedItem.unit_price,
                        unit: this.state.editedItem.unit,
                        id: item.id
                        });
                        this.props.onSave(newItems);
                      this.setState({ editedItem: null });
                    }}
                    onFocus={() =>{
                      if(this.props.disabled)return;
                      this.setState({ editedItem: item })}}
                    onChange={e =>{
                      if(this.props.disabled)return;
                      this.setState({
                        editedItem: {
                          ...this.state.editedItem,
                          unit_price: e.target.value
                        }
                      })}
                    }
                    className="form-control"
                    placeholder={i18n.t('pricePerUnit')}
                  />
                </td>

                {!this.props.disabled && <td>
                  <button
                    style={{ float: "right" }}
                    className="btn  btn-sm btn-link mr-1"
                    onClick={() => {
                      let newMaterials=[...this.props.materials];
                      newMaterials.splice(this.props.materials.findIndex((item2)=>item2.id===item.id),1);
                      this.props.onSave(newMaterials);
                    }}
                  >
                    <i className="fa fa-remove" />
                  </button>
                </td>}
              </tr>
            ))}
            {!this.props.disabled &&
            <tr>
              <td>
                <input
                  type="text"
                  value={this.state.newItem}
                  onKeyPress={(e)=>{
                    if(e.key==='Enter'){
                      {
                        this.props.onSave(
                          [...this.props.materials,{
                            title: this.state.newItem,
                            amount: this.state.newItemCount,
                            unit_price: this.state.newItemPrice,
                            unit:this.state.newItemUnit,
                            id:this.getID()
                          }]);
                        this.setState({
                          newItem: "",
                          newItemCount: 1,
                          newItemPrice: 1
                        });
                      }
                    }}}
                  label="+ Add invoice item"
                  onChange={e => this.setState({ newItem: e.target.value })}
                  className="form-control"
                />
              </td>
              <td>
                <input
                  onKeyPress={(e)=>{
                    if(e.key==='Enter'){
                      {
                        this.props.onSave(
                          [...this.props.materials,{
                            title: this.state.newItem,
                            amount: this.state.newItemCount,
                            unit_price: this.state.newItemPrice,
                            unit:this.state.newItemUnit,
                            id:this.getID()
                          }]);
                        this.setState({
                          newItem: "",
                          newItemCount: 1,
                          newItemPrice: 1
                        });
                      }
                    }}}
                  type="text"
                  value={this.state.newItemCount}
                  type="number"
                  onChange={e =>
                    this.setState({ newItemCount: e.target.value })
                  }
                  className="form-control"
                />
              </td>
              <td>
                <select
                  className="form-control"
                  value={this.state.newItemUnit}
                  id="status"
                  onChange={e => {
                    this.setState({ newItemUnit: e.target.value });
                  }}
                >
                  {this.props.units.map(unit => (
                    <option key={unit.id} value={unit.id}>
                      {unit.title}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  onKeyPress={(e)=>{
                    if(e.key==='Enter'){
                      this.props.onSave(
                        [...this.props.materials,{
                          title: this.state.newItem,
                          amount: this.state.newItemCount,
                          unit_price: this.state.newItemPrice,
                          unit:this.state.newItemUnit,
                          id:this.getID()
                        }]);
                        this.setState({
                          newItem: "",
                          newItemCount: 1,
                          newItemPrice: 1
                        });

                    }}}
                  type="text"
                  value={this.state.newItemPrice}
                  type="number"
                  onChange={e =>
                    this.setState({ newItemPrice: e.target.value })
                  }
                  className="form-control"
                />
              </td>
              <td>
                <span className="center-hor">
                  <button
                    className="btn btn-sm btn-primary mr-1 taskAddButton"
                    disabled={this.props.disabled}
                    onClick={()=>{
                      if(this.props.disabled)return;
                      this.props.onSave(
                        [...this.props.materials,{
                          title: this.state.newItem,
                          amount: this.state.newItemCount,
                          unit_price: this.state.newItemPrice,
                          unit:this.state.newItemUnit,
                          id:this.getID()
                        }]);
                      this.setState({
                        newItem: "",
                        newItemCount: 1,
                        newItemPrice: 1
                      });
                      }
                    }
                    >
                    <i className="fa fa-plus " />
                  </button>
                </span>
              </td>
            </tr>}
            <tr className="table-info">
              <td style={{ textAlign: "right" }} colSpan="5">
                {i18n.t('priceWithoutVAT')}
                <span style={{ fontWeight: "bold" }}>
                  {(this.sumItems(this.props.materials) * 0.8).toFixed(2)}
                </span>
              </td>
            </tr>
            <tr className="table-info">
              <td
                style={{ borderTop: 0, textAlign: "right" }}
                colSpan="5"
              >
                {i18n.t('priceWithVAT')}
                <span style={{ fontWeight: "bold" }}>
                  {this.sumItems(this.props.materials).toFixed(2)}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
