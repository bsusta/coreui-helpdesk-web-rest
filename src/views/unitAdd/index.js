import React, { Component } from "react";

class UnitAdd extends Component {
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
            <div class="form-check">
              <label class="form-check-label">
                <input type="checkbox" class="form-check-input" />
                Active
              </label>
            </div>
            <div class="form-group">
              <label for="title">Unit title</label>
              <input
                class="form-control"
                id="title"
                placeholder="Enter title"
              />
            </div>
            <div class="form-group">
              <label for="shortcut">Shortcut</label>
              <input
                class="form-control"
                id="shortcut"
                placeholder="Enter shortcut"
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default UnitAdd;
