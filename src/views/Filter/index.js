import React, { Component } from "react";
import { connect } from "react-redux";
import Reactions from "./reactions";

class SidebarChecker extends Component {
  render() {
    if(!this.props.sidebar){
      return null;
    }
    return <Reactions {...this.props}/>
  }
}

const mapStateToProps = ({ sidebarReducer }) => {
  const { sidebar } = sidebarReducer;
  return { sidebar };
};

export default connect(mapStateToProps, { })(SidebarChecker);
