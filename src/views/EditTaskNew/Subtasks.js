import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import i18n from 'i18next';
import moment from 'moment';
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
      task: "",
      hours:'',
      from: null,
      to: null,
      editedSubtaskTitle: "",
      editedSubtaskHours: "0",
      focusedSubtask: null,
    };
    this.sumHours.bind(this);
  }

  sumHours(){
    let sum = 0;
    this.props.subtasks.map((item)=>{if(item.hours){sum+=item.hours}});
    return parseFloat(sum.toFixed(2));
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
              <th style={{ width: "150px", border: "0px" }}>{i18n.t('from2')}</th>
              <th style={{ width: "150px", border: "0px" }}>{i18n.t('to2')}</th>
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
                          { done: !subtask.done, title: subtask.title, from:subtask.from, to:subtask.to, hours:subtask.hours },
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
                          ? this.state.editedSubtaskTitle
                          : subtask.title
                      }
                      onBlur={() => {
                        if(this.props.disabled)return;
                        this.props.editSubtask(
                          {
                            done: subtask.done,from:subtask.from, to:subtask.to, hours:subtask.hours,
                            title: this.state.editedSubtaskTitle,
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
                          editedSubtaskTitle: subtask.title,
                          editedSubtaskHours: subtask.hours?subtask.hours:'',
                          focusedSubtask: subtask.id
                        });
                      }}
                      onChange={e =>{
                        if(this.props.disabled)return;
                        this.setState({ editedSubtaskTitle: e.target.value })}
                      }
                    />
                  </div>
                </td>
                <td><div style={{ display: "flex" }}>
                  <div style={{ width: "100%"}} className="datepickerWrap subtaskDatepickerWrap">
                    <DatePicker
                      className="form-control no-border"
                      selected={subtask.from!==0 && subtask.from!==null
                      ? moment(subtask.from * 1000)
                      : null}
                      disabled={this.props.disabled}
                      onChange={e => {
                        if(this.props.disabled)return;
                        let body= {
                          done: subtask.done,title:subtask.title, to:subtask.to, hours:subtask.hours,
                          from: e!==null?e.valueOf() / 1000:null,
                        };

                        if(body.from!==null){
                          if(body.to!==0&&body.to!==null){
                            let difference = moment(body.to*1000).diff(e,'months',true);
                            body.to=difference>1|| difference < 0?null:body.to;
                          }
                          if(body.hours){
                            body.to=e.add(body.hours,'hours').valueOf()/1000;
                          }else if(body.to!==0&&body.to!==null){
                            body.hours=parseFloat(parseFloat(moment(body.to*1000).diff(e,'hours',true)).toFixed(2));
                          }
                        }

                        this.props.editSubtask(
                          body,
                          subtask.id,
                          this.props.taskID,
                          this.props.token
                        );
                      }}
                      locale="en-gb"
                      placeholderText={i18n.t("from2")}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      dateFormat="DD.MM.YYYY HH:mm"
                      />
                  </div>
                </div></td>
                <td><div style={{ display: "flex" }}>
                  <div style={{ width: "100%"}} className="datepickerWrap subtaskDatepickerWrap">
                    <DatePicker
                      className="form-control no-border"
                      selected={subtask.to!==0&&subtask.to!==null
                      ? moment(subtask.to * 1000)
                      : null}
                      disabled={this.props.disabled}
                      onChange={e => {
                        if(this.props.disabled)return;
                        let body= {
                          done: subtask.done,title:subtask.title, from:subtask.from, hours:subtask.hours,
                          to: e!==null?e.valueOf() / 1000:null,
                        };

                        if(body.to!==null){
                          if(body.from!==0&&body.from!==null){
                            let difference = e.diff(moment(body.from*1000),'months',true);
                            if(difference>1|| difference < 0){
                              return;
                            }
                          }
                          if(body.from!==0&&body.from!==null){
                            body.hours=parseFloat(parseFloat(e.diff(moment(body.from*1000),'hours',true)).toFixed(2));
                          }
                          else if(body.hours){
                            body.from=e.subtract(body.hours,'hours').valueOf()/1000;
                          }
                        }

                        this.props.editSubtask(
                          body,
                          subtask.id,
                          this.props.taskID,
                          this.props.token
                        );
                      }}
                      locale="en-gb"
                      minDate={subtask.from?moment(subtask.from * 1000):null}
                      maxDate={subtask.from?moment(subtask.from * 1000).add(1,'months'):null}
                      placeholderText={i18n.t("to2")}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      dateFormat="DD.MM.YYYY HH:mm"
                      />
                  </div>
                </div></td>
                <td><div style={{ display: "flex" }}>
                  <input
                    type="number"
                    className="form-control subtaskEdit"
                    disabled={this.props.disabled}
                    placeholder={i18n.t('hours2')}
                    value={
                      subtask.id === this.state.focusedSubtask
                        ? this.state.editedSubtaskHours
                        : (subtask.hours?subtask.hours:'')
                    }
                    onBlur={() => {
                      if(this.props.disabled)return;
                      let body= {
                        done: subtask.done,title:subtask.title, from:subtask.from, to:subtask.to,
                        hours: this.state.editedSubtaskHours,
                      };

                      if(body.from!==0 && body.from!==null && body.hours!==''){
                        body.to= moment(body.from*1000).add(body.hours,'hours').valueOf()/1000;
                      }
                      this.props.editSubtask(
                        body,
                        subtask.id,
                        this.props.taskID,
                        this.props.token
                      );
                      this.setState({ focusedSubtask: null });
                    }}
                    onFocus={() => {
                      if(this.props.disabled)return;
                      this.setState({
                        editedSubtaskTitle: subtask.title,
                        editedSubtaskHours: subtask.hours?subtask.hours:'',
                        focusedSubtask: subtask.id
                      });
                    }}
                    onChange={e =>{
                      let hours=e.target.value;
                      if(hours!==''){
                        hours = parseFloat(hours);
                        if(isNaN(hours)){
                          return;
                        }
                        hours=hours.toFixed(2);
                        if(hours< 0){
                          return;
                        }
                        hours=parseFloat(hours);
                      }
                      this.setState({ editedSubtaskHours: hours })}
                    }
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

{/*ADD SUBTASK*/}
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
                        let body={
                          done: false,
                          title: this.state.task,
                          hours: this.state.hours!==''?this.state.hours:undefined,
                          from: this.state.from?this.state.from:null,
                          to: this.state.to?this.state.to:null
                        }
                        if(body.title==='')return;
                          this.props.addSubtask(body,
                          this.props.taskID,
                          this.props.token
                        );
                        this.setState({ task: "", hours:'', from: null, to:null });
                      }
                    }}
                    placeholder={'+ '+i18n.t('enterSubtask')}
                    value={this.state.task}
                    onChange={e =>{
                      if(this.props.disabled)return;
                      this.setState({ task: e.target.value })}
                    }
                  />
                </div>
              </td>
              <td><div style={{ display: "flex" }}>
                <div style={{ width: "100%"}} className="datepickerWrap subtaskDatepickerWrap">
                  <DatePicker
                    className="form-control"
                    selected={this.state.from?moment(this.state.from*1000):null}
                    disabled={this.props.disabled}
                    onChange={e => {
                      if(this.props.disabled)return;
                      let changes={from: e!==null?e.valueOf()/1000:null};

                      if(changes.from!==null){
                        if(this.state.to!==0&&this.state.to!==null){
                          let difference = moment(this.state.to*1000).diff(e,'months',true);
                          changes.to=difference>1|| difference < 0?null:this.state.to;
                        }
                        if(this.state.hours){
                          changes.to=e.add(this.state.hours,'hours').valueOf()/1000;
                        }else if(this.state.to!==0&&this.state.to!==null){
                          changes.hours=parseFloat(parseFloat(moment(this.state.to*1000).diff(e,'hours',true)).toFixed(2));
                        }
                      }
                      this.setState(changes);
                    }}
                    locale="en-gb"
                    placeholderText={i18n.t("from2")}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    dateFormat="DD.MM.YYYY HH:mm"
                    />
                </div>
              </div></td>
              <td><div style={{ display: "flex" }}>
                <div style={{ width: "100%"}} className="datepickerWrap subtaskDatepickerWrap">
                  <DatePicker
                    className="form-control"
                    selected={this.state.to!==null?moment(this.state.to*1000):null}
                    disabled={this.props.disabled}
                    onChange={e => {
                      if(this.props.disabled)return;
                      let changes={to: e!==null?e.valueOf()/1000:null};

                      if(changes.to!==null){
                        if(this.state.from!==0&&this.state.from!==null){
                          let difference = e.diff(moment(this.state.from*1000),'months',true);
                          if(difference>1|| difference < 0){
                            return;
                          }
                        }
                        if(this.state.from!==0&&this.state.from!==null){
                          changes.hours=parseFloat(parseFloat(e.diff(moment(this.state.from*1000),'hours',true)).toFixed(2));
                        }
                        else if(this.state.hours){
                          changes.from=e.subtract(this.state.hours,'hours').valueOf()/1000;
                        }
                      }
                      this.setState(changes);
                    }}
                    locale="en-gb"
                    placeholderText={i18n.t("to2")}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    minDate={this.state.from?moment(this.state.from * 1000):null}
                    maxDate={this.state.from?moment(this.state.from * 1000).add(1,'months'):null}
                    dateFormat="DD.MM.YYYY HH:mm"
                    />
                </div>
              </div></td>
            <td><div style={{ display: "flex" }}>
              <input
                type="number"
                id="name"
                disabled={this.props.disabled}
                className="form-control"
                onKeyPress={(e)=>{
                  if(this.props.disabled)return;
                  if(e.key==='Enter'){
                    let body={
                      done: false,
                      title: this.state.task,
                      hours: this.state.hours!==''?this.state.hours:undefined,
                      from: this.state.from?this.state.from:null,
                      to: this.state.to?this.state.to:null
                    }
                    if(body.title==='')return;
                      this.props.addSubtask(body,
                      this.props.taskID,
                      this.props.token
                    );
                    this.setState({ task: "", hours:'', from: null, to:null });
                  }
                }}
                placeholder={i18n.t('period')}
                value={this.state.hours}
                onChange={e =>{
                  let hours=e.target.value;
                  if(hours!==''){
                    hours = parseFloat(hours);
                    if(isNaN(hours)){
                      return;
                    }
                    hours=hours.toFixed(2);
                    if(hours< 0){
                      return;
                    }
                    hours=parseFloat(hours);
                  }
                  let changes={hours};
                  if(this.state.from!==null && changes.hours!==''){
                    changes.to= moment(this.state.from*1000).add(changes.hours,'hours').valueOf()/1000;
                  }
                  this.setState(changes)}
                }
              />
              </div></td>
            <td>
              <span className="center-hor">
                <button
                  className="btn btn-sm btn-primary mr-1 taskAddButton"
                  disabled={this.props.disabled}
                  onClick={()=>{
                    if(this.props.disabled)return;
                    let body={
                      done: false,
                      title: this.state.task,
                      hours: this.state.hours!==''?this.state.hours:undefined,
                      from: this.state.from?this.state.from:null,
                      to: this.state.to?this.state.to:null
                    }
                    if(body.title==='')return;
                      this.props.addSubtask(body,
                      this.props.taskID,
                      this.props.token
                    );
                    this.setState({ task: "", hours:'', from: null, to:null });
                    }
                  }
                  >
                  <i className="fa fa-plus " />
                </button>
              </span>
            </td>
            </tr>}
            <tr className="table-info">
              <td colSpan="5"
                style={{ borderTop: 0, textAlign: "right" }}
              >
                {i18n.t('totalWorkTime')}
                <span style={{ fontWeight: "bold" }}>
                  {this.sumHours()} {i18n.t('hours')}
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
