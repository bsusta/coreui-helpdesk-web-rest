import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Badge, Nav, NavItem, NavLink as RsNavLink } from "reactstrap";
import classNames from "classnames";
import { connect } from "react-redux";

import nav from "./_nav";
import SidebarFooter from "./../SidebarFooter";
import SidebarForm from "./../SidebarForm";
import SidebarHeader from "./../SidebarHeader";
import SidebarMinimizer from "./../SidebarMinimizer";
import { getSidebar } from "../../redux/actions";
import i18n from 'i18next';
import colors from '../../../scss/colors';

class Sidebar extends Component {
  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle("open");
  }
  componentWillMount() {
    this.props.getSidebar(this.props.token);
  }

  activeRoute(routeName, props) {
    // return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
    return props.location.pathname.indexOf(routeName) > -1
      ? "nav-item nav-dropdown open"
      : "nav-item nav-dropdown";
  }

  // todo Sidebar nav secondLevel
  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

  render() {
    const props = this.props;
    const activeRoute = this.activeRoute;
    const handleClick = this.handleClick;

    // badge addon to NavItem
    const badge = badge => {
      if (badge) {
        const classes = classNames(badge.class);
        return (
          <Badge className={classes} color={badge.variant}>
            {badge.text}
          </Badge>
        );
      }
    };

    // simple wrapper for nav-title item
    const wrapper = item => {
      return item.wrapper && item.wrapper.element
        ? React.createElement(
            item.wrapper.element,
            item.wrapper.attributes,
            item.name
          )
        : item.name;
    };

    // nav list section title
    const title = (title, key) => {
      const classes = classNames("nav-title", title.class);
      return (
        <li key={key} className={classes}>
          {wrapper(title)}{" "}
        </li>
      );
    };

    // nav list divider
    const divider = (divider, key) => {
      const classes = classNames("divider", divider.class);
      return <li key={key} className={classes} />;
    };

    // nav label with nav link
    const navLabel = (item, key) => {
      const classes = {
        item: classNames("hidden-cn", item.class),
        link: classNames("nav-label", item.class ? item.class : ""),
        icon: classNames(
          !item.icon ? "fa fa-circle" : item.icon,
          item.label.variant ? `text-${item.label.variant}` : "",
          item.label.class ? item.label.class : ""
        )
      };
      return navLink(item, key, classes);
    };

    // nav item with nav link
    const navItem = (item, key) => {
      const classes = {
        item: classNames(item.class),
        link: classNames(
          "nav-link",
          item.variant ? `nav-link-${item.variant}` : ""
        ),
        icon: classNames(item.icon)
      };
      return navLink(item, key, classes);
    };

    // nav link
    const navLink = (item, key, classes) => {
      const url = item.url ? item.url : "";
      return (
        <NavItem key={key} className={classes.item}>
          <NavLink to={url} className={classes.link} activeClassName="active activeNavItem fontBold">
            {item.icon && <i className={item.icon} />}
            <span
              style={
                item.color
                  ? {
                      padding: 4,
                      color: "white",
                      backgroundColor: item.color.includes("#")
                        ? item.color
                        : "#" + item.color
                    }
                  : {color:colors.darkGrey}
              }
            >
            {i18n.t(item.name)}
            </span>
            {badge(item.badge)}
          </NavLink>
        </NavItem>
      );
    };

    // nav dropdown
    const navDropdown = (item, key) => {
      return (
        <li key={key} className={activeRoute(item.url, props) + " open fontRegular sidebarSize"}>
          <a
            className="nav-link nav-dropdown-toggle"
            href="#"
            onClick={handleClick.bind(this)}
          >
            {item.icon && <i className={item.icon} />}

            {i18n.t(item.name)}
          </a>
          <ul className="nav-dropdown-items fontLight sidebarSize">{navList(item.children)}</ul>
        </li>
      );
    };

    // nav type
    const navType = (item, idx) =>
      item.title
        ? title(item, idx)
        : item.divider
          ? divider(item, idx)
          : item.label
            ? navLabel(item, idx)
            : item.children ? navDropdown(item, idx) : navItem(item, idx);

    // nav list
    const navList = items => {
      return items.map((item, index) => navType(item, index));
    };

    const isExternal = url => {
      const link = url ? url.substring(0, 4) : "";
      return link === "http";
    };

    // sidebar-nav root
    return (
      <div className="sidebar">
        <SidebarHeader />
        <SidebarForm />
        <nav className="sidebar-nav">
          <Nav>{navList(this.props.sidebar.concat(nav.items))}</Nav>
        </nav>
        <SidebarFooter />
        <SidebarMinimizer />
      </div>
    );
  }
}

const mapStateToProps = ({ sidebarReducer, login }) => {
  const { sidebar } = sidebarReducer;
  const { token } = login;
  return { sidebar, token };
};

export default connect(mapStateToProps, { getSidebar })(Sidebar);
