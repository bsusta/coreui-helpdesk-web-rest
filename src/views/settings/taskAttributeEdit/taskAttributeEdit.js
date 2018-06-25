import { Link } from "react-router-dom";
import React, { Component } from "react";
import { connect } from 'react-redux';
import { editTaskAttribute } from '../../../redux/actions';
import { areObjectsSame } from "../../../helperFunctions";
import i18n from 'i18next';

const options = [
    { id: "input", title: "input" },
    { id: "text_area", title: "textArea" },
    { id: "simple_select", title: "simpleSelect" },
    { id: "multi_select", title: "multiSelect" },
    { id: "date", title: "date" },
    { id: "decimal_number", title: "decimalNumber" },
    { id: "integer_number", title: "integerNumber" },
    { id: "checkbox", title: "checkbox" }
  ];

class TaskAttributeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_active: this.props.taskAttribute.is_active?true:false,
      title: this.props.taskAttribute.title?this.props.taskAttribute.title:'',
      type: this.props.taskAttribute.type?this.props.taskAttribute.type:'input',
      required:this.props.taskAttribute.required,
      description:this.props.taskAttribute.description?this.props.taskAttribute.description:'',
      newOption:'',
      options:((this.props.taskAttribute.type=="simple_select"||this.props.taskAttribute.type=="multi_select") &&this.props.taskAttribute.options)?(Array.isArray(this.props.taskAttribute.options) ?this.props.taskAttribute.options:Object.keys(this.props.taskAttribute.options)):[],
      submitError:false,
      changed:false
    };
    this.compareChanges.bind(this);
  }


  compareChanges(change,val){
    var newState = {...this.state};
    newState[change]=val;
    newState.newOption=undefined;
    newState.submitError=undefined;
    newState.changed=undefined;
    var originalState = {
      is_active: this.props.taskAttribute.is_active?true:false,
      title: this.props.taskAttribute.title?this.props.taskAttribute.title:'',
      type: this.props.taskAttribute.type?this.props.taskAttribute.type:'input',
      required:this.props.taskAttribute.required,
      description:this.props.taskAttribute.description?this.props.taskAttribute.description:'',
      options:((this.props.taskAttribute.type=="simple_select"||this.props.taskAttribute.type=="multi_select") &&this.props.taskAttribute.options)?(Array.isArray(this.props.taskAttribute.options) ?this.props.taskAttribute.options:Object.keys(this.props.taskAttribute.options)):[],
    }
    this.setState({changed:!areObjectsSame(newState,originalState)})
  }

  //gets all data from the state and sends it to the API
  submit(e){
    e.preventDefault(); //prevent default form behaviour
    this.setState({submitError:true});
    let body={
      title:this.state.title,
      type:this.state.type,
      required:this.state.required,
      description:this.state.description===''?'null':this.state.description,
      options:(this.state.type=="simple_select"||this.state.type=="multi_select")?JSON.stringify(this.state.options):'null',
    };
    if(body.title===''||body.options==='[]'){
      return;
    }

    this.props.editTaskAttribute(body,this.state.is_active,this.props.taskAttribute.id,this.props.token);
    this.setState({changed:false});
    this.props.history.goBack();
  }

/*  componentWillMount(){
    let self = this;
    window.onbeforeunload = function() {
      if(self.state.changed){
        return "Are you sure you want to leave without saving?";
      }
    }
  }*/

  render() {
    return (
      <div
        className="card"
        style={{border:this.state.changed?'1px solid red':null }}
        >

        <div className="card-header"></div>
        <div className="card-body">
        <h2 className="h2" className="h2-setting-form">{i18n.t('addTaskAttribute')}</h2>
          <div className="list-group">

            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  checked={this.state.required}
                  onChange={() =>{
                    this.compareChanges("required",!this.state.required);
                    this.setState({ required: !this.state.required })
                  }
                }
                className="form-check-input"
                />
                {i18n.t('required')}
            </label>
          </div>
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  checked={this.state.is_active}
                  onChange={() =>{
                    this.compareChanges("is_active",!this.state.is_active);
                    this.setState({ is_active: !this.state.is_active })
                  }
                }
                className="form-check-input"
                />
              {i18n.t('activated')}
            </label>
          </div>
          <div className="form-group">
            <label className= "input-label" htmlFor="title" className="req input-label">{i18n.t('title')}</label>
            <input
              className="form-control"
              id="title"
              value={this.state.title}
              onChange={event =>{
                this.compareChanges("title",event.target.value);
                this.setState({ title: event.target.value })
              }
            }
            placeholder={i18n.t('enterTitle')}
            />
            { this.state.submitError && this.state.title===''&&<label className= "input-label" htmlFor="title" style={{color:'red'}}>{i18n.t('restictionMustHave')+' '+i18n.t('title')}</label>}
        </div>

        <div className="form-group">
          <label className= "input-label" htmlFor="description">{i18n.t('description')}</label>
          <textarea
            className="form-control"
            id="description"
            value={this.state.description}
            onChange={event =>{
              this.compareChanges("description",event.target.value);
              this.setState({ description: event.target.value })
            }
          }
          placeholder={i18n.t('enterDescription')}
          />
      </div>

        <div className="form-group">
          <label className= "input-label" htmlFor="title">{i18n.t('type')}</label>
        <select
          className="form-control"
          value={this.state.type}
          onChange={(event) => {
            this.compareChanges("type",event.target.value);
            this.setState({ type: event.target.value });
          }}
        >
          {options.map(opt => (
            <option
              key={opt.id}
              value={opt.id}
            >
              {i18n.t(opt.title)}
            </option>
          ))}
        </select>
        </div>
        {
          (this.state.type=="simple_select" ||this.state.type=="multi_select")&&
        <table className="table table-hover table-sm">
          <thead className="thead-inverse">
            <tr>
              <th style={{ borderTop: "0px" }}>{i18n.t('selectOptions')}</th>
              <th
                style={{ width: "80px", borderTop: "0px", textAlign: "right" }}
              />
            </tr>
          </thead>
          <tbody>
            {
              this.state.options.map((value)=>
            <tr>
              <td>
                  <input
                    type="text"
                    id={value}
                    className="form-control"
                    placeholder={i18n.t('enterOption')}
                    value={value}
                    onChange={(e)=>{
                      let newOptions=[...this.state.options];
                      newOptions[newOptions.findIndex((item)=>item===value)]=e.target.value;
                      this.setState({options:newOptions});
                  }
                }
                    style={{ border: "none" }}
                  />
              </td>

              <td>
                <div
                  style={{ float: "right", paddingRight: 20 }}
                  className="row"
                >
                  <button className="btn btn-sm btn-danger"
                  onClick={()=>{
                    let newOptions=[...this.state.options];
                    newOptions.splice(newOptions.indexOf(value),1);
                    this.setState({options:newOptions});
                  }}>
                    <i className="fa fa-remove" />
                  </button>
                </div>
              </td>
            </tr>
          )}
            <tr>
              <td colspan="3">
                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={this.state.newOption}
                    onChange={(e)=>this.setState({newOption:e.target.value})}
                    placeholder={i18n.t('enterInputName')}
                  />
                  <button
                    style={{ float: "right" }}
                    className="btn btn-sm btn-primary mr-1"
                    onClick={()=>this.setState({options:[...this.state.options,this.state.newOption],newOption:''})}
                  >
                    <i className="fa fa-plus " />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
          { this.state.submitError && this.state.options.length===0 && <label className= "input-label" htmlFor="title" style={{color:'red'}}>{i18n.t('restictionAtLeastOneOption')}</label>}
        </table>
        }
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary mr-2"
            onClick={this.submit.bind(this)}
          >
            {i18n.t('submit')}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.props.history.goBack()}
          >
            {i18n.t('cancel')}
          </button>
        </div>
    </div>
  </div>
</div>
);
}
}

const mapStateToProps = ({taskAttributesReducer, login }) => {
  const {taskAttribute} = taskAttributesReducer;
  const {token} = login;
  return {taskAttribute,token};
};


export default connect(mapStateToProps, {editTaskAttribute})(TaskAttributeEdit);
