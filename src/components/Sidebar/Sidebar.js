import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Badge, Nav, NavItem, NavLink as RsNavLink,FormGroup, InputGroup } from "reactstrap";
import classNames from "classnames";
import { connect } from "react-redux";
import { getSidebar } from "../../redux/actions";
import i18n from 'i18next';
import Select from "react-select";
import colors from '../../../scss/colors';

class Sidebar extends Component {
  constructor(props){
    super(props);
    //load sidebar and set it to automaticly load after X ms
    let intervalID = window.setInterval(()=>this.props.getSidebar(this.props.date,this.props.user.user_role.acl,this.props.token), 4500);
    let url = this.props.history.location.pathname;
    let projectID;
    let secondID;
    if(url.includes('/project/' && !url.includes('/project/edit'))){
      projectID = url.substring(url.indexOf('/project/')+9,url.length);
      projectID = projectID.substring(0,projectID.indexOf('/'));
      secondID = url.substring(0,url.indexOf('/project/'));
      secondID = secondID.substring(secondID.lastIndexOf('/')+1,secondID.length);
    }
    let allProjects = [{value:'all',label:'All',name:'All',id:'all'}].concat(this.props.archived).concat(this.props.projects).map(proj => {
      proj.label = proj.name;
      proj.value = proj.id;
      return proj;
    });
    this.state={
      intervalID,
      project:projectID?allProjects.find((item)=>item.value.toString()===projectID):allProjects[0],
      archived:false,
      filterSelected:url.includes('/filter/')?secondID:null,
      tagSelected:url.includes('/tag/')?secondID:null,
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

  activeRoute(routeName, url) {
    return url.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  render() {
    const activeRoute = this.activeRoute;
    const handleClick = this.handleClick;
    const url = this.props.history.location.pathname;
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

    // sidebar-nav root
    return (
      <div className="sidebar fontFamilySidebar">
        <nav className="sidebar-nav">
          <div className="sidebarProjectSelector">
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
                    this.props.history.push('/filter/'+this.state.filterSelected+'/project/'+e.value+'/1,'+this.props.body.count);
                  }else if(this.state.tagSelected){
                    this.props.history.push('/tag/'+this.state.tagSelected+'/project/'+e.value+'/1,'+this.props.body.count);
                  }
                }}
                />
            </InputGroup>
          </FormGroup>
          <div className="form-group form-check checkbox">
              <input
                type="checkbox"
                id="archived"
                className="form-check-input"
                checked={this.state.archived}
                onChange={() => {
                  this.setState({ archived: !this.state.archived,project:{value:'all',label:'All'} });
                  if(this.state.filterSelected){
                    this.props.history.push('/filter/'+this.state.filterSelected+'/project/all'+'/1,'+this.props.body.count);
                  }else if(this.state.tagSelected){
                    this.props.history.push('/tag/'+this.state.tagSelected+'/project/all'+'/1,'+this.props.body.count);
                  }
                }}
                />
              <label className="form-check-label" htmlFor="archived">
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
              </NavItem>
            }
              {this.state.project.value!=='all'&& !this.props.projects.concat(this.props.archived).find((item)=>item.id===this.state.project.value).canEdit &&
                <NavItem key={'edit'+this.state.project.value} className={classNames(undefined)}>
                  <NavLink to={'/project/info/'+this.state.project.value}
                    activeClassName="active activeNavItem fontBold"
                    className={classNames("nav-link", "")} style={{color:'black'}}>
                    {i18n.t('viewProject')}
                  </NavLink>
                </NavItem>
              }
            <li key={this.props.sidebar.filters.key} className={activeRoute('filter', url) + (this.props.sidebar.filters.open?" open ": "")}>
              <a
                className="nav-link nav-dropdown-toggle"
                href="#"
                onClick={handleClick.bind(this)}
                >
                {this.props.sidebar.filters.icon && <i className={this.props.sidebar.filters.icon} />}

                {i18n.t('filters')}
              </a>
              <ul className="nav-dropdown-items">
                {
                  this.props.sidebar.filters.children.map((item,index)=>

                  <NavItem key={index} className={classNames(item.class)}>
                    <NavLink
                      onClick={()=>this.setState({filterSelected:item.id,tagSelected:null})}
                      to={item.url ? item.url+'/project/'+this.state.project.value : ""}
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
                      {item.name}
                      </span>
                      {badge(item.badge)}
                    </NavLink>
                  </NavItem>
                )}
              </ul>
            </li>

              <li key={this.props.sidebar.tags.key} className={activeRoute('tag', url) + (this.props.sidebar.tags.open?" open ": "")}>
                <a
                  className="nav-link nav-dropdown-toggle"
                  href="#"
                  onClick={handleClick.bind(this)}
                  >
                  {this.props.sidebar.tags.icon && <i className={this.props.sidebar.tags.icon} />}

                  {i18n.t('tags')}
                </a>
                <ul className="nav-dropdown-items">
                    {
                      this.props.sidebar.tags.children.map((item,index)=>

                      <NavItem key={index} className={classNames(item.class)}>
                        <NavLink
                          onClick={()=>{this.setState({filterSelected:null,tagSelected:item.id});}}
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
                          {item.name}
                          </span>
                          {badge(item.badge)}
                        </NavLink>
                      </NavItem>
                    )}
                    <NavItem key={'addTag'} className={classNames(undefined)}>
                      <NavLink
                        onClick={()=>this.setState({filterSelected:null,tagSelected:null})}
                        to={"/tag/add"}
                        className={classNames("nav-link","")}
                        activeClassName="active activeNavItem fontBold">
                        <i className={'fa fa-plus sidebarIcon'} />
                        <span className="sidebarItem">
                        {i18n.t('tag')}
                        </span>
                      </NavLink>
                    </NavItem>
                </ul>
              </li>

                {this.props.user.user_role.acl.includes('report_filters') && <li key={this.props.sidebar.reports.key} className={activeRoute('report', url) + (this.props.sidebar.reports.open ? " open ": "")}>
                    <a
                      className="nav-link nav-dropdown-toggle"
                      href="#"
                      onClick={handleClick.bind(this)}
                      >
                      {this.props.sidebar.reports.icon && <i className={this.props.sidebar.reports.icon} />}

                      {i18n.t('reports')}
                    </a>
                    <ul className="nav-dropdown-items">
                      {
                        this.props.sidebar.reports.children.map((item,index)=>

                        <NavItem key={index} className={classNames(item.class)}>
                          <NavLink
                            onClick={()=>{}}
                            to={'/report/'+item.id}
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
                            {item.name}
                            </span>
                            {badge(item.badge)}
                          </NavLink>
                        </NavItem>
                      )}
                      <NavItem key={'addReport'} className={classNames(undefined)}>
                        <NavLink
                          onClick={()=>this.setState({filterSelected:null,tagSelected:null})}
                          to={"/report/add"}
                          className={classNames("nav-link","")}
                          activeClassName="active activeNavItem fontBold">
                          <i className={'fa fa-plus sidebarIcon'} />
                          <span className="sidebarItem">
                          {i18n.t('report')}
                          </span>
                        </NavLink>
                      </NavItem>
                    </ul>
                  </li>}
                  {/*FAKE FILTER*/}
                <li key="reports" className={activeRoute('tag', url)}>
                    <a
                      className="nav-link nav-dropdown-toggle"
                      href="#"
                      onClick={handleClick.bind(this)}
                      >
                      <i className="fa fa-filter" />
                      {i18n.t('reports')}
                    </a>
                    <ul className="nav-dropdown-items">
                      <NavItem key={'reportFilter'} className={classNames(undefined)}>
                        <NavLink
                          onClick={()=>this.setState({filterSelected:null,tagSelected:null})}
                          to={"/reportTest/filter"}
                          className={classNames("nav-link","")}
                          activeClassName="active activeNavItem fontBold">
                          <i className={'fa fa-plus sidebarIcon'} />
                          <span className="sidebarItem">
                          {i18n.t('report')}
                          </span>
                        </NavLink>
                      </NavItem>
                    </ul>
                    <ul className="nav-dropdown-items">
                      <NavItem key={'someFilter'} className={classNames(undefined)}>
                        <NavLink
                          onClick={()=>this.setState({filterSelected:null,tagSelected:null})}
                          to={"/reportTest/1"}
                          className={classNames("nav-link","")}
                          activeClassName="active activeNavItem fontBold">
                          <span className="sidebarItem">
                          {"Some report"}
                          </span>
                        </NavLink>
                      </NavItem>
                    </ul>
                  </li>
          </Nav>
        }
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({ sidebarReducer, login, filtersReducer }) => {
  const { sidebar,date } = sidebarReducer;
  const { token, user } = login;
  const {body} =filtersReducer;
  let projects = sidebar?sidebar.projects.children:[];
  let archived = sidebar?sidebar.archived.children:[];
  return { sidebar,date, token, user, projects,archived, body };
};

export default connect(mapStateToProps, { getSidebar })(Sidebar);
