import React, { Component } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import Header from "./components/Header/";
import Sidebar from "./components/Sidebar";
import Aside from "./components/notUsed/Aside/";

import Dashboard from "./components/notUsed/Dashboard/";
import Settings from "./views/Settings/";
import NewTask from "./components/notUsed/newTask/";
import UnitsList from "./views/settings/unitsList";
import UnitAdd from "./views/settings/unitAdd";
import UnitEdit from "./views/settings/unitEdit";
import UsersList from "./views/settings/usersList";
import UserAdd from "./views/settings/userAdd";
import UserEdit from "./views/settings/userEdit";
import Profile from "./views/Profile";
import TaskAttributesList from "./views/settings/taskAttributesList";
import TaskAttributeAdd from "./views/settings/taskAttributeAdd";
import TaskAttributeEdit from "./views/settings/taskAttributeEdit";
import CompanyAttributesList from "./views/settings/companyAttributesList";
import CompanyAttributeAdd from "./views/settings/companyAttributeAdd";
import CompanyAttributeEdit from "./views/settings/companyAttributeEdit";
import CompaniesList from "./views/settings/companiesList";
import CompanyAdd from "./views/settings/companyAdd";
import CompanyEdit from "./views/settings/companyEdit";
import ImapsList from "./views/settings/imapsList";
import ImapAdd from "./views/settings/imapAdd";
import ImapEdit from "./views/settings/imapEdit";
import RolesList from "./views/settings/rolesList";
import RoleAdd from "./views/settings/roleAdd";
import RoleEdit from "./views/settings/roleEdit";
import SMTPsList from "./views/settings/smtpsList";
import SMTPAdd from "./views/settings/smtpAdd";
import SMTPEdit from "./views/settings/smtpEdit";
import AutomaticTasksList from "./views/settings/automaticTasksList";
import AutomaticTaskAdd from "./views/settings/automaticTaskAdd";
import AutomaticTaskEdit from "./views/settings/automaticTaskEdit";
import StatusesList from "./views/settings/statusesList";
import StatusAdd from "./views/settings/statusAdd";
import StatusEdit from "./views/settings/statusEdit";
import TriggersList from "./views/settings/triggersList";
import TriggerAdd from "./views/settings/triggerAdd";
import TriggerEdit from "./views/settings/triggerEdit";
import MyTasks from "./components/notUsed/MyTasks";
import Page404 from "./components/404";
import Project from "./views/Project";
import ProjectInfo from "./views/ProjectInfo";
import ProjectEdit from "./views/ProjectEdit";
import ProjectAdd from "./views/ProjectAdd";
import TagAdd from "./views/TagAdd";
import TagEdit from "./views/TagEdit";
import EditTask from "./views/EditTask";
import ViewTask from "./views/ViewTask";
import AddTask from "./views/AddTask";
import SecondEditTask from "./components/notUsed/SecondEditTask";
import TrojStlpec from "./components/notUsed/TrojStlpec";
import Messages from "./views/Messages";
import Filter from "./views/Filter";
import ReportFilter from "./views/ReportFilter";
import ReportView from "./views/ReportView";

class Full extends Component {
  constructor(props){
    super(props);
    this.state={error:false}
  }
  componentDidCatch(error, info) {
    this.setState({error:false});
  }

  render() {
    return (
      <div className="app">
        <Header history={this.props.history} />
        <div className="app-body">
          <Sidebar {...this.props} />
          {
            this.state.error && <span>Nastala chyba, prosim refreshnite stranku</span>
          }
          {
            !this.state.error &&
          <main className="main">
            <Container fluid>
              <Switch>
                <Route
                  exact
                  path="/settings"
                  name="Settings"
                  component={Settings}
                />
                <Route
                  exact
                  path="/newTask"
                  name="New task"
                  component={NewTask}
                />
                <Route
                  exact
                  path="/usersList"
                  name="Users list"
                  component={UsersList}
                />
                <Route
                  exact
                  path="/404"
                  name="404"
                  component={Page404}
                />
                <Route
                  exact
                  path="/usersList/:p,:nop"
                  name="Users list"
                  component={UsersList}
                />

                <Route
                  exact
                  path="/user/add"
                  name="User add"
                  component={UserAdd}
                />
                <Route
                  exact
                  path="/user/profile"
                  name="User profile"
                  component={Profile}
                />
                <Route
                  exact
                  path="/user/edit/:id"
                  name="User edit"
                  component={UserEdit}
                />
                <Route
                  exact
                  path="/taskAttributesList"
                  name="Task attributes list"
                  component={TaskAttributesList}
                />
                <Route
                  exact
                  path="/taskAttribute/add"
                  name="Task attribute add"
                  component={TaskAttributeAdd}
                />
                <Route
                  exact
                  path="/taskAttribute/edit/:id"
                  name="Task attribute edit"
                  component={TaskAttributeEdit}
                />
                <Route
                  exact
                  path="/companyAttributesList"
                  name="Company attributes list"
                  component={CompanyAttributesList}
                />
                <Route
                  exact
                  path="/companyAttribute/add"
                  name="Company attribute add"
                  component={CompanyAttributeAdd}
                />
                <Route
                  exact
                  path="/companyAttribute/edit/:id"
                  name="Company attribute edit"
                  component={CompanyAttributeEdit}
                />
                <Route
                  exact
                  path="/unitsList"
                  name="Units list"
                  component={UnitsList}
                />
                <Route
                  exact
                  path="/unit/add"
                  name="Unit add"
                  component={UnitAdd}
                />
                <Route
                  exact
                  path="/unit/edit/:id"
                  name="Unit edit"
                  component={UnitEdit}
                />
                <Route
                  exact
                  path="/companiesList"
                  name="Companies list"
                  component={CompaniesList}
                />
                <Route
                  exact
                  path="/companiesList/:p,:nop"
                  name="Companies list"
                  component={CompaniesList}
                />
                <Route
                  exact
                  path="/company/add"
                  name="Company add"
                  component={CompanyAdd}
                />
                <Route
                  exact
                  path="/company/edit/:id"
                  name="Company edit"
                  component={CompanyEdit}
                />
                <Route
                  exact
                  path="/imapsList"
                  name="IMaps list"
                  component={ImapsList}
                />
                <Route
                  exact
                  path="/imap/add"
                  name="IMap add"
                  component={ImapAdd}
                />
                <Route
                  exact
                  path="/imap/edit/:id"
                  name="IMap edit"
                  component={ImapEdit}
                />
                <Route
                  exact
                  path="/rolesList"
                  name="Roles list"
                  component={RolesList}
                />
                <Route
                  exact
                  path="/role/add"
                  name="Role add"
                  component={RoleAdd}
                />
                <Route
                  exact
                  path="/role/edit/:id"
                  name="Role edit"
                  component={RoleEdit}
                />
                <Route
                  exact
                  path="/triggersList"
                  name="Triggers list"
                  component={TriggersList}
                />
                <Route
                  exact
                  path="/trigger/add"
                  name="Trigger add"
                  component={TriggerAdd}
                />
                <Route
                  exact
                  path="/trigger/edit/:id"
                  name="Trigger edit"
                  component={TriggerEdit}
                />
                <Route
                  exact
                  path="/automaticTasksList"
                  name="Automatic tasks list"
                  component={AutomaticTasksList}
                />
                <Route
                  exact
                  path="/automaticTask/add"
                  name="Automatic task add"
                  component={AutomaticTaskAdd}
                />
                <Route
                  exact
                  path="/automaticTask/edit/:id"
                  name="Automatic task edit"
                  component={AutomaticTaskEdit}
                />
                <Route
                  exact
                  path="/smtpsList"
                  name="SMTP list"
                  component={SMTPsList}
                />
                <Route
                  exact
                  path="/smtp/add"
                  name="SMTP add"
                  component={SMTPAdd}
                />
                <Route
                  exact
                  path="/smtp/edit/:id"
                  name="SMTP edit"
                  component={SMTPEdit}
                />
                <Route
                  exact
                  path="/statusesList"
                  name="Statuses list"
                  component={StatusesList}
                />
                <Route
                  exact
                  path="/status/add"
                  name="Status add"
                  component={StatusAdd}
                />
                <Route
                  exact
                  path="/status/edit/:id"
                  name="Status edit"
                  component={StatusEdit}
                />
                <Route
                  exact
                  path="/messages/:page,:count"
                  name="Message"
                  component={Messages}
                />
                <Route
                  exact
                  path="/messages"
                  name="Messages"
                  component={Messages}
                />
                <Route
                  exact
                  path="/mytasks"
                  name="MyTasks"
                  component={MyTasks}
                />
                <Route
                  exact
                  path="/project/add"
                  name="Project add"
                  component={ProjectAdd}
                />
                <Route
                  exact
                  path="/project/:projectID"
                  name="Project task list"
                  component={Project}
                />
                <Route
                  exact
                  path="/project/:projectID/:page,:count"
                  name="Project task list"
                  component={Project}
                />
                <Route
                  exact
                  path="/project/info/:id"
                  name="Project info"
                  component={ProjectInfo}
                />
                <Route
                  exact
                  path="/project/edit/:id"
                  name="Project edit"
                  component={ProjectEdit}
                />
                <Route
                  exact
                  path="/tag/add"
                  name="Tag add"
                  component={TagAdd}
                />
                <Route
                  exact
                  path="/tag/edit/:id"
                  name="Tag edit"
                  component={TagEdit}
                />
                <Route
                  exact
                  path="/tag/:tagID/project/:projectID"
                  name="Tag task list"
                  component={Filter}
                />
                <Route
                  exact
                  path="/tag/:tagID/project/:projectID/:page,:count"
                  name="Tag task list"
                  component={Filter}
                />
                <Route
                  exact
                  path="/tag/:y/project/:x/task/view/:taskID"
                  name="View task"
                  component={ViewTask}
                  />
                <Route
                  exact
                  path="/tag/:y/project/:x/task/edit/:taskID"
                  name="Tag task list"
                  component={EditTask}
                />
                <Route
                  exact
                  path="/tag/:tagID/project/:projectID/:page,:count/task/view/:taskID"
                  name="Tripod filter"
                  component={Filter}
                />
                <Route
                  exact
                  path="/tag/:tagID/project/:projectID/:page,:count/task/edit/:taskID"
                  name="Tripod filter"
                  component={Filter}
                />
                <Route
                  exact
                  path="/task/view/:taskID"
                  name="Task edit"
                  component={ViewTask}
                />
                <Route
                  exact
                  path="/task/edit/:taskID"
                  name="Task edit"
                  component={EditTask}
                />
                <Route
                  exact
                  path="/filter/:y/project/:x/task/view/:taskID"
                  name="View task"
                  component={ViewTask}
                />
                <Route
                  exact
                  path="/filter/:y/project/:x/task/edit/:taskID"
                  name="Edit task"
                  component={EditTask}
                />
                <Route
                  exact
                  path="/filter/:id/project/:projectID/:page,:count/task/view/:taskID"
                  name="Edit task"
                  component={Filter}
                />
                <Route
                  exact
                  path="/filter/:id/project/:projectID/:page,:count/task/edit/:taskID"
                  name="Edit task"
                  component={Filter}
                />
                <Route
                  exact
                  path="/task/add"
                  name="Add task"
                  component={AddTask}
                />
                <Route
                  exact
                  path="/filter/:id/project/:projectID/:page,:count"
                  name="Filter"
                  component={Filter}
                />
                <Route
                  exact
                  path="/filter/:id/project/:projectID"
                  name="Filter"
                  component={Filter}
                />

                <Route
                  exact
                  path="/report/filter"
                  name="Report Filter"
                  component={ReportFilter}
                />
                <Route
                  exact
                  path="/report/:id"
                  name="Report View"
                  component={ReportView}
                />

              </Switch>
            </Container>
          </main>
        }
          <Aside />
        </div>
      </div>
    );
  }
}

export default Full;
