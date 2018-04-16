import React, { Component } from "react";
import { connect } from "react-redux";
import { editStatus } from "../../../redux/actions";
import { SketchPicker } from "react-color";

const funcOptions = [
  { value: "null", title: "None" },
  { value: "new_task", title: "New task" },
  { value: "in_progress_task", title: "Task in progress" },
  { value: "completed_task", title: "Completed task" },
  { value: "closed_task", title: "Closed task" }
];

class StatusEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_active: this.props.status.is_active,
      title: this.props.status.title,
      description: this.props.status.description?this.props.status.description:'',
      order: this.props.status.order,
      func: this.props.status.function ? this.props.status.function : "null",
      color: this.props.status.color,
      submitError:false
    };
  }

  submit(e) {
    e.preventDefault();
    this.setState({submitError:true});
    let body={
      title: this.state.title,
      description:
        this.state.description === "" ? "null" : this.state.description,
      order: parseInt(this.state.order),
      function: this.state.func,
      color: this.state.color
    }
    if(body.title===''||
    isNaN(body.order)){
      return;
    }


    this.props.editStatus(
      body,
      this.props.status.id,
      this.state.is_active,
      this.props.token
    );
    this.props.history.goBack();
  }

  render() {
    return (
      <div class="card">
        <h4 class="card-header">Edit status</h4>
        <div class="card-body">
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
          >
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  checked={this.state.is_active}
                  onChange={() =>
                    this.setState({ is_active: !this.state.is_active })
                  }
                />
                Active
              </label>
            </div>

            <div class="form-group">
              <label for="title">Status name</label>
              <input
                class="form-control"
                id="title"
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
                placeholder="Enter status name"
              />
            </div>
            {this.state.submitError && this.state.title===''&&<label for="title" style={{color:'red'}}>You must enter status name</label>}

            <div class="form-group">
              <label for="title">Order</label>
              <input
                class="form-control"
                id="title"
                type="number"
                value={this.state.order}
                onChange={e => this.setState({ order: e.target.value })}
                placeholder="Enter order number (higher then 4)"
              />
            </div>
            { this.state.order!==''&&isNaN(parseInt(this.state.order))&&<label for="order" style={{color:'red'}}>Your order number is not valid </label>}
            { this.state.submitError &&this.state.order===''&&<label for="order" style={{color:'red'}}>Order is required</label>}
            { this.state.order!==''&&parseInt(this.state.order)<5&&<label for="order" style={{color:'orange'}}>Should be higher than 4</label>}

            <div class="form-group">
              <label for="ICO">Description</label>
              <textarea
                class="form-control"
                id="title"
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
                placeholder="Enter status description"
              />
            </div>

            <div class="form-group">
              <label for="func">Function</label>
              <select
                value={this.state.func}
                id="func"
                onChange={value => this.setState({ func: value.target.value })}
                class="form-control"
              >
                {funcOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.title}
                  </option>
                ))}
              </select>
            </div>
            <div class="form-group">
              <label for="color">Color</label>
              <SketchPicker
                id="color"
                color={this.state.color}
                onChangeComplete={value => this.setState({ color: value.hex })}
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              onClick={this.submit.bind(this)}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ login, statusesReducer }) => {
  const { token } = login;
  const { status } = statusesReducer;
  return { token, status };
};

export default connect(mapStateToProps, { editStatus })(StatusEdit);
