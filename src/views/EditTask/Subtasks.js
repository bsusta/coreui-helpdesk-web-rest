import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import { connect } from "react-redux";
import i18n from 'i18next';
import {
  addSubtask,
  editSubtask,
  deleteSubtask
} from "../../redux/actions";
import colors from '../../../scss/colors';

class Subtasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSubtask: "",
      editedSubtask: "",
      focusedSubtask: null,
    };
  }

  render() {
    if(this.props.disabled && this.props.subtasks.length===0){
      return(
        <table className="table table-hover table-sm table-noBorder table-in-form">
          <thead className="thead-inverse">
            <tr>
              <th style={{ border: "0px" }}>  {i18n.t('subtasks')+' - '+i18n.t('none2')}</th>
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
              <th style={{ border: "0px" }}>{i18n.t('subtasks')}</th>
              <th style={{ width: "10%", border: "0px" }}>{i18n.t('from2')}</th>
              <th style={{ width: "10%", border: "0px" }}>{i18n.t('to2')}</th>
              <th style={{ width: "10%", border: "0px" }}>{i18n.t('hours2')}</th>
              {!this.props.disabled && <th style={{ width: "40px", border: "0px", textAlign: "right" }}/>}
            </tr>
          </thead>
          <tbody>
            {this.props.subtasks.map(subtask => (
              <tr key={subtask.id} className="invoiceRow">
                <td>
                  <div style={{ display: "flex" }}>
                    <span className="subtaskCheckbox"
                      onClick={() =>{
                        if(this.props.disabled)return;
                        this.props.editSubtask(
                          { done: !subtask.done, title: subtask.title },
                          subtask.id,
                          this.props.taskID,
                          this.props.token
                        )}
                      }>
                      {
                        subtask.done &&
                        <i
                          className="fa fa-check"
                          />
                      }
                </span>
                    <input
                      style={{ border: "none" }}
                      type="text"
                      disabled={this.props.disabled}
                      className="form-control"
                      placeholder={i18n.t('enterSubtask')}
                      value={
                        subtask.id === this.state.focusedSubtask
                          ? this.state.editedSubtask
                          : subtask.title
                      }
                      onBlur={() => {
                        if(this.props.disabled)return;
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
                        if(this.props.disabled)return;
                        this.setState({
                          editedSubtask: subtask.title,
                          focusedSubtask: subtask.id
                        });
                      }}
                      onChange={e =>{
                        if(this.props.disabled)return;
                        this.setState({ editedSubtask: e.target.value })}
                      }
                    />
                  </div>
                </td>
                <td><div style={{ display: "flex" }}>
                  <input
                    type="text"
                    className="form-control subtaskEdit"
                    disabled={this.props.disabled}
                    placeholder={'Od'}
                  />
                </div></td>
                <td><div style={{ display: "flex" }}>
                  <input
                    type="text"
                    className="form-control subtaskEdit"
                    disabled={this.props.disabled}
                    placeholder={'Do'}
                  />
                </div></td>
                <td><div style={{ display: "flex" }}>
                  <input
                    type="text"
                    className="form-control subtaskEdit"
                    disabled={this.props.disabled}
                    placeholder={'Hodiny'}
                    value={Math.ceil(Math.random()*56)}
                  />
                </div></td>
                <td style={{ border: "0px" }}>
                  {!this.props.disabled && <div
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
                  </div>}
                </td>
              </tr>
            ))}

            {!this.props.disabled &&<tr>
              <td style={{ border: "0px" }}>
                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    id="name"
                    disabled={this.props.disabled}
                    className="form-control"
                    onKeyPress={(e)=>{
                      if(this.props.disabled)return;
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
                    onChange={e =>{
                      if(this.props.disabled)return;
                      this.setState({ newSubtask: e.target.value })}
                    }
                  />
                </div>
              </td>
              <td><div style={{ display: "flex" }}>
                <input
                  type="text"
                  className="form-control"
                  disabled={this.props.disabled}
                  placeholder={'Od'}
                />
              </div></td>
              <td><div style={{ display: "flex" }}>
                <input
                  type="text"
                  className="form-control"
                  disabled={this.props.disabled}
                  placeholder={'Do'}
                />
              </div></td>
            <td colSpan="2"><div style={{ display: "flex" }}>
                <input
                  type="text"
                  className="form-control"
                  disabled={this.props.disabled}
                  placeholder={'Hodiny'}
                />
              </div></td>
            </tr>}
            <tr className="table-info">
              <td colSpan="5"
                style={{ borderTop: 0, textAlign: "right" }}
              >
                {i18n.t('totalWorkTime')}
                <span style={{ fontWeight: "bold" }}>
                  {75} {i18n.t('hours')}
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
  deleteSubtask
})(Subtasks);
