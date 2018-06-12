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
} from "../../redux/actions";
import colors from '../../../scss/colors';

class Subtasks extends Component {

  sumItems(items) {
    let count = 0;
    items.map(item => (count = count + item.amount * item.unit_price));
    return count;
  }

  render() {
    return (
      <div>
        <table className="table table-hover table-sm">
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
                    <span className="subtaskCheckbox">
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
                      value={subtask.title}
                      disabled={true}
                      className="form-control subtaskEdit"
                      placeholder={i18n.t('enterSubtask')}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="table table-hover table-sm table-noBorder">
          <thead className="thead-inverse">
            <tr>
              <th style={{ border: "0px" }}>  {i18n.t('invoiceableItems')}</th>
              <th style={{ width: "10%", border: "0px" }}>  {i18n.t('amount')}</th>
              <th style={{ width: "10%", border: "0px" }}>  {i18n.t('pricePerUnit')}</th>
              <th style={{ width: "15%", border: "0px" }}>  {i18n.t('unit')}</th>
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
                    value={item.title}
                    disabled={true}
                    className="form-control"
                    placeholder={i18n.t('itemName')}
                  />
                </td>
                <td>
                  <input
                    style={{ border: "none" }}
                    type="text"
                    disabled={true}
                    value={item.amount}
                    className="form-control"
                    placeholder={i18n.t('amount')}
                  />
                </td>
                <td>
                  <input
                    style={{ border: "none" }}
                    type="text"
                    value={item.unit_price}
                    className="form-control"
                    disabled={true}
                    placeholder={i18n.t('pricePerUnit')}
                  />
                </td>
                <td>
                  <select
                    className="form-control"
                    value={item.unit.id}
                    id="status"
                    disabled={true}
                  >
                    <option key={item.unit.id} value={item.unit.id}>
                      {item.unit.title}
                    </option>
                  </select>
                </td>
              </tr>
            ))}
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
