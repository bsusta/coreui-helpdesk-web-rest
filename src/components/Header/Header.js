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

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }
  render() {
    return (
      <header className="app-header navbar" style={{ maxWidth: 1920 }}>
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon" />
        </NavbarToggler>
        <NavbarToggler style={{ color: "white" }}>LanHelpdesk</NavbarToggler>

        <Nav className="d-md-down-none" style={{paddingLeft:30}}>
          <InputGroup>
            <Input
              type="text"
              id="search"
              value={this.state.search}
              onChange={e => this.setState({ search: e.target.value })}
              placeholder="Search task"
              style={{ borderRight: "0", width: 300, marginLeft: 90 }}
            />
          <InputGroupAddon
            style={{background: "white", borderLeft: "", cursor:'pointer'}}
            onClick={()=>{
              this.props.setFilterBody('search='+this.state.search,{title:this.state.search},1);
              this.props.history.push('/filter/1,20');
            }}>
              <i className="fa fa-search" />
            </InputGroupAddon>
          </InputGroup>
        </Nav>
        {
           this.props.user.user_role.acl.includes('create_tasks') &&
          <button
            type="button"
            className="btn btn-link"
            style={{ color: "white"}}
            onClick={() => this.props.history.push("/task/add")}
            >
            {i18n.t("addTask")}
          </button>
        }

        <Nav navbar className="ml-auto">
          {/*Settings icon*/}
          {
            this.props.user.user_role.acl.some((item)=>['company_settings','company_attribute_settings','user_settings','user_role_settings','imap_settings','smtp_settings','status_settings','task_attribute_settings','unit_settings'].includes(item))&&
            <a
              style={{ margin: 0, padding: 0 }}
              className="d-md-down-none "
              href="#/settings"
            >
              <i className="icon-settings" style={{ color: "white" }} />
            </a>
        }
          <MessagesDropdown />
          {this.props.errorMessages.length > 0 && <ErrorMessagesDropdown />}
          <a
            style={{ margin: 0, marginRight: 10, color: "white" }}
            className="d-md-down-none"
            href={"#/user/profile"}
          >
            {this.props.user.username}
          </a>
          <i
            className="fa fa-sign-out"
            style={{ color: "white", cursor: "pointer", marginRight: 20 }}
            onClick={this.props.logoutUser}
          />
        </Nav>
      </header>
    );
  }
}

const mapStateToProps = ({ login, errorsReducer }) => {
  const { user, token } = login;
  const { errorMessages } = errorsReducer;
  return { user, token, errorMessages };
};

export default connect(mapStateToProps, { logoutUser, setFilterBody })(Header);
