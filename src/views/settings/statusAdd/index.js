import React, { Component } from "react";
import { connect } from "react-redux";
import { addStatus } from "../../../redux/actions";
import { SketchPicker } from "react-color";

const funcOptions = [
  { value: "null", title: "None" },
  { value: "new_task", title: "New task" },
  { value: "in_progress_task", title: "Task in progress" },
  { value: "completed_task", title: "Completed task" },
  { value: "closed_task", title: "Closed task" }
];

class StatusAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      order: 5,
      func: "null",
      color: "#156EEB",
      submitError:false
    };
  }

  submit(e) {
    e.preventDefault();
    this.setState({submitError:true});
    let body = {
      title: this.state.title,
      description: this.state.description,
      order: parseInt(this.state.order),
      color: this.state.color
    };
    if (this.state.func !== "null") {
      body["function"] = this.state.func;
    }
    if(body.title===''||
    isNaN(body.order)){
      return;
  }

    this.props.addStatus(body, this.props.token);
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="card">
        <h4 className="card-header">Add status</h4>
        <div className="card-body">
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
          >
            <div className="form-group">
              <label htmlFor="title">Status name</label>
              <input
                className="form-control"
                id="title"
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
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
                onChange={e => this.setState({ order: e.target.value })}
                placeholder="Enter order number (should be higher then 4)"
              />
            { this.state.order!==''&&isNaN(parseInt(this.state.order))&&<label htmlFor="order" style={{color:'red'}}>Your order number is not valid </label>}
            { this.state.submitError &&this.state.order===''&&<label htmlFor="order" style={{color:'red'}}>Order is required</label>}
            { this.state.order!==''&&parseInt(this.state.order)<5&&<label htmlFor="order" style={{color:'orange'}}>Should be higher than 4</label>}
            </div>

            <div className="form-group">
              <label htmlFor="ICO">Description</label>
              <textarea
                className="form-control"
                id="title"
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
                placeholder="Enter status description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="func">Function</label>
              <select
                value={this.state.func}
                id="func"
                onChange={value => this.setState({ func: value.target.value })}
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
                onChangeComplete={value => this.setState({ color: value.hex })}
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

const mapStateToProps = ({ login }) => {
  const { token } = login;
  return { token };
};

export default connect(mapStateToProps, { addStatus })(StatusAdd);
