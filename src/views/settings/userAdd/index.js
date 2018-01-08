import React, { Component } from "react";

const mockOptions=[{id:0,title:'Lansystems'},{id:1,title:'Preston'},{id:2,title:'Microsoft'}];

class UserAdd extends Component {
  render() {
    return (
      <div
        class="card"
        style={{ maxWidth: 1380, margin: "auto", borderTop: "0" }}
      >
        <h4 class="card-header">Add user</h4>
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
              <label for="title">Name</label>
              <input
                class="form-control"
                id="title"
              placeholder="Enter name"
              />
            </div>
            <div class="form-group">
            <label for="title">Surname</label>
            <input
              class="form-control"
              id="title"
            placeholder="Enter surname"
            />
            </div>
            <div class="form-group">
            <label for="title">E-mail</label>
            <input
            class="form-control"
            id="title"
            placeholder="Enter e-mail"
            />
            </div>

            <div class="form-group">
            <label for="title">Company</label>
            <select
            class="form-control">
            {mockOptions.map(opt => (
            <option
              key={opt.id}
              value={opt.title}>
              {opt.title}
            </option>
            ))}
            </select>
            </div>
            <div class="form-group">
            <label for="title">Phone</label>
            <input
            class="form-control"
            id="title"
            type="number"
            placeholder="Enter phone"
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
