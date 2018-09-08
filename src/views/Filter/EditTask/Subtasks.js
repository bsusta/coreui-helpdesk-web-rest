import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import { connect } from "react-redux";
import i18n from 'i18next';
import {
  addSubtask,
  editSubtask,
  deleteSubtask
} from "../../../redux/actions";
import colors from '../../../../scss/colors';

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
    return (
      <div>
        <table className="table table-hover table-sm table-in-form">
          <thead className="thead-inverse">
            <tr>
              <th style={{ border: "0px" }}>{i18n.t('subtasks')}{this.props.disabled && this.props.subtasks.length===0?' - ' + i18n.t('none2'):''}</th>
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
                      type="text"
                      id="name"
                      disabled={this.props.disabled}
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
                      className="form-control subtaskEdit"
                      placeholder={i18n.t('enterSubtask')}
                    />
                  </div>
                </td>

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
              <td colSpan="3" style={{ border: "0px" }}>
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
            </tr>}
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
