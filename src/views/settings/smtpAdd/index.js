import React, { Component } from "react";

class UserAdd extends Component {
  render() {
    return (
      <div
        class="card"
        style={{ maxWidth: 1380, margin: "auto", borderTop: "0" }}
      >
        <h4 class="card-header">Edit company</h4>
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
              <label for="title">Company name</label>
              <input
                class="form-control"
                id="title"
              placeholder="Enter company name"
              />
            </div>

            <div class="form-group">
              <label for="ICO">ICO</label>
              <input
                class="form-control"
                id="title"
              placeholder="Enter ICO number"
              />
            </div>

            <div class="form-group">
              <label for="DIC">DIC</label>
              <input
                class="form-control"
                id="DIC"
              placeholder="Enter DIC"
              />
            </div>

            <div class="form-group">
              <label for="Phone">Phone</label>
              <input
                class="form-control"
                id="Phone"
              placeholder="Enter phone"
              />
            </div>

            <div class="form-group">
              <label for="street">Street</label>
              <input
                class="form-control"
                id="street"
              placeholder="Enter street"
              />
            </div>

            <div class="form-group">
              <label for="city">City</label>
              <input
                class="form-control"
                id="city"
              placeholder="Enter city"
              />
            </div>

            <div class="form-group">
              <label for="PSC">PSC</label>
              <input
                class="form-control"
                id="PSC"
              placeholder="Enter PSC"
              />
            </div>

            <div class="form-group">
              <label for="country">Country</label>
              <input
                class="form-control"
                id="country"
              placeholder="Enter country"
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

export default UserAdd;
