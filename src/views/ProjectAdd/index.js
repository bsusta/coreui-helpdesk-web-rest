import React, { Component } from "react";
import { connect } from 'react-redux';
import { addProject } from '../../redux/actions';

class ProjectAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      permissions: [],
    };
  }

  submit(){
    this.props.addProject({
      title:this.state.title,
      description:this.state.description,
    },this.props.token);
    this.props.history.goBack();
  }

  render() {
    return (
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <h2 style={{ paddingTop: 20, marginBottom: 20 }}> Add new project</h2>

        <div>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            style={{ color: "white" }}
            onClick={this.props.history.goBack}
          >
            Close
          </button>

          <button
            type="button"
            class="btn btn-primary btn-sm"
            style={{ color: "white", marginLeft: 5 }}
            onClick={this.submit.bind(this)}
          >
            Add new project
          </button>

          <div style={{ marginTop: 15 }}>
            <div class="form-group">
              <label for="title">Project name</label>
              <input
                class="form-control"
                placeholder="Enter project title"
                value={this.state.title}
                onChange={target =>
                  this.setState({ title: target.target.value })
                }
              />
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                class="form-control"
                id="description"
                placeholder="Enter project description"
                value={this.state.description}
                onChange={target =>
                  this.setState({ description: target.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ login }) => {
  const {token} = login;
  return {token};
};

export default connect(mapStateToProps, {addProject})(ProjectAdd);
