import React, { Component } from "react";
import { Nav, NavItem, NavbarToggler, NavbarBrand } from "reactstrap";
import SidebarMinimizer from "./../SidebarMinimizer";

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
        <NavbarToggler className="d-md-down-none mr-auto">
          <button
            type="button"
            class="btn btn-link"
            onClick={() => this.props.history.push("./newTask")}
          >
            Add task
          </button>
        </NavbarToggler>
        <NavbarToggler
          className="d-md-down-none"
          onClick={() => this.props.history.push("./settings")}
        >
          <i className="icon-settings" />
        </NavbarToggler>
        <NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>
          <i className="fa fa-filter" />
        </NavbarToggler>
      </header>
    );
  }
}

export default Header;
