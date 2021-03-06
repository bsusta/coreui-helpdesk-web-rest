import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import {
  ButtonGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  Input,
  Label,
  FormGroup,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";

import CommentsLoader from "../../EditTask/Comments";
import AddComment from "../../EditTask/AddComment";
import Subtasks from "../../EditTask/Subtasks";
import Materials from "../../EditTask/Materials";
import Repeat from '../../EditTask/repeat';

import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import RichTextEditor from "react-rte";
import Select from "react-select";
import CompanyAdd from '../../settings/companyAdd';
import UserAdd from '../../settings/userAdd';
import {
  getTaskSolvers,
  deleteTaskSolvers,
  editTask,
  deleteTask,
  uploadFile,
  removeFile,
  addFollower,
  deleteFollower,
  getTaskCompanies,
  getUsers
} from "../../../redux/actions";
import {
  timestampToString,
  initialiseCustomAttributes,
  processCustomAttributes,
  importExistingCustomAttributesForTask,
  containsNullRequiredAttribute,
  fillRequiredCustomAttributes
} from "../../../helperFunctions";
import MultiSelect from "../../../components/multiSelect";
import i18n from "i18next";

const workTypes=['vzdialena podpora','servis IT','servis serverov','programovanie www','instalacie klientskeho os','bug reklamacia','navrh','material','cenova ponuka','administrativa','konzultacia','refakturacia','testovanie'];

const colourStyles = {
  control: styles => ({ ...styles,
                           backgroundColor: 'white',
                           borderRadius:"0",
                           border: '1px solid #c2cfd6',
                      }),
}


class EditTask extends Component {
  constructor(props) {
    super(props);
    let task_data = importExistingCustomAttributesForTask(
      initialiseCustomAttributes([...this.props.taskAttributes]),
      [...this.props.task.taskData],
      [...this.props.taskAttributes]
    );
    task_data=fillRequiredCustomAttributes({...task_data},[...this.props.taskAttributes]);
    if(this.props.disabled){
      this.state={openRepeat:false,task_data};
      return;
    }
    //task_data=this.fillCustomAttributesNulls(task_data,this.props.taskAttributes);
    let requestedBy;
    if (this.props.task.requestedBy) {
      requestedBy = { ...this.props.task.requestedBy };
      requestedBy.label =
      (requestedBy.name ? requestedBy.name : "") +
      " " +
      (requestedBy.surname ? requestedBy.surname : "");
      if (requestedBy.label === " ") {
        requestedBy.label = requestedBy.email;
      } else {
        requestedBy.label = requestedBy.label + " (" + requestedBy.email + ")";
      }
      requestedBy.value = requestedBy.id;
    } else {
      requestedBy = null;
    }

    let company;
    if (this.props.task.company) {
      company = { ...this.props.task.company };
      company.value = company.id;
      company.label = company.title;
    } else {
      company = null;
    }
    let submitError = containsNullRequiredAttribute(
      processCustomAttributes({ ...task_data }, [...this.props.taskAttributes]),
      [...this.props.taskAttributes]
    );
    this.state = {
      company,
      deadline: this.props.task.deadline
      ? moment(this.props.task.deadline * 1000)
      : null,
      closedAt: this.props.task.closedAt
      ? this.props.task.closedAt * 1000
      : null,
      startedAt: this.props.task.startedAt
      ? moment(this.props.task.startedAt * 1000)
      : null,
      description: this.props.task.description?this.props.task.description:'',
      important: this.props.task.important,
      project: this.props.task.project.id,
      requestedBy,
      status: this.props.task.status.id,
      tags: this.props.task.tags
      .filter(
        tag => this.props.tags.findIndex(item => item.id === tag.id) != -1
      )
      .map(tag => tag.id),
      title: this.props.task.title,
      workTime: this.props.task.work_time ? this.props.task.work_time : "",
      work_type: this.props.task.work_type ? this.props.task.work_type : "vzdialena podpora",
      newTags: [],
      newTag: "",
      ///////
      taskSolver:
      this.props.task.taskHasAssignedUsers.length == 0
      ? "null"
      : Object.values(this.props.task.taskHasAssignedUsers)[0].user.id,
      attachments: [],
      task_data,
      submitError,
      openAddUser:false,
      openAddCompany:false,
      showUploadError:false,
      openRepeat:false
    };
    this.autoSubmit.bind(this);
  }


  delete(e) {
    e.preventDefault();
    if (confirm(i18n.t("deleteTaskMessage"))) {
      this.props.deleteTask(this.props.task.id, this.props.token);
    } else {
      return;
    }
    this.props.history.goBack();
  }

  componentWillMount() {
    this.props.getTaskSolvers(this.props.task.project.id, this.props.token);
  }

  autoSubmit(name, value, id) {
    let state = { ...this.state };
    if (name === "project") {
      state["project"] = value.project;
      state["taskSolver"] = "null";
    } else if(name==='requestedBy'){
      state['requestedBy'] = value;
      state['company'] = this.props.companies[this.props.companies.findIndex((item)=>item.id===value.company.id)];
    } else if (name) {
      state[name] = value;
    }
    let task_data = processCustomAttributes({...state.task_data},[...this.props.taskAttributes]);
    if(containsNullRequiredAttribute(task_data,[...this.props.taskAttributes])||
    state.title===''||state.requestedBy===undefined||state.company===undefined){
      this.setState({submitError:true});
      return;
    }
    this.setState({ submitError: false });
    let tags = [];
    state.tags.map(addTag =>
      tags.push(
        this.props.tags.concat(state.newTags).find(tag => tag.id == addTag)
        .title
      )
    );


    //ak je task uzvrety nastavi mu closedAt, ak nema startedAt tak ten tiez
    let tempStatus=this.props.statuses.find((item)=>item.id.toString()===state.status.toString());
    if(tempStatus.title!=='Closed'||!tempStatus.default){
      state['closedAt'] = null;
      this.setState({closedAt:null});
    }
    else{
      if(this.props.task.status.id===tempStatus.id){
        state['closedAt']=this.props.task.closedAt*1000;
      }else{
        state['closedAt']=new Date().getTime();
      }
      this.setState({closedAt:state['closedAt']});
    }

    this.props.editTask(
      {
        title: state.title,
        description: state.description === ''?'null':state.description,
        closedAt:
        state.closedAt !== null ? state.closedAt / 1000 : "null",
        deadline:
        state.deadline !== null ? state.deadline.valueOf() / 1000 : "null",
        startedAt:
        state.startedAt !== null ? state.startedAt.valueOf() / 1000 : "null",
        important: state.important,
        workType: state.work_type===''?'null':state.work_type,
        workTime: state.workTime.length == 0 ? undefined : state.workTime,
        tag: JSON.stringify(tags),
        assigned:
        state.taskSolver != "null"
        ? JSON.stringify([{ userId: parseInt(state.taskSolver) }])
        : null,
        attachment:
        this.props.attachments.length === 0
        ? '[]'
        : JSON.stringify(
          this.props.attachments.map(attachment => attachment.id)
        ),
        taskData: JSON.stringify(task_data)
      },
      this.props.task.id,
      state.project,
      state.status,
      state.requestedBy.id,
      state.company.id,
      this.props.token
    );
  }

  render() {
    return (
      <div className="fontRegular">
        { !this.props.disabled &&
          <Modal isOpen={this.state.openAddCompany} className="lg">
            <ModalBody style={{padding:0}}>
              <CompanyAdd history={this.props.history} modal={()=>{
                  this.setState({openAddCompany:false});
                  this.props.getTaskCompanies(this.props.companiesUpdateDate,this.props.token);
                }}/>
              </ModalBody>
            </Modal>
        }

        { !this.props.disabled &&
        <Modal isOpen={this.state.openAddUser} className="lg">
          <ModalBody style={{padding:0}}>
            <UserAdd history={this.props.history} modal={()=>{
                this.setState({openAddUser:false})
                this.props.getUsers("",this.props.token);
            }} />
          </ModalBody>
        </Modal>
      }
        <Card className="fourColumnTaskEdit">
          <CardHeader className="row justify-content-between fourColumnTaskHeader" >
            <div>
            <button className="btn btn-link">
              <i className="fa fa-print" /> {i18n.t("print")}
              </button>
              {
                !this.props.disabled&&(this.props.task.loggedUserProjectAcl.includes('delete_task') || this.props.task.loggedUserIsAdmin)&&
                <button className="btn btn-link" onClick={this.delete.bind(this)}>
                  <i className="fa fa-trash" /> {i18n.t("delete")}
                  </button>
              }
              </div>
              {!this.props.disabled && this.state.submitError && <span><h5 style={{color:'red'}}> {i18n.t('restrictionTaskWontSave')}</h5></span>}
          </CardHeader>
                  <CardBody>
                    <div
                      className="row task-header"
                      >
                      <div className="col-12">
                        <div className="form-group">
                          <InputGroup>
                            <InputGroupAddon
                              style={{ backgroundColor: "white" }}
                              className="task-header-input"
                              >
                              <span className="float">
                                <i
                                  className={"fa fa-star icon-star"}
                                  style={{ fontSize: "1.97em", float: "left" }}
                                  onClick={() => {
                                    if(this.props.disabled){return;}
                                    if (!this.state.important) {
                                      this.autoSubmit("important", true);
                                      this.setState({ important: true });
                                    }
                                  }}
                                  />
                                { ((!this.props.disabled && this.state.important)||(this.props.disabled && this.props.task.important)) && (
                                  <i
                                    className={
                                      "fa fa-star icon-star-empty"
                                      }
                                      style={{
                                        color: "yellow" ,
                                        fontSize: "1.74em",
                                        marginLeft: "-1.02em",
                                        marginTop: "0.115em",
                                        float: "left"
                                      }}
                                      onClick={() => {
                                        if(this.props.disabled){return;}
                                        this.autoSubmit("important", false);
                                        this.setState({ important: false });
                                      }}
                                      />
                                  )}
                                </span>
                            </InputGroupAddon>

                            {/*<label htmlFor ="title">Task Name</label>*/}
                            <input
                              className="form-control task-header-input"
                              id="title"
                              placeholder={i18n.t("enterTitle")}
                              value={(!this.props.disabled && this.state.title)?this.state.title:this.props.task.title}
                              style={{ fontSize: 24 }}
                              disabled={this.props.disabled}
                              onChange={e => {
                                this.autoSubmit("title", e.target.value);
                                this.setState({ title: e.target.value });
                              }}
                              />
                          </InputGroup>
                        </div>
                        {/*this.state.submitError && this.state.title===''&&<label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionMustEnterTaskTitle')}</label>*/}
                    </div>
                    </div>
                    <div>
                   
                        <div className="row">
                          <div className="col-4">
                            <FormGroup>
                              <label htmlFor="status" className="input-label">{i18n.t("status")}</label>
                              {((!this.props.disabled && this.state.closedAt)||(this.props.disabled && this.props.task.closedAt)) &&
                                <span style={{ float: "right" }}>
                                  {i18n.t("closedAt")}:{" "}
                                  {timestampToString(!this.props.disabled?this.state.closedAt/1000:this.props.task.closedAt)}
                                </span>
                              }
                              <InputGroup>
                                <InputGroupAddon>
                                  <i className="fa fa-list" />
                                </InputGroupAddon>
                                {((!this.props.disabled && this.state.status)|| (this.props.disabled &&this.props.task.status)) &&
                                  <span className="coloredSelect"
                                    style={{
                                      color:this.props.disabled?this.props.task.status.color:this.props.statuses.find(
                                        status => status.id === this.state.status
                                      ).color}}
                                      ><i className="fa fa-circle" style={{paddingTop:10}}/></span>
                                  }
                                  <select
                                    disabled={this.props.disabled}
                                    className="form-control"
                                    style={{
                                      borderLeft:'none',
                                      paddingLeft:3,
                                      color: this.props.disabled?this.props.task.status.color:this.props.statuses.find(
                                        status => status.id == this.state.status
                                      ).color
                                    }}
                                    value={this.props.disabled?this.props.task.status.id:this.state.status}
                                    id="status"
                                    onChange={e => {
                                      this.autoSubmit("status", parseInt(e.target.value));
                                      this.setState({ status: parseInt(e.target.value)});
                                    }}

                                    >
                                    {!this.props.disabled && this.props.statuses.map(status => (
                                      <option
                                        key={status.id}
                                        style={{
                                          color: "white",
                                          backgroundColor: status.color
                                        }}
                                        value={status.id}
                                        >
                                        {status.title}
                                      </option>
                                    ))}
                                    {this.props.disabled && <option
                                      key={this.props.task.status.id}
                                      style={{
                                        color: "white",
                                        backgroundColor: this.props.task.status.color
                                      }}
                                      value={this.props.task.status.id}
                                      >
                                      {this.props.task.status.title}
                                    </option>}
                                  </select>
                                </InputGroup>
                              </FormGroup>
                            <FormGroup>
                              <label htmlFor="project" className="req input-label">
                                {i18n.t("project")}
                              </label>
                              <InputGroup>
                                <InputGroupAddon>
                                  <i className="fa fa-folder-o" />
                                </InputGroupAddon>
                                <select
                                  disabled={this.props.disabled}
                                  className="form-control"
                                  id="project"
                                  value={this.props.disabled?this.props.task.project.id:this.state.project}
                                  onChange={e => {
                                    this.autoSubmit("project", {
                                      project: e.target.value,
                                      taskSolver: "null"
                                    });
                                    this.setState({
                                      project: e.target.value,
                                      taskSolver: "null"
                                    });
                                    this.setState({
                                      project: e.target.value,
                                      taskSolver: "null"
                                    });
                                    this.props.deleteTaskSolvers();
                                    this.props.getTaskSolvers(
                                      e.target.value,
                                      this.props.token
                                    );
                                  }}
                                  >
                                  {!this.props.disabled && this.props.taskProjects.map(project => (
                                    <option key={project.id} value={project.id}>
                                      {project.title}
                                    </option>
                                  ))}
                                  {this.props.disabled &&
                                    <option key={this.props.task.project.id} value={this.props.task.project.id}>
                                      {this.props.task.project.title}
                                    </option>
                                  }
                                </select>
                              </InputGroup>
                            </FormGroup>
                            {
                              <Repeat disabled={this.props.disabled} onToogle={()=>this.setState({openRepeat:!this.state.openRepeat})} open={this.state.openRepeat} defaultState={this.props.repeat} taskID={this.props.task.id} />
                            }
                          </div>
                          <div className="col-4">
                            <FormGroup>
                              <label htmlFor="requester" className="req input-label">{i18n.t('requester')}</label>
                              {!this.props.disabled && this.props.task.loggedUserRoleAcl.includes('user_settings')&&
                                <span style={{ float: "right" }}>
                                  <button
                                    style={{ float: "right", paddingTop:0,paddingBottom:0, paddingLeft:5,paddingRight:5}}
                                    className="btn btn-sm btn-primary mr-1"
                                    onClick={()=>this.setState({openAddUser:true})}
                                    >
                                    <i className="fa fa-plus " />
                                  </button>
                                </span>}
                                <InputGroup className={!this.props.disabled&&this.state.requestedBy.id===undefined?"fieldError":""}>
                                  <InputGroupAddon>
                                    <i className="fa fa-user-o" />
                                  </InputGroupAddon>
                                  <Select
                                    styles={colourStyles}
                                    className="fullWidth"
                                    isDisabled={this.props.disabled}
                                    options={
                                      this.props.disabled?
                                      (this.props.task.requestedBy===undefined?[]:
                                      [{
                                      label:(this.props.task.requestedBy.name ? this.props.task.requestedBy.name : "") +
                                      " " + (this.props.task.requestedBy.surname ? this.props.task.requestedBy.surname : "") + " "+ this.props.task.requestedBy.email,
                                      value: this.props.task.requestedBy.id}])
                                      :(this.props.users.map(user => {
                                      user.label =
                                      (user.name ? user.name : "") +
                                      " " +
                                      (user.surname ? user.surname : "");
                                      if (user.label === " ") {
                                        user.label = user.email;
                                      } else {
                                        user.label = user.label ;
                                      }
                                      user.value = user.id;
                                      return user;
                                    }))}
                                    value={this.props.disabled?(this.props.task.requestedBy===undefined?null:
                                    {
                                    label:
                                    (this.props.task.requestedBy.name ? this.props.task.requestedBy.name : "") +
                                    " " +
                                    (this.props.task.requestedBy.surname ? this.props.task.requestedBy.surname : "") + " "+ this.props.task.requestedBy.email
                                    ,value: this.props.task.requestedBy.id}):this.state.requestedBy}
                                    onChange={e => {
                                      this.autoSubmit("requestedBy", e);
                                      this.setState({ requestedBy: e, company:this.props.companies[this.props.companies.findIndex((item)=>item.id===e.company.id)] });
                                    }}
                                    />
                                </InputGroup>
                                {!this.props.disabled && this.state.requestedBy===undefined &&<label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionMustSelectRequester')}</label>}
                              </FormGroup>
                            <FormGroup>
                                <label htmlFor="company" className="req input-label">{i18n.t('company')}</label>
                                  {!this.props.disabled && this.props.task.loggedUserRoleAcl.includes('company_settings')&&
                                    <span style={{ float: "right" }}>
                                      <button
                                        style={{ float: "right", paddingTop:0,paddingBottom:0, paddingLeft:5,paddingRight:5}}
                                        className="btn btn-sm btn-primary mr-1"
                                        onClick={()=>this.setState({openAddCompany:true})}
                                      >
                                        <i className="fa fa-plus " />
                                      </button>
                                  </span>}

                                <InputGroup className={!this.props.disabled && this.state.company===undefined?"fieldError":""}>
                                  <InputGroupAddon>
                                    <i className="fa fa-building-o" />
                                  </InputGroupAddon>
                                  <Select
                                   styles={colourStyles}
                                   isDisabled={this.props.disabled}
                                    className="fullWidth"
                                    options={this.props.disabled?
                                      [{
                                        label: this.props.task.company.title,
                                        value: this.props.task.company.id
                                      }]:
                                      (this.props.companies.map(company => {
                                      company.label = company.title;
                                      company.value = company.id;
                                      return company;
                                    }))}
                                    value={this.props.disabled?{
                                      label: this.props.task.company.title,
                                      value: this.props.task.company.id
                                    }:this.state.company}
                                    onChange={e => {
                                      this.autoSubmit("company", e);
                                      this.setState({ company: e });
                                    }}
                                    />
                                </InputGroup>
                                {!this.props.disabled&&this.state.company===undefined &&<label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionMustSelectCompany')}</label>}
                              </FormGroup>
                            <FormGroup>
                                <label htmlFor="assigned" className="input-label">{i18n.t("assigned")}</label>
                                <InputGroup>
                                  <InputGroupAddon>
                                    <i className="fa fa-user-plus" />
                                  </InputGroupAddon>
                                  <select
                                    className="form-control"
                                    disabled={this.props.disabled}
                                    id="assigned"
                                    value={this.props.disabled?(this.props.task.taskHasAssignedUsers.length>0?this.props.task.taskHasAssignedUsers[0].id:"null"):this.state.taskSolver}
                                    onChange={e => {
                                      this.autoSubmit("taskSolver", e.target.value);
                                      this.setState({ taskSolver: e.target.value });
                                    }}
                                    >
                                    {
                                      (this.props.disabled?(
                                        (this.props.task.taskHasAssignedUsers.length>0?
                                          [{ id: "null", username: i18n.t("noone") },this.props.task.taskHasAssignedUsers[0]]:
                                          [{ id: "null", username: i18n.t("noone") }])
                                      ):
                                      ([{ id: "null", username: i18n.t("noone") }]
                                    .concat(this.props.taskSolvers)))
                                    .map(solver => (
                                      <option key={solver.id} value={solver.id}>
                                        {solver.username}
                                      </option>
                                    ))}
                                  </select>
                                </InputGroup>
                              </FormGroup>
                          </div>
                          <div className="col-4">
                            <FormGroup>
                              <label htmlFor="startedAt" className="input-label">{i18n.t("startedAt")}</label>
                              <InputGroup>
                                <InputGroupAddon>
                                  <i className="fa fa-clock-o" />
                                </InputGroupAddon>
                                <div style={{ width: "100%" }} className="datepickerWrap">
                                  <DatePicker
                                    selected={this.props.disabled?(this.props.task.startedAt
                                    ? moment(this.props.task.startedAt * 1000)
                                    : null):this.state.startedAt}
                                    onChange={e => {
                                      this.autoSubmit("startedAt", e);
                                      this.setState({ startedAt: e });
                                    }}
                                    locale="en-gb"
                                    placeholderText={i18n.t("startedAt")}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={30}
                                    dateFormat="DD.MM.YYYY HH:mm"
                                    disabled={this.props.disabled}
                                    />
                                </div>
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <label htmlFor="deadline" className="input-label">{i18n.t("dueDate")}</label>
                              <InputGroup>
                                <InputGroupAddon>
                                  <i className="fa fa-clock-o" />
                                </InputGroupAddon>
                                <div style={{ width: "100%" }} className="datepickerWrap">
                                  <DatePicker
                                    disabled={this.props.disabled}
                                    selected={this.props.disabled ?(this.props.task.deadline
                                    ? moment(this.props.task.deadline * 1000)
                                    : null):this.state.deadline}
                                    onChange={e => {
                                      this.autoSubmit("deadline", e);
                                      this.setState({ deadline: e });
                                    }}
                                    locale="en-gb"
                                    placeholderText="Deadline"
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={30}
                                    dateFormat="DD.MM.YYYY HH:mm"
                                    />
                                </div>
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <label htmlFor="work" className="input-label">{i18n.t("work")}</label>
                              <InputGroup>
                                <InputGroupAddon>
                                  <i className="fa fa-list" />
                                </InputGroupAddon>
                                <select
                                  className="form-control"
                                  disabled={this.props.disabled}
                                  id="work"
                                  value={this.props.disabled?this.props.task.work_type:this.state.work_type}
                                  onChange={e => {
                                    this.autoSubmit("work_type", e.target.value);
                                    this.setState({ work_type: e.target.value });
                                  }}
                                  >
                                  {workTypes.map(type => (
                                    <option key={type} value={type}>
                                      {type}
                                    </option>
                                  ))}
                                </select>
                              </InputGroup>
                            </FormGroup>
                          </div>
                        </div>

                        {/*END OF TABLE 1*/}

                        <FormGroup>
                          <label htmlFor="description" className="input-label">{i18n.t("description")}</label>
                          <InputGroup>
                            <textarea
                              className="form-control"
                              disabled={this.props.disabled}
                              id="description"
                              rows={4}
                              value={this.props.disabled?this.props.task.description:this.state.description}
                              onChange={e => {
                                this.autoSubmit("description", e.target.value);
                                this.setState({ description: e.target.value });
                              }}
                              placeholder={i18n.t("enterDescription")}
                              />
                          </InputGroup>
                        </FormGroup>
                            <div className="form-group">
                              {this.props.disabled &&
                                <div>
                                  <label>{i18n.t('tags')+(this.props.task.tags.length===0?' - '+i18n.t('none2'):':')}</label>
                                {this.props.task.tags.map(item => (
                                  <span
                                    key={item.id}
                                    className="badge"
                                    style={{
                                      margin: "auto",
                                      borderRadius: "3px",
                                      color: "white",
                                      fontSize:15,
                                      backgroundColor:
                                      (item.color.includes("#") ? "" : "#") +
                                      item.color,
                                      paddingLeft: 10,
                                      paddingRight: 10,
                                      paddingTop: 5,
                                      paddingBottom: 5,
                                      marginLeft: 5
                                    }}
                                    >
                                    {item.title}
                                  </span>
                                ))}
                              </div>
                              }
                              {!this.props.disabled &&
                              <MultiSelect
                                id="tags"
                                data={this.props.tags}
                                displayValue="title"
                                selectedIds={this.state.tags}
                                idValue="id"
                                filterBy="title"
                                display="row"
                                colored={true}
                                labelStyle={{ marginLeft: 10 }}
                                searchStyle={{ margin: 5 , borderWidth:0, fontSize:18,textAlign: 'center'}}
                                dropdownStyle={{borderRadius:5, borderColor:'#187da0'}}
                                displayBoxStyle={{ overflowX: "auto" }}
                                menuItemStyle={{
                                  marginLeft: 7,
                                  marginRight: 7,
                                  marginTop: 2,
                                  marginBottom: 2,
                                  paddingTop: 2,
                                  paddingBottom: 2,
                                  borderRadius:5,
                                  fontSize:15
                                }}
                                renderItem={item => (
                                  <span
                                    key={item.id}
                                    className="badge"
                                    style={{
                                      margin: "auto",
                                      borderRadius: "3px",
                                      color: "white",
                                      fontSize:15,
                                      backgroundColor:
                                      (item.color.includes("#") ? "" : "#") +
                                      item.color,
                                      paddingLeft: 10,
                                      paddingRight: 10,
                                      paddingTop: 5,
                                      paddingBottom: 5,
                                      marginLeft: 5
                                    }}
                                    >
                                    {item.title}
                                  </span>
                                )}
                                titleStyle={{
                                  color: "black",
                                  size: "0.875rem"
                                }}
                                toggleStyle={{
                                  border: "none",
                                  padding: 0,
                                  fontSize: "0.875rem"
                                }}
                                label={i18n.t("selectTags")}
                                onChange={(ids, items) => {
                                  this.autoSubmit("tags", ids);
                                  this.setState({ tags: ids });
                                }}
                                />
                            }
                            </div>
                        <FormGroup>
                          <label htmlFor="followers" className="input-label">
                            {i18n.t('followers')}
                          </label>
                          <InputGroup>
                            <InputGroupAddon>
                              <i className="fa fa-user-plus" />
                            </InputGroupAddon>
                          <Select
                           styles={colourStyles}
                           isDisabled={this.props.disabled}
                           className="fullWidth"
                            options={(this.props.disabled?this.props.followers:this.props.users).map(user => {
                              user.label = user.email;
                              user.value = user.id;
                              return user;
                            })}
                            isMulti
                            value={this.props.followers.map(user => {
                              user.label = user.email;
                              user.value = user.id;
                              return user;
                            })}
                            onChange={(e) => {
                              let newFollowers = e.map((user)=>user.id);
                              let oldFollowers = this.props.followers.map((user)=>user.id);
                              let added=newFollowers.filter((id)=>!oldFollowers.includes(id));
                              let removed=oldFollowers.filter((id)=>!newFollowers.includes(id));
                              added.map((item)=>{
                                this.props.addFollower(
                                  item,
                                  this.props.task.id,
                                  this.props.token
                                );
                              });

                              removed.map((item)=>{
                              this.props.deleteFollower(
                                item,
                                this.props.task.id,
                                this.props.token
                              );
                            });
                            }}
                          />
                        </InputGroup>
                        </FormGroup>

                        {!this.props.disabled &&
                          <div>
                          <div className="form-group" style={{ marginBottom: 0 }}>
                          <label htmlFor="fileUpload" className="input-label">{i18n.t("attachments")}</label>
                          <input
                            type="file"
                            id="fileUpload"
                            style={{ display: "none" }}
                            onChange={e => {
                              this.setState({showUploadError:false});
                              let file = e.target.files[0];
                              if(file===undefined){
                                return;
                              }
                              if(file.size>10000000){
                                this.setState({showUploadError:true});
                                return;
                              }
                              let self = this;
                              this.props.uploadFile(file, this.props.token);
                              setTimeout(function() {
                                self.autoSubmit();
                              }, 4000);
                            }}
                            />
                          <div>
                          <label
                            htmlFor="fileUpload"
                            className="btn btn-primary btn-block uploadButton"
                            >
                              {i18n.t("addAttachment")}
                          </label>
                        </div>
                        </div>
                        {this.state.showUploadError &&<span style={{color:'red'}}>This file is too big!</span>}
                        <div className="form-group">
                          <div style={{ paddingTop: 5, paddingRight: 10 }}>
                            {this.props.attachments.map(item => (
                              <span
                                key={item.url}
                                className="badge"
                                style={{
                                  backgroundColor: "#d3eef6",
                                  color: "black",
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                  paddingTop: 5,
                                  paddingBottom: 5,
                                  marginLeft: 5,
                                  marginTop: 1,
                                  width: "100%",
                                  display: "flex"
                                }}
                                >
                                <div
                                  style={{ marginTop: "auto", marginBottom: "auto" }}
                                  >
                                  {!item.url && item.file.name}
                                  {item.url && (
                                    <a href={item.url}>{item.file.name}</a>
                                  )}
                                </div>
                                <div style={{ flex: 1 }} />
                                {item.file.size && (
                                  <div
                                    style={{
                                      marginTop: "auto",
                                      marginBottom: "auto"
                                    }}
                                    >
                                    {item.file.size > 10000 &&
                                      Math.ceil(item.file.size / 1000) + "kb"}
                                      {item.file.size <= 10000 && item.file.size + "b"}
                                    </div>
                                  )}

                                  {<button
                                    type="button"
                                    className="close"
                                    aria-label="Close"
                                    style={{ marginTop: "auto", marginBottom: "auto" }}
                                    onClick={() => {
                                      this.props.removeFile(item.id, this.props.token);
                                      let self = this;
                                      setTimeout(function() {
                                        self.autoSubmit();
                                      }, 3000);
                                    }}
                                    >
                                    <span
                                      aria-hidden="true"
                                      style={{
                                        color: "black",
                                        padding: 5,
                                        paddingBottom: 10,
                                        margin: 0
                                      }}
                                      >
                                      &times;
                                    </span>
                                  </button>}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>}
                        {this.props.disabled &&
                          <div style={{ paddingTop: 5, paddingRight: 10 }}>
                            <label style={{ fontWeight: 'bold',padding:4.8}}>{i18n.t('attachments')+ (this.props.attachments.length===0?' - '+i18n.t('none2'):': ')}</label>
                            {this.props.attachments.map(item => (
                              <span
                                key={item.url}
                                className="badge"
                                style={{
                                  backgroundColor: "#d3eef6",
                                  color: "black",
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                  paddingTop: 5,
                                  paddingBottom: 5,
                                  marginLeft: 5,
                                  marginTop: 1
                                }}
                                >
                                <div
                                  style={{ marginTop: "auto", marginBottom: "auto" }}
                                  >
                                  {!item.url && item.file.name}
                                  {item.url && (
                                    <a href={item.url}>{item.file.name}</a>
                                  )}
                                </div>
                                <div style={{ flex: 1 }} />
                                {item.file.size && (
                                  <div
                                    style={{
                                      marginTop: "auto",
                                      marginBottom: "auto"
                                    }}
                                    >
                                    {item.file.size > 10000 &&
                                      Math.ceil(item.file.size / 1000) + "kb"}
                                      {item.file.size <= 10000 && item.file.size + "b"}
                                    </div>
                                  )}
                                </span>
                              ))}
                            </div>}
                          <Subtasks
                            disabled={this.props.disabled}
                            taskID={this.props.task.id}
                            />
                          <FormGroup>
                            <label htmlFor="workTime" className="input-label">{i18n.t("workTime")}</label>
                            <InputGroup>
                              <InputGroupAddon>
                                <i className="fa fa-hourglass-o" />
                              </InputGroupAddon>
                              <input
                                disabled={this.props.disabled}
                                className="form-control"
                                type="number"
                                id="workTime"
                                value={this.props.disabled?this.props.task.work_time:this.state.workTime}
                                onChange={e => {
                                  this.autoSubmit("workTime", e.target.value);
                                  this.setState({ workTime: e.target.value });
                                }}
                                placeholder={i18n.t("enterWorkTime")}
                                />
                            </InputGroup>
                          </FormGroup>
                          <Materials
                              disabled={this.props.disabled}
                              taskID={this.props.task.id}
                              units={this.props.units}
                              />
                            { this.props.taskAttributes.filter((item)=>item.is_active).map(attribute => {
                                  switch (attribute.type) {
                                    case "input":
                                    return (
                                      <div className={"form-group"+(!this.props.disabled && attribute.required && this.state.task_data[attribute.id] ==='' ?' fieldError':'')} key={attribute.id} >
                                        <label htmlFor={attribute.id} className={attribute.required?"req input-label":"input-label"}>{attribute.title}</label>
                                        <input
                                          className="form-control"
                                          id={attribute.id}
                                          disabled={this.props.disabled}
                                          value={this.state.task_data[attribute.id]}
                                          onChange={e => {
                                            let newData = { ...this.state.task_data };
                                            newData[attribute.id] = e.target.value;
                                            this.autoSubmit("task_data", newData);
                                            this.setState({ task_data: newData });
                                          }}
                                          placeholder={i18n.t('enter')+" " + attribute.title}
                                          />
                                        {!this.props.disabled && attribute.required && this.state.task_data[attribute.id] ===''&&<span><i className={"fa fa-exclamation-circle"} style={{color:'red',paddingRight:3}}/><label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionFieldRequired')}</label></span>}
                                      </div>
                                    );
                                    case "text_area":
                                    return (
                                      <div className={"form-group"+(!this.props.disabled && attribute.required && this.state.task_data[attribute.id] ==='' ?' fieldError':'')} key={attribute.id}>
                                        <label htmlFor={attribute.id} className={attribute.required?"req input-label":"input-label"}>{attribute.title}</label>
                                        <textarea
                                          className="form-control"
                                          id={attribute.id}
                                          disabled={this.props.disabled}
                                          value={this.state.task_data[attribute.id]}
                                          onChange={e => {
                                            let newData = { ...this.state.task_data };
                                            newData[attribute.id] = e.target.value;
                                            this.autoSubmit("task_data", newData);
                                            this.setState({ task_data: newData });
                                          }}
                                          placeholder={i18n.t('enter')+" " + attribute.title}
                                          />
                                        {!this.props.disabled && attribute.required && this.state.task_data[attribute.id] ===''&&<span><i className={"fa fa-exclamation-circle"} style={{color:'red',paddingRight:3}}/><label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionFieldRequired')}</label></span>}
                                      </div>
                                    );
                                    case "simple_select":
                                    return (
                                      <div className="form-group" key={attribute.id}>
                                        <label
                                          htmlFor={attribute.id}
                                          className={attribute.required ? "req" : ""}
                                          >
                                          {attribute.title}
                                        </label>
                                        <select
                                          className="form-control"
                                          id={attribute.id}
                                          disabled={this.props.disabled}
                                          value={this.state.task_data[attribute.id]}
                                          onChange={e => {
                                            let newData = { ...this.state.task_data };
                                            newData[attribute.id] = e.target.value;
                                            this.autoSubmit("task_data", newData);
                                            this.setState({ task_data: newData });
                                          }}
                                          >
                                          {Array.isArray(attribute.options) &&
                                            attribute.options.map(opt => (
                                              <option key={opt} value={opt}>
                                                {opt}
                                              </option>
                                            ))}
                                            {!Array.isArray(attribute.options) &&
                                              Object.keys(attribute.options).map(key => (
                                                <option key={key} value={key}>
                                                  {key}
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                        );
                                        case "multi_select": {
                                          let opt = [];
                                          attribute.options.map(att =>
                                            opt.push({
                                              id: attribute.options.indexOf(att),
                                              title: att
                                            })
                                          );
                                          return (
                                            <div className="form-group" key={attribute.id}>
                                              <MultiSelect
                                                id={attribute.id}
                                                data={opt}
                                                displayValue="title"
                                                selectedIds={this.state.task_data[attribute.id]}
                                                idValue="id"
                                                filterBy="title"
                                                title={attribute.title}
                                                display="row"
                                                displayBoxStyle={{ width: 100 }}
                                                menuItemStyle={{
                                                  marginLeft: 7,
                                                  marginRight: 7,
                                                  marginTop: 2,
                                                  marginBottom: 2,
                                                  paddingTop: 2,
                                                  paddingBottom: 2
                                                }}
                                                renderItem={item => (
                                                  <span
                                                    className="badge"
                                                    key={item.id}
                                                    style={{
                                                      margin: "auto",
                                                      border: "1px solid black",
                                                      borderRadius: "3px",
                                                      paddingLeft: 10,
                                                      paddingRight: 10,
                                                      paddingTop: 5,
                                                      paddingBottom: 5,
                                                      marginLeft: 5
                                                    }}
                                                    >
                                                    {item.title}
                                                  </span>
                                                )}
                                                titleStyle={{
                                                  backgroundColor: "white",
                                                  color: "black",
                                                  size: 15
                                                }}
                                                toggleStyle={{
                                                  backgroundColor: "white",
                                                  border: "none",
                                                  padding: 0
                                                }}
                                                label={attribute.title}
                                                labelStyle={{ marginLeft: 10 }}
                                                searchStyle={{ margin: 5 }}
                                                onChange={(ids, items) => {
                                                  let newData = { ...this.state.task_data };
                                                  newData[attribute.id] = ids;
                                                  this.autoSubmit("task_data", newData);
                                                  this.setState({ task_data: newData });
                                                }}
                                                />
                                            </div>
                                          );
                                        }
                                        case "date":
                                        return (
                                          <div className={"form-group"+(!this.props.disabled && attribute.required && this.state.task_data[attribute.id] ===null ?' fieldError':'')} key={attribute.id}>
                                            <label htmlFor={attribute.id} className={!this.props.disabled && attribute.required?"req input-label":"input-label"}>{attribute.title}</label>
                                            <DatePicker
                                              selected={this.state.task_data[attribute.id]}
                                              disabled={this.props.disabled}
                                              onChange={e => {
                                                let newData = { ...this.state.task_data };
                                                newData[attribute.id] = e;
                                                this.autoSubmit("task_data", newData);
                                                this.setState({ task_data: newData });
                                              }}
                                              locale="en-gb"
                                              placeholderText={attribute.title}
                                              showTimeSelect
                                              timeFormat="HH:mm"
                                              timeIntervals={30}
                                              dateFormat="DD.MM.YYYY HH:mm"
                                              />
                                            {!this.props.disabled && attribute.required && this.state.task_data[attribute.id] ===null&&<span><i className={"fa fa-exclamation-circle"} style={{color:'red',paddingRight:3}}/><label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionFieldRequired')}</label></span>}
                                          </div>
                                        );
                                        case "decimal_number":
                                        return (
                                          <div className={"form-group"+(!this.props.disabled && attribute.required && isNaN(parseFloat(this.state.task_data[attribute.id])) ?' fieldError':'')} key={attribute.id}>
                                            <label htmlFor={attribute.id} className={!this.props.disabled && attribute.required?"req input-label":"input-label"}>{attribute.title}</label>
                                            <input
                                              className="form-control"
                                              type="number"
                                              id={attribute.id}
                                              disabled={this.props.disabled}
                                              value={this.state.task_data[attribute.id]}
                                              onChange={e => {
                                                let newData = { ...this.state.task_data };
                                                newData[attribute.id] = e.target.value;
                                                this.autoSubmit("task_data", newData);
                                                this.setState({ task_data: newData });
                                              }}
                                              placeholder={i18n.t('enter')+" " + attribute.title}
                                              />
                                            {!this.props.disabled &&attribute.required && isNaN(parseFloat(this.state.task_data[attribute.id]))&&<span><i className={"fa fa-exclamation-circle"} style={{color:'red',paddingRight:3}}/><label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionFieldRequiredAndNotValid')}</label></span>}
                                          </div>
                                        );
                                        case "integer_number":
                                        return (
                                          <div className={"form-group"+(!this.props.disabled &&attribute.required && isNaN(parseFloat(this.state.task_data[attribute.id])) ?' fieldError':'')} key={attribute.id}>
                                            <label htmlFor={attribute.id} className={!this.props.disabled &&attribute.required?"req input-label":"input-label"}>{attribute.title}</label>
                                            <input
                                              className="form-control"
                                              type="number"
                                              id={attribute.id}
                                              disabled={this.props.disabled}
                                              value={this.state.task_data[attribute.id]}
                                              onChange={e => {
                                                let newData = { ...this.state.task_data };
                                                newData[attribute.id] = e.target.value;
                                                this.autoSubmit("task_data", newData);
                                                this.setState({ task_data: newData });
                                              }}
                                              placeholder={i18n.t('enter')+" " + attribute.title}
                                              />
                                            {!this.props.disabled && attribute.required && isNaN(parseFloat(this.state.task_data[attribute.id]))&&<span><i className={"fa fa-exclamation-circle"} style={{color:'red',paddingRight:3}}/><label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionFieldRequiredAndNotValid')}</label></span>}
                                          </div>
                                        );
                                        case "checkbox":
                                        return (
                                          <div className="form-group" key={attribute.id}>
                                            <label className="form-check-label">
                                              <input
                                                type="checkbox"
                                                className="form-check-input"
                                                disabled={this.props.disabled}
                                                checked={this.state.task_data[attribute.id]}
                                                onChange={() => {
                                                  let newData = { ...this.state.task_data };
                                                  newData[attribute.id] = !newData[
                                                    attribute.id
                                                  ];
                                                  this.autoSubmit("task_data", newData);
                                                  this.setState({ task_data: newData });
                                                }}
                                                />
                                              {attribute.title}
                                            </label>
                                          </div>
                                        );

                                        default:
                                        return <div>{attribute.title}</div>;
                                        }
                                      })}
                                </div>
                            <CommentsLoader taskID={this.props.task.id} disabled={this.props.disabled} />
                              </CardBody>
                            </Card>
                          </div>
                        );
                      }
                    }

                    const mapStateToProps = ({
                      tasksReducer,
                      statusesReducer,
                      companiesReducer,
                      tagsReducer,
                      unitsReducer,
                      login,
                      usersReducer,
                      attachmentsReducer,
                      followersReducer,
                      taskAttributesReducer
                    }) => {
                      const { task, taskProjects, taskSolvers, repeat } = tasksReducer;
                      const { taskAttributes } = taskAttributesReducer;
                      const { taskStatuses } = statusesReducer;
                      const { taskCompanies } = companiesReducer;
                      const { tags } = tagsReducer;
                      const { units } = unitsReducer;
                      const { users } = usersReducer;
                      const { attachments } = attachmentsReducer;
                      const { followers } = followersReducer;
                      const { token,user } = login;
                      return {
                        task,
                        taskProjects,
                        repeat:repeat.length>0?repeat[0]:null,
                        companies: taskCompanies,
                        taskAttributes,
                        statuses: taskStatuses,
                        tags,
                        units,
                        taskSolvers,
                        users,
                        user,
                        attachments,
                        followers,
                        token,
                        companiesUpdateDate:companiesReducer.updateDate
                      };
                    };

                    export default connect(mapStateToProps, {
                      getTaskSolvers,
                      deleteTaskSolvers,
                      editTask,
                      deleteTask,
                      uploadFile,
                      removeFile,
                      addFollower,
                      deleteFollower,
                      getTaskCompanies,
                      getUsers
                    })(EditTask);
