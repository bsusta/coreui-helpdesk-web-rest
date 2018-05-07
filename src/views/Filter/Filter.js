import React, { Component } from "react";
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
  InputGroupButton
} from "reactstrap";
import DatePicker from "react-datepicker";
import moment from "moment";
import i18n from 'i18next';
import Select from "react-select";
import { connect } from 'react-redux';
import {
  initialiseCustomAttributes,
  processCustomFilterAttributes
} from "../../helperFunctions";
import {loadUnsavedFilter,createFilter} from '../../redux/actions';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


class Filter extends Component {
  constructor(props) {
    super(props);
    let state={
      createdFrom:null,
      createdTo:null,
      deadlineFrom:null,
      deadlineTo:null,
      closedFrom:null,
      closedTo:null,
      title:'',
      startedFrom:null,
      startedTo:null,
      archived:false,
      important:false,
      statuses:[],
      projects:[],
      creators:[],
      requesters:[],
      companies:[],
      assignedTos:[],
      tags:[],
      followers:[],
      task_data:{},
      saveOpen:false,
      filterName:'',
      filterPublic:false,
      filterReport:false,
      filterDefault:false,
      filterIcon:'',
      filterOrder:10,
      submitError:false,

    }
    if(this.props.body){
      Object.keys(this.props.body).map((key)=>state[key]=this.props.body[key]);
    }
    this.state=state;
  }

  submit(){
    this.setState({submitError:true});
    let body={
      title:this.state.title,
      shortcut:this.state.shortcut
    }
    if(this.state.filterIcon===''||this.state.filterName===''||isNaN(parseInt(this.state.order))){
      return;
    }
    this.props.createFilter({
      title:this.state.filterName,
      'public':this.state.filterPublic,
      report:this.state.filterReport,
      'default':this.state.filterDefault,
      icon_class:this.state.filterIcon,
      order:this.state.filterOrder,
      filter:{
        createdTime:this.processTimes(this.state.createdFrom,this.state.createdTo),
        startedTime:this.processTimes(this.state.startedFrom,this.state.startedTo),
        deadlineTime:this.processTimes(this.state.deadlineFrom,this.state.deadlineTo),
        closedTime:this.processTimes(this.state.closedFrom,this.state.closedTo),

        search:this.state.title,
        status:this.state.statuses.map((item)=>item.id),
        project:this.state.projects.map((item)=>item.id),
        creator:this.state.creators.map((item)=>item.id),
        requester:this.state.requesters.map((item)=>item.id),
        company:this.state.companies.map((item)=>item.id),
        assigned:this.state.assignedTos.map((item)=>item.id),
        tag:this.state.tags.map((item)=>item.id),
        follower:this.state.followers.map((item)=>item.id),
        archived:this.state.archived,
        important:this.state.important,
        addedParameters:processCustomFilterAttributes({...this.state.task_data},[...this.props.taskAttributes])
      },
    },this.props.token);
  }

  processTimes(timeFrom,timeTo){
    if(timeFrom==null&&timeTo==null){
      return undefined;
    }
    if(timeFrom&&timeTo){
      let time1 = Math.ceil(timeFrom.valueOf() / 1000);
      let time2 = Math.ceil(timeTo.valueOf() / 1000);
      return 'FROM='+time1+',TO='+time2;
    }
    if(timeFrom){
      let time1 = Math.ceil(timeFrom.valueOf() / 1000);
      return 'FROM='+time1;
    }
    if(timeTo){
      let time2 = Math.ceil(timeTo.valueOf() / 1000);
      return 'TO='+time2;
    }
  }

  applyFilter(){

    let body={
      createdTime:this.processTimes(this.state.createdFrom,this.state.createdTo),
      startedTime:this.processTimes(this.state.startedFrom,this.state.startedTo),
      deadlineTime:this.processTimes(this.state.deadlineFrom,this.state.deadlineTo),
      closedTime:this.processTimes(this.state.closedFrom,this.state.closedTo),

      //order:'Title',
      search:this.state.title,
      status:this.state.statuses.map((item)=>item.id),
      project:this.state.projects.map((item)=>item.id),
      creator:this.state.creators.map((item)=>item.id),
      requester:this.state.requesters.map((item)=>item.id),
      company:this.state.companies.map((item)=>item.id),
      assigned:this.state.assignedTos.map((item)=>item.id),
      tag:this.state.tags.map((item)=>item.id),
      follower:this.state.followers.map((item)=>item.id),
      archived:this.state.archived,
      important:this.state.important,
      addedParameters:processCustomFilterAttributes({...this.state.task_data},[...this.props.taskAttributes])
    }
    this.props.loadUnsavedFilter(20,1,this.props.token,body,this.state);
  }

  render() {
    return (
      <div className="filterDivInside">
        <div style={{ paddingLeft: 20 }}>

          <Modal
            isOpen={this.state.saveOpen}
          >
          <ModalHeader>
            Creating new filter
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label htmlFor="title">{i18n.t('filterName')}</label>
              <input
                className="form-control"
                id="filterName"
                value={this.state.filterName}
                onChange={e => {
                  this.setState({ filterName: e.target.value });
                }}
                placeholder={i18n.t('enterFilterName')}
              />
            {this.state.submitError && this.state.filterName===''&&<label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionMustEnterTitle')}</label>}
            </FormGroup>
            <FormGroup>
              <label htmlFor="title">{i18n.t('orderFilter')}</label>
              <input
                className="form-control"
                id="filterOrder"
                type="number"
                value={this.state.filterOrder}
                onChange={e => {
                  this.setState({ filterOrder: e.target.value });
                }}
                placeholder={i18n.t('enterOrderFilter')}
              />
            { this.state.filterOrder!==''&&isNaN(parseInt(this.state.filterOrder))&&<label htmlFor="order" style={{color:'red'}}>{i18n.t('restrictionOrderNumberIsNotValid')}</label>}
            { this.state.submitError &&this.state.filterOrder===''&&<label htmlFor="order" style={{color:'red'}}>{i18n.t('restrictionMustEnterOrderNumber')}</label>}
            </FormGroup>
            <FormGroup>
              <label htmlFor="title">{i18n.t('filterIcon')}</label>
              <input
                className="form-control"
                id="filterIcon"
                value={this.state.filterIcon}
                onChange={e => {
                  this.setState({ filterIcon: e.target.value });
                }}
                placeholder={i18n.t('enterFilterIcon')}
              />
            {this.state.submitError && this.state.filterIcon===''&&<label htmlFor="filterIcon" style={{color:'red'}}>{i18n.t('restrictionMustEnterFilterIcon')}</label>}
            </FormGroup>
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  checked={this.state.filterPublic}
                  onChange={() => {
                    this.setState({ filterPublic: !this.state.filterPublic });
                  }}
                  className="form-check-input"
                />
              {i18n.t('public')}
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  checked={this.state.report}
                  onChange={() => {
                    this.setState({ report: !this.state.report });
                  }}
                  className="form-check-input"
                />
              {i18n.t('report')}
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  checked={this.state.filterDefault}
                  onChange={() => {
                    this.setState({ filterDefault: !this.state.filterDefault });
                  }}
                  className="form-check-input"
                />
              {i18n.t('default')}
              </label>
            </div>
          </ModalBody>
          <ModalFooter className="justify-content-between">
            <button className="btn btn-danger mr-1"
            onClick={()=>this.setState({saveOpen:false})}>
              {i18n.t('cancel')}
            </button>

            <button className="btn btn-primary mr-1" onClick={this.submit.bind(this)}>
              {i18n.t('save')}
            </button>
            </ModalFooter>
          </Modal>

          <button type="button" className="btn btn-link" onClick={this.applyFilter.bind(this)}>
            {i18n.t('apply')}
          </button>
          <button type="button" className="btn btn-link" onClick={()=>this.setState({saveOpen:true, filterName:''})}>
            {i18n.t('save')}
          </button>
          <button type="button" className="btn btn-link" onClick={()=>this.setState({
              createdFrom:null,
              createdTo:null,
              deadlineFrom:null,
              deadlineTo:null,
              closedFrom:null,
              closedTo:null,
              title:'',
              startedFrom:null,
              startedTo:null,
              archived:false,
              important:false,
              statuses:[],
              projects:[],
              creators:[],
              requesters:[],
              companies:[],
              assignedTos:[],
              tags:[],
              followers:[],
              task_data:{}
            })
            }>
            {i18n.t('reset')}
          </button>
          <FormGroup>
            <label htmlFor="title">{i18n.t('filterByName')}</label>
            <input
              className="form-control"
              id="title"
              value={this.state.title}
              onChange={e => {
                this.setState({ title: e.target.value });
              }}
              placeholder={i18n.t('filterByName')}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="status">{i18n.t('status')}</label>
              <Select
                options={this.props.statuses.map(status => {
                  status.label = status.title;
                  status.value = status.id;
                  return status;
                })}
                isMulti
                defaultValue={this.state.statuses}
                onChange={(e)=>this.setState({statuses:e})}
                style={{ width: "100%" }}
              />
          </FormGroup>

          <label className="mt-1">{i18n.t('requester')}</label>
            <Select
              isMulti
              options={this.props.users.map(user => {
                user.label =
                  (user.name ? user.name : "") +
                  " " +
                  (user.surname ? user.surname : "");
                if (user.label === " ") {
                  user.label = user.email;
                } else {
                  user.label = user.label + " (" + user.email + ")";
                }
                user.value = user.id;
                return user;
              })}
              onChange={(e)=>this.setState({requesters:e})}
              defaultValue={this.state.requesters}
            />

          <label className="mt-2">{i18n.t('company')}</label>
          <Select
            options={this.props.companies.map(company => {
              company.label = company.title;
              company.value = company.id;
              return company;
            })}
            isMulti
            style={{ width: "100%" }}
            onChange={(e)=>this.setState({companies:e})}
            defaultValue={this.state.companies}
          />

        <label className="mt-2">{i18n.t('assigned')}</label>
            <Select
              isMulti
              options={this.props.users.map(user => {
                user.label =
                  (user.name ? user.name : "") +
                  " " +
                  (user.surname ? user.surname : "");
                if (user.label === " ") {
                  user.label = user.email;
                } else {
                  user.label = user.label + " (" + user.email + ")";
                }
                user.value = user.id;
                return user;
              })}
              onChange={(e)=>this.setState({assignedTos:e})}
              defaultValue={this.state.assignedTos}
            />

          <label className="mt-2">{i18n.t('createdBy')}</label>
              <Select
                isMulti
                options={this.props.users.map(user => {
                  user.label =
                    (user.name ? user.name : "") +
                    " " +
                    (user.surname ? user.surname : "");
                  if (user.label === " ") {
                    user.label = user.email;
                  } else {
                    user.label = user.label + " (" + user.email + ")";
                  }
                  user.value = user.id;
                  return user;
                })}
                onChange={(e)=>this.setState({creators:e})}
                defaultValue={this.state.creators}
              />

            <label className="mt-2">{i18n.t('project')}</label>
            <Select
              options={this.props.projects.map(project => {
                project.label = project.title;
                project.value = project.id;
                return project;
              })}
              isMulti
              style={{ width: "100%" }}
              onChange={(e)=>this.setState({projects:e})}
              defaultValue={this.state.projects}
            />
          <label className="mt-1">{i18n.t('follower')}</label>
            <Select
              isMulti
              options={this.props.users.map(user => {
                user.label =
                  (user.name ? user.name : "") +
                  " " +
                  (user.surname ? user.surname : "");
                if (user.label === " ") {
                  user.label = user.email;
                } else {
                  user.label = user.label + " (" + user.email + ")";
                }
                user.value = user.id;
                return user;
              })}
              onChange={(e)=>this.setState({followers:e})}
              defaultValue={this.state.followers}
            />
          <label className="mt-2">{i18n.t('tag')}</label>
            <Select
              options={this.props.tags.map(tag => {
                tag.label = tag.title;
                tag.value = tag.id;
                return tag;
              })}
              isMulti
              style={{ width: "100%" }}
              onChange={(e)=>this.setState({tags:e})}
              defaultValue={this.state.tags}
            />

            <div className="form-check" style={{marginTop:10}}>
              <label className="form-check-label">
                <input
                  type="checkbox"
                  checked={this.state.archived}
                  onChange={() => {
                    this.setState({ archived: !this.state.archived });
                  }}
                  className="form-check-input"
                />
              {i18n.t('archived')}
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  checked={this.state.important}
                  onChange={() => {
                    this.setState({ important: !this.state.important });
                  }}
                  className="form-check-input"
                />
              {i18n.t('important')}
              </label>
            </div>
          <label className="mt-2">{i18n.t('createdDate')}</label>
            <div className="d-flex flex-row justify-content-between fromToDates">
              <DatePicker
                onChange={e => {
                  this.setState({createdFrom:e});
                }}
                locale="en-gb"
                placeholderText={i18n.t('dateFrom')}
                selected={this.state.createdFrom}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="DD.MM.YYYY HH:mm"
              />
              <DatePicker
                onChange={e => {
                  this.setState({createdTo:e});
                }}
                style={{marginLeft:'10%'}}
                locale="en-gb"
                placeholderText={i18n.t('dateTo')}
                selected={this.state.createdTo}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="DD.MM.YYYY HH:mm"
              />
            </div>

            <label className="mt-2">{i18n.t('startedAt')}</label>

            <div className="d-flex flex-row justify-content-between fromToDates">
              <DatePicker
                onChange={e => {
                  this.setState({startedFrom:e});
                }}
                locale="en-gb"
                placeholderText={i18n.t('dateFrom')}
                selected={this.state.startedFrom}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="DD.MM.YYYY HH:mm"
              />
              <DatePicker
                onChange={e => {
                  this.setState({startedTo:e});
                }}
                style={{marginLeft:'10%'}}
                locale="en-gb"
                placeholderText={i18n.t('dateTo')}
                selected={this.state.startedTo}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="DD.MM.YYYY HH:mm"
              />
            </div>


          <label className="mt-2">{i18n.t('deadline')}</label>
            <div className="d-flex flex-row justify-content-between fromToDates">
              <DatePicker
                onChange={e => {
                  this.setState({deadlineFrom:e});
                }}
                locale="en-gb"
                placeholderText={i18n.t('dateFrom')}
                selected={this.state.deadlineFrom}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="DD.MM.YYYY HH:mm"
              />
              <DatePicker
                onChange={e => {
                  this.setState({deadlineTo:e});
                }}
                style={{marginLeft:'10%'}}
                locale="en-gb"
                placeholderText={i18n.t('dateTo')}
                selected={this.state.deadlineTo}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="DD.MM.YYYY HH:mm"
              />
            </div>


          <label className="mt-2">{i18n.t('closedAt')}</label>
            <div className="d-flex flex-row justify-content-between fromToDates">
              <DatePicker
                onChange={e => {
                  this.setState({closedFrom:e});
                }}
                locale="en-gb"
                placeholderText={i18n.t('dateFrom')}
                selected={this.state.closedFrom}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="DD.MM.YYYY HH:mm"
              />
              <DatePicker
                onChange={e => {
                  this.setState({closedTo:e});
                }}
                style={{marginLeft:'10%'}}
                locale="en-gb"
                placeholderText={i18n.t('dateTo')}
                selected={this.state.closedTo}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="DD.MM.YYYY HH:mm"
              />
            </div>

            {this.props.taskAttributes.map(attribute => {
              switch (attribute.type) {
                case "input":
                  return (
                    <div className={"form-group"} key={attribute.id} >
                      <label htmlFor={attribute.id}>{attribute.title}</label>
                      <input
                        className="form-control"
                        id={attribute.id}
                        value={this.state.task_data[attribute.id]}
                        onChange={e => {
                          let newData = { ...this.state.task_data };
                          newData[attribute.id] = e.target.value;

                          this.setState({ task_data: newData });
                        }}
                        placeholder={i18n.t('enter')+" " + attribute.title}
                      />
                    </div>
                  );
                case "text_area":
                  return (
                    <div className={"form-group"} key={attribute.id}>
                      <label htmlFor={attribute.id}>{attribute.title}</label>
                      <textarea
                        className="form-control"
                        id={attribute.id}
                        value={this.state.task_data[attribute.id]}
                        onChange={e => {
                          let newData = { ...this.state.task_data };
                          newData[attribute.id] = e.target.value;

                          this.setState({ task_data: newData });
                        }}
                        placeholder={i18n.t('enter')+" " + attribute.title}
                      />
                    </div>
                  );
                case "simple_select":
                  return (
                    <div className="form-group" key={attribute.id}>
                      <label
                        htmlFor={attribute.id}
                      >
                        {attribute.title}
                      </label>
                      <Select
                        id={attribute.id}
                        className="form-control"
                        options={attribute.options.map(option => {return {label:option,value:option};})}
                        isMulti
                        style={{ width: "100%" }}
                        onChange={(e)=>{
                          let newData = { ...this.state.task_data };
                          newData[attribute.id] = e;

                          this.setState({ task_data: newData });
                        }}
                        defaultValue={this.state.task_data[attribute.id]}
                      />
                    </div>
                  );
                case "multi_select":
                  return (<div className="form-group" key={attribute.id}>
                    <label
                      htmlFor={attribute.id}
                    >
                      {attribute.title}
                    </label>
                    <Select
                      id={attribute.id}
                      className="form-control"
                      value={this.state.task_data[attribute.id]}
                      options={attribute.options.map(option => {return {label:option,value:option};})}
                      isMulti
                      style={{ width: "100%" }}
                      onChange={(e)=>{
                        let newData = { ...this.state.task_data };
                        newData[attribute.id] = e;

                        this.setState({ task_data: newData });
                      }}
                      defaultValue={this.state.task_data[attribute.id]}
                    />
                </div>);
                case "date":
                  return (
                    <div className={"form-group"} key={attribute.id}>
                      <label htmlFor={attribute.id}>{attribute.title}</label>
                      <DatePicker
                        selected={this.state.task_data[attribute.id]}
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
                    </div>
                  );
                case "decimal_number":
                  return (
                    <div className={"form-group"} key={attribute.id}>
                      <label htmlFor={attribute.id}>{attribute.title}</label>
                      <input
                        className="form-control"
                        type="number"
                        id={attribute.id}
                        value={this.state.task_data[attribute.id]}
                        onChange={e => {
                          let newData = { ...this.state.task_data };
                          newData[attribute.id] = e.target.value;

                          this.setState({ task_data: newData });
                        }}
                        placeholder={i18n.t("select") + attribute.title}
                      />
                    </div>
                  );
                case "integer_number":
                  return (
                    <div className={"form-group"} key={attribute.id}>
                      <label htmlFor={attribute.id}>{attribute.title}</label>
                      <input
                        className="form-control"
                        type="number"
                        id={attribute.id}
                        value={this.state.task_data[attribute.id]}
                        onChange={e => {
                          let newData = { ...this.state.task_data };
                          newData[attribute.id] = e.target.value;

                          this.setState({ task_data: newData });
                        }}
                        placeholder={i18n.t("select") + attribute.title}
                      />
                    </div>
                  );
                case "checkbox":
                  return (
                    <div className="form-group" key={attribute.id}>
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={this.state.task_data[attribute.id]}
                          onChange={() => {
                            let newData = { ...this.state.task_data };
                            newData[attribute.id] = !newData[
                              attribute.id
                            ];

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
      </div>
    );
  }
}
const mapStateToProps = ({tasksReducer,statusesReducer,usersReducer,companiesReducer, tagsReducer, taskAttributesReducer, login, filtersReducer }) => {
  const { taskProjects } = tasksReducer;
  const {taskStatuses} = statusesReducer;
  const { originalBody } = filtersReducer;
  const {users} = usersReducer;
  const { taskCompanies } = companiesReducer;
  const { tags } = tagsReducer;
  const { taskAttributes } = taskAttributesReducer;
  const { token } = login;
  return {statuses:taskStatuses,companies:taskCompanies,projects:taskProjects, users,tags,taskAttributes, token, body:originalBody};
};


export default connect(mapStateToProps, {loadUnsavedFilter,createFilter})(Filter);
