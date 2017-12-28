import React, { Component } from "react";

const mockData = {
  id: 0,
  title: "Project title",
  archivated: false,
  description: `This is the first project that we have ever created.  Why? We dont know.`
};
const mockPermissions = [
  {
    name: "susta",
    ownTasks: true,
    userTasks: true,
    allTasks: true,
    createTasks: true,
    resolveTasks: true,
    internalNote: true,
    deleteTask: true,
    editProject: true
  }
];
class ProjectEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: mockData.title,
      description: mockData.description,
      archivated: mockData.archivated,
      permissions: mockPermissions,
      newUser: ""
    };
  }

  render() {
    return (
      <div>
        <h2 style={{ paddingTop: 20, marginBottom: 20 }}>
          {" "}
          Editing {mockData.title}
        </h2>

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
            onClick={this.props.history.goBack}
          >
            Save changes
          </button>
          <form style={{ marginTop: 15 }}>
            <div class="form-group">
              <p>
                <label class="switch switch-3d switch-primary">
                  <input
                    type="checkbox"
                    class="switch-input"
                    checked={this.state.archivated}
                    onChange={() =>
                      this.setState({ archivated: !this.state.archivated })
                    }
                  />
                  <span class="switch-label" />
                  <span class="switch-handle" />
                </label>
                <label style={{ paddingLeft: 10 }}>
                  {this.state.archivated ? "Archivated" : "Active"}
                </label>
              </p>
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
          </form>
        </div>

        <h2 style={{ paddingTop: 20, marginBottom: 20 }}>
          {" "}
          Project permissions
        </h2>

        <div className="form-inline">
          <input
            class="form-control"
            placeholder="Enter username"
            value={this.state.newUser}
            onChange={target => this.setState({ newUser: target.target.value })}
          />
          <button
            type="button"
            class="btn btn-success"
            style={{ color: "white", paddingLeft: 5 }}
            onClick={() =>
              this.setState({
                permissions: [
                  ...this.state.permissions,
                  {
                    name: this.state.newUser,
                    ownTasks: false,
                    userTasks: false,
                    allTasks: false,
                    createTasks: false,
                    resolveTasks: false,
                    internalNote: false,
                    deleteTask: false,
                    editProject: false
                  }
                ],
                newUser: ""
              })
            }
          >
            Add user
          </button>
        </div>

        <table
          class="table table-striped table-hover table-sm"
          style={{ marginTop: 10 }}
        >
          <thead className="thead-inverse">
            <tr>
              <th>User</th>
              <th>View own tasks</th>
              <th>View user company tasks</th>
              <th>View all tasks</th>
              <th>Create tasks</th>
              <th>Resolve tasks</th>
              <th>Internal note</th>
              <th>Delete task</th>
              <th>Edit project permissions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.permissions.map(perm => (
              <tr>
                <td>{perm.name}</td>
                <td style={{ marginLeft: "auto", marginRight: "auto" }}>
                  <input type="checkbox" checked={perm.ownTasks} />
                </td>
                <td>
                  <input type="checkbox" checked={perm.userTasks} />
                </td>
                <td>
                  <input type="checkbox" checked={perm.allTasks} />
                </td>
                <td>
                  <input type="checkbox" checked={perm.createTasks} />
                </td>
                <td>
                  <input type="checkbox" checked={perm.resolveTasks} />
                </td>
                <td>
                  <input type="checkbox" checked={perm.internalNote} />
                </td>
                <td>
                  <input type="checkbox" checked={perm.deleteTask} />
                </td>
                <td>
                  <input type="checkbox" checked={perm.editProject} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          class="btn btn-primary"
          style={{ color: "white", marginLeft: 5 }}
        >
          Save permissions
        </button>
        <label style={{ color: "green", marginLeft: 10 }}>Changes saved!</label>
      </div>
    );
  }
}

export default ProjectEdit;
