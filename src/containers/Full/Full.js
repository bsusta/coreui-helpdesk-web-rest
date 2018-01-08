import React, { Component } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import Header from "../../components/Header/";
import Sidebar from "../../components/Sidebar/";
import Breadcrumb from "../../components/Breadcrumb/";
import Aside from "../../components/Aside/";
import Footer from "../../components/Footer/";

import Dashboard from "../../views/Dashboard/";
import Settings from "../../views/Settings/";
import NewTask from "../../views/newTask/";
import UnitsList from "../../views/settings/unitsList";
import UnitAdd from "../../views/settings/unitAdd";
import UnitEdit from "../../views/settings/unitEdit";
import UsersList from "../../views/settings/usersList";
import UserAdd from "../../views/settings/userAdd";
import UserEdit from "../../views/settings/userEdit";
import UserAttributesList from "../../views/settings/userAttributesList";
import UserAttributeAdd from "../../views/settings/userAttributeAdd";
import UserAttributeEdit from "../../views/settings/userAttributeEdit";
import MyTasks from "../../views/MyTasks";
import Project from "../../views/Project";
import ProjectInfo from "../../views/ProjectInfo";
import ProjectEdit from "../../views/ProjectEdit";
import ProjectAdd from "../../views/ProjectAdd";
import EditTask from "../../views/EditTask";
import SecondEditTask from "../../views/SecondEditTask";
import TrojStlpec from "../../views/TrojStlpec";
import Messages from "../../views/Messages";

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header history={this.props.history} />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main" style={{ backgroundColor: "white" }}>
            {/*<Breadcrumb />*/}
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
                  path="/userAttributesList"
                  name="Users attributes list"
                  component={UserAttributesList}
                />
                <Route
                  exact
                  path="/userAttribute/add"
                  name="User attribute add"
                  component={UserAttributeAdd}
                />
                <Route
                  exact
                  path="/userAttribute/edit/:id"
                  name="User attribute edit"
                  component={UserAttributeEdit}
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
                  path="/project"
                  name="Project"
                  component={Project}
                />
                <Route
                  exact
                  path="/project/add"
                  name="Project add"
                  component={ProjectAdd}
                />
                <Route
                  exact
                  path="/project/:id"
                  name="Project info"
                  component={ProjectInfo}
                />
                <Route
                  exact
                  path="/project/:id/edit"
                  name="Project edit"
                  component={ProjectEdit}
                />
                <Route
                  exact
                  path="/edittask"
                  name="EditTask"
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
