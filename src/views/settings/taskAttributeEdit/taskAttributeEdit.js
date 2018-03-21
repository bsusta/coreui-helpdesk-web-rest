import { Link } from "react-router-dom";
import React, { Component } from "react";
import { editTaskAttribute } from '../../../redux/actions';
import { connect } from 'react-redux';

const options=[
  {id:'input',title:'input'},
  {id:'text_area',title:'text area'},
  {id:'simple_select',title:'simple select'},
  {id:'multi_select',title:'multi select'},
  {id:'date',title:'date'},
  {id:'decimal_number',title:'decimal number'},
  {id:'integer_number',title:'integer number'},
  {id:'checkbox',title:'checkbox'},
  ];

class TaskAttributeEdit extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.taskAttribute);
    this.state = {
      changed:false,
      is_active: this.props.taskAttribute.is_active?true:false,
      title: this.props.taskAttribute.title?this.props.taskAttribute.title:'',
      type: this.props.taskAttribute.type?this.props.taskAttribute.type:'input',
      required:this.props.taskAttribute.required,
      description:this.props.taskAttribute.description?this.props.taskAttribute.description:'',
      newOption:'',
      options:((this.props.taskAttribute.type=="simple_select"||this.props.taskAttribute.type=="multi_select") &&this.props.taskAttribute.options)?(Array.isArray(this.props.taskAttribute.options) ?this.props.taskAttribute.options:Object.keys(this.props.taskAttribute.options)):[]
    };
  }

  compareChanges(change,val){
    var newState = {...this.state};
    newState[change]=val;
    this.setState({changed:
      newState.is_active!=this.props.taskAttribute.is_active||
      newState.title!=this.props.taskAttribute.title||
      newState.description!=(this.props.taskAttribute.description?this.props.taskAttribute.description:'')||
      newState.type!=this.props.taskAttribute.type||
      newState.required!=this.props.taskAttribute.required
    })
  }

  //gets all data from the state and sends it to the API
  submit(e){
    e.preventDefault(); //prevent default form behaviour
    if ((this.state.type=="simple_select"||this.state.type=="multi_select")&&this.state.options.length==0){
      return;
    }
    this.props.editTaskAttribute({
      title:this.state.title,
      type:this.state.type,
      required:this.state.required,
      description:this.state.description===''?'null':this.state.description,
      options:(this.state.type=="simple_select"||this.state.type=="multi_select")?JSON.stringify(this.state.options):'null',
    },this.state.is_active,this.props.taskAttribute.id,this.props.token);
    this.setState({changed:false});
    this.props.history.goBack();
  }

  componentWillMount(){
    let self = this;
    window.onbeforeunload = function() {
      if(self.state.changed){
        return "Are you sure you want to leave without saving?";
      }
    }
  }
  render() {
    return (
      <div
        class="card"
        style={{ maxWidth: 1380, margin: "auto", borderTop: "0",border:this.state.changed?'1px solid red':null }}
        >

        <h4 class="card-header">Edit task attribute</h4>
        <div class="card-body">
          <div class="list-group">

            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  checked={this.state.required}
                  onChange={() =>{
                    this.compareChanges("required",!this.state.required);
                    this.setState({ required: !this.state.required })
                  }
                }
                class="form-check-input"
                />
              Required
            </label>
          </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  checked={this.state.is_active}
                  onChange={() =>{
                    this.compareChanges("is_active",!this.state.is_active);
                    this.setState({ is_active: !this.state.is_active })
                  }
                }
                class="form-check-input"
                />
              Active
            </label>
          </div>
          <div class="form-group">
            <label for="title">Name</label>
            <input
              class="form-control"
              id="title"
              value={this.state.title}
              onChange={event =>{
                this.compareChanges("title",event.target.value);
                this.setState({ title: event.target.value })
              }
            }
            placeholder="Enter title"
            />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            class="form-control"
            id="description"
            value={this.state.description}
            onChange={event =>{
              this.compareChanges("description",event.target.value);
              this.setState({ description: event.target.value })
            }
          }
          placeholder="Enter description"
          />
      </div>

        <div class="form-group">
          <label for="title">Type</label>
        <select
          class="form-control"
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
              {opt.title}
            </option>
          ))}
        </select>
        </div>
        {
          (this.state.type=="simple_select" ||this.state.type=="multi_select")&&
        <table class="table table-hover table-sm">
          <thead className="thead-inverse">
            <tr>
              <th style={{ borderTop: "0px" }}>Select options</th>
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
                    class="form-control"
                    placeholder="select value"
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
                    class="form-control"
                    value={this.state.newOption}
                    onChange={(e)=>this.setState({newOption:e.target.value})}
                    placeholder="Select value name"
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
        </table>
        }
        <div class="row">
        <button type="submit" class="btn btn-primary mr-2" onClick={this.submit.bind(this)}>
          Submit
        </button>
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => this.props.history.goBack()}
          >
          Cancel
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
