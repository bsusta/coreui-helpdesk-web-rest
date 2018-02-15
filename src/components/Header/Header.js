import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavbarToggler,
  NavbarBrand,
  InputGroup,
  InputGroupAddon,
  Input
} from "reactstrap";
import SidebarMinimizer from "./../SidebarMinimizer";
import MessagesDropdown from "./MessagesDropdown";
import NewTask from "../../views/newTask";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingTask: false
    };
    this.addTaskToggle.bind(this);
  }

  addTaskToggle() {
    this.setState({ addingTask: !this.state.addingTask });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle("sidebar-hidden");
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle("sidebar-minimized");
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle("sidebar-mobile-show");
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle("aside-menu-hidden");
  }

  render() {
    return (
      <header className="app-header navbar" style={{ maxWidth: 1920 }}>
        <NewTask
          toggle={this.addTaskToggle.bind(this)}
          open={this.state.addingTask}
        />
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon" />
        </NavbarToggler>
        <NavbarBrand href="#" />
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon" />
        </NavbarToggler>

        <NavbarToggler className="d-md-down-none ml-4">
          <InputGroup>
            <Input
              type="text"
              id="input1-group1"
              name="input1-group1"
              placeholder="Search task"
              style={{ borderRight: "0" }}
            />
            <InputGroupAddon style={{ background: "white", borderLeft: "" }}>
              <i className="fa fa-search" />
            </InputGroupAddon>
          </InputGroup>
        </NavbarToggler>
          <button
            type="button"
            className="btn btn-link"
            onClick={this.addTaskToggle.bind(this)}
          >
            Add task
          </button>
        <Nav className="ml-auto" navbar>
          <MessagesDropdown />
        </Nav>

        <NavbarToggler
          className="d-md-down-none"
          onClick={() => this.props.history.push("/settings")}
        >
          <i className="icon-settings" />
        </NavbarToggler>
      </header>
    );
  }
}

export default Header;
