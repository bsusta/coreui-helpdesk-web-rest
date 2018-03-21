import React, { Component } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import Header from "./components/Header/";
import Sidebar from "./components/Sidebar/";
import Aside from "./components/Aside/";

import Dashboard from "./views/Dashboard/";
import Settings from "./views/Settings/";
import NewTask from "./views/newTask/";
import UnitsList from "./views/settings/unitsList";
import UnitAdd from "./views/settings/unitAdd";
import UnitEdit from "./views/settings/unitEdit";
import UsersList from "./views/settings/usersList";
import UserAdd from "./views/settings/userAdd";
import UserEdit from "./views/settings/userEdit";
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
import MyTasks from "./views/MyTasks";
import Project from "./views/Project";
import ProjectInfo from "./views/ProjectInfo";
import ProjectEdit from "./views/ProjectEdit";
import ProjectAdd from "./views/ProjectAdd";
import Tag from "./views/Tag";
import TagAdd from "./views/TagAdd";
import TagEdit from "./views/TagEdit";
import TagTasks from "./views/TagTasks";
import EditTask from "./views/EditTask";
import SecondEditTask from "./views/SecondEditTask";
import TrojStlpec from "./views/TrojStlpec";
import Messages from "./views/Messages";
import Filter from "./views/Filter";
class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header history={this.props.history} />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main" style={{ backgroundColor: "white" }}>
            <Container fluid style={{ padding: 0 }}>
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
                  path="/messages/:id"
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
                  path="/tag/:id"
                  name="Tag Tasks"
                  component={TagTasks}
                />
              <Route
                exact
                path="/project/add"
                name="Project add"
                component={ProjectAdd}
                />
                <Route
                  exact
                  path="/archived/:id"
                  name="Archived"
                  component={Project}
                />
                <Route
                  exact
                  path="/project/:id"
                  name="Projects"
                  component={Project}
                />
                <Route
                  exact
                  path="/project/:id/:page,:count"
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
                    path="/tag/:id"
                    name="Tag"
                    component={Tag}
                  />
                  <Route
                    exact
                    path="/tag/edit/:id"
                    name="Tag edit"
                    component={TagEdit}
                  />
                <Route
                  exact
                  path="/task/edit/:id"
                  name="Edit task"
                  component={EditTask}
                />
                <Route
                  exact
                  path="/secondEditTask"
                  name="Second edit task"
                  component={SecondEditTask}
                />
                <Route
                  exact
                  path="/trojstlpec"
                  name="TrojStlpec"
                  component={TrojStlpec}
                />
                <Route
                  exact
                  path="/filter/:id/:page,:count"
                  name="Filtered task list"
                  component={Filter}
                />
                <Route
                  exact
                  path="/filter/:id"
                  name="Filtered task list"
                  component={Filter}
                />

              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
      </div>
    );
  }
}

export default Full;
