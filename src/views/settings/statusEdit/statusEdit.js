import React, { Component } from "react";
import { connect } from "react-redux";
import { SketchPicker } from "react-color";
import { editStatus } from "../../../redux/actions";
import { areObjectsSame } from "../../../helperFunctions";

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
      order: this.props.status.order.toString(),
      func: this.props.status.function ? this.props.status.function : "null",
      color: this.props.status.color,
      submitError:false,
      changed:false
    };
    this.compareChanges.bind(this);
  }

  compareChanges(change,val){
    var newState = {...this.state};
    newState[change]=val;
    newState.changed=undefined;
    newState.submitError=undefined;
    var originalState = {
      is_active: this.props.status.is_active,
      title: this.props.status.title,
      description: this.props.status.description?this.props.status.description:'',
      order: this.props.status.order.toString(),
      func: this.props.status.function ? this.props.status.function : "null",
      color: this.props.status.color
    };
    this.setState({changed:!areObjectsSame(newState,originalState)})
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
      <div className="card">
        <h4 className="card-header">Edit status</h4>
        <div className="card-body" style={{border:this.state.changed?'1px solid red':null}}>
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
          >
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={this.state.is_active}
                  onChange={target =>{
                    this.compareChanges('is_active', !this.state.is_active);
                    this.setState({ is_active: !this.state.is_active })}
                  }
                />
                Active
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="title">Status name</label>
              <input
                className="form-control"
                id="title"
                value={this.state.title}
                onChange={target =>{
                  this.compareChanges('title', target.target.value);
                  this.setState({ title: target.target.value })}
                }
                placeholder="Enter status name"
              />
            </div>
            {this.state.submitError && this.state.title===''&&<label htmlFor="title" style={{color:'red'}}>You must enter status name</label>}

            <div className="form-group">
              <label htmlFor="title">Order</label>
              <input
                className="form-control"
                id="title"
                type="number"
                value={this.state.order}
                onChange={target =>{
                  this.compareChanges('order', target.target.value);
                  this.setState({ order: target.target.value })}
                }
                placeholder="Enter order number (higher then 4)"
              />
            </div>
            { this.state.order!==''&&isNaN(parseInt(this.state.order))&&<label htmlFor="order" style={{color:'red'}}>Your order number is not valid </label>}
            { this.state.submitError &&this.state.order===''&&<label htmlFor="order" style={{color:'red'}}>Order is required</label>}
            { this.state.order!==''&&parseInt(this.state.order)<5&&<label htmlFor="order" style={{color:'orange'}}>Should be higher than 4</label>}

            <div className="form-group">
              <label htmlFor="ICO">Description</label>
              <textarea
                className="form-control"
                id="title"
                value={this.state.description}
                onChange={target =>{
                  this.compareChanges('description', target.target.value);
                  this.setState({ description: target.target.value })}
                }
                placeholder="Enter status description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="func">Function</label>
              <select
                value={this.state.func}
                id="func"
                onChange={target =>{
                  this.compareChanges('func', target.target.value);
                  this.setState({ func: target.target.value })}
                }
                className="form-control"
              >
                {funcOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="color">Color</label>
              <SketchPicker
                id="color"
                color={this.state.color}
                onChangeComplete={value => {
                  this.compareChanges('color', value.hex);
                  this.setState({ color: value.hex });
                }}
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary mr-2"
                onClick={this.submit.bind(this)}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => this.props.history.goBack()}
              >
                Cancel
              </button>
            </div>
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
