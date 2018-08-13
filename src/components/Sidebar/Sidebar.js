import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Badge, Nav, NavItem, NavLink as RsNavLink,FormGroup, InputGroup } from "reactstrap";
import classNames from "classnames";
import { connect } from "react-redux";
import nav from "./_nav";
import SidebarFooter from "./../SidebarFooter";
import SidebarForm from "./../SidebarForm";
import SidebarHeader from "./../SidebarHeader";
import SidebarMinimizer from "./../SidebarMinimizer";
import { getSidebar } from "../../redux/actions";
import i18n from 'i18next';
import Select from "react-select";
import colors from '../../../scss/colors';

class Sidebar extends Component {
  constructor(props){
    super(props);
    //load sidebar and set it to automaticly load after X ms
    this.props.getSidebar(this.props.date,this.props.user.user_role.acl,this.props.token);
    let intervalID = window.setInterval(()=>this.props.getSidebar(this.props.date,this.props.user.user_role.acl,this.props.token), 4500);
    this.state={
      intervalID,
      project:{value:'all',label:'All'},
      archived:false,
      filterSelected:null,
      tagSelected:null
    }
  }


  //when logging out, stop the updates
  componentWillUnmount(){
    clearInterval(this.state.intervalID);
  }

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle("open");
  }

  activeRoute(routeName, props) {
    // return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
    return props.location.pathname.indexOf(routeName) > -1
      ? "nav-item nav-dropdown"
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
          <Badge className={classes+" sidebarBadges"} color={badge.variant}>
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
        link: classNames("nav-link", item.class ? item.class : ""),
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
            {item.icon && <i className={item.icon+ ' sidebarIcon'} />}
            <span
              className="sidebarItem"
              style={
                item.color
                  ? {
                      backgroundColor: item.color.includes("#")
                        ? item.color
                        : "#" + item.color
                    }
                  : {}
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
        <li key={key} className={activeRoute(item.url, props) + (item.open?" open ": "") + " fontRegular sidebarSize"}>
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
          <div style={{padding:5}}>
          <FormGroup>
            <label htmlFor="project" className="input-label">{i18n.t('project')}</label>
            <InputGroup>
              <Select
                className="fullWidth"
                options={[{value:'all',label:'All'}].concat((this.state.archived?this.props.archived:this.props.projects).map(proj => {
                  proj.label = proj.name;
                  proj.value = proj.id;
                  return proj;
                }))}
                value={this.state.project}
                onChange={e => {
                  this.setState({project:e});
                  if(this.state.filterSelected){
                    this.props.history.push('/filter/'+this.state.filterSelected+'/project/'+e.value);
                  }else if(this.state.tagSelected){
                    this.props.history.push('/tag/'+this.state.tagSelected+'/project/'+e.value);
                  }
                }}
                />
            </InputGroup>
          </FormGroup>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                checked={this.state.archived}
                onChange={() => {
                  this.setState({ archived: !this.state.archived,project:{value:'all',label:'All'} });
                }}
                className="form-check-input"
              />
            {i18n.t('archived')}
            </label>
          </div>
        </div>
        {
          this.props.sidebar &&
          <Nav>
            {this.state.project.value!=='all'&& this.props.projects.concat(this.props.archived).find((item)=>item.id===this.state.project.value).canEdit &&
              <NavItem key={'edit'+this.state.project.value} className={classNames(undefined)}>
                <NavLink to={'/project/edit/'+this.state.project.value}
                  activeClassName="active activeNavItem fontBold"
                  className={classNames("nav-link", "")} style={{color:'black'}}>
                  {i18n.t('editProject')}
                </NavLink>
              </NavItem>}
              {this.state.project.value!=='all'&& !this.props.projects.concat(this.props.archived).find((item)=>item.id===this.state.project.value).canEdit &&
                <NavItem key={'edit'+this.state.project.value} className={classNames(undefined)}>
                  <NavLink to={'/project/info/'+this.state.project.value}
                    activeClassName="active activeNavItem fontBold"
                    className={classNames("nav-link", "")} style={{color:'black'}}>
                    {i18n.t('viewProject')}
                  </NavLink>
                </NavItem>}
            <li key={this.props.sidebar.filters.key} className={activeRoute(this.props.sidebar.filters.url, props) + (this.props.sidebar.filters.open?" open ": "") + " fontRegular sidebarSize"}>
                <a
                  className="nav-link nav-dropdown-toggle"
                  href="#"
                  onClick={handleClick.bind(this)}
                  >
                  {this.props.sidebar.filters.icon && <i className={this.props.sidebar.filters.icon} />}

                  {i18n.t(this.props.sidebar.filters.name)}
                </a>
                <ul className="nav-dropdown-items fontLight sidebarSize">
                  {
                    this.props.sidebar.filters.children.map((item,index)=>

                    <NavItem key={index} className={classNames(item.class)}>
                      <NavLink
                        onClick={()=>this.setState({filterSelected:item.id,tagSelected:null})}
                        to={item.url ? item.url+'/project/'+this.state.project.value  : ""}
                        className={classNames("nav-link",item.variant ? `nav-link-${item.variant}` : "")}
                        activeClassName="active activeNavItem fontBold">
                        {item.icon && <i className={item.icon+ ' sidebarIcon'} />}
                        <span
                          className="sidebarItem"
                          style={
                            item.color
                              ? {
                                  backgroundColor: item.color.includes("#")
                                    ? item.color
                                    : "#" + item.color
                                }
                              : {}
                          }
                        >
                        {i18n.t(item.name)}
                        </span>
                        {badge(item.badge)}
                      </NavLink>
                    </NavItem>
                  )}
                </ul>
              </li>
              <li key={this.props.sidebar.tags.key} className={activeRoute(this.props.sidebar.tags.url, props) + (this.props.sidebar.tags.open?" open ": "") + " fontRegular sidebarSize"}>
                  <a
                    className="nav-link nav-dropdown-toggle"
                    href="#"
                    onClick={handleClick.bind(this)}
                    >
                    {this.props.sidebar.tags.icon && <i className={this.props.sidebar.tags.icon} />}

                    {i18n.t(this.props.sidebar.tags.name)}
                  </a>
                  <ul className="nav-dropdown-items fontLight sidebarSize">
                    {
                      this.props.sidebar.tags.children.map((item,index)=>

                      <NavItem key={index} className={classNames(item.class)}>
                        <NavLink
                          onClick={()=>this.setState({filterSelected:null,tagSelected:item.id})}
                          to={item.url ? item.url+'/project/'+this.state.project.value  : ""}
                          className={classNames("nav-link",item.variant ? `nav-link-${item.variant}` : "")}
                          activeClassName="active activeNavItem fontBold">
                          {item.icon && <i className={item.icon+ ' sidebarIcon'} />}
                          <span
                            className="sidebarItem"
                            style={
                              item.color
                                ? {
                                    backgroundColor: item.color.includes("#")
                                      ? item.color
                                      : "#" + item.color,
                                      color:'white',
                                      paddingLeft:5,
                                      paddingRight:5,
                                      fontWeight:'bold',
                                      borderRadius:3
                                  }
                                : {}
                            }
                          >
                          {i18n.t(item.name)}
                          </span>
                          {badge(item.badge)}
                        </NavLink>
                      </NavItem>
                    )}
                  </ul>
                </li>
          </Nav>
        }
        </nav>
        <SidebarFooter />
        <SidebarMinimizer />
      </div>
    );
  }
}

const mapStateToProps = ({ sidebarReducer, login }) => {
  const { sidebar,date } = sidebarReducer;
  const { token, user } = login;
  let projects = sidebar?sidebar.projects.children:[];
  let archived = sidebar?sidebar.archived.children:[];
  return { sidebar,date, token, user, projects,archived };
};

export default connect(mapStateToProps, { getSidebar })(Sidebar);
