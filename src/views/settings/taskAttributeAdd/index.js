import { Link } from "react-router-dom";
import React, { Component } from "react";
import { addTaskAttribute } from "../../../redux/actions";
import { connect } from "react-redux";

const options = [
  { id: "input", title: "input" },
  { id: "text_area", title: "text area" },
  { id: "simple_select", title: "simple select" },
  { id: "multi_select", title: "multi select" },
  { id: "date", title: "date" },
  { id: "decimal_number", title: "decimal number" },
  { id: "integer_number", title: "integer number" },
  { id: "checkbox", title: "checkbox" }
];

class TaskAttributeAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      type: "input",
      required: false,
      newOption: "",
      description: "",
      options: [],
      submitError:false
    };
  }

  //gets all data from the state and sends it to the API
  submit(e) {
    e.preventDefault(); //prevent default form behaviour
    this.setState({submitError:true});
    let body={
      title: this.state.title,
      type: this.state.type,
      description: this.state.description,
      options:
        this.state.type == "simple_select" ||
        this.state.type == "multi_select"
          ? JSON.stringify(this.state.options)
          : "null",
      required: this.state.required
    }
    if(body.title===''||body.options==='[]'){
      return;
    }
    this.props.addTaskAttribute(
      body,
      this.props.token
    );
    this.props.history.goBack();
  }

  render() {
    return (
      <div class="card">
        <h4 class="card-header">Add task attribute</h4>
        <div class="card-body">
          <div class="list-group">
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  checked={this.state.required}
                  onChange={() =>
                    this.setState({ required: !this.state.required })
                  }
                />
                Required
              </label>
            </div>

            <div class="form-group">
              <label for="title">Name</label>
              <input
                class="form-control"
                id="title"
                value={this.state.title}
                onChange={event => {
                  this.setState({ title: event.target.value });
                }}
                placeholder="Enter title"
              />
              {this.state.submitError && this.state.title===''&&<label for="title" style={{color:'red'}}>You must enter title</label>}
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                class="form-control"
                id="description"
                value={this.state.description}
                onChange={event =>
                  this.setState({ description: event.target.value })
                }
                placeholder="Enter description"
              />
            </div>

            <div class="form-group">
              <label for="title">Type</label>
              <select
                class="form-control"
                value={this.state.type}
                onChange={event => {
                  this.setState({ type: event.target.value });
                }}
              >
                {options.map(opt => (
                  <option key={opt.id} value={opt.id}>
                    {opt.title}
                  </option>
                ))}
              </select>
            </div>
            {(this.state.type == "simple_select" ||
              this.state.type == "multi_select") && (
              <table class="table table-hover table-sm">
                <thead className="thead-inverse">
                  <tr>
                    <th style={{ borderTop: "0px" }}>Select options</th>
                    <th
                      style={{
                        width: "80px",
                        borderTop: "0px",
                        textAlign: "right"
                      }}
                    />
                  </tr>
                </thead>
                <tbody>
                  {this.state.options.map(value => (
                    <tr>
                      <td>
                        <input
                          type="text"
                          id={value}
                          class="form-control"
                          placeholder="select value"
                          value={value}
                          onChange={e => {
                            let newOptions = [...this.state.options];
                            newOptions[
                              newOptions.findIndex(item => item == value)
                            ] =
                              e.target.value;
                            this.setState({ options: newOptions });
                          }}
                          style={{ border: "none" }}
                        />
                      </td>

                      <td>
                        <div
                          style={{ float: "right", paddingRight: 20 }}
                          className="row"
                        >
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              let newOptions = [...this.state.options];
                              newOptions.splice(newOptions.indexOf(value), 1);
                              this.setState({ options: newOptions });
                            }}
                          >
                            <i className="fa fa-remove" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colspan="3">
                      <div style={{ display: "flex" }}>
                        <input
                          type="text"
                          id="title"
                          class="form-control"
                          value={this.state.newOption}
                          onChange={e =>
                            this.setState({ newOption: e.target.value })
                          }
                          placeholder="Select value name"
                        />
                        <button
                          style={{ float: "right" }}
                          className="btn btn-sm btn-primary mr-1"
                          onClick={() =>
                            this.setState({
                              options: [
                                ...this.state.options,
                                this.state.newOption
                              ],
                              newOption: ""
                            })
                          }
                        >
                          <i className="fa fa-plus " />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
                { this.state.submitError && this.state.options.length===0 && <label for="title" style={{color:'red'}}>You must have at least one option!</label>}
              </table>
            )}
            <div class="row">
              <button
                type="submit"
                class="btn btn-primary mr-2"
                onClick={this.submit.bind(this)}
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

const mapStateToProps = ({ taskAttributesReducer, login }) => {
  const { taskAttribute } = taskAttributesReducer;
  const { token } = login;
  return { taskAttribute, token };
};

export default connect(mapStateToProps, { addTaskAttribute })(TaskAttributeAdd);
