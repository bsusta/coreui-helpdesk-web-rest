import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Badge, Nav, NavItem, NavLink as RsNavLink,FormGroup, InputGroup } from "reactstrap";
import classNames from "classnames";
import { connect } from "react-redux";
import { getSidebar, setGlobalSearch } from "../../redux/actions";
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
    if(url.includes('/project/') && !url.includes('/project/edit')) {
      projectID = url.substring(url.indexOf('/project/')+9,url.length);
      projectID = projectID.substring(0,projectID.indexOf('/'));
      secondID = url.substring(0,url.indexOf('/project/'));
      secondID = secondID.substring(secondID.lastIndexOf('/')+1,secondID.length);
    }
    let allProjects = [{value:'all',label:'Dashboard',name:'Dashboard',id:'all'}].concat(this.props.projects).concat(this.props.archived).map(proj => {
      proj.label = proj.name;
      proj.value = proj.id;
      return proj;
    });
    this.state={
      intervalID,
      project:projectID?allProjects.find((item)=>item.value.toString()===projectID):allProjects[0],
      filterSelected:url.includes('/filter/')?secondID:null,
      tagSelected:url.includes('/tag/')?secondID:null,
      filtersOpened:this.props.sidebar.filters.open,
      archivedOpened:this.props.sidebar.archived.open,
      tagsOpened:this.props.sidebar.tags.open,
      reportsOpened:this.props.user.user_role.acl.includes('report_filters')?this.props.sidebar.reports.open:false,

    }
  }


  //when logging out, stop the updates
  componentWillUnmount(){
    clearInterval(this.state.intervalID);
  }

  render() {
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

    const customStyles = {
      singleValue: (provided, state) => {
        return { ...provided, marginLeft:30 };
      },
      indicatorSeparator:(provided, state) => {
        return { ...provided, width:0 };
      },
      control:(provided, state) => {
        return { ...provided, borderRadius:50, borderColor:'#6c757d' };
      },
      input:(provided, state) => {
        return { ...provided, marginLeft:30 };
      },
    }

    // sidebar-nav root
    return (
      <div className="sidebar fontFamilySidebar">
        <nav className="sidebar-nav">
          <div className="sidebarProjectSelector">
          <FormGroup>
            <label htmlFor="project" className="input-label menu-title">{i18n.t('project')}</label>
            <span style={{float:'right',cursor:'pointer'}} onClick={()=>this.props.history.push("/project/add")}>
              <i className={'fa fa-plus sidebarIcon'} style={{paddingRight:10}} />
            </span>
            <InputGroup>
              <Select
                className="fullWidth"
                options={(this.props.archived.some(item=>item.id===this.state.project.id)?[{value:'all',label:'Dashboard'},this.state.project]:[{value:'all',label:'Dashboard'}]).concat((this.props.projects).map(proj => {
                  proj.label = proj.name;
                  proj.value = proj.id;
                  return proj;
                }))}
                value={this.state.project}
                styles={customStyles}
                onChange={e => {
                  this.setState({project:e});
                  if(this.state.filterSelected){
                    this.props.history.push('/filter/'+this.state.filterSelected+'/project/'+e.value+'/1,'+this.props.body.count);
                  }else if(this.state.tagSelected){
                    this.props.history.push('/tag/'+this.state.tagSelected+'/project/'+e.value+'/1,'+this.props.body.count);
                  }
                }}
                components={{DropdownIndicator: ({ innerProps, isDisabled }) =>  <i className={'fa fa-file'} style={{position:'absolute', left:15}} /> }}
                />
            </InputGroup>
          </FormGroup>
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
            <li key={this.props.sidebar.filters.key} className={"nav-item nav-dropdown" + (this.state.filtersOpened?" open ": "")}>
                <a
                  className="nav-link nav-dropdown-toggle"
                  href="#"
                  onClick={(e)=>{e.preventDefault();}}
                  >
                  {this.props.sidebar.filters.icon && <i className={this.props.sidebar.filters.icon} />}
                  <span onClick={(e)=>{this.setState({filtersOpened:!this.state.filtersOpened})}}>
                    {i18n.t('filters')}
                  </span>
                  <span style={{float:'right',cursor:'pointer'}} onClick={()=>{this.props.setGlobalSearch(false); this.props.history.push("/filter/add"+'/project/'+this.state.project.value);}}>
                    <i className={'fa fa-plus sidebarIcon'} />
                  </span>
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

              <li key={this.props.sidebar.tags.key} className={"nav-item nav-dropdown" + (this.state.tagsOpened?" open ": "")}>
                <a
                  className="nav-link nav-dropdown-toggle"
                  href="#"
                  onClick={(e)=>{e.preventDefault();}}
                  >
                  {this.props.sidebar.tags.icon && <i className={this.props.sidebar.tags.icon} />}
                  <span onClick={(e)=>{e.preventDefault();this.setState({tagsOpened:!this.state.tagsOpened})}}>
                    {i18n.t('tags')}
                  </span>
                  <span style={{float:'right',cursor:'pointer'}} onClick={()=>this.props.history.push("/tag/add")}>
                    <i className={'fa fa-plus sidebarIcon'} />
                  </span>
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
                </ul>
              </li>

              {(this.state.project.value==='all'|| this.props.archived.some((item)=>item.id===this.state.project.value)) && <li key={this.props.sidebar.archived.key} className={"nav-item nav-dropdown" + (this.state.archivedOpened?" open ": "")}>
                  <a
                    className="nav-link nav-dropdown-toggle"
                    href="#"
                    onClick={(e)=>{e.preventDefault();}}
                    >
                    {this.props.sidebar.archived.icon && <i className={this.props.sidebar.archived.icon} />}
                    <span onClick={(e)=>{this.setState({archivedOpened:!this.state.archivedOpened})}}>
                      {i18n.t('archived')}
                    </span>
                  </a>
                <ul className="nav-dropdown-items">
                  {
                    this.props.archived.map((item,index)=>

                    <NavItem key={index} className={classNames(item.class)}>
                      <NavLink
                        onClick={()=>this.setState({project:{value:item.id,label:item.name}})}
                        to={
                          this.state.filterSelected?'/filter/'+this.state.filterSelected+'/project/'+item.id:(
                            this.state.tagSelected?'/tag/'+this.state.tagSelected+'/project/'+item.id:url
                          )
                        }
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
              </li>}

                {this.props.user.user_role.acl.includes('report_filters') && this.state.project.value==='all' && <li key={this.props.sidebar.reports.key} className={"nav-item nav-dropdown" + (this.state.reportsOpened ? " open ": "")}>
                    <a
                      className="nav-link nav-dropdown-toggle"
                      href="#"
                      onClick={(e)=>{e.preventDefault();}}
                      >
                      {this.props.sidebar.reports.icon && <i className={this.props.sidebar.reports.icon} />}
                      <span onClick={(e)=>{this.setState({reportsOpened:!this.state.reportsOpened})}}>
                        {i18n.t('reports')}
                      </span>
                      <span style={{float:'right',cursor:'pointer'}} onClick={()=>this.props.history.push("/report/add")}>
                        <i className={'fa fa-plus sidebarIcon'} />
                      </span>
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
                      <NavItem key={'reportFilter'} className={classNames(undefined)}>
                        <NavLink
                          onClick={()=>this.setState({filterSelected:null,tagSelected:null})}
                          to={"/reportTest/filter"}
                          className={classNames("nav-link","")}
                          activeClassName="active activeNavItem fontBold">
                          <span className="sidebarItem">
                          {"Test create report"}
                          </span>
                        </NavLink>
                      </NavItem>
                      <NavItem key={'someFilter'} className={classNames(undefined)}>
                        <NavLink
                          onClick={()=>this.setState({filterSelected:null,tagSelected:null})}
                          to={"/reportTest/1"}
                          className={classNames("nav-link","")}
                          activeClassName="active activeNavItem fontBold">
                          <span className="sidebarItem">
                          {"Test report"}
                          </span>
                        </NavLink>
                      </NavItem>
                    </ul>
                  </li>}
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

export default connect(mapStateToProps, { getSidebar, setGlobalSearch })(Sidebar);
