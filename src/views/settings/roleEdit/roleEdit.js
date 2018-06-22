import React, { Component } from "react";
import { connect } from "react-redux";
import { editUserRole } from "../../../redux/actions";
import { areObjectsSame } from "../../../helperFunctions";
import i18n from 'i18next';

const ACLs = [
  { value: "login_to_system", title: "aclLogIntoSystem" },
  { value: "share_filters", title: "aclShareFilters" },
  { value: "project_shared_filters", title: "aclProjectSharedFilters" },
  { value: "report_filters", title: "aclReportFilters" },
  { value: "share_tags", title: "aclSharedTags" },
  { value: "create_projects", title: "aclCreateProjects" },
  { value: "sent_emails_from_comments", title: "aclSendEmailsFromComments" },
  { value: "create_tasks", title: "aclCreateTasks" },
  {
    value: "create_tasks_in_all_projects",
    title: "aclCreateTasksInAllProjects"
  },
  { value: "update_all_tasks", title: "aclUpdateAllTasks" },
  { value: "user_settings", title: "aclUserSettings" },
  { value: "user_role_settings", title: "aclUserRoleSettings" },
  { value: "company_attribute_settings", title: "aclCompanyAttributeSettings" },
  { value: "company_settings", title: "aclCompanySettings" },
  { value: "status_settings", title: "aclStatusSettings" },
  { value: "task_attribute_settings", title: "aclTaskAttributeSettings" },
  { value: "unit_settings", title: "aclUnitSettings" },
  { value: "system_settings", title: "aclSystemSettings" },
  { value: "imap_settings", title: "aclImapSettings" },
  { value: "smtp_settings", title: "aclSMTPSettings" }
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
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body" style={{border:this.state.changed?'1px solid red':null}}>
        <h2 className="h2-setting-form">{i18n.t('editRole')}</h2>
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
          >
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  checked={this.state.is_active}
                  onChange={target =>{
                    this.compareChanges('is_active', !this.state.is_active);
                    this.setState({ is_active: !this.state.is_active })
                  }}
                  className="form-check-input"
                />
              {i18n.t('activated')}
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="title" className="req">{i18n.t('roleName')}</label>
              <input
                className="form-control"
                id="title"
                value={this.state.title}
                onChange={target =>{
                  this.compareChanges('title', target.target.value);
                  this.setState({ title: target.target.value })}
                }
                placeholder={i18n.t('enterRoleName')}
              />
            </div>
            {this.state.submitError && this.state.title===''&&<label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionMustEnterTitle')}</label>}


            <div className="form-group">
              <label htmlFor="description">{i18n.t('description')}</label>
              <textarea
                className="form-control"
                id="description"
                placeholder={i18n.t('enterDescription')}
                value={this.state.description}
                onChange={target =>{
                  this.compareChanges('description', target.target.value);
                  this.setState({ description: target.target.value })}
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="homepage" className="req">{i18n.t('homepage')}</label>
              <input
                className="form-control"
                id="homepage"
                value={this.state.homepage}
                onChange={target =>{
                  this.compareChanges('homepage', target.target.value);
                  this.setState({ homepage: target.target.value })}
                }
                placeholder={i18n.t('enterHomepage')}
              />
            </div>
            {this.state.submitError && this.state.homepage===''&&<label htmlFor="homepage" style={{color:'red'}}>{i18n.t('restrictionMustEnterRolesHomepage')}</label>}

            <div className="form-group">
              <label htmlFor="order" className="req">{i18n.t('order')}</label>
              <input
                className="form-control"
                id="order"
                type="number"
                value={this.state.order}
                onChange={target =>{
                  this.compareChanges('order', target.target.value);
                  this.setState({ order: target.target.value })}
                }
                placeholder={i18n.t('enterRoleOrder')}
              />
            </div>
            { this.state.order!==''&&isNaN(parseInt(this.state.order))&&<label htmlFor="order" style={{color:'red'}}>{i18n.t('restrictionOrderNumberIsNotValid')}</label>}
            { this.state.submitError && this.state.order===''&&<label htmlFor="order" style={{color:'red'}}>{i18n.t('restrictionMustEnterOrderNumber')}</label>}

            <h3>{i18n.t('acls')}</h3>
            {ACLs.map(acl => (
              <div className="form-check" key={acl.value}>
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={this.state.acl.includes(acl.value)}
                    onChange={() => this.aclChange(acl.value)}
                  />
                  {i18n.t(acl.title)}
                </label>
              </div>
            ))}

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary mr-2"
                onClick={this.submit.bind(this)}
              >
                {i18n.t('submit')}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => this.props.history.goBack()}
              >
                {i18n.t('cancel')}
              </button>
            </div>
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
