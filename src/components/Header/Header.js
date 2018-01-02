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

class Header extends Component {
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
      <header className="app-header navbar">
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
        <NavbarToggler className="d-md-down-none mr-auto">
          <button
            type="button"
            className="btn btn-link"
            onClick={() => this.props.history.push("/newTask")}
          >
            Add task
          </button>
        </NavbarToggler>
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
