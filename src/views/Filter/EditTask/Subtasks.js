import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import { connect } from "react-redux";
import i18n from 'i18next';
import {
  addSubtask,
  editSubtask,
  deleteSubtask,
  addItem,
  editItem,
  deleteItem
} from "../../../redux/actions";
import colors from '../../../../scss/colors';

class Subtasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSubtask: "",
      editedSubtask: "",
      focusedSubtask: null,
      newItem: "",
      newItemCount: 1,
      newItemUnit:
        this.props.units.length === 0 ? null : this.props.units[0].id,
      newItemPrice: 1,
      editedItem: null
    };
  }
  sumItems(items) {
    let count = 0;
    items.map(item => (count = count + item.amount * item.unit_price));
    return count;
  }

  render() {
    return (
      <div>
        <table className="table table-hover table-sm table-in-form">
          <thead className="thead-inverse">
            <tr>
              <th style={{ border: "0px" }}>{i18n.t('subtasks')}</th>
              <th
                style={{ width: "40px", border: "0px", textAlign: "right" }}
              />
            </tr>
          </thead>
          <tbody>
            {this.props.subtasks.map(subtask => (
              <tr key={subtask.id} className="subtaskRow">
                <td style={{ border: "0px" }}>
                  <div style={{ display: "flex" }}>
                    <span className="subtaskCheckbox"
                      onClick={() =>
                        this.props.editSubtask(
                          { done: !subtask.done, title: subtask.title },
                          subtask.id,
                          this.props.taskID,
                          this.props.token
                        )
                      }>
                      {
                        subtask.done &&
                        <i
                          className="fa fa-check"
                          />
                      }
                </span>
                    <input
                      type="text"
                      id="name"
                      value={
                        subtask.id === this.state.focusedSubtask
                          ? this.state.editedSubtask
                          : subtask.title
                      }
                      onBlur={() => {
                        this.props.editSubtask(
                          {
                            done: subtask.done,
                            title: this.state.editedSubtask
                          },
                          subtask.id,
                          this.props.taskID,
                          this.props.token
                        );
                        this.setState({ focusedSubtask: null });
                      }}
                      onFocus={() => {
                        this.setState({
                          editedSubtask: subtask.title,
                          focusedSubtask: subtask.id
                        });
                      }}
                      onChange={e =>
                        this.setState({ editedSubtask: e.target.value })
                      }
                      className="form-control subtaskEdit"
                      placeholder={i18n.t('enterSubtask')}
                    />
                  </div>
                </td>

                <td style={{ border: "0px" }}>
                  <div
                    style={{ float: "right", paddingRight: 20 }}
                    className="row"
                  >
                    <button
                      className="btn btn-sm btn-link"
                      onClick={() => {
                        this.props.deleteSubtask(
                          subtask.id,
                          this.props.taskID,
                          this.props.token
                        );
                      }}
                    >
                      <i className="fa fa-remove" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" style={{ border: "0px" }}>
                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    onKeyPress={(e)=>{
                      if(e.key==='Enter'){
                        this.props.addSubtask(
                          { done: false, title: this.state.newSubtask },
                          this.props.taskID,
                          this.props.token
                        );
                        this.setState({ newSubtask: "" });
                      }
                    }}
                    placeholder={'+ '+i18n.t('enterNewSubtask')}
                    value={this.state.newSubtask}
                    onChange={e =>
                      this.setState({ newSubtask: e.target.value })
                    }
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="table table-hover table-sm table-noBorder table-in-form">
          <thead className="thead-inverse">
            <tr>
              <th style={{ border: "0px" }}>  {i18n.t('invoiceableItems')}</th>
              <th style={{ width: "10%", border: "0px" }}>  {i18n.t('amount')}</th>
              <th style={{ width: "15%", border: "0px" }}>  {i18n.t('unit')}</th>
              <th style={{ width: "10%", border: "0px" }}>  {i18n.t('pricePerUnit')}</th>
              <th
                style={{ width: "40px", border: "0px", textAlign: "right" }}
              />
            </tr>
          </thead>
          <tbody>
            {this.props.items.map(item => (
              <tr key={item.id} className="invoiceRow">
                <td>
                  <input
                    style={{ border: "none" }}
                    type="text"
                    value={
                      this.state.editedItem &&
                      item.id === this.state.editedItem.id
                        ? this.state.editedItem.title
                        : item.title
                    }
                    onBlur={() => {
                      this.props.editItem(
                        {
                          title: this.state.editedItem.title,
                          amount: this.state.editedItem.amount,
                          unit_price: this.state.editedItem.unit_price
                        },
                        item.id,
                        this.state.editedItem.unit.id,
                        this.props.taskID,
                        this.props.token
                      );
                      this.setState({ editedItem: null });
                    }}
                    onFocus={() => this.setState({ editedItem: item })}
                    onChange={e =>
                      this.setState({
                        editedItem: {
                          ...this.state.editedItem,
                          title: e.target.value
                        }
                      })
                    }
                    className="form-control"
                    placeholder={i18n.t('itemName')}
                  />
                </td>
                <td>
                  <input
                    style={{ border: "none" }}
                    type="text"
                    value={
                      this.state.editedItem &&
                      item.id === this.state.editedItem.id
                        ? this.state.editedItem.amount
                        : item.amount
                    }
                    onBlur={() => {
                      this.props.editItem(
                        {
                          title: this.state.editedItem.title,
                          amount: this.state.editedItem.amount,
                          unit_price: this.state.editedItem.unit_price
                        },
                        item.id,
                        this.state.editedItem.unit.id,
                        this.props.taskID,
                        this.props.token
                      );
                      this.setState({ editedItem: null });
                    }}
                    onFocus={() => this.setState({ editedItem: item })}
                    onChange={e =>
                      this.setState({
                        editedItem: {
                          ...this.state.editedItem,
                          amount: e.target.value
                        }
                      })
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
                    onChange={e => {
                      this.props.editItem(
                        {
                          title: item.title,
                          amount: item.amount,
                          unit_price: item.unit_price
                        },
                        item.id,
                        e.target.value,
                        this.props.taskID,
                        this.props.token
                      );
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
                    style={{ border: "none" }}
                    type="text"
                    value={
                      this.state.editedItem &&
                      item.id === this.state.editedItem.id
                        ? this.state.editedItem.unit_price
                        : item.unit_price
                    }
                    onBlur={() => {
                      this.props.editItem(
                        {
                          title: this.state.editedItem.title,
                          amount: this.state.editedItem.amount,
                          unit_price: this.state.editedItem.unit_price
                        },
                        item.id,
                        this.state.editedItem.unit.id,
                        this.props.taskID,
                        this.props.token
                      );
                      this.setState({ editedItem: null });
                    }}
                    onFocus={() => this.setState({ editedItem: item })}
                    onChange={e =>
                      this.setState({
                        editedItem: {
                          ...this.state.editedItem,
                          unit_price: e.target.value
                        }
                      })
                    }
                    className="form-control"
                    placeholder={i18n.t('pricePerUnit')}
                  />
                </td>

                <td>
                  <button
                    style={{ float: "right" }}
                    className="btn  btn-sm btn-link mr-1"
                    onClick={() => {
                      this.props.deleteItem(
                        item.id,
                        this.props.taskID,
                        this.props.token
                      );
                    }}
                  >
                    <i className="fa fa-remove" />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <input
                  type="text"
                  value={this.state.newItem}
                  onKeyPress={(e)=>{
                    if(e.key==='Enter'){
                      {
                        this.props.addItem(
                          {
                            title: this.state.newItem,
                            amount: this.state.newItemCount,
                            unit_price: this.state.newItemPrice
                          },
                          this.state.newItemUnit,
                          this.props.taskID,
                          this.props.token
                        );
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
                        this.props.addItem(
                          {
                            title: this.state.newItem,
                            amount: this.state.newItemCount,
                            unit_price: this.state.newItemPrice
                          },
                          this.state.newItemUnit,
                          this.props.taskID,
                          this.props.token
                        );
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
              <td colSpan="2">
                <input
                  onKeyPress={(e)=>{
                    if(e.key==='Enter'){
                      {
                        this.props.addItem(
                          {
                            title: this.state.newItem,
                            amount: this.state.newItemCount,
                            unit_price: this.state.newItemPrice
                          },
                          this.state.newItemUnit,
                          this.props.taskID,
                          this.props.token
                        );
                        this.setState({
                          newItem: "",
                          newItemCount: 1,
                          newItemPrice: 1
                        });
                      }
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
            </tr>
            <tr className="table-info">
              <td style={{ textAlign: "right", paddingRight: 50 }} colSpan="5">
                {i18n.t('priceWithoutVAT')}
                <span style={{ fontWeight: "bold" }}>
                  {(this.sumItems(this.props.items) * 0.8).toFixed(2)}
                </span>
              </td>
            </tr>
            <tr className="table-info">
              <td
                style={{ borderTop: 0, textAlign: "right", paddingRight: 50 }}
                colSpan="5"
              >
                {i18n.t('priceWithVAT')}
                <span style={{ fontWeight: "bold" }}>
                  {this.sumItems(this.props.items).toFixed(2)}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ subtasksReducer, login, itemsReducer }) => {
  const { subtasks } = subtasksReducer;
  const { items } = itemsReducer;
  const { token } = login;
  return { subtasks, items, token };
};

export default connect(mapStateToProps, {
  addSubtask,
  editSubtask,
  deleteSubtask,
  addItem,
  editItem,
  deleteItem
})(Subtasks);
