import React, { Component } from "react";

const mockData = {
  id: 0,
  title: "Project title",
  archived: false,
  description: `This is the first project that we have ever created.  Why? We dont know.`
};

class ProjectInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2 style={{ paddingTop: 20 }}> {mockData.title}</h2>

        <button
          type="button"
          className="btn btn-danger btn-sm"
          style={{ color: "white" }}
          onClick={this.props.history.goBack}
        >
          Close
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          style={{ color: "white", marginLeft: 5 }}
          onClick={() => this.props.history.push(mockData.id + "/edit")}
        >
          Edit
        </button>
        <div style={{ marginTop: 10 }}>
          <p>Status: {mockData.archived ? "Active" : "Archived"}</p>

          <div className="card-text">{mockData.description}</div>
        </div>
      </div>
    );
  }
}

export default ProjectInfo;
