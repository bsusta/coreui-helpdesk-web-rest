import { Link } from "react-router-dom";
import React, { Component } from "react";
const mockOptions=[{id:0,title:'input'},{id:1,title:'textArea'},{id:2,title:'select'},{id:3,title:'checkbox'},{id:4,title:'datetime'},{id:5,title:'number'}];

class UserAttributeAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      name: '',
      description: '',
      type: '',
      values: []
    };
  }

  render() {
    return (
      <div
        class="card"
        style={{ maxWidth: 1380, margin: "auto", borderTop: "0",border:this.state.changed?'1px solid red':null }}
        >

        <h4 class="card-header">Add user attribute</h4>
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

export default UserAttributeAdd;
