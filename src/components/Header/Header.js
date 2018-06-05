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
import i18n from 'i18next';
import ErrorMessagesDropdown from './ErrorMessagesDropdown';
import SimpleLoadingBar from 'react-simple-loading-bar'

class Header extends Component {
  constructor(props){
    super(props);
    this.state={
      search:''
    };
  }

  render() {
    return (
      <header className="app-header navbar" style={{ maxWidth: 1920 }}>
        <SimpleLoadingBar
          activeRequests={this.props.activeRequests} color="#2A7EC5">
        </SimpleLoadingBar>

        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon" />
        </NavbarToggler>
        <NavbarToggler style={{ color: "white" }}>LanHelpdesk</NavbarToggler>



        <Nav className="d-md-down-none">
          <InputGroup>
            <Input
              type="text"
              id="search"
              value={this.state.search}
              onChange={(e)=>this.setState({search:e.target.value})}
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

        <button
          type="button"
          className="btn btn-link"
          style={{ color: "white" }}
          onClick={()=>this.props.history.push('/task/add')}
        >
          {i18n.t('addTask')}
        </button>
        <Nav className="ml-auto" navbar>
          {this.props.errorMessages.length>0&&<ErrorMessagesDropdown />}
          <a
            style={{margin:0, marginRight:10,color:'white'}}
            className="d-md-down-none"
            href={"#/user/edit/"+this.props.user.id}
            >
            {this.props.user.username}
          </a>
          <i className="fa fa-sign-out" style={{ color: "white",cursor: "pointer" }} onClick={this.props.logoutUser} />
          <MessagesDropdown />
        </Nav>
        <a
          style={{margin:0, padding:0}}
          className="d-md-down-none"
          href="#/settings"
        >
        <i className="icon-settings" style={{ color: "white", marginRight: 20 }} />
      </a>

      </header>
    );
  }
}


const mapStateToProps = ({login, errorsReducer, loadingReducer}) => {
  const { activeRequests } = loadingReducer;
  const {user, token}=login;
  const {errorMessages}=errorsReducer;
  return {user,token,activeRequests,errorMessages};
};

export default connect(mapStateToProps, { logoutUser, setFilterBody })(Header);
