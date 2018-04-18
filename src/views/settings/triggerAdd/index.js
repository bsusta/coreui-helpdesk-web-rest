import React, { Component } from "react";

var mockOptions = ["Options 1", "Options 2", "Options 3", "Options 4"];

class TriggerAdd extends Component {
  render() {
    return (
      <div className="card">
        <h4 className="card-header">Add trigger</h4>
        <div className="card-body">
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" />
              Active
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="title">Automatic task name</label>
            <input className="form-control" id="title" placeholder="Enter title" />
          </div>
          <div className="form-group">
            <label htmlFor="shortcut">Description</label>
            <input
              className="form-control"
              id="shortcut"
              placeholder="Enter description"
            />
          </div>
          <h3>Meet these conditions:</h3>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <h2>IF</h2>
                </td>
                <td>
                  <select
                    className="form-control"
                    placeholder="Select ticket attribute..."
                  >
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select className="form-control" placeholder="ls">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select className="form-control" placeholder="Select status...">
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
                    className="form-control"
                    placeholder="Select ticket attribute..."
                  >
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select className="form-control" placeholder="ls">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select className="form-control" placeholder="Select status...">
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
                    className="form-control"
                    placeholder="Select ticket attribute..."
                  >
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select className="form-control" placeholder="ls">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select className="form-control" placeholder="Select status...">
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
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <h2>IF</h2>
                </td>
                <td>
                  <select
                    className="form-control"
                    placeholder="Select ticket attribute..."
                  >
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select className="form-control" placeholder="ls">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select className="form-control" placeholder="Select status...">
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
                    className="form-control"
                    placeholder="Select ticket attribute..."
                  >
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select className="form-control" placeholder="ls">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select className="form-control" placeholder="Select status...">
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
                    className="form-control"
                    placeholder="Select ticket attribute..."
                  >
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select className="form-control" placeholder="ls">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select className="form-control" placeholder="Select status...">
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
          <button className="btn btn-secondary">ADD CONDITON GROUP</button>
          <table className="table" style={{ marginTop: 25 }}>
            <tbody>
              <tr>
                <td>
                  <select
                    className="form-control"
                    placeholder="Select ticket attribute..."
                  >
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select className="form-control" placeholder="ls">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select className="form-control" placeholder="Select status...">
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
                    className="form-control"
                    placeholder="Select ticket attribute..."
                  >
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select className="form-control" placeholder="ls">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select className="form-control" placeholder="Select status...">
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
          <div className="form-group">
            <label htmlFor="title">Subject</label>
            <input className="form-control" id="subject" placeholder="Subject" />
          </div>
          <div className="form-group">
            <label htmlFor="body">E-mail body</label>
            <textarea
              className="form-control"
              id="body"
              label="Enter e-mail here..."
            />
          </div>

          <table className="table" style={{ marginTop: 25 }}>
            <tbody>
              <tr>
                <td>
                  <select
                    className="form-control"
                    placeholder="Select ticket attribute..."
                  >
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select className="form-control" placeholder="ls">
                    {mockOptions.map(item => <option>{item}</option>)}
                  </select>
                </td>
                <td>
                  <select className="form-control" placeholder="Select status...">
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
            className="btn btn-primary"
            onClick={() => this.props.history.goBack()}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default TriggerAdd;
