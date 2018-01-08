import React, { Component } from "react";

class StatusEdit extends Component {
  render() {
    return (
      <div
        class="card"
        style={{ maxWidth: 1380, margin: "auto", borderTop: "0" }}
      >
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
                <input type="checkbox" class="form-check-input" />
                Active
              </label>
            </div>

            <div class="form-group">
              <label for="title">Status name</label>
              <input
                class="form-control"
                id="title"
              placeholder="Enter status name"
              />
            </div>

            <div class="form-group">
              <label for="ICO">Description</label>
              <input
                class="form-control"
                id="title"
              placeholder="Enter status description"
              />
            </div>

            <div class="form-group">
              <label for="country">Color</label>
              <input
                class="form-control"
                id="country"
              placeholder="Enter hex color"
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

export default StatusEdit;
