import React, { Component } from "react";
import { connect } from 'react-redux';
import {addUnit} from '../../../redux/actions';
class UnitAdd extends Component {
  constructor(props){
    super(props);
    this.state={
      isActive:true,
      title:'',
      shortcut:''
    }
  }

  //gets the state and send API request to add newly defined unit
  submit(e){
    e.preventDefault();
    this.props.addUnit({title:this.state.title,shortcut:this.state.shortcut},this.props.token);
    this.props.history.goBack();
  }

  render() {
    return (
      <div
        class="card"
        style={{ maxWidth: 1380, margin: "auto", borderTop: "0" }}
      >
        <h4 class="card-header">Add unit</h4>
        <div class="card-body">
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
          >
            <div class="form-group">
              <label for="title">Unit title</label>
              <input
                class="form-control"
                id="title"
                placeholder="Enter title"
                value={this.state.title}
                onChange={(value)=>this.setState({title:value.target.value})}
              />
            </div>
            <div class="form-group">
              <label for="shortcut">Shortcut</label>
              <input
                class="form-control"
                id="shortcut"
                placeholder="Enter shortcut"
                value={this.state.shortcut}
                onChange={(value)=>this.setState({shortcut:value.target.value})}
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


export default connect(mapStateToProps, {addUnit})(UnitAdd);
