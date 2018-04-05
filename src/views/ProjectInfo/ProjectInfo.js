import React, { Component } from "react";
import { connect } from 'react-redux';

class ProjectInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <h2 style={{ paddingTop: 20, marginBottom: 20 }}> {this.props.project.title}</h2>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          style={{ color: "white" }}
          onClick={this.props.history.goBack}
        >
          Close
        </button>
        {this.props.project.canEdit && <button
            type="button"
            className="btn btn-primary btn-sm"
            style={{ color: "white", marginLeft: 5 }}
            onClick={() => this.props.history.push("/project/edit/"+this.props.project.id) }
            >
            Edit
          </button>
        }
        <div style={{ marginTop: 10 }}>
          <p>Status: {this.props.project.is_active ? "Active" : "Archived"}</p>

          <div className="card-text">{this.props.project.description}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({projectsReducer }) => {
  const {project} = projectsReducer;
  return {project};
};

export default connect(mapStateToProps, {})(ProjectInfo);
