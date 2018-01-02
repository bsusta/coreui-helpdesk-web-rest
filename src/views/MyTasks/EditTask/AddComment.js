import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }
  render() {
    return (
      <div>
        <div class="form-group">
          <label>Add comment</label>
          <textarea
            class="form-control underlined-input"
            id="description"
            placeholder="add comment"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-success mr-1">
            Send
          </button>
          <button type="submit" className="btn btn-danger">
            Discard
          </button>
        </div>
      </div>
    );
  }
}

export default AddComment;
