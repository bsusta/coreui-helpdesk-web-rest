import { Link } from "react-router-dom";
import React, { Component } from "react";
import { editUnit } from '../../../redux/actions';
import { connect } from 'react-redux';

class UnitEdit extends Component {
  constructor(props) {
    super(props);
    // we create state according to already recieved informations
    this.state = {
      changed:false,
      title: this.props.unit.title,
      shortcut: this.props.unit.shortcut,
      active: this.props.unit.is_active
    };
  }

  //we compare if there have been made any changes to the unit in comparison to the original unit, if yes we trigger warning for the user
  compareChanges(change,val){
    var newState = {...this.state};
    newState[change]=val;
    this.setState({changed:newState.title!=this.props.unit.title||newState.shortcut!=this.props.unit.shortcut||newState.active!=this.props.unit.is_active});
  }

  //when page will be loaded, we add warning about leaving this site, if unit has been edited but not saved
  componentWillMount(){
    let self = this;
    window.onbeforeunload = function() {
      if(self.state.changed){
        return "Are you sure you want to leave without saving?";
      }
    }
  }

  //gets all data from the state and sends it to the API
  submit(e){
    e.preventDefault(); //prevent default form behaviour
    this.props.editUnit({title:this.state.title,shortcut:this.state.shortcut},this.state.active,this.props.unit.id,this.props.token);
    this.setState({changed:false});
    this.props.history.goBack();
  }

  render() {
    return (
      <div
        class="card"
        style={{ maxWidth: 1380, margin: "auto", borderTop: "0",border:this.state.changed?'1px solid red':null }}
        >

        <h4 class="card-header">Edit unit</h4>
        <div class="card-body">
          <div class="list-group">
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
              <label for="title">Unit title</label>
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
            <label for="shortcut">Shortcut</label>
            <input
              class="form-control"
              id="shortcut"
              value={this.state.shortcut}
              onChange={event =>{
                this.compareChanges("shortcut",event.target.value);
                this.setState({ shortcut: event.target.value })
              }
            }
            placeholder="Enter shortcut"
            />
        </div>
        <button type="submit" class="btn btn-primary mr-2" onClick={this.submit.bind(this)}>
          Submit
        </button>
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => {this.setState({changed:false});this.props.history.goBack()}}
          >
          Cancel
        </button>
      </form>
    </div>
  </div>
</div>
);
}
}

// All below is just redux storage
const mapStateToProps = ({unitsReducer, login }) => {
  const {unit} = unitsReducer;
  const {token} = login;
  return {unit,token};
};

export default connect(mapStateToProps, {editUnit})(UnitEdit);
