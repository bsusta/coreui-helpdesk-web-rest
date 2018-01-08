import React, { Component } from "react";

class RoleEdit extends Component {
  render() {
    return (
      <div
        class="card"
        style={{ maxWidth: 1380, margin: "auto", borderTop: "0" }}
      >
        <h4 class="card-header">Edit role</h4>
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
              <label for="title">Role name</label>
              <input
                class="form-control"
                id="title"
              placeholder="Enter role name"
              />
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <input
                class="form-control"
                id="description"
              placeholder="Description"
              />
            </div>
            <h3>Systems ACL</h3>
              <div class="form-check">
                <label class="form-check-label">
                  <input type="checkbox" class="form-check-input" />
                  Log in system
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input type="checkbox" class="form-check-input" />
                  Creating projects
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input type="checkbox" class="form-check-input" />
                  Delete tasks
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input type="checkbox" class="form-check-input" />
                  Reports
                </label>
              </div>
              <h3>Settings ACL</h3>
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" />
                    Users
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" />
                    User roles settings
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" />
                    Companies
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" />
                    Role settings
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" />
                    Project Shared Filters
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" />
                    Task custom Fields
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" />
                    Units
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" />
                    Statuses
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" />
                    User custom fields
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" />
                    IMAPs
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" />
                    SMTPs
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" />
                    Trigers
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" />
                    Automated tasks
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" />
                    Email notification
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" />
                    Public tag
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" />
                    Personal tag
                  </label>
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

export default RoleEdit;
