import { Link } from "react-router-dom";
import React, { Component } from "react";

const mockData = [
  { id: 1, active: true, title: "Centimeter", shortcut: "cm" },
  { id: 2, active: false, title: "Kilometer", shortcut: "km" },
  { id: 3, active: true, title: "Kilogram", shortcut: "kg" },
  { id: 4, active: true, title: "Kus", shortcut: "ks" },
  { id: 5, active: false, title: "Piece", shortcut: "pcs" },
  { id: 6, active: true, title: "Gram", shortcut: "g" }
];

class UnitEdit extends Component {
  constructor(props) {
    super(props);
    let original = mockData[parseInt(this.props.match.params.id, 10) - 1];
    this.state = {
      changed:false,
      title: original.title,
      shortcut: original.shortcut,
      active: original.active
    };
  }

  compareChanges(change,val){
    var original = mockData[parseInt(this.props.match.params.id, 10) - 1];
    var newState = {...this.state};
    newState[change]=val;
    this.setState({changed:newState.title!=original.title||newState.shortcut!=original.shortcut||newState.active!=original.active});
  }

  componentWillMount(){
    let self = this;
    window.onbeforeunload = function() {
      console.log(self.state.changed);
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
        <button type="submit" class="btn btn-primary mr-2">
          Submit
        </button>
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => this.props.history.goBack()}
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

export default UnitEdit;
