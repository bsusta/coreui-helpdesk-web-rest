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
      <header className="app-header navbar" style={{ maxWidth: 1920 }}>
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon" />
        </NavbarToggler>
        <NavbarToggler style={{ color: "white" }}>LanHelpdesk</NavbarToggler>

        <NavbarToggler className="d-md-down-none">
          <InputGroup>
            <Input
              type="text"
              id="input1-group1"
              name="input1-group1"
              placeholder="Search task"
              style={{ borderRight: "0", width: 300, marginLeft: 90 }}
            />
            <InputGroupAddon style={{ background: "white", borderLeft: "" }}>
              <i className="fa fa-search" />
            </InputGroupAddon>
          </InputGroup>
        </NavbarToggler>
        <button
          type="button"
          className="btn btn-link"
          style={{ color: "white" }}
          onClick={()=>this.props.history.push('/task/add')}
        >
          Add task
        </button>
        <Nav className="ml-auto" navbar>
          <MessagesDropdown />
        </Nav>




        <NavbarToggler
          className="d-md-down-none"
        >
        <a
          className="d-md-down-none"
          href="#/settings"
        >
        <i className="icon-settings" style={{ color: "white", marginRight: 20 }} />
      </a>
    </NavbarToggler>

        {/*
        <NavbarToggler
          className="d-md-down-none"
          style={{ color: "white", marginRight: 20 }}
          onClick={() => this.props.history.push("/settings")}
        >
          <i className="icon-settings" />
        </NavbarToggler>*/}
      </header>
    );
  }
}

export default Header;
