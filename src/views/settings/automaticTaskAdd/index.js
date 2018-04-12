import React, { Component } from "react";
import Loading from "../../../components/Loading";
var mockOptions = ["Options 1", "Options 2", "Options 3", "Options 4"];

export default class AutomaticTaskAdd extends Component {
  render() {
    return <Loading history={this.props.history} />;

    return (
      <div class="card">
        <h4 class="card-header">Add automatic task</h4>
        <div class="card-body">
          <div class="form-check">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input" />
              Active
            </label>
          </div>
          <div class="form-group">
            <label for="title">Automatic task name</label>
            <input class="form-control" id="title" placeholder="Enter title" />
          </div>
          <div class="form-group">
            <label for="shortcut">Description</label>
            <input
              class="form-control"
              id="shortcut"
              placeholder="Enter description"
            />
          </div>
          <h3>Meet these conditions:</h3>
          <table class="table">
            <tbody>
              <tr>
                <td>
                  <h2>IF</h2>
                </td>
                <td>
                  <select
                    class="form-control"
                    placeholder="Select ticket attribute..."
                  >
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select class="form-control" placeholder="ls">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select class="form-control" placeholder="Select status...">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <button className="btn btn-sm btn-danger  ">
                    <i className="fa fa-remove" />
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <h2>AND</h2>
                </td>
                <td>
                  <select
                    class="form-control"
                    placeholder="Select ticket attribute..."
                  >
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select class="form-control" placeholder="ls">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select class="form-control" placeholder="Select status...">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <button className="btn btn-sm btn-danger  ">
                    <i className="fa fa-remove" />
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <h2>AND</h2>
                </td>
                <td>
                  <select
                    class="form-control"
                    placeholder="Select ticket attribute..."
                  >
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select class="form-control" placeholder="ls">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select class="form-control" placeholder="Select status...">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <button className="btn btn-sm btn-primary">
                    ADD CONDITION
                  </button>
                </td>
              </tr>
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>
            </tbody>
          </table>
          <h2 style={{ marginLeft: "50%" }}>OR</h2>
          <table class="table">
            <tbody>
              <tr>
                <td>
                  <h2>IF</h2>
                </td>
                <td>
                  <select
                    class="form-control"
                    placeholder="Select ticket attribute..."
                  >
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select class="form-control" placeholder="ls">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select class="form-control" placeholder="Select status...">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <button className="btn btn-sm btn-danger  ">
                    <i className="fa fa-remove" />
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <h2>AND</h2>
                </td>
                <td>
                  <select
                    class="form-control"
                    placeholder="Select ticket attribute..."
                  >
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select class="form-control" placeholder="ls">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select class="form-control" placeholder="Select status...">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <button className="btn btn-sm btn-danger  ">
                    <i className="fa fa-remove" />
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <h2>AND</h2>
                </td>
                <td>
                  <select
                    class="form-control"
                    placeholder="Select ticket attribute..."
                  >
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select class="form-control" placeholder="ls">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select class="form-control" placeholder="Select status...">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <button className="btn btn-sm btn-primary">
                    ADD CONDITION
                  </button>
                </td>
              </tr>
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>
            </tbody>
          </table>
          <button class="btn btn-secondary">ADD CONDITON GROUP</button>
          <table class="table" style={{ marginTop: 25 }}>
            <tbody>
              <tr>
                <td>
                  <select
                    class="form-control"
                    placeholder="Select ticket attribute..."
                  >
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select class="form-control" placeholder="ls">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select class="form-control" placeholder="Select status...">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <button className="btn btn-sm btn-danger  ">
                    <i className="fa fa-remove" />
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <select
                    class="form-control"
                    placeholder="Select ticket attribute..."
                  >
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select class="form-control" placeholder="ls">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select class="form-control" placeholder="Select status...">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <button className="btn btn-sm btn-danger  ">
                    <i className="fa fa-remove" />
                  </button>
                </td>
              </tr>
              <tr>
                <td />
                <td />
                <td />
                <td />
              </tr>
            </tbody>
          </table>
          <div class="form-group">
            <label for="title">Subject</label>
            <input class="form-control" id="subject" placeholder="Subject" />
          </div>
          <div class="form-group">
            <label for="body">E-mail body</label>
            <textarea
              class="form-control"
              id="body"
              label="Enter e-mail here..."
            />
          </div>

          <table class="table" style={{ marginTop: 25 }}>
            <tbody>
              <tr>
                <td>
                  <select
                    class="form-control"
                    placeholder="Select ticket attribute..."
                  >
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select class="form-control" placeholder="ls">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select class="form-control" placeholder="Select status...">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <button className="btn btn-sm btn-primary">
                    ADD CONDITION
                  </button>
                </td>
              </tr>
              <tr>
                <td />
                <td />
                <td />
                <td />
              </tr>
            </tbody>
          </table>

          <button
            type="submit"
            class="btn btn-primary"
            onClick={() => this.props.history.goBack()}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
