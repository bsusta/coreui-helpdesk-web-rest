import React, { Component } from "react";
import { connect } from 'react-redux';

class ImapEdit extends Component {
  constructor(props){
    super(props);
    console.log(this.props.imap);
  }
  render() {
    return (
      <div
        class="card"
        style={{ maxWidth: 1380, margin: "auto", borderTop: "0" }}
      >
        <h4 class="card-header">Edit IMap</h4>
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
              <label for="email">E-mail</label>
              <input
                class="form-control"
                id="email"
              placeholder="Enter email"
              />
            </div>

            <div class="form-group">
              <label for="server">Server IP</label>
              <input
                class="form-control"
                id="server"
              placeholder="Enter server"
              />
            </div>

            <div class="form-group">
              <label for="port">Port</label>
              <input
                class="form-control"
                id="port"
              placeholder="Enter port number"
              />
            </div>

            <div class="form-group">
              <label for="login">Login</label>
              <input
                class="form-control"
                id="login"
              placeholder="Enter login"
              />
            </div>

            <div class="form-group">
              <label for="pass">Password</label>
              <input
                class="form-control"
                id="pass"
              placeholder="Enter password"
              />
            </div>

            <div class="form-group">
              <label for="project">Select project</label>
              <input
                class="form-control"
                id="project"
              placeholder="Enter project"
              />
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input type="checkbox" class="form-check-input" />
                Ignore certificate
              </label>
            </div>

            <div class="form-check">
              <label class="form-check-label">
                <input type="checkbox" class="form-check-input" />
                SSL
              </label>
            </div>


            <button type="submit" class="btn btn-secondary">
              Test connection
            </button>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({imapsReducer, login }) => {
  const {imap} = imapsReducer;
  const {token} = login;
  return {imap,token};
};


export default connect(mapStateToProps, {})(ImapEdit);
