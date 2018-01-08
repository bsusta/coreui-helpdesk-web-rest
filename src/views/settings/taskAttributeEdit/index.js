import { Link } from "react-router-dom";
import React, { Component } from "react";

const mockData = [
  { id: 1, active: true, name: "middlename", description: "If person does have a middle name...", type: "input", values: [] },
  { id: 2, active: true, name: "birthDate", description: "When was user born", type: "datetime", values: [] },
  { id: 3, active: false, name: "kids", description: "How many kids does person have", type: "number", values: [] },
  { id: 4, active: false, name: "married", description: "Is this person married", type: "checkbox", values: [] },
  { id: 5, active: true, name: "gender", description: "What's your gender?", type: "select", values: ['male','female','elf','otter','other'] },
];
const mockOptions=[{id:0,title:'input'},{id:1,title:'textArea'},{id:2,title:'select'},{id:3,title:'checkbox'},{id:4,title:'datetime'},{id:5,title:'number'}];

class TaskAttributeEdit extends Component {
  constructor(props) {
    super(props);
    let original = mockData[parseInt(this.props.match.params.id, 10) - 1];
    this.state = {
      changed:false,
      active: original.active,
      name: original.name,
      description: original.description,
      type: original.type,
      values: original.values
    };
    console.log(original.type);
  }

  compareChanges(change,val){
    var original = mockData[parseInt(this.props.match.params.id, 10) - 1];
    var newState = {...this.state};
    newState[change]=val;
    this.setState({changed:newState.active!=original.active||newState.name!=original.name||newState.description!=original.description||newState.type!=original.type||newState.values.length!=original.values.length});
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
                    checked={this.state.active}
                    onChange={() =>{
                      this.compareChanges("active",!this.state.active);
                      this.setState({ active: !this.state.active })
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
                value={this.state.name}
                onChange={event =>{
                  this.compareChanges("name",event.target.value);
                  this.setState({ name: event.target.value })
                }
              }
              placeholder="Enter name"
              />
          </div>
          <div class="form-group">
            <label for="title">Description</label>
            <input
              class="form-control"
              id="title"
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
          selected={this.state.type}
          onChange={(event, value) => {
            this.setState({ type: event.target.value });
          }}
        >
          {mockOptions.map(opt => (
            <option
              key={opt.id}
              value={opt.title}
            >
              {opt.title}
            </option>
          ))}
        </select>
        </div>

        <table class="table table-hover table-sm">
          <thead className="thead-inverse">
            <tr>
              <th style={{ borderTop: "0px" }}>Select values</th>
              <th
                style={{ width: "80px", borderTop: "0px", textAlign: "right" }}
              />
            </tr>
          </thead>
          <tbody>
            {
              this.state.values.map((value)=>
            <tr>
              <td>
                  <input
                    type="text"
                    id="name"
                    class="form-control"
                    placeholder="select value"
                    value={value}
                    style={{ border: "none" }}
                  />
              </td>

              <td>
                <div
                  style={{ float: "right", paddingRight: 20 }}
                  className="row"
                >
                  <button className="btn btn-sm btn-danger  ">
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
                    id="name"
                    class="form-control"
                    placeholder="Select value name"
                  />
                  <button
                    style={{ float: "right" }}
                    className="btn btn-sm btn-primary mr-1"
                    onClick={()=>console.log(this.state.values)}
                  >
                    <i className="fa fa-plus " />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="row">
        <button
          type="submit"
          class="btn btn-primary mr-2"
          onClick={() => this.props.history.goBack()}
          >
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

export default TaskAttributeEdit;
