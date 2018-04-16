import React, { Component } from "react";
import { connect } from "react-redux";
import { editUserRole } from "../../../redux/actions";
import { areObjectsSame } from "../../../helperFunctions";
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
      order: this.props.userRole.order ? this.props.userRole.order.toString() : "",
      acl: this.props.userRole.acl ? this.props.userRole.acl : [],
      submitError:false,
      changed:false
    };
    this.compareChanges.bind(this);
    this.aclChange.bind(this);
  }

  compareChanges(change,val){
    var newState = {...this.state};
    newState[change]=val;
    newState.changed=undefined;
    newState.submitError=undefined;

    var originalState = {
      is_active: this.props.userRole.is_active ? true : false,
      title: this.props.userRole.title ? this.props.userRole.title : "",
      description: this.props.userRole.description
        ? this.props.userRole.description
        : "",
      homepage: this.props.userRole.homepage
        ? this.props.userRole.homepage
        : "",
      order: this.props.userRole.order ? this.props.userRole.order.toString() : "",
      acl: this.props.userRole.acl ? this.props.userRole.acl : []
    }
    this.setState({changed:!areObjectsSame(newState,originalState)})
  }

  aclChange(value) {
    if (!this.state.acl.includes(value)) {
      this.compareChanges('acl',[...this.state.acl, value]);
      this.setState({ acl: [...this.state.acl, value] });
    } else {
      let newACL = [...this.state.acl];
      newACL.splice(newACL.indexOf(value), 1);
      this.compareChanges('acl',newACL);
      this.setState({ acl: newACL });
    }
  }

  submit(e) {
    e.preventDefault();
    this.setState({submitError:true});
    let body = {
      title: this.state.title,
      description:
        this.state.description == "" ? "null" : this.state.description,
      homepage: this.state.homepage,
      order: parseInt(this.state.order)
    };
    if (this.state.acl.length > 0) {
      body["acl"] = JSON.stringify(this.state.acl);
    } else {
      body["acl"] = "null";
    }
    if(body.homepage===''||
    body.title===''||
    isNaN(body.order)){
      return;
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
        <div class="card-body" style={{border:this.state.changed?'1px solid red':null}}>
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
                  onChange={target =>{
                    this.compareChanges('is_active', !this.state.is_active);
                    this.setState({ is_active: !this.state.is_active })
                  }}
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
                onChange={target =>{
                  this.compareChanges('title', target.target.value);
                  this.setState({ title: target.target.value })}
                }
                placeholder="Enter role name"
              />
            </div>
            {this.state.submitError && this.state.title===''&&<label for="title" style={{color:'red'}}>You must enter title</label>}


            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                class="form-control"
                id="description"
                placeholder="Description"
                value={this.state.description}
                onChange={target =>{
                  this.compareChanges('description', target.target.value);
                  this.setState({ description: target.target.value })}
                }
              />
            </div>

            <div class="form-group">
              <label for="homepage">Homepage</label>
              <input
                class="form-control"
                id="homepage"
                value={this.state.homepage}
                onChange={target =>{
                  this.compareChanges('homepage', target.target.value);
                  this.setState({ homepage: target.target.value })}
                }
                placeholder="Enter roles homepage"
              />
            </div>
            {this.state.submitError && this.state.homepage===''&&<label for="homepage" style={{color:'red'}}>You must enter role's homepage</label>}

            <div class="form-group">
              <label for="order">Order</label>
              <input
                class="form-control"
                id="order"
                type="number"
                value={this.state.order}
                onChange={target =>{
                  this.compareChanges('order', target.target.value);
                  this.setState({ order: target.target.value })}
                }
                placeholder="Enter order (should be heigher then the one of yours role)"
              />
            </div>
            { this.state.order!==''&&isNaN(parseInt(this.state.order))&&<label for="order" style={{color:'red'}}>Your order number is not valid</label>}
            { this.state.submitError && this.state.order===''&&<label for="order" style={{color:'red'}}>You must enter order number</label>}

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
