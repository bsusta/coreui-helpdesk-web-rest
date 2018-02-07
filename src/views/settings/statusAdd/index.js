import React, { Component } from "react";
import { connect } from 'react-redux';
import { addStatus } from '../../../redux/actions';
import { SketchPicker } from 'react-color';

const funcOptions=[{value:'new_task',title:'New task'}, {value:'in_progress_task',title:'Task in progress'}, {value:'completed_task',title:'Completed task'}, {value:'closed_task',title:"Closed task"}]

class StatusAdd extends Component {
  constructor(props){
    super(props);
    this.state={
      title:'',
      description:'',
      order:5,
      func:'new_task',
      color:'#156EEB',
    }
  }

  submit(e){
    e.preventDefault();
    if(isNaN(parseInt(this.state.order))||parseInt(this.state.order)<4){
      return;
    }

    this.props.addStatus({
      title:this.state.title,
      description:this.state.description,
      order:this.state.order,
      function:this.state.func,
      color:this.state.color
    },this.props.token);
    this.props.history.goBack();
  }

  //color, default ???, description, function, id, is_active, title, order
  render() {
    return (
      <div
        class="card"
        style={{ maxWidth: 1380, margin: "auto", borderTop: "0" }}
      >
        <h4 class="card-header">Add status</h4>
        <div class="card-body">
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
          >

          <div class="form-group">
            <label for="title">Status name</label>
            <input
              class="form-control"
              id="title"
              value={this.state.title}
              onChange={(e)=>this.setState({title:e.target.value})}
              placeholder="Enter status name"
            />
          </div>

          <div class="form-group">
            <label for="title">Order</label>
            <input
              class="form-control"
              id="title"
              type="number"
              value={this.state.order}
              onChange={(e)=>this.setState({order:e.target.value})}
              placeholder="Enter order number (higher then 4)"
            />
          </div>

            <div class="form-group">
              <label for="ICO">Description</label>
              <textarea
                class="form-control"
                id="title"
                value={this.state.description}
                onChange={(e)=>this.setState({description:e.target.value})}
              placeholder="Enter status description"
              />
            </div>

            <div class="form-group">
              <label for="func">Function</label>
              <select
                value={this.state.func}
                id="func"
                onChange={(value)=>this.setState({func:value.target.value})}
                class="form-control">
                {
                  funcOptions.map(opt => (
                  <option
                    key={opt.value}
                    value={opt.value}>
                    {opt.title}
                  </option>
                ))}
              </select>
            </div>
          <div class="form-group">
            <label for="color">Color</label>
            <SketchPicker
              id="color"
              color={ this.state.color }
              onChangeComplete={ (value) => this.setState({color:value.hex})}
            />
          </div>
            <button type="submit" class="btn btn-primary" onClick={this.submit.bind(this)}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({login}) => {
  const {token} = login;
  return {token};
};

export default connect(mapStateToProps, {addStatus})(StatusAdd);
