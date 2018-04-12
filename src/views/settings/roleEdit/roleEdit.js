import React, { Component } from "react";
import { connect } from "react-redux";
import { editUserRole } from "../../../redux/actions";
const ACLs = [
  { value: "login_to_system", title: "Log into system" },
  { value: "share_filters", title: "Share filters" },
  { value: "project_shared_filters", title: "Project shared filters" },
  { value: "report_filters", title: "Report Filters" },
  { value: "share_tags", title: "Shared tags" },
  { value: "create_projects", title: "Create projects" },
  { value: "sent_emails_from_comments", title: "Send e-mails from comments" },
  { value: "create_tasks", title: "Create tasks" },
  {
    value: "create_tasks_in_all_projects",
    title: "Create tasks in all projects"
  },
  { value: "update_all_tasks", title: "Update all tasks" },
  { value: "user_settings", title: "User settings" },
  { value: "user_role_settings", title: "User role settings" },
  { value: "company_attribute_settings", title: "Company attribute settings" },
  { value: "company_settings", title: "Company settings" },
  { value: "status_settings", title: "Status settings" },
  { value: "task_attribute_settings", title: "Task attribute settings" },
  { value: "unit_settings", title: "Unit settings" },
  { value: "system_settings", title: "System settings" },
  { value: "imap_settings", title: "Imap settings" },
  { value: "smtp_settings", title: "SMTP settings" }
];

class RoleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_active: this.props.userRole.is_active ? true : false,
      title: this.props.userRole.title ? this.props.userRole.title : "",
      description: this.props.userRole.description
        ? this.props.userRole.description
        : "",
      homepage: this.props.userRole.homepage
        ? this.props.userRole.homepage
        : "",
      order: this.props.userRole.order ? this.props.userRole.order : "",
      acl: this.props.userRole.acl ? this.props.userRole.acl : []
    };
    this.aclChange.bind(this);
  }

  aclChange(value) {
    if (!this.state.acl.includes(value)) {
      this.setState({ acl: [...this.state.acl, value] });
    } else {
      let newACL = [...this.state.acl];
      newACL.splice(newACL.indexOf(value), 1);
      this.setState({ acl: newACL });
    }
  }

  submit(e) {
    e.preventDefault();
    let body = {
      title: this.state.title,
      description:
        this.state.description == "" ? "null" : this.state.description,
      homepage: this.state.homepage,
      order: this.state.order
    };
    if (this.state.acl.length > 0) {
      body["acl"] = JSON.stringify(this.state.acl);
    } else {
      body["acl"] = "null";
    }
    this.props.editUserRole(
      body,
      this.state.is_active,
      this.props.userRole.id,
      this.props.token
    );
    this.props.history.goBack();
  }

  render() {
    return (
      <div class="card">
        <h4 class="card-header">Edit role</h4>
        <div class="card-body">
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
          >
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  checked={this.state.is_active}
                  onChange={() =>
                    this.setState({ is_active: !this.state.is_active })
                  }
                  class="form-check-input"
                />
                Active
              </label>
            </div>

            <div class="form-group">
              <label for="title">Role name</label>
              <input
                class="form-control"
                id="title"
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
                placeholder="Enter role name"
              />
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                class="form-control"
                id="description"
                placeholder="Description"
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
              />
            </div>

            <div class="form-group">
              <label for="homepage">Homepage</label>
              <input
                class="form-control"
                id="homepage"
                value={this.state.homepage}
                onChange={e => this.setState({ homepage: e.target.value })}
                placeholder="Enter roles homepage"
              />
            </div>

            <div class="form-group">
              <label for="order">Order</label>
              <input
                class="form-control"
                id="order"
                type="number"
                value={this.state.order}
                onChange={e => this.setState({ order: e.target.value })}
                placeholder="Enter order (should be heigher then the one of yours role)"
              />
            </div>

            <h3>ACLs</h3>
            {ACLs.map(acl => (
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    checked={this.state.acl.includes(acl.value)}
                    onChange={() => this.aclChange(acl.value)}
                  />
                  {acl.title}
                </label>
              </div>
            ))}

            <button
              type="submit"
              onClick={this.submit.bind(this)}
              class="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userRolesReducer, login }) => {
  const { userRole } = userRolesReducer;
  const { token } = login;
  return { userRole, token };
};

export default connect(mapStateToProps, { editUserRole })(RoleEdit);
