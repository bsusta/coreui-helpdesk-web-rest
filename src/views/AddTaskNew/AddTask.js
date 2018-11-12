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
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import RichTextEditor from "react-rte";
import Select from "react-select";
import CompanyAdd from '../settings/companyAdd';
import UserAdd from '../settings/userAdd';
import {
  getTaskSolvers,
  deleteTaskSolvers,
  addTask,
  uploadFile,
  removeFile,
  getTaskCompanies,
  getUsers
} from "../../redux/actions";
import {
  timestampToString,
  initialiseCustomAttributes,
  processCustomAttributes,
  importExistingCustomAttributesForTask,
  containsNullRequiredAttribute,
  fillRequiredCustomAttributes
} from "../../helperFunctions";
import MultiSelect from "../../components/multiSelect";
import i18n from "i18next";
import Repeat from './repeat';
import Materials from './materials';
import Subtasks from './subtasks';

const workTypes=['vzdialena podpora','servis IT','servis serverov','programovanie www','instalacie klientskeho os','bug reklamacia','navrh','material','cenova ponuka','administrativa','konzultacia','refakturacia','testovanie'];
const indexOfNoPadding=2;
const colourStyles = {
  control: styles => ({ ...styles,
                           backgroundColor: 'white',
                           borderRadius:"0",
                           border: '1px solid #c2cfd6',
                      }),
}


class AddTask extends Component {
	constructor(props) {
		super(props);
		//we initialize all tasks aditional attributes
		let task_data = initialiseCustomAttributes([...this.props.taskAttributes]);
		let id =this.props.filterState&&this.props.filterState.projects&&this.props.filterState.projects.length>0?this.props.filterState.projects[0].id:null;
		let project = "null";
		if(id!==null && this.props.taskProjects.some((item)=>item.id===id)){
			project = id;
		}
		this.state = {
			company: this.props.companies[
				this.props.companies.findIndex(company => company.id === this.props.user.company.id)
			],
			deadline: null,
			startedAt: null,
			description: '',
			important: false,
			project,
			requestedBy: this.props.users[this.props.users.findIndex(user => user.id === this.props.user.id)],
			status: this.props.statuses.length > 0 ? this.props.statuses[0].id : null,
			tags: [],
			title: '',
			workTime: '',
			work_type: 'vzdialena podpora',
			newTags: [],
			newTag: '',
			submitError: false,
			task_data,
			taskSolver: 'null',
			subtasks: [],
			materials: [],
			followers: [],
			openAddUser: false,
			openAddCompany: false,
      openRepeat:false,
      repeat:null,
		 };
		this.submit.bind(this);
	}

	/**
	 * Adds new task
	 * @return {null}
	 */
	submit() {
		this.setState({ submitError: true });
		//we create copy of the state so we can transform data
		let state = { ...this.state };
		let task_data = processCustomAttributes({ ...state.task_data }, [...this.props.taskAttributes]);
		//checks if all requirements for creating were met
		if (
			containsNullRequiredAttribute(task_data, [...this.props.taskAttributes]) ||
			this.state.title === '' ||
			this.state.requestedBy === undefined ||
			this.state.project === 'null' ||
			this.state.company === undefined
		) {
			return;
		}

		//as a tags we send titles not ids
		let tags = [];
		state.tags.map(addTag => tags.push(this.props.tags.concat(state.newTags).find(tag => tag.id == addTag).title));

		//ak je task uzvrety nastavi mu closedAt, ak nema startedAt tak ten tiez
		let closedAt = this.state.closedAt ? this.state.closedAt : 'null';
		if (state.status.toString() === '4') {
			closedAt = Math.ceil(moment().valueOf() / 1000);
			if (state.startedAt === null) {
				state.startedAt = closedAt * 1000;
			}
		}

		this.props.addTask(
			{
				title: state.title,
				closedAt,
				description: state.description === '' ? 'null' : state.description,
				deadline: state.deadline !== null ? state.deadline.valueOf() / 1000 : 'null',
				startedAt: state.startedAt !== null ? state.startedAt.valueOf() / 1000 : 'null',
				important: state.important,
				workType: state.work_type,
				workTime: state.workTime.length == 0 ? undefined : state.workTime,
				tag: JSON.stringify(tags),
				assigned: state.taskSolver != 'null' ? JSON.stringify([{ userId: parseInt(state.taskSolver) }]) : null,
				attachment:
					this.props.attachments.length === 0
						? undefined
						: JSON.stringify(this.props.attachments.map(attachment => attachment.id)),
				taskData: JSON.stringify(task_data),
			},
      this.state.repeat,
			this.state.subtasks,
			this.state.materials,
			this.state.followers.map((user)=>user.id),
			state.project,
			state.status,
			state.requestedBy.id,
			state.company.id,
			this.props.token
		);
		this.props.history.goBack();
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
          <Card className="experimentalTaskEdit">
                    <CardBody className="whiteBG">
                      <div
                        className="row task-header"
                        >
                          <div className="form-group" style={{flex: '0 0 100%',maxWidth: '100%'}}>
                            <InputGroup>
                              <InputGroupAddon
                                style={{ backgroundColor: "white",paddingLeft:0}}
                                className="task-header-input no-border"
                                >
                                <span className="float">
                                  <i
                                    className={"fa fa-star icon-star"}
                                    style={{ fontSize: "1.97em", float: "left"}}
                                    onClick={() => {
                                      if(this.props.disabled){return;}
                                      if (!this.state.important) {
                                        this.setState({ important: true });
                                      }
                                    }}
                                    />
                                  {this.state.important && (
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
                                value={this.state.title}
                                style={{ fontSize: 24, border:'none' }}
                                disabled={this.props.disabled}
                                onChange={e => {
                                  this.setState({ title: e.target.value });
                                }}
                                />
                              <InputGroupAddon className="no-border">
                                <button className="btn btn-link" onClick={this.submit.bind(this)}>
                                  <i className="fa fa-save" /> {i18n.t('create')}
                                </button>

                                <button className="btn btn-link" onClick={()=>this.props.history.goBack()}>
                                  <i className="fa fa-times" /> {i18n.t("cancel")}
                                </button>
                              </InputGroupAddon>
                            </InputGroup>
                              </div>
                          {/*this.state.submitError && this.state.title===''&&<label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionMustEnterTaskTitle')}</label>*/}
                      </div>
                      {!this.props.disabled && this.state.submitError && <span><h5 style={{color:'red'}}> {i18n.t('restrictionTaskWontSave')}</h5></span>}

                      <div>
                        <div className="form-group">
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
                            searchStyle={{ margin: 5 , borderWidth:0,textAlign: 'center'}}
                            dropdownStyle={{borderRadius:5, borderColor:'#187da0'}}
                            displayBoxStyle={{ overflowX: "auto" }}
                            menuItemStyle={{
                              marginLeft: 7,
                              marginRight: 7,
                              marginTop: 2,
                              marginBottom: 2,
                              paddingTop: 2,
                              paddingBottom: 2,
                              borderRadius:5
                            }}
                            renderItem={item => (
                              <span
                                key={item.id}
                                className="badge"
                                style={{
                                  margin: "auto",
                                  borderRadius: "3px",
                                  color: "white",
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
                              fontSize:'75%'

                            }}
                            label={i18n.t("selectTags")}
                            onChange={(ids, items) => {
                              this.setState({ tags: ids });
                            }}
                            />
                        </div>
                          <div className="row experimentalRowTask">
                            <div className="col-4" style={{paddingLeft:0}}>
                              <div className="row experimentalRowWrapper">
                                <label htmlFor="status" className="input-label center-hor">{i18n.t("status")}</label>
                                <InputGroup>
                                  {this.state.status &&
                                    <span className="coloredSelect"
                                      style={{
                                        color:this.props.statuses.find(
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
                                        color: this.props.statuses.find(
                                          status => status.id == this.state.status
                                        ).color
                                      }}
                                      value={this.state.status}
                                      id="status"
                                      onChange={e => {
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
                                    </select>
                                  </InputGroup>
                                </div>
                              <div className="row experimentalRowWrapper">
                                <label htmlFor="project" className="req input-label center-hor">
                                  {i18n.t("project")}
                                </label>
                                <InputGroup>
                                  <select
                                    disabled={this.props.disabled}
                                    className="form-control"
                                    id="project"
                                    value={this.state.project}
                                    onChange={e => {
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
                                  </select>
                                </InputGroup>
                              </div>
                              {
                                <Repeat disabled={false}
                                  onToogle={()=>this.setState({openRepeat:!this.state.openRepeat})}
                                  open={this.state.openRepeat}
                                  defaultState={this.state.repeat}
                                  onSave={(repeat)=>this.setState({repeat})} />
                              }
                            </div>
                            <div className="col-4">
                              <div className="row experimentalRowWrapper">
                                <label htmlFor="requester" className="req input-label center-hor">{i18n.t('requester')}</label>
                                  <InputGroup className={!this.props.disabled&&this.state.requestedBy.id===undefined?"fieldError":""}>
                                    <Select
                                      styles={colourStyles}
                                      className="fullWidth"
                                      isDisabled={this.props.disabled}
                                      options={this.props.users.map(user => {
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
                                      })}
                                      value={this.state.requestedBy}
                                      onChange={e => {
                                        this.setState({ requestedBy: e, company:this.props.companies[this.props.companies.findIndex((item)=>item.id===e.company.id)] });
                                      }}
                                      />
                                    {this.props.user.user_role.acl.includes('user_settings') &&
                                      <span className="center-hor">
                                        <button
                                          className="btn btn-sm btn-link mr-1 taskAddButton"
                                          onClick={()=>this.setState({openAddUser:true})}
                                          >
                                          <i className="fa fa-plus " />
                                        </button>
                                      </span>}
                                  </InputGroup>
                                  {!this.props.disabled && this.state.requestedBy===undefined &&<label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionMustSelectRequester')}</label>}
                                </div>
                              <div className="row experimentalRowWrapper">
                                  <label htmlFor="company" className="req input-label center-hor">{i18n.t('company')}</label>

                                  <InputGroup className={!this.props.disabled && this.state.company===undefined?"fieldError":""}>
                                    <Select
                                     styles={colourStyles}
                                      className="fullWidth"
                                      options={
                                        (this.props.companies.map(company => {
                                        company.label = company.title;
                                        company.value = company.id;
                                        return company;
                                      }))}
                                      value={this.state.company}
                                      onChange={e => {
                                        this.setState({ company: e });
                                      }}
                                      />
                                    {this.props.user.user_role.acl.includes('company_settings')&&
                                      <span style={{ float: "right" }} className="center-hor">
                                        <button
                                          className="btn btn-sm btn-link mr-1 taskAddButton"
                                          onClick={()=>this.setState({openAddCompany:true})}
                                          >
                                          <i className="fa fa-plus " />
                                        </button>
                                      </span>}
                                  </InputGroup>
                                  {!this.props.disabled&&this.state.company===undefined &&<label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionMustSelectCompany')}</label>}
                                </div>
                              <div className="row experimentalRowWrapper">
                                  <label htmlFor="assigned" className="input-label center-hor">{i18n.t("assigned")}</label>
                                  <InputGroup>
                                    <select
                                      className="form-control"
                                      disabled={this.props.disabled}
                                      id="assigned"
                                      value={this.state.taskSolver}
                                      onChange={e => {
                                        this.setState({ taskSolver: e.target.value });
                                      }}
                                      >
                                      {[{ id: "null", username: i18n.t("noone") }]
                                      .concat(this.props.taskSolvers)
                                      .map(solver => (
                                        <option key={solver.id} value={solver.id}>
                                          {solver.username}
                                        </option>
                                      ))}
                                    </select>
                                  </InputGroup>
                                </div>
                            </div>
                            <div className="col-4">
                              <div className="row experimentalRowWrapper">
                                <label htmlFor="startedAt" className="input-label center-hor">{i18n.t("startedAt")}</label>
                                <InputGroup>
                                  <div style={{ width: "100%" }} className="datepickerWrap">
                                    <DatePicker
                                      selected={this.state.startedAt}
                                      onChange={e => {
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
                              </div>
                              <div className="row experimentalRowWrapper">
                                <label htmlFor="deadline" className="input-label center-hor">{i18n.t("deadline")}</label>
                                <InputGroup>
                                  <div style={{ width: "100%" }} className="datepickerWrap">
                                    <DatePicker
                                      disabled={this.props.disabled}
                                      selected={this.state.deadline}
                                      onChange={e => {
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
                              </div>
                              <div className="row experimentalRowWrapper">
                                <label htmlFor="work" className="input-label center-hor">{i18n.t("work")}</label>
                                <InputGroup>
                                  <select
                                    className="form-control"
                                    disabled={this.props.disabled}
                                    id="work"
                                    value={this.state.work_type}
                                    onChange={e => {
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
                              </div>
                            </div>
                          </div>

                            <div className="row experimentalRowTask">
                              <div className="col-4" style={{paddingLeft:0}}>
                                <div className="row experimentalRowWrapper">
                                  <label htmlFor="workTime" className="input-label">{i18n.t("workTime")}</label>
                                  <InputGroup>
                                    <input
                                      disabled={this.props.disabled}
                                      className="form-control"
                                      type="number"
                                      id="workTime"
                                      value={this.state.workTime}
                                      onChange={e => {
                                        this.setState({ workTime: e.target.value });
                                      }}
                                      placeholder={i18n.t("enterWorkTime")}
                                      />
                                  </InputGroup>
                                </div>
                              </div>
                              { this.props.taskAttributes.filter((item)=>item.is_active).map((attribute,index) => {
                                    switch (attribute.type) {
                                      case "input":
                                      return (
                                        <div className="col-4" key={attribute.id} style={index%3===indexOfNoPadding?{paddingLeft:0}:{}}>
                                          <div className={"row experimentalRowWrapper"+(attribute.required && this.state.task_data[attribute.id] ==='' ?' fieldError':'')}>
                                            <label htmlFor={attribute.id} className={attribute.required?"req input-label":"input-label"}>{attribute.title}</label>
                                            <input
                                              className="form-control"
                                              id={attribute.id}
                                              disabled={this.props.disabled}
                                              value={this.state.task_data[attribute.id]}
                                              onChange={e => {
                                                let newData = { ...this.state.task_data };
                                                newData[attribute.id] = e.target.value;
                                                this.setState({ task_data: newData });
                                              }}
                                              placeholder={i18n.t('enter')+" " + attribute.title}
                                              />
                                            {!this.props.disabled && attribute.required && this.state.task_data[attribute.id] ===''&&<span><i className={"fa fa-exclamation-circle"} style={{color:'red',paddingRight:3}}/><label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionFieldRequired')}</label></span>}
                                          </div>
                                        </div>
                                      );
                                      case "text_area":
                                      return (
                                        <div className="col-4" key={attribute.id} style={index%3===indexOfNoPadding?{paddingLeft:0}:{}}>
                                        <div className={"row experimentalRowWrapper"+(!this.props.disabled && attribute.required && this.state.task_data[attribute.id] ==='' ?' fieldError':'')}>
                                          <label htmlFor={attribute.id} className={attribute.required?"req input-label":"input-label"}>{attribute.title}</label>
                                          <textarea
                                            className="form-control"
                                            id={attribute.id}
                                            disabled={this.props.disabled}
                                            value={this.state.task_data[attribute.id]}
                                            onChange={e => {
                                              let newData = { ...this.state.task_data };
                                              newData[attribute.id] = e.target.value;
                                              this.setState({ task_data: newData });
                                            }}
                                            placeholder={i18n.t('enter')+" " + attribute.title}
                                            />
                                          {!this.props.disabled && attribute.required && this.state.task_data[attribute.id] ===''&&<span><i className={"fa fa-exclamation-circle"} style={{color:'red',paddingRight:3}}/><label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionFieldRequired')}</label></span>}
                                        </div>
                                      </div>
                                      );
                                      case "simple_select":
                                      return (
                                        <div className="col-4" key={attribute.id} style={index%3===indexOfNoPadding?{paddingLeft:0}:{}}>
                                          <div className="row experimentalRowWrapper">
                                          <label
                                            htmlFor={attribute.id}
                                            className={attribute.required ? "req" : ""}
                                            >
                                            {attribute.title}
                                          </label>
                                          <Select
                                            styles={colourStyles}
                                            id={attribute.id}
                                            className="fullWidth"
                                            isDisabled={this.props.disabled}
                                            options={Array.isArray(attribute.options)?(
                                              attribute.options.map((item)=>{return {label:item, value:item}})
                                            ):(
                                              Object.keys(attribute.options).map((item)=>{return {label:item, value:item}})
                                            )}
                                            value={{label:this.state.task_data[attribute.id],value:this.state.task_data[attribute.id]}}
                                            onChange={e => {
                                              let newData = { ...this.state.task_data };
                                              newData[attribute.id] = e.value;
                                              this.setState({ task_data: newData });
                                            }}
                                            />
                                            </div>
                                          </div>
                                          );
                                          case "multi_select": {
                                            let opt = [];
                                            attribute.options.map(att =>
                                              opt.push({
                                                value: att,
                                                label: att,
                                                id: att
                                              })
                                            );
                                            return (
                                              <div className="col-4" key={attribute.id} style={index%3===indexOfNoPadding?{paddingLeft:0}:{}}>
                                                <div className="row experimentalRowWrapper">
                                                  <label
                                                    htmlFor={attribute.id}
                                                    className={attribute.required ? "req" : ""}
                                                    >
                                                    {attribute.title}
                                                  </label>
                                                  <Select
                                                    styles={colourStyles}
                                                    id={attribute.id}
                                                    className="fullWidth"
                                                    isDisabled={this.props.disabled}
                                                    isMulti
                                                    options={opt}
                                                    value={this.state.task_data[attribute.id]}
                                                    onChange={e => {
                                                      let newData = { ...this.state.task_data };
                                                      newData[attribute.id] = e;
                                                      this.setState({ task_data: newData });
                                                    }}
                                                    />
                                                </div>
                                              </div>
                                            );
                                          }
                                          case "date":
                                          return (
                                            <div className="col-4" key={attribute.id} style={index%3===indexOfNoPadding?{paddingLeft:0}:{}}>
                                              <div className={"row experimentalRowWrapper"+(!this.props.disabled && attribute.required && this.state.task_data[attribute.id] ===null ?' fieldError':'')}>
                                              <label htmlFor={attribute.id} className={!this.props.disabled && attribute.required?"req input-label":"input-label"}>{attribute.title}</label>
                                              <DatePicker
                                                selected={this.state.task_data[attribute.id]}
                                                disabled={this.props.disabled}
                                                onChange={e => {
                                                  let newData = { ...this.state.task_data };
                                                  newData[attribute.id] = e;
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
                                          </div>
                                          );
                                          case "decimal_number":
                                          return (
                                            <div className="col-4" key={attribute.id} style={index%3===indexOfNoPadding?{paddingLeft:0}:{}}>
                                              <div className={"row experimentalRowWrapper"+
                                                (!this.props.disabled && attribute.required && isNaN(parseFloat(this.state.task_data[attribute.id])) ?' fieldError':'')}
                                                >
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
                                                  this.setState({ task_data: newData });
                                                }}
                                                placeholder={i18n.t('enter')+" " + attribute.title}
                                                />
                                              {!this.props.disabled &&attribute.required && isNaN(parseFloat(this.state.task_data[attribute.id]))&&<span><i className={"fa fa-exclamation-circle"} style={{color:'red',paddingRight:3}}/><label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionFieldRequiredAndNotValid')}</label></span>}
                                            </div>
                                          </div>
                                          );
                                          case "integer_number":
                                          return (
                                            <div className="col-4" key={attribute.id} style={index%3===indexOfNoPadding?{paddingLeft:0}:{}}>
                                              <div className={"row experimentalRowWrapper" +(!this.props.disabled &&attribute.required && isNaN(parseFloat(this.state.task_data[attribute.id])) ?' fieldError':'')}>
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
                                                  this.setState({ task_data: newData });
                                                }}
                                                placeholder={i18n.t('enter')+" " + attribute.title}
                                                />
                                              {!this.props.disabled && attribute.required && isNaN(parseFloat(this.state.task_data[attribute.id]))&&<span><i className={"fa fa-exclamation-circle"} style={{color:'red',paddingRight:3}}/><label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionFieldRequiredAndNotValid')}</label></span>}
                                            </div>
                                          </div>
                                          );
                                          case "checkbox":
                                          return (
                                            <div className="col-4" key={attribute.id} style={index%3===indexOfNoPadding?{paddingLeft:0}:{}}>
                                              <div className="row experimentalRowWrapper">
                                            <div className="form-group form-check checkbox">
                                                <input
                                                  type="checkbox"
                                                  id={"cb-"+attribute.id}
                                                  className="form-check-input"
                                                  disabled={this.props.disabled}
                                                  checked={this.state.task_data[attribute.id]}
                                                  onChange={() => {
                                                    let newData = { ...this.state.task_data };
                                                    newData[attribute.id] = !newData[
                                                      attribute.id
                                                    ];
                                                    this.setState({ task_data: newData });
                                                  }}
                                                  />
                                                <label className="form-check-label" htmlFor={"cb-"+attribute.id}>
                                                {attribute.title}
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                          );

                                          default:
                                          return <div key={attribute.id}>{attribute.title}</div>;
                                          }
                                        })}
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
                                value={this.state.description}
                                onChange={e => {
                                  this.setState({ description: e.target.value });
                                }}
                                placeholder={i18n.t("enterDescription")}
                                />
                            </InputGroup>
                          </FormGroup>

                          <FormGroup>
                            <label htmlFor="followers" className="input-label">
                              {i18n.t('followers')}
                            </label>
                            <InputGroup>
                            <Select
                             styles={colourStyles}
                             isDisabled={this.props.disabled}
                             className="fullWidth"
                              options={this.props.users.map(user => {
                                user.label = user.email;
                                user.value = user.id;
                                return user;
                              })}
                              isMulti
                              value={this.state.followers}
                              onChange={(e) => {
                                this.setState({followers:e});
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
                              }}
                              />
                            <div className="row">
                            <label
                              htmlFor="fileUpload"
                              className="btn-link btn uploadButton"
                              style={{paddingLeft:0}}
                              >
                                {i18n.t("addAttachment")}
                            </label>
                            {this.props.attachments.map((item, index) => (
                              <span
                                className="badge"
                                key={index}
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
                                <div className="row center-hor">
                                  {!item.url && item.file.name}
                                  {item.url && (
                                    <a className="center-hor" target="_blank" href={item.url}>{item.file.name} { item.file.size? item.file.size+' kb':''}
                                    </a>
                                  )}
                                  <button
                                    type="button"
                                    className="close center-block text-center m-*-auto"
                                    aria-label="Close"
                                    onClick={() => {
                                      this.props.removeFile(
                                        item.id,
                                        this.props.token
                                      );
                                    }}
                                  >
                                    <span
                                      aria-hidden="true"
                                      style={{
                                        color: "black",
                                        marginRight: "auto",
                                        marginLeft: "auto",
                                        padding: 5
                                      }}
                                    >
                                      &times;
                                    </span>
                                  </button>
                                </div>

                              </span>
                            ))}
                          </div>
                          </div>
                          {this.state.showUploadError &&<span style={{color:'red'}}>This file is too big!</span>}
                          <div className="form-group">
                            <div style={{ paddingTop: 5, paddingRight: 10 }} className="row">

                            </div>
                            </div>
                          </div>}

                            <Subtasks
                              disabled={false}
                              onSave={(subtasks)=>this.setState({subtasks})}
                              subtasks={this.state.subtasks}
                              />

                            <Materials
                              disabled={this.props.disabled}
                              onSave={(materials)=>this.setState({materials})}
                              units={this.props.units}
                              materials={this.state.materials}
                            />
                            </div>
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
                      addTask,
                      uploadFile,
                      removeFile,
                      getTaskCompanies,
                      getUsers
                    })(AddTask);
