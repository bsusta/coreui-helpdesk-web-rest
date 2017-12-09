import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';
import Settings from '../../views/Settings/';
import NewTask from '../../views/newTask/';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header history={this.props.history} />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route exact path="/dashboard" name="Dashboard" component={Dashboard}/>
                  <Route exact path="/settings" name="Settings" component={Settings}/>
                    <Route exact path="/newTask" name="New task" component={NewTask}/>
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
