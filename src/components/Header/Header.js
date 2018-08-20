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
import {logoutUser, setFilterBody} from '../../redux/actions';
import { connect } from "react-redux";
import i18n from "i18next";
import ErrorMessagesDropdown from "./ErrorMessagesDropdown";
import SimpleLoadingBar from 'react-simple-loading-bar';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }
  render() {
    return (
      <header className="app-header navbar">
        <SimpleLoadingBar
          activeRequests={this.props.activeRequests} color="#2A7EC5">
        </SimpleLoadingBar>
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon" />
        </NavbarToggler>
        <NavbarToggler className="headerText">
          <a
            className="headerIcons"
            href="#"
          >
            LanHelpdesk
          </a>
          </NavbarToggler>
        <div className="d-md-down-none">
          <InputGroup>
            <Input
              type="text"
              id="search"
              value={this.state.search}
              onChange={e => this.setState({ search: e.target.value })}
              placeholder="Search task"
              className="searchInput"
              onKeyPress={(e)=>{
                if(e.key==='Enter'){
                  this.props.setFilterBody({search:this.state.search, projectID:'all', filterID:'add', tagID:null,body:{title:this.state.search}},true);
                  this.props.history.push('/filter/add/project/all/'+this.props.body.page+','+this.props.body.count);
                }
              }}
            />
          <InputGroupAddon
            className="searchButton"
            onClick={()=>{
              this.props.setFilterBody({search:this.state.search, projectID:'all', filterID:'add', tagID:null,body:{title:this.state.search}},true);
              this.props.history.push('/filter/add/project/all/'+this.props.body.page+','+this.props.body.count);
            }}>
              <i className="fa fa-search" />
            </InputGroupAddon>
          </InputGroup>
        </div>
        {
           this.props.user.user_role.acl.includes('create_tasks') &&
          <button
            type="button"
            className="btn btn-link"
            onClick={() => this.props.history.push("/task/add")}
            >
            {i18n.t("addTask")}
          </button>
        }
        {
          this.props.user.user_role.acl.includes('create_projects') &&
          <button
            type="button"
            className="btn btn-link"
            onClick={() => this.props.history.push("/project/add")}
            >
            {i18n.t("addProject")}
          </button>
        }

        <div className="ml-auto row headerCommandBar">
          {/*Settings icon*/}
          {
            this.props.user.user_role.acl.some((item)=>['company_settings','company_attribute_settings','user_settings','user_role_settings','imap_settings','smtp_settings','status_settings','task_attribute_settings','unit_settings'].includes(item))&&
            <a
              className="headerIcons"
              href="#/settings"
            >
              <i className="fa fa-cog headerIcons" />
            </a>
        }
          <MessagesDropdown />
          {this.props.errorMessages.length > 0 && <ErrorMessagesDropdown />}
          <a
            className="d-md-down-none headerIcons"
            href={"#/user/profile"}
          >
            {this.props.user.username}
          </a>
          <i className="headerIcons">
          <i
            className="fa fa-sign-out"
            onClick={this.props.logoutUser}
          />
      </i>
      </div>
      </header>
    );
  }
}

const mapStateToProps = ({ login, loadingReducer, errorsReducer, filtersReducer }) => {
  const { user, token } = login;
  const { errorMessages } = errorsReducer;
  const { activeRequests } = loadingReducer;
  const { body } = filtersReducer;
  return { user, token, activeRequests, errorMessages, body };
};

export default connect(mapStateToProps, { logoutUser, setFilterBody })(Header);
