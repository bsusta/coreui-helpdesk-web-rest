import React, { Component } from "react";
import { connect } from "react-redux";
import { editProject, savePermissions } from "../../redux/actions";
import RichTextEditor from "react-rte";
import { Card, CardHeader, CardBody } from "reactstrap";
import i18n from 'i18next';
import Select from "react-select";

class ProjectEdit extends Component {
  constructor(props) {
    super(props);
    let filteredUsers = [...this.props.users];
    this.props.project.userHasProjects.map(user =>
      filteredUsers.splice(
        filteredUsers.findIndex(item => item.id === user.user.id),
        1
      )
    );
    /*
    filteredUsers.splice(
      filteredUsers.findIndex(item => item.id === this.props.user.id),
      1
    );*/
    this.state = {
      title: this.props.project.title ? this.props.project.title : "",
      description: RichTextEditor.createValueFromString(
        this.props.project.description ? this.props.project.description : "",
        "html"
      ),
      is_active: this.props.project.is_active ? true : false,
      permissions: this.props.project.userHasProjects
        ? this.props.project.userHasProjects
        : [],
      newUser: filteredUsers.length === 0 ? "" : this.userToSelectUser(filteredUsers[0]),
      filteredUsers,
      lastSavedPermissions: this.props.project.userHasProjects
        ? this.props.project.userHasProjects
        : [],
      submitError: false
    };
    this.setPermission.bind(this);
  }

  submit() {
    this.setState({ submitError: true });
    let body = {
      title: this.state.title,
      description: this.state.description.toString("html")
    };
    if (body.title === "") {
      return;
    }
    this.props.editProject(
      body,
      this.state.is_active,
      this.props.project.id,
      this.props.token
    );
    this.props.history.goBack();
  }

  setPermission(perm, permission) {
    let newPermissions = [...this.state.permissions];
    let index = newPermissions.findIndex(
      permission => permission.user.id === perm.user.id
    );
    if (newPermissions[index].acl.includes(permission)) {
      newPermissions[index].acl.splice(
        newPermissions[index].acl.findIndex(acl => acl === permission),
        1
      );
    } else {
      newPermissions[index].acl.push(permission);
    }
    this.setState({
      permissions: newPermissions
    });
  }

  userToSelectUser(user){
    let newUser = {...user};
      newUser.label =
      (newUser.name ? newUser.name : "") +
      " " +
      (newUser.surname ? newUser.surname : "");
      if (newUser.label === " ") {
        newUser.label = newUser.email;
      } else {
        newUser.label = newUser.label ;
      }
      newUser.value = newUser.id;
      return newUser;
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <button className="btn btn-link" onClick={this.props.history.goBack}>
            <i className="fa fa-angle-left" /> {i18n.t('goBack')}
          </button>

          <button
            type="button"
            className="btn btn-link"
            onClick={this.submit.bind(this)}
          >
            {i18n.t('Save')}
          </button>
        </CardHeader>
        <CardBody>
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
          <h2 className="h2">
            Editing {this.state.title}
          </h2>

          <div>
            <form style={{ marginTop: 15 }}>
              <div className="form-group">
                <div className="form-group form-check checkbox">
                    <input
                      type="checkbox"
                      id="is_active"
                      className="form-check-input"
                      checked={this.state.is_active}
                      onChange={() => {
                        this.setState({ is_active: !this.state.is_active })
                      }}
                      />
                    <label className="form-check-label" htmlFor="is_active">
                      {i18n.t('activated')}
                  </label>
                </div>
                <label htmlFor="title" className="req input-label">{i18n.t('projectName')}</label>
                <input
                  className="form-control"
                  placeholder={i18n.t('enterProjectName')}
                  value={this.state.title}
                  onChange={target =>
                    this.setState({ title: target.target.value })
                  }
                />
                {this.state.submitError &&
                  this.state.title === "" && (
                    <label htmlFor="title" className="input-label" style={{ color: "red" }}>
                      {i18n.t('restrictionMustEnterTitle')}
                    </label>
                  )}
              </div>
              <div className="form-group">
                <label htmlFor="description" className="input-label">{i18n.t('description')}</label>
                <RichTextEditor
                  value={this.state.description}
                  onChange={e => {
                    this.setState({ description: e });
                  }}
                  placeholder={i18n.t('enterDescription')}
                  toolbarClassName="demo-toolbar"
                  editorClassName="demo-editor"
                />
              </div>
            </form>
          </div>

          <h2 className="h2">
            {" "}
            {i18n.t('projectPermissions')}
          </h2>

          <div className="form-inline">
            <Select
              className="fullWidth"
              options={this.state.filteredUsers.map(user => this.userToSelectUser(user))}
              value={this.state.newUser}
              onChange={e => {
                this.setState({ newUser: e })
              }}
              />
            <button
              type="button"
              className="btn btn-success"
              style={{ color: "white", marginLeft: 5, paddingLeft: 5 }}
              onClick={() => {
                let index = this.state.filteredUsers.findIndex(
                  user => user.id === this.state.newUser.id
                );
                let newFilteredUsers = [...this.state.filteredUsers];
                newFilteredUsers.splice(index, 1);

                this.setState({
                  newUser:
                    newFilteredUsers.length === 0 ? "" : this.userToSelectUser(newFilteredUsers[0]),

                  filteredUsers: newFilteredUsers,
                  permissions: [
                    ...this.state.permissions,
                    {
                      acl: [],
                      user: {
                        id: this.state.filteredUsers[index].id,
                        username: this.state.filteredUsers[index].username,
                        email: this.state.filteredUsers[index].email
                      }
                    }
                  ]
                });
              }}
            >
              Add user
            </button>
          </div>

          <table
            className="table table-striped table-hover table-sm"
            style={{ marginTop: 10, textAlign:"center" }}
          >
            <thead className="thead-inverse">
              <tr>
                <th>{i18n.t('username')}</th>
                <th>{i18n.t('aclViewOwnTasks')}</th>
                <th>{i18n.t('aclViewCompanyUsersTasks')}</th>
                <th>{i18n.t('aclViewAllTasks')}</th>
                <th>{i18n.t('aclCreateTasks')}</th>
                <th>{i18n.t('aclResolveTasks')}</th>
                <th>{i18n.t('aclDeleteTask')}</th>
                <th>{i18n.t('aclViewInternalNote')}</th>
                <th>{i18n.t('aclEditInternalNote')}</th>
                <th>{i18n.t('aclEditProject')}</th>
                <th>{i18n.t('aclRemoveUser')}</th>
              </tr>
            </thead>
            <tbody>
              {this.state.permissions.map(perm => (
                <tr key={perm.user.id}>
                  <td>{perm.user.username}</td>
                  <td>
                    <span className="form-group form-check checkbox">
                        <input
                          type="checkbox"
                          id={perm.user.id+'view_own_tasks'}
                          className="form-check-input"
                          disabled={perm.user.id === this.props.user.id}
                          checked={perm.acl.includes("view_own_tasks")}
                          onChange={() => {
                            this.setPermission(perm, "view_own_tasks")
                          }}
                          />
                        <label style={{fontSize:0}} className="form-check-label" htmlFor={perm.user.id+'view_own_tasks'}>
                          aaa
                      </label>
                    </span>
                  </td>
                  <td>
                    <span className="form-group form-check checkbox">
                        <input
                          type="checkbox"
                          id={perm.user.id+'view_tasks_from_users_company'}
                          className="form-check-input"
                          disabled={perm.user.id === this.props.user.id}
                          checked={perm.acl.includes("view_tasks_from_users_company")}
                          onChange={() => {
                            this.setPermission(perm, "view_tasks_from_users_company")
                          }}
                          />
                        <label style={{fontSize:0}} className="form-check-label" htmlFor={perm.user.id+'view_tasks_from_users_company'}>
                          aaa
                      </label>
                    </span>
                  </td>

                  <td>
                    <span className="form-group form-check checkbox">
                        <input
                          type="checkbox"
                          id={perm.user.id+'view_all_tasks'}
                          className="form-check-input"
                          disabled={perm.user.id === this.props.user.id}
                          checked={perm.acl.includes("view_all_tasks")}
                          onChange={() => {
                            this.setPermission(perm, "view_all_tasks")
                          }}
                          />
                        <label style={{fontSize:0}} className="form-check-label" htmlFor={perm.user.id+'view_all_tasks'}>
                          aaa
                      </label>
                    </span>
                  </td>
                  <td>
                    <span className="form-group form-check checkbox">
                        <input
                          type="checkbox"
                          id={perm.user.id+'create_task'}
                          className="form-check-input"
                          disabled={perm.user.id === this.props.user.id}
                          checked={perm.acl.includes("create_task")}
                          onChange={() => {
                            this.setPermission(perm, "create_task")
                          }}
                          />
                        <label style={{fontSize:0}} className="form-check-label" htmlFor={perm.user.id+'create_task'}>
                          aaa
                      </label>
                    </span>
                  </td>

                  <td>
                    <span className="form-group form-check checkbox">
                        <input
                          type="checkbox"
                          id={perm.user.id+'resolve_task'}
                          className="form-check-input"
                          disabled={perm.user.id === this.props.user.id}
                          checked={perm.acl.includes("resolve_task")}
                          onChange={() => {
                            this.setPermission(perm, "resolve_task")
                          }}
                          />
                        <label style={{fontSize:0}} className="form-check-label" htmlFor={perm.user.id+'resolve_task'}>
                          aaa
                      </label>
                    </span>
                  </td>
                  <td>
                    <span className="form-group form-check checkbox">
                        <input
                          type="checkbox"
                          id={perm.user.id+'delete_task'}
                          className="form-check-input"
                          disabled={perm.user.id === this.props.user.id}
                          checked={perm.acl.includes("delete_task")}
                          onChange={() => {
                            this.setPermission(perm, "delete_task")
                          }}
                          />
                        <label style={{fontSize:0}} className="form-check-label" htmlFor={perm.user.id+'delete_task'}>
                          aaa
                      </label>
                    </span>
                  </td>
                  <td>
                    <span className="form-group form-check checkbox">
                        <input
                          type="checkbox"
                          id={perm.user.id+'view_internal_note'}
                          className="form-check-input"
                          disabled={perm.user.id === this.props.user.id}
                          checked={perm.acl.includes("view_internal_note")}
                          onChange={() => {
                            this.setPermission(perm, "view_internal_note")
                          }}
                          />
                        <label style={{fontSize:0}} className="form-check-label" htmlFor={perm.user.id+'view_internal_note'}>
                          aaa
                      </label>
                    </span>
                  </td>
                  <td>
                    <span className="form-group form-check checkbox">
                        <input
                          type="checkbox"
                          id={perm.user.id+'edit_internal_note'}
                          className="form-check-input"
                          disabled={perm.user.id === this.props.user.id}
                          checked={perm.acl.includes("edit_internal_note")}
                          onChange={() => {
                            this.setPermission(perm, "edit_internal_note")
                          }}
                          />
                        <label style={{fontSize:0}} className="form-check-label" htmlFor={perm.user.id+'edit_internal_note'}>
                          aaa
                      </label>
                    </span>
                  </td>
                  <td>
                    <span className="form-group form-check checkbox">
                        <input
                          type="checkbox"
                          id={perm.user.id+'edit_project'}
                          className="form-check-input"
                          disabled={perm.user.id === this.props.user.id}
                          checked={perm.acl.includes("edit_project")}
                          onChange={() => {
                            this.setPermission(perm, "edit_project")
                          }}
                          />
                        <label style={{fontSize:0}} className="form-check-label" htmlFor={perm.user.id+'edit_project'}>
                          aaa
                      </label>
                    </span>
                  </td>
                  <td>
                    {perm.user.id !== this.props.user.id && (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          let newPermissions = [...this.state.permissions];
                          newPermissions.splice(
                            newPermissions.findIndex(
                              permis => permis.user.id === perm.user.id
                            ),
                            1
                          );
                          this.setState({
                            permissions: newPermissions,
                            filteredUsers: [
                              this.props.users[
                                this.props.users.findIndex(
                                  user => user.id === perm.user.id
                                )
                              ],
                              ...this.state.filteredUsers
                            ]
                          });
                        }}
                      >
                        <i className="fa fa-remove" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              this.props.savePermissions(
                this.state.permissions,
                this.state.lastSavedPermissions,
                this.props.project.id,
                this.props.token
              );
              this.setState({ lastSavedPermissions: this.state.permissions });
            }}
            style={{ color: "white", marginLeft: 5 }}
          >
            Save permissions
          </button>
          {this.props.permissionsSaved && (
            <label style={{ color: "green", marginLeft: 10 }}>
              Permissions saved!
            </label>
          )}
        </div>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = ({ projectsReducer, usersReducer, login }) => {
  const { project, permissionsSaved } = projectsReducer;
  const { users } = usersReducer;
  const { user, token } = login;
  return { project, users, user, token, permissionsSaved };
};

export default connect(mapStateToProps, { editProject, savePermissions })(
  ProjectEdit
);
