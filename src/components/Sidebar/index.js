import React, { Component } from "react";
import { connect } from "react-redux";
import { getSidebar } from "../../redux/actions";
import Sidebar from './Sidebar';

class SidebarLoader extends Component {
  constructor(props){
    super(props);
    this.props.getSidebar(this.props.date,this.props.user.user_role.acl,this.props.token);
  }

  render() {
    if(this.props.sidebar){
      return <Sidebar {...this.props} />;
    }
    return null;
  }
}

const mapStateToProps = ({ sidebarReducer, login }) => {
  const { sidebar,date } = sidebarReducer;
  const { token, user } = login;
  return { sidebar,date, token, user };
};

export default connect(mapStateToProps, { getSidebar })(SidebarLoader);
